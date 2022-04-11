<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card v-if="targetType === 'single'" class="q-dialog-plugin p-3" style="width: 500px">
            <q-card-section class="flex">
                <q-avatar class="mr-5" size="100px" rounded>
                    <q-img
                        :src="userProfile?.avatar || require('theme/icons/default-avatar.svg')"
                        no-spinner
                        no-transition
                    />
                </q-avatar>

                <div class="py-1 space-y-2">
                    <h1 class="font-bold mb-1 break-all">
                        {{ truncate(userProfile?.nickname || (targetId as string)) }}
                    </h1>
                    <div
                        v-if="!require('themeConfig').hideAddress && (groupProfile as ChatGroup | undefined)?.friendType !== 1"
                        class="flex"
                    >
                        <span class="pr-2.5 text-subtle whitespace-nowrap">账号</span>
                        <span class="break-all">{{ targetId }}</span>
                    </div>
                    <p class="flex">
                        <span class="pr-2.5 text-subtle whitespace-nowrap">备注</span>
                        <RemarkVue :address="(targetId as string)" />
                    </p>
                </div>
            </q-card-section>

            <q-card-section class="pb-0">
                <EnterpriseInfoVue :target-address="(targetId as string)" :cols="1" />
            </q-card-section>

            <q-card-section v-if="assignedServerIds" class="mt-1">
                <ChatServerSelectVue :assignedServerIds="assignedServerIds" :targetAddress="(targetId as string)" />
            </q-card-section>

            <q-card-actions
                v-if="!isMyself && !inBlackList && (groupProfile as ChatGroup | undefined)?.friendType !== 1"
                align="center"
                class="pt-0 pb-1"
            >
                <!-- 我的好友 -->
                <div v-if="assignedServerIds" class="flex">
                    <div class="mx-7 flex flex-col items-center">
                        <base-btn @click="sendMessage" color="secondary" text-color="primary" round>
                            <i class="iconfont text-2xl">&#xe628;</i>
                        </base-btn>
                        <p class="mt-1 text-xs text-subtle cursor-pointer">发送消息</p>
                    </div>
                    <div class="mx-7 flex flex-col items-center">
                        <base-btn @click="deleteFriend" color="negative-light" text-color="negative" round>
                            <i class="iconfont text-2xl">&#xe7d2;</i>
                        </base-btn>
                        <p class="mt-1 text-xs text-subtle cursor-pointer">删除好友</p>
                    </div>
                </div>

                <!-- 陌生人 -->
                <div v-else>
                    <div class="mx-7 flex flex-col items-center">
                        <base-btn @click="addFriend" :loading="loading" class="w-48 mt-4 mb-2" padding="6px">
                            添加好友
                        </base-btn>
                    </div>
                </div>
            </q-card-actions>
        </q-card>
        <q-card v-else class="q-dialog-plugin p-3" style="width: 500px">
            <q-card-section class="flex">
                <q-avatar class="mr-5" size="100px" rounded>
                    <q-img
                        :src="groupProfile?.avatar || require('theme/icons/default-avatar-group.svg')"
                        no-spinner
                        no-transition
                    />
                </q-avatar>

                <div class="py-1 space-y-2">
                    <h1 class="font-bold mb-3 break-all">
                        {{ displayName }}
                    </h1>
                    <div class="flex">
                        <span class="pr-2.5 text-subtle whitespace-nowrap">群号</span>
                        <span class="break-all">{{ groupProfile?.markId }}</span>
                    </div>
                    <p class="flex">
                        <span class="pr-2.5 text-subtle whitespace-nowrap">群成员</span>
                        <span class="break-all text-subtle">{{ groupProfile?.memberNum }}人</span>
                    </p>
                </div>
            </q-card-section>

            <q-card-section>
                <div
                    name="群所在的服务器"
                    :no-checkbox="true"
                    :online="true"
                    class="my-2 w-full h-18 bg-gray-1 px-3 rounded-sm flex flex-col justify-center"
                >
                    <div>群所在的服务器</div>
                    <div class="pt-1 text-sm text-subtle">
                        {{ (targetId as GroupId).hostId }}
                        <span
                            :class="
                                connectionState === 'connected'
                                    ? 'bg-positive'
                                    : connectionState === 'not-exist'
                                    ? 'bg-subtle'
                                    : 'bg-negative'
                            "
                            class="ml-1.5 w-2.5 h-2.5 inline-block rounded-md"
                        ></span>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, PropType } from 'vue'
