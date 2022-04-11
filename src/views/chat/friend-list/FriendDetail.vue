<template>
    <div v-if="friendsLength === 0 && !userAddress" class="flex flex-col justify-center items-center">
        <q-img :src="require('@/assets/images/friend-list-null.svg')" height="145px" fit="contain" no-spinner />
        <p class="mt-5 mb-7 text-xs text-subtle">暂无好友</p>
        <base-btn @click="openSearchFriendDialog" padding="6px 36px">添加好友</base-btn>
    </div>

    <div v-else-if="!userAddress" class="flex justify-center items-center">
        <q-img :src="require('theme/icons/logo-plain-text.svg')" height="55px" fit="contain" no-spinner />
    </div>

    <div v-else class="my-4" :key="userAddress">
        <q-scroll-area class="px-15 w-full h-full">
            <q-avatar size="260px" rounded class="mt-10">
                <q-img
                    :src="currFriendProfile?.avatar || require('theme/icons/default-avatar.svg')"
                    class="rounded"
                    no-spinner
                    no-transition
                />
            </q-avatar>

            <!-- 昵称 -->
            <h1 v-if="targetStaffInfo === null || targetStaffInfo?.isActivated" class="my-5">
                {{ truncate(currFriendProfile?.nickname || userAddress) }}
            </h1>

            <!-- 地址 -->
            <p v-if="!require('themeConfig').hideAddress && (targetStaffInfo === null || targetStaffInfo?.isActivated)">
                <span class="caption mr-2.5 text-sm">账号</span> <span>{{ userAddress }}</span>
            </p>

            <!-- 备注 -->
            <p
                v-if="!isMyself && (targetStaffInfo === null || targetStaffInfo?.isActivated)"
                class="flex items-center my-2.5"
            >
                <span class="caption mr-3.5 text-sm">备注</span>
                <RemarkVue :address="userAddress" />
            </p>

            <!-- 企业信息 -->
            <EnterpriseInfoVue :target-address="userAddress" :key="userAddress" />

            <!-- 聊天服务器 / 黑名单开关 -->
            <div v-if="!isMyself && (targetStaffInfo === null || targetStaffInfo?.isActivated)" class="mt-2.5 flex">
                <transition-group name="friend-datail-transition">
                    <ChatServerSelectVue
                        v-if="!inBlackList"
                        key="ChatServerSelectVue"
                        :targetAddress="userAddress"
                        :assigned-server-ids="assignedServerIdsToTarget || []"
                        class="friend-datail-transition-item overflow-hidden rounded w-1/2 mr-2.5"
                    />
                    <BlackListToggleVue
                        :targetAddress="userAddress"
                        key="BlackListToggleVue"
                        class="friend-datail-transition-item w-1/2"
                    />
                </transition-group>
            </div>

            <transition name="fade">
                <!-- 如果是我的好友 -->
                <div v-if="!isMyself && !inBlackList && assignedServerIdsToTarget" class="mt-8">
                    <base-btn @click="deleteFriend" color="negative" :loading="deleting" class="mr-5 w-28 h-10" outline>
                        删除好友
                    </base-btn>
                    <base-btn @click="sendMessage" class="w-24 h-10">发消息</base-btn>
                </div>
                <!-- 如果不是我的好友，但是企业用户，且企业账户已激活 -->
                <div
                    v-else-if="
                        !isMyself &&
                        !inBlackList &&
                        !assignedServerIdsToTarget &&
                        (targetStaffInfo === null || targetStaffInfo?.isActivated)
                    "
                    class="mt-8"
                >
                    <base-btn @click="addFriend" class="w-24 mr-5 h-10" outline>添加好友</base-btn>
                    <base-btn @click="sendMessage" class="w-24 h-10">发消息</base-btn>
                </div>
            </transition>
        </q-scroll-area>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from '@/router'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'
import { useProfileStore } from '@/store/user-profile'
import { useAccountStore } from '@/store/user-account'
import { useUserBlackListStore } from '@/store/user-black-list'
import { truncate } from '@/utils/string-truncate'

import RemarkVue from '@/components/Remark.vue'
import EnterpriseInfoVue from '@/components/EnterpriseInfo.vue'
import AddFriendDialogVue from '../search/AddFriendDialog.vue'
import ChatServerSelectVue from '@/components/ChatServerSelect.vue'
import BlackListToggleVue from '@/components/BlackListToggle.vue'

const props = defineProps<{
    userAddress?: string
}>()

const quasar = useQuasar()
const friendStore = useFriendStore()
const { friendsLength } = toRefs(friendStore)

const isMyself = computed(() => {
    return useAccountStore().account?.address === props.userAddress
})

// 好友资料
const userProfileStore = useProfileStore()
const currFriendProfile = computed(() => {
    if (!props.userAddress) return null
    else return userProfileStore.userProfiles[props.userAddress]
})

const inBlackList = computed(() => {
    return useUserBlackListStore().blackList.some((addr) => addr === props.userAddress)
})

const assignedServerIdsToTarget = computed(() => {
    if (!props.userAddress) return null

    if (props.userAddress in friendStore.friends!) {
        return friendStore.friends![props.userAddress].assignedServerIds
    }

    return null
})

// 该用户的企业信息, undefined 表示没有目标用户或正在加载用户信息， null 表示用户信息为空
const targetStaffInfo = computed(() => {
    if (!props.userAddress) return undefined

    const targetProfile = useProfileStore().userProfiles[props.userAddress]
    if (!targetProfile) return undefined
    if (!targetProfile.staffInfo) return null
    return targetProfile.staffInfo
})

// 删除好友
const deleting = ref(false)

function deleteFriend() {
    if (!props.userAddress) return

    quasar
        .dialog({
            title: '删除好友',
            cancel: true,
            message: `将要删除${
                currFriendProfile.value?.remark || currFriendProfile.value?.nickname || props.userAddress
            }，所有聊天记录将被清空，确定继续吗？`,
        })
        .onOk(async () => {
            deleting.value = true
            const chatStore = useChatStore()
            const chatWithTarget = chatStore.findChat('single', props.userAddress!).chat
            chatWithTarget && (await chatStore.deleteChat(chatWithTarget))
            friendStore
                .delete(props.userAddress!)
                .then(() => {
                    quasar.notify('删除好友成功')
                    friendStore.focusedUser = undefined
                })
                .catch((res) => {
                    if (res instanceof Error) quasar.notify(res.message)
                    else quasar.notify(res)
                })
                .finally(() => {
                    deleting.value = false
                })
        })
}

// 发送消息
function sendMessage() {
    if (!props.userAddress) return

    const router = useRouter()
    router.route = 'chat'

    const chatStore = useChatStore()
    const chat = chatStore.moveTop('single', props.userAddress)
    chatStore.focusChat(chat)
}

function openSearchFriendDialog() {
    quasar
        .dialog({
            component: AddFriendDialogVue,
        })
        .onOk(() => {
            quasar.notify('添加好友成功')
        })
}

// 添加好友
function addFriend() {
    if (!props.userAddress) return
    friendStore.add(props.userAddress)
}
</script>

<style lang="scss" scoped>
.friend-datail-transition-leave-active {
    position: absolute;
}

.friend-datail-transition-enter-from,
.friend-datail-transition-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.friend-datail-transition-item {
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
