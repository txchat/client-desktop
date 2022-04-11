<template>
    <div
        class="h-18 bg-gray-1 rounded flex justify-between items-center transition-opacity duration-300"
        :class="{ 'opacity-50': updatingBlackList }"
        :key="targetAddress"
    >
        <div class="pl-5">
            <p class="text-sm">加入黑名单</p>
            <p class="text-sm text-subtle">{{ inBlackList ? '已不再接收对方消息' : '将不再接收对方消息' }}</p>
        </div>
        <div class="pr-5">
            <q-toggle
                :model-value="inBlackList"
                :disable="updatingBlackList"
                @update:model-value="updateBlackList"
                color="primary"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { useQuasar } from 'quasar'
import { useUserBlackListStore } from '@/store/user-black-list'
import { useProfileStore } from '@/store/user-profile'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'

const props = defineProps<{
    targetAddress: string
}>()

const quasar = useQuasar()
const blackListStore = useUserBlackListStore()

// 用户资料
const userProfile = toRef(useProfileStore().userProfiles, props.targetAddress)

const inBlackList = computed(
    () => useUserBlackListStore().blackList.findIndex((addr) => addr === props.targetAddress) !== -1
)

const updatingBlackList = ref(false)
function updateBlackList() {
    updatingBlackList.value = true

    if (inBlackList.value) {
        blackListStore
            .remove(props.targetAddress)
            .then(() => {
                // 将非好友用户移出黑名单后，详情页不再显示该用户
                const friendStore = useFriendStore()
                if (
                    props.targetAddress === friendStore.focusedUser &&
                    friendStore.friends &&
                    !(props.targetAddress in friendStore.friends)
                ) {
                    friendStore.focusedUser = undefined
                }
            })
            .catch((err) => {
                quasar.notify(err)
                console.error(err)
            })
            .finally(() => {
                updatingBlackList.value = false
            })
    } else {
        quasar
            .dialog({
                title: '加入黑名单',
                cancel: true,
                message: `加入黑名单后，你将不再接收到对方的消息，确定将联系人 <span class="text-primary"> ${
                    userProfile.value?.remark || userProfile.value?.nickname || props.targetAddress
                } </span> 移至黑名单吗？`,
                html: true,
            })
            .onOk(() => {
                blackListStore
                    .add(props.targetAddress)
                    .then(() => {
                        const chatStore = useChatStore()
                        if (chatStore.focusedChat?.id === props.targetAddress) {
                            chatStore.focusedChat = null
                            chatStore.clearEditingText()
                        }
                    })
                    .catch((err) => {
                        quasar.notify(err)
                        console.error(err)
                    })
                    .finally(() => {
                        updatingBlackList.value = false
                    })
            })
            .onCancel(() => (updatingBlackList.value = false))
    }
}
</script>
