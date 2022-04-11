import { dtalk } from '@/utils/message-codec/protobuf'
import type { Checkpoint } from '@/utils/account'
import { GroupAlertMsgContent, OssRequiredMsgContent, RedPacketMsgContent } from './messages'

/** 消息类型枚举 */
export enum MsgType {
    System = 0,
    Text = 1,
    Audio = 2,
    Image = 3,
    Video = 4,
    File = 5,
    Card = 6,
    Alert = 7,
    Forward = 8,
    RTCCall = 9,
    Transfer = 10,
    Collect = 11,
    RedPacket = 12,
    ContactCard = 13,
}

export type MsgContent = dtalk.proto.ITextMsg | OssRequiredMsgContent | RedPacketMsgContent | GroupAlertMsgContent

/** 多媒体消息的上传进度 */
export interface UploadProgress {
    /** 上传百分比，值为 0 ~ 100 */
    percentage: number

    /** OSS 分片上传产生的碎片 */
    checkpoint?: Checkpoint
}

export interface BaseMessage {
    /** 本条消息的 uuid */
    uuid: string

    /** 消息发送时间 */
    datetime: number

    /** 是否隐藏消息时间 */
    hideDatetime?: boolean

    /** 所属的 chat */
    fromChat: Chat

    /** 发送方的地址 */
    from: string

    /** 接收方的地址 */
    target: string

    isRecalled?: boolean

    /** 消息发送成功后，后端赋予该消息的唯一 id */
    logid?: string
}

export interface Reference {
    topic: string
    ref: string
}

export interface Message extends BaseMessage {
    isRecalled?: false

    /** 消息类型 */
    type: MsgType

    /** 消息内容，不同的消息类型有不同的结构 */
    content: MsgContent

    /** 显示在用户界面上的消息发送状态，对方发来的消息无状态，用 null 表示 */
    state: 'pending' | 'success' | 'failure' | null

    /** 多媒体消息的上传进度, 值为 0 ~ 1 */
    uploadProgress?: UploadProgress

    /** @deprecated 标记一条消息为未读状态, 已弃用 */
    unread?: boolean

    /** 标记一个语音消息是否听过；仅在消息类型为语音时有意义 */
    listenedAudioMessage?: boolean

    reference?: Reference

    source?: dtalk.proto.ISource
}

/** 被撤回的消息 */
export interface RecalledMessage extends BaseMessage {
    isRecalled: true

    /** 撤回通知 */
    notifyText: string

    /** 仅当被撤回的消息是文本消息时有值 */
    originalText?: string

    /** 被撤回的时间 */
    recallTime: number

    /** 是撤回自己的消息吗 */
    recalledByMyself: boolean
}

export type ChatType = 'single' | 'group'

interface BaseChat {
    /** 聊天的历史消息 */
    messages: (Message | RecalledMessage)[]

    /** 置顶 */
    pinned: boolean

    /** 勿扰模式 */
    doNotDisturb: boolean

    /** 未读消息数量 */
    unreadLength: number

    /** @deprecated 旧版唯一标识, 仅支持单聊 */
    targetAddress?: string
}

export interface SingleChat extends BaseChat {
    type: 'single'
    id: string
}

export interface GroupId {
    hostId: string
    groupId: string
}

export interface GroupChat extends BaseChat {
    type: 'group'

    /** 群通过所在聊天服务器 + 群 id 区分 */
    id: GroupId

    /** @deprecated 聊天服务器的 hostId, 现在放到 id 中 */
    host?: string
}

export type Chat = SingleChat | GroupChat

export interface SendMessagePayload {
    /** 消息类型 */
    type: MsgType

    /** 消息内容 */
    content: MsgContent

    /** 要重发的 message index, 非因之前发送失败而重发的消息不填 */
    resendMessageUuid?: string

    /** 聊天, 不填默认将消息发往当前聚焦的聊天 */
    chat?: Chat

    refering?: Message | null

    /** 转发的消息需携带 */
    source?: dtalk.proto.ISource
}
