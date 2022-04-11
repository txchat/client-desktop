<template>
    <div class="chatHistory">
        <NoMatchChatHistory
            v-if="
                !resultOfChatsHistorySearch?.matchedMessages || resultOfChatsHistorySearch?.matchedMessages.length === 0
            "
        ></NoMatchChatHistory>
        <div
            v-else-if="resultOfChatsHistorySearch && resultOfChatsHistorySearch.matchedMessages.length !== 0"
            class="py-5 pr-4 h-full"
        >
            <q-scroll-area class="h-full px-3">
                <MessageListItem
                    v-for="chatHistory in resultOfChatsHistorySearch?.matchedMessages"
                    :key="chatHistory.uuid"
                    @dismiss="$emit('dismiss')"
                    :message="chatHistory"
                    :from-myself="false"
                    :matchedStr="resultOfChatsHistorySearch.matchedStr"
                    :background-class="mode === 'one' ? 'bg-white' : 'bg-gray-1'"
                ></MessageListItem>
            </q-scroll-area>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { tResultOfChatHistorySearch } from '@/types/user-search'
import MessageListItem from './MessageListItem.vue'
import NoMatchChatHistory from './NoMatchChatHistory.vue'

interface Props {
    mode?: 'one' | 'multi'
    resultOfChatsHistorySearch?: tResultOfChatHistorySearch
}
withDefaults(defineProps<Props>(), {
    mode: 'multi',
})

defineEmits<{
    (e: 'dismiss'): void
}>()
</script>

<style lang="scss">
.chatHistory {
    display: flow-root;
    height: 480px;
}
</style>
