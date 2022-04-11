<template>
    <div class="relative">
        <q-scroll-area @scroll="loadMore" ref="scrollArea" class="h-full w-full">
            <MessageItemVue
                v-for="message in displayMessages"
                :key="message.uuid"
                :id="message.uuid"
                :message="message"
                :from-myself="useAccountStore().localStoredAccount?.address === message.from"
                class="last:pb-1.5"
            />
        </q-scroll-area>

        <show-unread-btn-vue
            v-if="unreadLengthAbove > 0"
            direction="up"
            @click="scrollToUnreadMessageAbove"
            class="top-2.5 -right-2.5"
        >
            {{ unreadLengthAbove }} 条新消息
        </show-unread-btn-vue>

        <show-unread-btn-vue
            v-if="unreadLengthBelow > 0"
            direction="down"
            @click="scrollToUnreadMessageBelow"
            class="bottom-2.5 left-1/2 transform -translate-x-1/2"
        >
            {{ unreadLengthBelow }} 条新消息
        </show-unread-btn-vue>
    </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useAccountStore } from '@/store/user-account'
import { Chat } from '@/types/user-chat'
import useScrollTo from '@/composables/useScrollTo'
import { useMessageListDisplay } from './useMessageListDisplay'

import MessageItemVue from './MessageListItem.vue'
import ShowUnreadBtnVue from './MessageListShowUnreadBtn.vue'

const props = defineProps<{
    chat: Chat
}>()

const { scrollArea, scrollToBottom, scrollToElement } = useScrollTo()

const {
    displayMessages,
    loadMore,
    unreadLengthAbove,
    scrollToUnreadMessageAbove,
    unreadLengthBelow,
    scrollToUnreadMessageBelow,
} = useMessageListDisplay(toRef(props, 'chat'), { scrollArea, scrollToBottom, scrollToElement })
</script>
