import { computed, ComputedRef, Ref } from 'vue'
import { GroupId } from '@/types/user-chat'
import { ChatGroup } from '@/types/user-chat-group'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useConnectionStore } from '@/store/user-connection'

interface UsableGroupProfile {
    displayName: ComputedRef<string>
    displayAvatar: ComputedRef<string>
    groupProfile: Ref<ChatGroup | null>
    connectionState: ComputedRef<'not-exist' | 'connected' | 'not-connected' | undefined>
}

export function useGroupProfile({ hostId, groupId }: GroupId): UsableGroupProfile {
    const chatGroupStore = useChatGroupStore()

    const groupProfile = computed(() => {
        if (!(hostId in chatGroupStore.hosts)) return null
        const host = chatGroupStore.hosts[hostId]
        if (!(groupId in host)) return null
        const group = host[groupId]
        return group
    })

    if (!groupProfile.value) useChatGroupStore().getChatGroup(hostId, groupId)

    return {
        groupProfile,

        displayName: computed(() => groupProfile?.value?.name || '[未知群聊]'),

        displayAvatar: computed(() => {
            return groupProfile?.value?.avatar || require('theme/icons/default-avatar-group.svg')
        }),

        connectionState: computed(() => {
            const connectionStore = useConnectionStore()
            if (!(hostId in connectionStore.connections)) return 'not-exist'
            const connection = connectionStore.connections[hostId]
            if (!connection || connection.error) return 'not-connected'
            else if (connection.instance) return 'connected'
            return undefined
        }),
    }
}
