<template>
    <q-scroll-area class="h-full pr-4" content-style="display: flex; flex-direction: column">
        <q-avatar size="160px" rounded>
            <q-img :src="displayAvatar" no-spinner no-transition />
        </q-avatar>

        <div class="space-y-2.5 mt-2.5">
            <h1 class="font-bold text-base break-all">{{ displayName }}</h1>

            <p v-if="!require('themeConfig').hideAddress" class="flex">
                <span class="pr-2.5 text-subtle whitespace-nowrap">账号</span>
                <span class="break-all">{{ userAddress }}</span>
            </p>
            <p class="flex items-start">
                <span class="pr-2.5 text-subtle whitespace-nowrap">备注</span>
                <RemarkVue :address="userAddress" />
            </p>
            <EnterpriseInfoVue :target-address="userAddress" :cols="1" />
            <ChatServerSelectVue
                v-if="userProfile?.chatServers"
                :assignedServerIds="userProfile.chatServers.map((i) => i.address)"
                :targetAddress="userAddress"
            />
            <BlackListToggleVue :targetAddress="userAddress" />
            <div></div>
        </div>

        <q-space />

        <div class="py-4 pr-4">
            <base-btn v-if="isMyFriend" @click="deleteFriend" color="negative" class="w-full" flat rounded>
                删除好友
            </base-btn>
            <base-btn v-else @click="addFriend" :loading="loading" flat class="w-full">添加好友</base-btn>
        </div>
    </q-scroll-area>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dialog, Notify } from 'quasar'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'
import { useUserProfile } from '@/composables/user/useUserProfile'
import RemarkVue from '@/components/Remark.vue'
import EnterpriseInfoVue from '@/components/EnterpriseInfo.vue'
import ChatServerSelectVue from '@/components/ChatServerSelect.vue'
import BlackListToggleVue from '@/components/BlackListToggle.vue'

const props = defineProps<{
    userAddress: string
}>()

const { displayName, displayAvatar, userProfile } = useUserProfile(props.userAddress)

const friendStore = useFriendStore()
const isMyFriend = computed(() => !!friendStore.friends && props.userAddress in friendStore.friends)

const loading = ref(false)
const chatStore = useChatStore()
function deleteFriend() {
    Dialog.create({
        title: '删除好友',
        cancel: true,
        message: `将要删除${displayName.value}，所有聊天记录将被清空，确定继续吗？`,
    }).onOk(async () => {
        loading.value = true
        try {
            await chatStore.deleteChat('single', props.userAddress)
            await friendStore.delete(props.userAddress)
            Notify.create('删除好友成功')
            friendStore.focusedUser = undefined
        } catch (error) {
            Notify.create('删除好友失败，请检查您的网络连接')
            console.error(error)
        } finally {
            loading.value = false
        }
    })
}

async function addFriend() {
    loading.value = true
    try {
        await friendStore.add(props.userAddress)
        Notify.create(`已将${displayName.value}添加为好友`)
    } catch (error) {
        Notify.create('添加好友失败，请检查您的网络连接')
        console.error(error)
    } finally {
        loading.value = false
    }
}
</script>
