import { dtalk } from './protobuf'
import Long from 'long'
import { MsgContent, MsgType, Reference } from '@/types/user-chat'
import { decryptGroupMessage, decryptSingleMessage } from '../message-crypto/content-crypto'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useAccountStore } from '@/store/user-account'

interface BaseDecodedMessage {
    messageType: 'common' | 'recall'
    logid: string
}

export interface DecodedMessage extends BaseDecodedMessage {
    messageType: 'common'
    uuid: string
    type: dtalk.proto.MsgType
    content: MsgContent
    from: string
    /** 私聊消息: 我的地址; 群聊消息: 群 id */
    target: string
    datetime: number
    /** 群聊消息 */
    fromGroup: boolean
    /** 消息的引用源 (回复的哪条消息) */
    reference?: Reference
    /** 转发消息需携带 */
    source?: dtalk.proto.ISource
}

export interface DecodedRecallingMessage extends BaseDecodedMessage {
    messageType: 'recall'
    operator: string
    self: boolean
}

export type OutputMessage = DecodedMessage | DecodedRecallingMessage

export default async (data: Uint8Array, serverAddress: string): Promise<OutputMessage | null> => {
    const protoMsg = dtalk.proto.Proto.decode(data)

    // 解码正常消息
    if (!protoMsg.eventType || protoMsg.eventType === dtalk.proto.EventType.commonMsgAck)
        return decodeCommonMessage(protoMsg.body, serverAddress)
    // 解码信令类消息
    else if (protoMsg.eventType === dtalk.proto.EventType.Notice) return decodeNoticeMessage(protoMsg.body)
    else return Promise.resolve(null)
}

async function decodeCommonMessage(data: Uint8Array, serverAddress: string): Promise<DecodedMessage | null> {
    const commonMsg: dtalk.proto.ICommonMsg = dtalk.proto.CommonMsg.toObject(dtalk.proto.CommonMsg.decode(data), {
        longs: String,
    })

    if (!commonMsg.msg) return null
    if (!commonMsg.from) return null
    if (!commonMsg.target) return null

    // 解密消息
    let decrypted: Uint8Array | undefined
    try {
        if (!commonMsg.channelType) {
            const accountStore = useAccountStore()
            const targetAddress = accountStore.account?.address === commonMsg.from ? commonMsg.target : commonMsg.from
            decrypted = await decryptSingleMessage(commonMsg.msg || new Uint8Array(), targetAddress)
        } else if (commonMsg.msgType !== MsgType.Alert) {
            const key = await useChatGroupStore().keyOf(serverAddress, commonMsg.target)
            if (key) decrypted = await decryptGroupMessage(commonMsg.msg || new Uint8Array(), key)
        }
    } catch (error) {
        console.error(error)
        decrypted = undefined
    }

    if (!commonMsg.msgType || !commonMsg.msgId) throw '解码消息时发现空字段，理论上不可能出现这种情况'

    let content: MsgContent
    try {
        content = decodeCommonContent(decrypted || commonMsg.msg, commonMsg.msgType)
    } catch (error) {
        console.error(error)
        return Promise.reject(new Error('解码消息失败'))
    }

    let reference: Reference | undefined
    if (commonMsg.reference) {
        const { topic, ref } = commonMsg.reference
        topic && ref && (reference = { topic, ref })
    }

    return {
        messageType: 'common',
        content,
        from: commonMsg.from,
        uuid: commonMsg.msgId,
        type: commonMsg.msgType,
        datetime: Long.isLong(commonMsg.datetime) ? Number(commonMsg.datetime.toString()) : Number(commonMsg.datetime),
        logid: commonMsg.logId,
        target: commonMsg.target,
        fromGroup: commonMsg.channelType === 1,
        reference,
        source: commonMsg.source || undefined,
    }
}

/** 解码消息中的具体内容 */
export function decodeCommonContent(decrypted: Uint8Array | undefined, msgType: MsgType): MsgContent {
    let content: MsgContent
    const TextMsg = dtalk.proto.TextMsg
    const AudioMsg = dtalk.proto.AudioMsg
    const ImageMsg = dtalk.proto.ImageMsg
    const VideoMsg = dtalk.proto.VideoMsg
    const FileMsg = dtalk.proto.FileMsg
    const AlertMsg = dtalk.proto.AlertMsg
    const ForwardMsg = dtalk.proto.ForwardMsg
    const RedPacketMsg = dtalk.proto.RedPacketMsg
    const ContactCardMsg = dtalk.proto.ContactCardMsg

    switch (msgType) {
        case 1:
            content = TextMsg.toObject(TextMsg.decode(decrypted || new Uint8Array()))
            break
        case 2:
            content = AudioMsg.toObject(AudioMsg.decode(decrypted || new Uint8Array()))
            break
        case 3:
            content = ImageMsg.toObject(ImageMsg.decode(decrypted || new Uint8Array()))
            break
        case 4:
            content = VideoMsg.toObject(VideoMsg.decode(decrypted || new Uint8Array()))
            break
        case 5:
            content = FileMsg.toObject(FileMsg.decode(decrypted || new Uint8Array()))
            if (Long.isLong(content.size)) content.size = content.size.toNumber()
            break
        case 7:
            content = AlertMsg.toObject(AlertMsg.decode(decrypted || new Uint8Array()))
            break
        case 8:
            content = ForwardMsg.toObject(ForwardMsg.decode(decrypted || new Uint8Array()), { longs: String })
            content.items?.forEach((item: dtalk.proto.IForwardItem) => {
                if (Long.isLong(item.datetime)) item.datetime = item.datetime.toNumber()
            })
            break
        case 12:
            content = RedPacketMsg.toObject(RedPacketMsg.decode(decrypted || new Uint8Array()))
            break
        case 13:
            content = ContactCardMsg.toObject(ContactCardMsg.decode(decrypted || new Uint8Array()))
            break
        default:
            throw '解码消息时发现未知的消息类型: ' + msgType
    }
    return content
}

function decodeNoticeMessage(data: Uint8Array): DecodedRecallingMessage | null {
    const noticeMsg = dtalk.proto.NotifyMsg.decode(data)
    if (noticeMsg.action === dtalk.proto.ActionType.Revoke) {
        const ActionRevoke = dtalk.proto.ActionRevoke
        const decoded = ActionRevoke.toObject(ActionRevoke.decode(noticeMsg.body), { longs: String })
        return {
            messageType: 'recall',
            operator: decoded.operator,
            self: decoded.self,
            logid: decoded.logId,
        }
    } else return null
}
