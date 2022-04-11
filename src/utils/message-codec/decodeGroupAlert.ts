import { dtalk } from './protobuf'
import { GroupAlertMsgContent } from '@/types/messages'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { join } from 'lodash'
import { useAccountStore } from '@/store/user-account'

/** 解码群通知内容 */
export async function decodeGroupAlert(
    hostId: string,
    groupId: string,
    type: dtalk.proto.AlertType | null = 0,
    body?: Uint8Array | null
): Promise<GroupAlertMsgContent | null> {
    if (!body) return null
    const groupStore = useChatGroupStore()

    const AlertType = dtalk.proto.AlertType
    const AlertSignInGroup = dtalk.proto.AlertSignInGroup
    const AlertSignOutGroup = dtalk.proto.AlertSignOutGroup
    const AlertKickOutGroup = dtalk.proto.AlertKickOutGroup
    const AlertDeleteGroup = dtalk.proto.AlertDeleteGroup
    const AlertUpdateGroupMuted = dtalk.proto.AlertUpdateGroupMuted
    const AlertUpdateGroupMemberMutedTime = dtalk.proto.AlertUpdateGroupMemberMutedTime

    let detail: GroupAlertMsgContent['detail']
    let fullText: GroupAlertMsgContent['fullText']

    // 修改群名
    if (type === AlertType.UpdateGroupNameAlert) {
        const AlertUpdateGroupName = dtalk.proto.AlertUpdateGroupName
        type IAlertUpdateGroupName = dtalk.proto.IAlertUpdateGroupName

        detail = AlertUpdateGroupName.toObject(AlertUpdateGroupName.decode(body))
        const operator = useUserProfile((detail as IAlertUpdateGroupName).operator!).displayName.value
        const name = (await groupStore.getChatGroup(hostId, groupId)).name
        fullText = `${operator} 修改群名为 ${name}`
    }

    // 成员进入群聊
    else if (type === AlertType.SignInGroupAlert) {
        type IAlertSignInGroup = dtalk.proto.IAlertSignInGroup

        detail = AlertSignInGroup.toObject(AlertSignInGroup.decode(body))
        const inviter = useUserProfile((detail as IAlertSignInGroup).inviter!).displayName.value
        const member = (() => {
            const totalLength = (detail as IAlertSignInGroup).members!.length
            const members = (detail as IAlertSignInGroup)
                .members!.slice(0, 3)
                .map((m) => useUserProfile(m).displayName.value)
            return totalLength < 3 ? join(members, '、') : join(members, '、') + `等 ${totalLength} 人`
        })()
        fullText = `${inviter} 邀请 ${member} 加入群聊`
    }

    // 成员退出群聊
    else if (type === AlertType.SignOutGroupAlert) {
        type IAlertSignOutGroup = dtalk.proto.IAlertSignOutGroup
        detail = AlertSignOutGroup.toObject(AlertSignOutGroup.decode(body))
        const operator = useUserProfile((detail as IAlertSignOutGroup).operator!).displayName.value
        fullText = `${operator} 退出群聊`
    }

    // 踢出成员
    else if (type === AlertType.KickOutGroupAlert) {
        type IAlertKickOutGroup = dtalk.proto.IAlertKickOutGroup
        detail = AlertKickOutGroup.toObject(AlertKickOutGroup.decode(body))

        if ((detail as IAlertKickOutGroup).members?.find((m) => m === useAccountStore().account?.address)) {
            // delete groupStore.hosts[hostId][groupId]
            // groupStore.save(hostId)
            fullText = '你已被移出群聊'
        } else {
            const operator = useUserProfile((detail as IAlertKickOutGroup).operator!).displayName.value
            const member = (() => {
                const totalLength = (detail as IAlertKickOutGroup).members!.length
                const members = (detail as IAlertKickOutGroup)
                    .members!.slice(0, 3)
                    .map((m) => useUserProfile(m).displayName.value)
                return totalLength < 3 ? join(members, '、') : join(members, '、') + `等 ${totalLength} 人`
            })()
            fullText = `${operator} 将 ${member} 移出群聊`
        }
    }

    // 删群
    else if (type === AlertType.DeleteGroupAlert) {
        detail = AlertDeleteGroup.toObject(AlertDeleteGroup.decode(body))
        fullText = ''
    }

    // 全体禁言
    else if (type === AlertType.UpdateGroupMutedAlert) {
        detail = AlertUpdateGroupMuted.toObject(AlertUpdateGroupMuted.decode(body))
        fullText = ''
    }

    // 禁言用户
    else if (type === AlertType.UpdateGroupMemberMutedAlert) {
        detail = AlertUpdateGroupMemberMutedTime.toObject(AlertUpdateGroupMemberMutedTime.decode(body))
        fullText = ''
    }

    // 未知
    else {
        detail = null
        fullText = ''
    }

    return {
        type: type || 0,
        body: body || null,
        detail,
        fullText,
    }
}
