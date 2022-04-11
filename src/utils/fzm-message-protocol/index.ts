import './proto-config'
import encodeMessage from './encodeMessage'
import FzmMessageProtocolConnection from './FzmMessageProtocolConnection'
import { FzmMessageTypes } from './FzmMessageTypes'

export interface AuthMsg {
    appId: string
    token: string
    ext?: Uint8Array
}

export default class FzmMessageProtocol {
    url: string
    ws?: WebSocket

    constructor(url: string) {
        this.url = url
    }

    authorize(authMsg: AuthMsg): Promise<FzmMessageProtocolConnection> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url)
            this.ws.onopen = () => {
                const authMsgEncoded = encodeMessage(authMsg, FzmMessageTypes.Auth)

                // 发送鉴权消息
                this.ws?.send(authMsgEncoded)
            }

            this.ws.onmessage = () => {
                resolve(new FzmMessageProtocolConnection(this.ws as WebSocket))
            }

            this.ws.onclose = () => {
                reject(`WebSocket 连接被服务器端关闭，这大概率是鉴权失败导致的`)
            }
        })
    }
}
