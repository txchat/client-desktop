<template>
    <div
        @click="openForwardDetailDialog"
        class="w-56 bg-white flex flex-col cursor-pointer text-xs text-subtle"
        :class="
            fromMyself ? 'bg-bubble rounded-forward-msg-bubble-myself' : 'bg-white rounded-forward-msg-bubble-opposite'
        "
    >
        <div class="p-2.5 flex-grow">
            <div class="text-sm text-dark line-clamp-2">{{ title }}</div>
            <div class="pt-1.5 break-all whitespace-pre-line line-clamp-4" style="overflow-wrap: anywhere">
                {{ contents.join('\n') }}
            </div>
        </div>
        <q-separator />
        <div class="px-4 py-2">
            聊天记录 共 <span>{{(message.content as ForwardMessage ).items?.length}}</span> 条
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from 'quasar'
import { Message } from '@/types/user-chat'
import type { ForwardMessage } from '@/types/messages/forward'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { truncate } from '@/utils/string-truncate'
import { messageSnapshot } from '@/utils/message-snapshot'
import MessageForwardDetailDialogVue from './MessageForwardDetailDialog.vue'

const props = defineProps<{
    message: Message
    fromMyself: boolean
}>()

const nameA = computed(() => {
    const from = props.message.source?.from?.id
    if (!from) return ''
    return useUserProfile(from).userProfile.value?.nickname || truncate(from)
})

const nameB = computed(() => {
    const target = props.message.source?.target?.id
    if (!target) return ''
    return useUserProfile(target).userProfile.value?.nickname || truncate(target)
})

const title = computed(() => {
    const subject = (() => {
        if (props.message.source?.channelType === 1) return '群聊'
        else if (nameA.value && nameB) return `${nameA.value}和${nameB.value}`
    })()
    return subject + '的聊天记录'
})

let contents = (() => {
    return (props.message.content as ForwardMessage).items
        ?.slice(0, 4)
        .filter((item) => item.msgType)
        .map((item) => {
            const itemBody = messageSnapshot(item.msgType!, item.msg)
            return `${item.name}: ${itemBody}`
        })
})()

function openForwardDetailDialog() {
    Dialog.create({
        component: MessageForwardDetailDialogVue,
        componentProps: {
            title: title.value,
            message: props.message,
        },
    })
}
</script>
