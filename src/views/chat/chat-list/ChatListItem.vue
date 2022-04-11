<template>
    <div
        @click="switchChat"
        @contextmenu.prevent="openMenu"
        :class="props.selected ? 'bg-gray-4' : props.chat.pinned ? 'bg-gray-3' : ''"
        class="h-18 px-5 flex items-center"
    >
        <q-avatar size="44px" class="mr-3" rounded>
            <q-img :src="displayAvatar" fit="contain" no-spinner no-transition />
            <q-badge v-if="!chat.doNotDisturb && chat.unreadLength" color="red" rounded floating>
                {{ chat.unreadLength }}
            </q-badge>
            <q-badge
                v-else-if="chat.doNotDisturb && chat.unreadLength"
                style="padding: 0; width: 8px; font-size: 8px; min-height: 8px"
                color="red"
                floating
                rounded
            />
        </q-avatar>

        <div class="h-11 flex-grow flex flex-col justify-between">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <p class="line-clamp-1 break-all">
                        {{ displayName }}
                    </p>
                    <span
                        v-if="chat.type === 'group'"
                        :class="
                            connectionState === 'connected'
                                ? ''
                                : connectionState === 'not-exist'
                                ? 'bg-subtle'
                                : 'bg-negative'
                        "
                        class="mx-1 inline-block rounded-md"
                        style="height: 8px; width: 8px; min-width: 8px"
                    ></span>
                </div>
                <p class="caption whitespace-nowrap">
                    {{ lastMessageDate }}
                </p>
            </div>
            <div class="space-x-2 flex justify-between items-center">
                <p class="caption line-clamp-1 break-all leading-tight">
                    <span v-if="chat.unreadLength > 1">{{ `[${chat.unreadLength}条]` }}</span>
                    <span v-if="hasMentioned" class="text-negative">[有人@我]</span>
                    <span v-if="lastMessageSenderName">{{ `${lastMessageSenderName}: ` }}</span>
                    <span>{{ ` ${lastMessageContent}` }}</span>
                </p>
                <i v-if="chat.doNotDisturb" class="iconfont text-gray-300">&#xe627;</i>
            </div>
        </div>

        <q-menu transition-show="jump-down" transition-hide="jump-up" touch-position context-menu auto-close>
            <q-list>
                <q-item clickable @click="pinChat">
                    <q-item-section>{{ chat.pinned ? '取消置顶' : '置顶聊天' }}</q-item-section>
                </q-item>
                <q-item clickable @click="deleteChat">
                    <q-item-section>删除聊天</q-item-section>
                </q-item>
                <q-item clickable @click="doNotDisturb">
                    <q-item-section>{{ chat.doNotDisturb ? '取消免打扰' : '消息免打扰' }}</q-item-section>
                </q-item>
                <q-item clickable @click="checkProfile">
                    <q-item-section>查看资料</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { date, Dialog } from 'quasar'
import { MsgType } from '@/types/user-chat'
import type { Chat } from '@/types/user-chat'
import { dtalk } from '@/utils/message-codec/protobuf'
import { useChatStore } from '@/store/user-chat'
import ChatDetailDialogVue from './chat-detail/ChatDetailDialog.vue'
import { useGroupProfile } from '@/composables/user/useGroupProfile'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useAccountStore } from '@/store/user-account'
import { messageSnapshot } from '@/utils/message-snapshot'
import { GroupAlertMsgContent } from '@/types/messages'

const props = defineProps<{
    chat: Chat
    selected: boolean
}>()

const emit = defineEmits<{
    (e: 'update:selected'): void
    (e: 'update:pinned', value: boolean): void
    (e: 'update:do-not-disturb', value: boolean): void
}>()

// 响应式跟踪聊天名称
// @ts-expect-error: 私聊时, `connectionState` 为 `undefined`
const { displayName, displayAvatar, connectionState } =
    props.chat.type === 'single' ? useUserProfile(props.chat.id) : useGroupProfile(props.chat.id)

function openMenu() {
    emit('update:selected')
}

const chatStore = useChatStore()
function switchChat() {
    emit('update:selected')
}

const hasMentioned = computed(() => {
    if (!props.chat.unreadLength) return
    return props.chat.messages
        .slice(-props.chat.unreadLength)
        .some(
            (m) =>
                !m.isRecalled &&
                m.content &&
                (m.content as dtalk.proto.ITextMsg).mention?.some((addr) =>
                    [useAccountStore().account?.address, 'ALL'].includes(addr)
                )
        )
})

const lastMessage = computed(() => {
    return props.chat.messages.at(-1)
})

const lastMessageSenderName = computed(() => {
    if (props.chat.type === 'single') return
    if (!lastMessage.value) return
    return useUserProfile(lastMessage.value.from).displayName.value
})

/** 最后一条消息内容 */
const lastMessageContent = computed(() => {
    if (!lastMessage.value) return
    if (lastMessage.value.isRecalled) return lastMessage.value.notifyText
    if (lastMessage.value.type === MsgType.Alert) {
        return (lastMessage.value.content as GroupAlertMsgContent).fullText
    }
    return messageSnapshot(lastMessage.value.type, lastMessage.value.content)
})

/** 最后一条消息时间 */
const lastMessageDate = computed(() => {
    if (props.chat.messages.length === 0) return ''

    const datetime = props.chat.messages[props.chat.messages.length - 1].datetime

    const startOfThisYear = date.startOfDate(new Date(), 'year').valueOf()
    const startOfYesterday = date.startOfDate(date.subtractFromDate(new Date(), { hours: 24 }), 'day').valueOf()
    const startOfToday = date.startOfDate(new Date(), 'day').valueOf()

    if (datetime - startOfThisYear < 0) {
        // 早于今年
        return date.formatDate(datetime, 'YY/MM/DD')
    } else if (datetime - startOfYesterday < 0) {
        // 早于昨天
        return date.formatDate(datetime, 'MM/DD')
    } else if (datetime - startOfToday < 0) {
        // 早于今天
        return '昨天'
    } else {
        // 当日内
        return date.formatDate(datetime, 'HH:mm')
    }
})

/**
 * 置顶聊天
 */
function pinChat() {
    emit('update:pinned', !props.chat.pinned)
    chatStore.moveTop(props.chat.type, props.chat.id)
}

watch(
    () => props.chat.pinned,
    () => chatStore.saveChat(props.chat)
)

/** 消息免打扰 */
function doNotDisturb() {
    emit('update:do-not-disturb', !props.chat.doNotDisturb)
}

/** 删除聊天 */
function deleteChat() {
    Dialog.create({
        title: '删除聊天',
        cancel: true,
        message: `删除与${displayName.value}的聊天，所有聊天记录将被清空，确定继续吗？`,
    }).onOk(() => {
        chatStore.deleteChat(props.chat)
    })
}

function checkProfile() {
    Dialog.create({
        component: ChatDetailDialogVue,
        componentProps: {
            targetType: props.chat.type,
            targetId: props.chat.id,
        },
    })
}
</script>
