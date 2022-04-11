import { dtalk } from './protobuf'
import { MsgType, Reference } from '@/types/user-chat'
import { MsgContent } from '@/types/user-chat'
import { encryptGroupMessage, encryptSingleMessage } from '../message-crypto/content-crypto'
import { useChatGroupStore } from '@/store/user-chat-group'
import { cloneDeep } from 'lodash'

/**
 * 编码消息需要传的参数
 */
interface ChatMessageEncoderArgs {
    /** 发送者 */
    from: string
    /** 接收者 */
    target: string
    /** 消息类型 */
    msgType: MsgType
    /** 消息内容 */
    msg: MsgContent
    /** 群聊消息 */
    toGroup?: boolean
    /** url host */
    host?: string
    /** 消息的全数据库唯一 id */
    uuid: string
    /** 本地用户的私钥 */
    privateKey: Uint8Array
    /** 对方用户的公钥 */
    publicKey: Uint8Array
    /** 回复 */
    reference?: Reference
    /** 转发的消息需携带 */
    source?: dtalk.proto.ISource
}

export function encodeContent(type: MsgType, content?: MsgContent): Uint8Array {
    if (!content) return new Uint8Array()

    let _content
    if (type === MsgType.Text) {
        _content = dtalk.proto.TextMsg.encode(content).finish()
    } else if (type === MsgType.Audio) {
        _content = dtalk.proto.AudioMsg.encode(content).finish()
    } else if (type === MsgType.Image) {
        _content = dtalk.proto.ImageMsg.encode(content).finish()
    } else if (type === MsgType.Video) {
        _content = dtalk.proto.VideoMsg.encode(content).finish()
    } else if (type === MsgType.File) {
        _content = dtalk.proto.FileMsg.encode(content).finish()
    } else if (type === MsgType.Forward) {
        const deepClonedContent = cloneDeep(content as dtalk.proto.IForwardMsg)
        const decodedItems = deepClonedContent.items?.map((item) => ({
            ...item,
            msg: item.msgType ? encodeContent(item.msgType, item.msg) : undefined,
        }))
        if (!decodedItems) throw new Error('encodeContentErr: itemDecodedContent 为空')
        _content = dtalk.proto.ForwardMsg.encode({ items: decodedItems }).finish()
    } else {
        throw '未知的消息类型：' + type
    }
    return _content
}

export default async (msg: ChatMessageEncoderArgs): Promise<Uint8Array> => {
    const content = encodeContent(msg.msgType, msg.msg)
    let encryptedContent: Uint8Array | undefined
    // 群聊消息内容加密
    if (msg.toGroup) {
        const key = await useChatGroupStore().keyOf(msg.host!, msg.target)
        if (key) encryptedContent = await encryptGroupMessage(content, key)
    }
    // 私聊消息内容加密
    else {
        if (msg.publicKey.length) encryptedContent = await encryptSingleMessage(content, msg.publicKey, msg.privateKey)
    }

    const body: dtalk.proto.ICommonMsg = {
        channelType: msg.toGroup ? 1 : 0,
        logId: 0,
        msgId: msg.uuid,
        from: msg.from,
        target: msg.target,
        msgType: msg.msgType as dtalk.proto.MsgType,
        msg: encryptedContent || content,
        reference: msg.reference,
        datetime: Date.now(),
        source: msg.source,
    }
    // console.log(body)

    const bodyData = dtalk.proto.CommonMsg.encode(body).finish()

    const container = {
        eventType: 0,
        body: bodyData,
    }
    return dtalk.proto.Proto.encode(container).finish()
}
