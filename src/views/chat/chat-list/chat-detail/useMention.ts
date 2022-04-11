import { useChatStore } from '@/store/user-chat'
import { truncate } from '@/utils/string-truncate'
import { useUserGroupNickname } from '@/composables/user/useUserGroupNickname'
import { GroupId } from '@/types/user-chat'
import { useUserProfile } from '@/composables/user/useUserProfile'

export function useMention(targetAddress: string, groupId: GroupId): void {
    const { groupNickname } = useUserGroupNickname(targetAddress, groupId)
    const { userProfile } = useUserProfile(targetAddress)
    const mentionName = truncate(groupNickname.value || userProfile.value?.nickname || targetAddress)

    const chatStore = useChatStore()
    chatStore.editingText += `@${mentionName}\u2004`
    chatStore.editingMention.push({
        address: targetAddress,
        displayName: mentionName,
    })
}
