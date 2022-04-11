<template>
    <div
        v-if="message.isRecalled ? true : ![MsgType.Card, MsgType.Transfer].includes(message.type)"
        class="transition duration-700"
    >
        <div v-if="!message.hideDatetime" class="text-xs text-gray-400 text-center pb-2 pt-4">
            {{ date.formatDate(message.datetime, 'MM月DD日 HH:mm') }}
        </div>

        <div v-if="!props.message.isRecalled && props.message.type !== MsgType.Alert" class="flex items-center">
            <div v-if="multiSelecting" class="pl-5">
                <base-checkbox
                    :model-value="chatStore.multiSelecting?.has(message.uuid)"
                    @update:model-value="multiSelectHandler"
                ></base-checkbox>
            </div>
            <message-layout
                :from-myself="fromMyself"
                :avatar="displayAvatar"
                :display-name="truncate(displayName)"
                class="flex-grow"
                @click-avatar="openChatProfile"
            >
                <template v-slot:avatar-menu>
                    <!-- 右击用户头像弹出菜单 -->
                    <q-menu
                        v-if="message.fromChat.type === 'group'"
                        @hide="focusEditingArea"
                        context-menu
                        transition-show="jump-down"
                        transition-hide="jump-up"
                    >
                        <q-list style="min-width: 100px">
                            <q-item @click="openChatProfile" clickable v-close-popup>
                                <q-item-section>查看资料</q-item-section>
                            </q-item>
                            <q-item
                                @click="chatStore.focusChat(chatStore.moveTop('single', message.from))"
                                clickable
                                v-close-popup
                            >
                                <q-item-section>发消息</q-item-section>
                            </q-item>
                            <q-item
                                @click="useMention(message.from, message.fromChat.id as GroupId)"
                                clickable
                                v-close-popup
                            >
                                <q-item-section>@ {{ mentionName }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </template>

                <template v-slot="{ isHovering }">
                    <!-- 消息内容 -->
                    <MessageListItemBubbleVue
                        :from-myself="fromMyself"
                        :show-options="isHovering"
                        :message="(message as  Message)"
                    />
                </template>

                <template v-slot:below-content>
                    <!-- 消息引用 (如果有) -->
                    <MessageListItemReferVue
                        v-if="!message.isRecalled && message.reference"
                        :message="message"
                        :class="[{ 'flex-row-reverse': fromMyself }, { 'ml-auto': fromMyself }]"
                        class="flex"
                    />

                    <div
                        v-else-if="
                            fromMyself && !message.isRecalled && message.source && message.type !== MsgType.Forward
                        "
                        :class="{ 'text-right': fromMyself }"
                        class="pt-1 text-sm text-subtle"
                    >
                        转发:
                        {{
                            message.source.channelType !== 1
                                ? `我和 [${message.source.target?.name}]`
                                : `群聊 [${message.source.target?.name}]`
                        }}
                        的聊天
                    </div>
                </template>
            </message-layout>
        </div>

        <div v-else class="pt-1.5 pb-5">
            <!-- 撤回消息通知 -->
            <MessageAlertVue v-if="message.isRecalled" :full-text="message.notifyText">
                <span
                    v-if="message.originalText && fromMyself && message.recalledByMyself"
                    @click="reedit"
                    class="text-primary cursor-pointer"
                >
                    重新编辑
                </span>
            </MessageAlertVue>
            <!-- 群通知 -->
            <MessageAlertVue v-else :full-text="(message.content as GroupAlertMsgContent).fullText " />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { date, Dialog, Notify } from 'quasar'
import { useChatStore } from '@/store/user-chat'
import { useProfileStore } from '@/store/user-profile'
import { truncate } from '@/utils/string-truncate'
import { MsgType } from '@/types/user-chat'
import type { Message, GroupId, RecalledMessage } from '@/types/user-chat'
import type { GroupAlertMsgContent } from '@/types/messages'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useUserGroupNickname } from '@/composables/user/useUserGroupNickname'
import { useMention } from './useMention'

import MessageLayout from '@/layouts/MessageLayout.vue'
import ChatDetailDialogVue from './ChatDetailDialog.vue'
import MessageAlertVue from './message-types/MessageAlert.vue'
import MessageListItemBubbleVue from './MessageListItemBubble.vue'
import MessageListItemReferVue from './MessageListItemRefer.vue'

const props = defineProps<{
    fromMyself: boolean
    message: Message | RecalledMessage
}>()

const { userProfile, displayAvatar } = useUserProfile((props.message as Message).from)
const chatStore = useChatStore()

const { multiSelecting } = storeToRefs(chatStore)

function reedit() {
    chatStore.editingText += (props.message as RecalledMessage).originalText!
}

if (props.message.isRecalled && props.message.originalText) {
    const diff = date.getDateDiff(Date.now(), props.message.recallTime, 'seconds')
    if (diff > 10 * 60) {
        const writableMessage = props.message.fromChat.messages.find(
            (m) => m.uuid === props.message.uuid
        ) as RecalledMessage
        writableMessage.originalText = ''
        chatStore.saveChat(props.message.fromChat)
    }
}

const { groupNickname } = useUserGroupNickname(props.message.from, props.message.fromChat.id as GroupId)

const displayName = computed(() =>
    truncate(
        userProfile.value?.remark ||
            groupNickname.value ||
            userProfile.value?.staffInfo?.name ||
            userProfile.value?.nickname ||
            (props.message as Message).from
    )
)

const mentionName = computed(() => truncate(groupNickname.value || userProfile.value?.nickname || props.message.from))

function focusEditingArea() {
    const editingArea = document.getElementById('editingArea') as HTMLInputElement
    editingArea?.focus()
    const len = chatStore.editingText.length * 2
    editingArea?.setSelectionRange(len, len)
}

function openChatProfile() {
    const message = props.message as Message
    !props.fromMyself && useProfileStore().get(message.from)
    const groupIdOfTargetUser = props.message.fromChat.type === 'single' ? undefined : props.message.fromChat.id
    Dialog.create({
        component: ChatDetailDialogVue,
        componentProps: {
            targetType: 'single',
            targetId: message.from,
            groupIdOfTargetUser,
        },
    }).onDismiss(focusEditingArea)
}

function multiSelectHandler(e: boolean) {
    if (!chatStore.multiSelecting) return
    if (!e) {
        chatStore.multiSelecting.delete(props.message.uuid)
        return
    } else {
        if (chatStore.multiSelecting.size >= 50) {
            Notify.create('最多选择 50 条消息')
            return
        }
        chatStore.multiSelecting.add(props.message.uuid)
    }
}
</script>
