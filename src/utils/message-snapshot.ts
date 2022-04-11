import { dtalk } from './message-codec/protobuf'
import { MsgContent, MsgType } from '@/types/user-chat'

export function messageSnapshot(type: MsgType, content?: MsgContent): string {
    let snapshot
    if (type === MsgType.Text) snapshot = (content as dtalk.proto.ITextMsg).content
    else if (type === MsgType.Image) snapshot = '[图片]'
    else if (type === MsgType.Video) snapshot = '[视频]'
    else if (type === MsgType.File) snapshot = '[文件]'
    else if (type === MsgType.RedPacket) snapshot = '[红包]'
    else if (type === MsgType.Transfer) snapshot = '[转账]'
    else if (type === MsgType.Audio) snapshot = '[语音]'
    else if (type === MsgType.Forward) snapshot = '[聊天记录]'
    else if (type === MsgType.ContactCard) snapshot = '[名片]'
    return snapshot || '[未知的消息类型]'
}
