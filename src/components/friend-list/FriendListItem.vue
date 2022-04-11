<template>
    <div class="h-13 cursor-default flex items-center">
        <q-avatar class="w-8 h-8" rounded>
            <q-img :src="userProfile?.avatar || require('theme/icons/default-avatar.svg')" no-spinner no-transition />
        </q-avatar>
        <p class="ml-2.5 line-clamp-1 break-all">
            {{ truncate(displayName, 20) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useProfileStore } from '@/store/user-profile'
import { truncate } from '@/utils/string-truncate'

const props = defineProps<{
    userAddress: string
}>()

// 从本地数据库载入好友资料
const userProfileStore = useProfileStore()
userProfileStore.load(props.userAddress).then((p) => {
    if (p) return
    userProfileStore.get(props.userAddress)
})

// 响应式跟踪好友资料
const userProfile = toRef(userProfileStore.userProfiles, props.userAddress)
const displayName = computed(
    () =>
        userProfile.value?.remark ||
        userProfile.value?.staffInfo?.name ||
        userProfile.value?.nickname ||
        props.userAddress
)
</script>
