import { ComputedRef, computed } from 'vue'
import { GroupId } from '@/types/user-chat'
import { useChatGroupStore } from '@/store/user-chat-group'

interface UsableUserGroupNickname {
    groupNickname: ComputedRef<string | null>
}

/** 获取用户在某个群中的群昵称 */
export function useUserGroupNickname(userAddress: string, groupId: GroupId): UsableUserGroupNickname {
    const groupNickname = computed(() => {
        const chatGroupStore = useChatGroupStore()
        if (groupId.hostId in chatGroupStore.hosts) {
            const host = chatGroupStore.hosts[groupId.hostId]
            const group = host[groupId.groupId]
            if (group) {
                const member = group.members?.find((m) => m.memberId === userAddress)
                if (member && member.memberName) return member.memberName
            }
        }

        return null
    })

    return { groupNickname }
}
