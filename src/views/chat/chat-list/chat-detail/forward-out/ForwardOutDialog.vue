<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <dialog-content-layout style="height: 600px; width: 640px; max-width: 640px" no-head class="q-dialog-plugin">
            <div class="h-full flex px-5 space-x-5">
                <!-- 左半边 -->
                <q-scroll-area class="w-1/2">
                    <div
                        v-if="profileStore.myProfile?.staffInfo"
                        @click="isSelectingFromOA ? (isSelectingFromOA = false) : (isSelectingFromOA = true)"
                        class="mr-4 mb-1 p-3 rounded-md grid items-center cursor-pointer"
                        :class="isSelectingFromOA ? 'bg-gray-4' : 'bg-gray-1'"
                        style="grid-template-columns: 30px 1fr 18px; gap: 10px"
                    >
                        <q-img :src="require('theme/icons/default-avatar-oa.svg')" no-spinner />
                        <div>
                            <p>从组织架构选择</p>
                            <p class="text-subtle text-sm">{{ profileStore.myProfile.staffInfo.entName }}</p>
                        </div>
                        <q-icon :name="isSelectingFromOA ? 'cancel' : 'more_vert'" color="subtle" size="18px"></q-icon>
                    </div>

                    <ForwardMessageDialogNormalTargetVue v-show="!isSelectingFromOA" v-model="selected" />
                    <ForwardMessageDialogOATargetVue v-show="isSelectingFromOA" v-model="selected" />
                </q-scroll-area>
                <!-- 右半边 -->
                <div class="w-1/2 h-full flex flex-col">
                    <div class="flex-grow">
                        <h6 class="h-10 leading-10 font-medium">转发给</h6>
                        <div v-if="targetProfile" class="h-13 flex items-center space-x-2.5">
                            <q-avatar rounded size="30px">
                                <q-img :src="targetProfile.avatar" no-spinner no-transition></q-img>
                            </q-avatar>
                            <span class="flex-grow">{{ targetProfile.displayName }}</span>
                            <button @click="selected = [null, null]">
                                <i class="iconfont text-3xl text-gray-5 float-right">&#xe607;</i>
                            </button>
                        </div>
                    </div>
                    <q-card-actions align="right" class="p-0 mb-4 pt-5 space-x-5">
                        <base-btn @click="onDialogCancel" outline padding="8px 25px">取消</base-btn>
                        <base-btn
                            @click="forward"
                            :disable="selected[0] === null || selected[1] === null"
                            :loading="isForwarding"
                            padding="8px 25px"
                        >
                            确定
                        </base-btn>
                    </q-card-actions>
                </div>
            </div>
        </dialog-content-layout>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Notify, useDialogPluginComponent } from 'quasar'
import { useChatStore } from '@/store/user-chat'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useGroupProfile } from '@/composables/user/useGroupProfile'
import { dtalk } from '@/utils/message-codec/protobuf'
import { ChatType, GroupId, Message, MsgContent, MsgType } from '@/types/user-chat'
import { messageSnapshot } from '@/utils/message-snapshot'
import { truncate } from '@/utils/string-truncate'
import { uploadFile } from '@/store/uploadFile'
import { useProfileStore } from '@/store/user-profile'
import { ForwardItem } from '@/types/messages/forward'
import DialogContentLayout from '@/layouts/DialogContentLayout.vue'
import ForwardMessageDialogNormalTargetVue from './ForwardOutDialogNormalTarget.vue'
import ForwardMessageDialogOATargetVue from './ForwardOutDialogOATarget.vue'

const props = defineProps<{
    /** 转发消息类型 - 单条消息转发, 多条消息逐条转发, 多条消息合并转发 */
    forwardType: 'singleMessage' | 'multiMessageDiscrete' | 'multiMessageCombined'
    messages: Message[]
}>()

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()

const chatStore = useChatStore()
const profileStore = useProfileStore()

const isSelectingFromOA = ref(false)

/** 正在合并转发 */
const isForwarding = ref(false)

/** 选择的转发目标 */
const selected = ref<[ChatType | null, string | GroupId | null]>([null, null])

