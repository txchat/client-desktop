import { MsgContent } from '../user-chat'
import { dtalk } from '@/utils/message-codec/protobuf'

export type ForwardItem = Exclude<dtalk.proto.IForwardItem, 'msg'> & {
    msg?: MsgContent
    rawMessage?: File
}

export type ForwardMessage = {
    items: ForwardItem[]
}
