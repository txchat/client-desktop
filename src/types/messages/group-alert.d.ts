import { dtalk } from '@/utils/message-codec/protobuf'

export type GroupAlertMsgContent = dtalk.proto.IAlertMsg & {
    detail:
        | dtalk.proto.IAlertUpdateGroupName
        | dtalk.proto.IAlertSignInGroup
        | dtalk.proto.IAlertSignOutGroup
        | dtalk.proto.IAlertKickOutGroup
        | dtalk.proto.IAlertDeleteGroup
        | dtalk.proto.IAlertUpdateGroupMuted
        | dtalk.proto.IAlertUpdateGroupMemberMutedTime
        | null
    fullText: string
}