/** 目标用户资料 */
const targetProfile = computed(() => {
    if (selected.value[0] === null || selected.value[1] === null) return null
    else if (selected.value[0] === 'single') {
        const usableProfile = useUserProfile(selected.value[1] as string)
        return {
            avatar: usableProfile.displayAvatar.value,
            profile: usableProfile.userProfile.value,
            displayName: usableProfile.displayName.value,
        }
    } else {
        const usableProfile = useGroupProfile(selected.value[1] as GroupId)
        return {
            avatar: usableProfile.displayAvatar.value,
            profile: usableProfile.groupProfile.value,
            displayName: usableProfile.displayName.value,
        }
    }
})

async function forward() {
    const sourceChat = props.messages[0].fromChat
    const isSourceChatSingle = sourceChat.type === 'single'
    const sourceChatDisplayName = isSourceChatSingle
        ? useUserProfile(sourceChat.id).userProfile.value?.nickname || truncate(sourceChat.id)
        : useGroupProfile(sourceChat.id).groupProfile.value?.name || '未知群聊'

    const targetChat = chatStore.moveTop(selected.value[0] as ChatType, selected.value[1] as string | GroupId)

    if (targetChat.type === 'group') {
        const { groupProfile } = useGroupProfile(targetChat.id)
        if (groupProfile.value?.status !== 0) {
            Notify.create(`转发消息失败: 目标群聊${groupProfile.value?.status === 1 ? '已被封禁' : '已解散'}`)
            return
        } else if (groupProfile.value.muteType !== 0) {
            Notify.create(`转发的群聊已被禁言，无法转发！`)
            return
        } else if (groupProfile.value.person.memberMuteTime > Date.now()) {
            Notify.create(`转发的群聊已被禁言，无法转发！`)
            return
        }
    }

    // 单条转发 / 逐条转发
    if (['singleMessage', 'multiMessageDiscrete'].includes(props.forwardType)) {
        props.messages.forEach((message) => {
            const type = [MsgType.Image, MsgType.Video, MsgType.File].includes(message.type)
                ? message.type
                : MsgType.Text

            const content = [MsgType.Text, MsgType.Image, MsgType.Video, MsgType.File].includes(message.type)
                ? message.content
                : { content: messageSnapshot(message.type) }

            const source: dtalk.proto.ISource = {
                channelType: isSourceChatSingle ? 0 : 1,
                from: { id: message.from },
                target: {
                    id: message.target,
                    name: sourceChatDisplayName,
                },
            }

            chatStore.sendMessage({
                chat: targetChat,
                type,
                content,
                source,
            })
        })
        onDialogOK()
    }

    // 合并转发
    else {
        isForwarding.value = true

        const items: ForwardItem[] = []

        for await (const message of props.messages) {
            const userProfile = useUserProfile(message.from).userProfile.value

            let msgContent
            if (message.type === MsgType.Text) {
                msgContent = { content: message.content.content }
            } else if (message.type === MsgType.Image) {
                msgContent = {
                    mediaUrl: '',
                    width: message.content.width,
                    height: message.content.height,
                    rawMessage: message.content.rawMessage,
                }
            } else if (message.type === MsgType.Video) {
                msgContent = {
                    mediaUrl: '',
                    height: message.content.height,
                    width: message.content.width,
                    time: message.content.time,
                    rawMessage: message.content.rawMessage,
                }
            } else if (message.type === MsgType.File) {
                msgContent = {
                    mediaUrl: '',
                    name: message.content.name,
                    size: message.content.size,
                    rawMessage: message.content.rawMessage,
                }
            }

            if (msgContent && msgContent.rawMessage) {
                const url = await uploadFile(targetChat.type, targetChat.id, message.type, msgContent)
                msgContent.mediaUrl = url
                await chatStore.saveFile(url, message.content.rawMessage)
            }

            items.push({
                avatar: userProfile?.avatar,
                name: userProfile?.nickname,
                datetime: message.datetime,
                msgType: message.type,
                msg: msgContent as MsgContent,
            })
        }

        await chatStore.sendMessage({
            chat: targetChat,
            type: MsgType.Forward,
            content: { items },
            source: {
                channelType: isSourceChatSingle ? 0 : 1,
                from: { id: useProfileStore().myProfile!.address },
                target: {
                    id: sourceChat.type === 'single' ? sourceChat.id : sourceChat.id.groupId,
                },
            },
        })
        onDialogOK()
    }
}
</script>