import { useRouter } from '@/router'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import type { ChatType, GroupId } from '@/types/user-chat'
import type { ChatGroup } from '@/types/user-chat-group'
import { truncate } from '@/utils/string-truncate'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'
import { useAccountStore } from '@/store/user-account'
import { useUserBlackListStore } from '@/store/user-black-list'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useGroupProfile } from '@/composables/user/useGroupProfile'

import RemarkVue from '@/components/Remark.vue'
import ChatServerSelectVue from '@/components/ChatServerSelect.vue'
import EnterpriseInfoVue from '@/components/EnterpriseInfo.vue'

const props = defineProps({
    targetType: {
        type: String as PropType<ChatType>,
        required: true,
    },
    targetId: {
        /**
         * Currently complex types and type imports from other files are not supported.
         * @see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#type-only-propsemit-declarations
         */
        type: [String, Object] as PropType<GroupId | string>,
        required: true,
    },
    /** 从群聊中查看某个用户的个人信息时使用 */
    groupIdOfTargetUser: {
        type: Object as PropType<GroupId>,
    },
})

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const quasar = useQuasar()
const chatStore = useChatStore()
const friendStore = useFriendStore()

// @ts-expect-error: 私聊时, `connectionState` 为 `undefined`
let { userProfile, groupProfile, displayName, connectionState } =
    props.targetType === 'single'
        ? useUserProfile(props.targetId as string)
        : useGroupProfile(props.targetId as GroupId)

if (props.targetType === 'single' && props.groupIdOfTargetUser) {
    groupProfile = useGroupProfile(props.groupIdOfTargetUser).groupProfile
}

const loading = ref(false)

const isMyself = computed(() => {
    if (props.targetType === 'group') return false
    return useAccountStore().account?.address === (props.targetId as string)
})

const isMyFriend = computed(() => {
    if (props.targetType === 'group') return
    if (!friendStore.friends) return false
    return (props.targetId as string) in friendStore.friends
})

const inBlackList = computed(() => {
    if (props.targetType === 'group') return false
    return useUserBlackListStore().blackList.some((addr) => addr === props.targetId)
})

const assignedServerIds = computed(() => {
    if (props.targetType === 'group') return
    if (!friendStore.friends) return null
    if (!isMyFriend.value) return null
    return friendStore.friends[props.targetId as string].assignedServerIds
})

function sendMessage() {
    onDialogCancel()
    const router = useRouter()
    router.route = 'chat'

    const chatStore = useChatStore()
    const chat = chatStore.moveTop(props.targetType, props.targetId)
    chatStore.focusChat(chat)
}

function deleteFriend() {
    quasar
        .dialog({
            title: '删除好友',
            cancel: true,
            message: `将要删除${displayName.value}，所有聊天记录将被清空，确定继续吗？`,
        })
        .onOk(async () => {
            onDialogCancel()
            const targetChat = chatStore.findChat('single', props.targetId as string).chat
            if (targetChat) await chatStore.deleteChat(targetChat)
            await friendStore.delete(props.targetId as string)
            quasar.notify('删除好友成功')
            chatStore.focusedChat = null
            chatStore.clearEditingText()
            friendStore.focusedUser = undefined
        })
}

function addFriend() {
    loading.value = true
    friendStore
        .add(props.targetId as string)
        .then(() => {
            quasar.notify(`已将${displayName.value}添加为好友`)
        })
        .catch((err) => {
            quasar.notify('添加好友失败，请检查您的网络连接')
            console.error(err)
            loading.value = false
        })
}
</script>
