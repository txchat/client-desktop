import { dtalk } from '@/utils/message-codec/protobuf'

/** 红包消息 */
export interface RedPacketMsgContent extends dtalk.proto.IRedPacketMsg {
    /** 红包状态 */
    status?: RedPacketStatus

    /** 领取成功才有值, 领取了多少钱 */
    receivedAmount?: number
}

/** 默认为待领; 1: 待领; 2: 已领完; 3: 已退回; 4: 已过期; 5: 成功 */
export type RedPacketStatus = 1 | 2 | 3 | 4 | 5
