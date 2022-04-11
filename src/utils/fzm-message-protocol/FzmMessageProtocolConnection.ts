import { date } from 'quasar'
import { urlRemovePrefix } from '../url-replace'
import decodeMessage from './decodeMessage'
import encodeMessage from './encodeMessage'
import { FzmMessageTypes } from './FzmMessageTypes'

interface IPendingMessage {
    seq: number
    uuid?: string
    type: FzmMessageTypes
    resolve?: (payload: Uint8Array) => void
    reject?: (reason?: string) => void
    timeout?: NodeJS.Timeout
}

class PendingMessage implements IPendingMessage {
    seq: number
    uuid?: string
    type: FzmMessageTypes
    resolve?: (payload: Uint8Array) => void
    reject?: (reason?: string) => void
    timeout?: NodeJS.Timeout

    constructor(seq: number, type: FzmMessageTypes, uuid: string) {
        this.seq = seq
        this.type = type
        this.uuid = uuid
    }
}

export interface IFzmMessageProtocolConnection {
    href: string
    readyState: number

    sendMessage(msg: { body: Uint8Array; uuid: string }): Promise<Uint8Array>
    disconnect(): void

    onReceiveMessage?: (messageBody: Uint8Array) => void
    onLoseConnection?: () => void
}

export default class FzmMessageProtocolConnection implements IFzmMessageProtocolConnection {
    private webSocket: WebSocket
    onReceiveMessage?: (messageBody: Uint8Array) => void
    onLoseConnection?: () => void

    seq: number

    // 心跳
    private heartBeatInterval: number
    private timer: NodeJS.Timeout

    // 调试模式
    private debug: boolean

    // 消息发送队列
    queue: PendingMessage[]

    constructor(ws: WebSocket) {
        // console.log('WebSocket: 已连接')

        this.queue = [] as PendingMessage[]
        this.seq = 0
        this.debug = process.env.NODE_ENV !== 'production'
        this.webSocket = ws

        // 定时发送心跳
        this.heartBeatInterval = 15 // 单位秒；后端目前设置 4 分钟超时
        this.timer = setInterval(() => {
            /** 下次将要发送心跳前，队列中尚有未发送成功的心跳，则表明断线 */
            const previousHeartBeatNotFinished = this.queue.some((item) => item.type === FzmMessageTypes.HeartBeat)
            const webSocketNotReady = this.webSocket.readyState !== 1

            if (previousHeartBeatNotFinished || webSocketNotReady) {
                console.log(this.host, ' :失去与服务器的连接', date.formatDate(Date.now(), ' MM/DD hh:mm:ss'))
                this.disconnect()
                this.onLoseConnection && this.onLoseConnection()
            } else {
                this.sendHeartBeat()
            }
        }, this.heartBeatInterval * 1000)

        // 监听 webSocket 收到消息
        this.webSocket.onmessage = async (event) => {
            const response = await decodeMessage(event.data)

            const responseType = response.header.operation
            const responseSeq = response.header.seq
            const responseAck = response.header.ack

            // 答复类型：心跳答复
            if (responseType === FzmMessageTypes.HeartBeatResponse) {
                // 从队列中剔除
                this.queue.splice(
                    this.queue.findIndex((i) => i.seq == responseSeq),
                    1
                )
            }

            // 接收到对方用户发来的消息，回复“收到”
            else if (responseType === FzmMessageTypes.ReceiveMessage) {
                // 发送确认接收到消息的响应
                console.log(this.host, ': 收到新消息, 响应服务器: ' + this.href)

                this.onReceiveMessage && (await this.onReceiveMessage(response.body))

                this.seq++
                const msgData = encodeMessage(null, FzmMessageTypes.ReceiveMessageResponse, this.seq, responseSeq)
                this.webSocket.send(msgData)
            }

            // 接收到本用户发送消息成功的确认
            else if (responseType === FzmMessageTypes.SendMessageResponse) {
                console.log(this.host, `: 发送消息成功, seq: ${responseSeq}`)

                const queueItem = this.queue.find((i) => i.seq == responseAck) as IPendingMessage
                queueItem.resolve && queueItem.resolve(response.body)
                if (queueItem.timeout) clearTimeout(queueItem.timeout)

                // 从队列中剔除
                this.queue.splice(
                    this.queue.findIndex((i) => i.seq == responseAck),
                    1
                )
            } else {
                console.log(`收到未知消息类型"${responseType}", seq: ${responseSeq}`)
            }
        }

        this.webSocket.onclose = () => {
            console.log(this.host, ': 连接已关闭' + date.formatDate(Date.now(), ' MM/DD hh:mm:ss'))
            this.queue.forEach((m) => m.reject && m.reject())
        }

        this.webSocket.onerror = (event) => {
            console.error('WebSocket 发生错误')
            console.error(event)
            this.queue.forEach((m) => m.reject && m.reject())
        }
    }

    /**
     * WebSocket 状态
     * 0 (WebSocket.CONNECTING): 正在链接中
     * 1 (WebSocket.OPEN): 已经链接并且可以通讯
     * 2 (WebSocket.CLOSING): 连接正在关闭
     * 3 (WebSocket.CLOSED): 连接已关闭或者没有链接成功
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket/readyState
     */
    get readyState(): number {
        return this.webSocket.readyState
    }

    /** WebSocket 完整 url */
    get href(): string {
        return this.webSocket.url
    }

    /** WebSocket url 去掉前缀和路径 */
    get host(): string {
        return urlRemovePrefix(this.webSocket.url).split('/')[0]
    }

    /** WebSocket url 去掉路径 */
    get origin(): string {
        const _ori = this.webSocket.url.match(/^wss?:\/\/[^/]*/)
        if (!_ori) throw new Error('WebSocket url 不正确: ' + this.webSocket.url)
        return _ori[0]
    }

    /** 主动断开连接 */
    disconnect(): void {
        this.seq++
        clearInterval(this.timer)
        if (this.webSocket.readyState < 2) {
            this.webSocket.send(encodeMessage(null, FzmMessageTypes.Disconnect, this.seq))
            this.webSocket.close()
            console.log(this.host, `: 主动断开连接, seq: ${this.seq}`)
        }
    }

    /**
     * 发送消息，需将消息内容转换为 protobuf 格式的二进制
     * @param msg 发送的消息，以及制定该条消息的唯一 id
     * @param msg.body 消息对象
     * @param msg.uuid 唯一id
     * @returns promise
     */
    sendMessage(msg: { body: Uint8Array; uuid: string }): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            if (this.debug) console.log(`发送消息, seq: ${this.seq}`)

            const failedMessage = this.queue.find((m) => m.uuid === msg.uuid) // 是否为之前发送失败的消息

            let pendingMessage: IPendingMessage
            if (failedMessage) {
                pendingMessage = failedMessage
            } else {
                this.seq++
                pendingMessage = new PendingMessage(this.seq, FzmMessageTypes.SendMessage, msg.uuid)
                this.queue.push(pendingMessage)
            }

            pendingMessage.resolve = resolve
            pendingMessage.reject = reject
            this.webSocket.send(encodeMessage(msg.body, FzmMessageTypes.SendMessage, pendingMessage.seq))
        })
    }

    private sendHeartBeat(): void {
        this.seq++
        if (this.debug) console.log(this.host, `: 发送心跳, seq: ${this.seq}`)
        this.queue.push({ seq: this.seq, type: FzmMessageTypes.HeartBeat })
        this.webSocket.send(encodeMessage(null, FzmMessageTypes.HeartBeat, this.seq))
    }
}
