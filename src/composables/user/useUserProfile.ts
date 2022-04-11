import { computed, ComputedRef, Ref, toRef } from 'vue'
import { useProfileStore } from '@/store/user-profile'
import { UserProfile } from '@/types/user-profile'
import { truncate } from '@/utils/string-truncate'

interface UsableUserProfile {
    displayName: ComputedRef<string>
    displayAvatar: ComputedRef<string>
    userProfile: Ref<UserProfile | null>
}

const pendingUsers = new Set()

export function useUserProfile(addr: string): UsableUserProfile {
    const profileStore = useProfileStore()
    const userProfile = toRef(profileStore.userProfiles, addr)

    if (!userProfile.value) {
        profileStore.load(addr).then((profile) => {
            if (!profile && !pendingUsers.has(addr)) {
                pendingUsers.add(addr)
                profileStore
                    .get(addr)
                    .then((chainProfile) => (userProfile.value = chainProfile))
                    .finally(() => pendingUsers.delete(addr))
            } else {
                userProfile.value = profile
            }
        })
    }

    return {
        userProfile,

        /** 好友备注 > 企业姓名 > 昵称 > 地址 */
        displayName: computed(() => {
            return truncate(
                userProfile.value?.remark || userProfile.value?.staffInfo?.name || userProfile.value?.nickname || addr
            )
        }),

        displayAvatar: computed(() => {
            return userProfile.value?.avatar || require('theme/icons/default-avatar.svg')
        }),
    }
}
