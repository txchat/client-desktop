<template>
    <q-dialog ref="dialogRef" @hide="handleHide" class="queryAllChatsHistory">
        <dialog-content-layout style="width: 760px; min-width: 760px" title="聊天记录" @hide="onDialogCancel">
            <BaseSearchInput class="mb-5 mx-auto w-1/2" v-model="searchStore.searchValueOfAllChatsHistory" />
            <div class="flex w-full">
                <div
                    class="w-52 bg-gray-2"
                    v-if="
                        searchStore.resultOfAllChatsHistorySearch &&
                        searchStore.resultOfAllChatsHistorySearch.length !== 0
                    "
                >
                    <q-scroll-area class="h-full px-3">
                        <ChatsHistoryList
                            :list="searchStore.resultOfAllChatsHistorySearch"
                            @click="handleClickChatHistoryItem"
                            :focusedChatHistory="searchStore.focusedChatHistory"
                        />
                    </q-scroll-area>
                </div>
                <div
                    class="bg-gray-1 flex-grow"
                    v-if="
                        searchStore.resultOfAllChatsHistorySearch &&
                        searchStore.resultOfAllChatsHistorySearch.length !== 0
                    "
                >
                    <ChatHistory
                        :resultOfChatsHistorySearch="searchStore.getFocusedChatHistory()"
                        @dismiss="onDialogOK"
                    />
                </div>
                <NoMatchChatHistory
                    class="flex-shrink-0 flex-grow-0 w-full"
                    v-if="
                        searchStore.resultOfAllChatsHistorySearch &&
                        searchStore.resultOfAllChatsHistorySearch.length === 0
                    "
                />
            </div>
        </dialog-content-layout>
    </q-dialog>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useDebounceFn } from '@vueuse/core'
import { useSearchStore } from '@/store/user-search'
import { tResultOfChatHistorySearch } from '@/types/user-search'

import ChatHistory from '@/components/chat-history/index.vue'
import ChatsHistoryList from './ListSectionHistoryList.vue'
import NoMatchChatHistory from '@/components/chat-history/NoMatchChatHistory.vue'
import DialogContentLayout from '@/layouts/DialogContentLayout.vue'

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

defineEmits([...useDialogPluginComponent.emits])

const searchStore = useSearchStore()
const debouncedGetMatchedHistory = useDebounceFn((str: string) => {
    searchStore.resultOfAllChatsHistorySearch = searchStore.getMatchedChatsHistoryFromAll(str)
    searchStore.focusedChatHistory = ['', '']
}, 400)

watch(
    () => searchStore.searchValueOfAllChatsHistory,
    () => {
        debouncedGetMatchedHistory(searchStore.searchValueOfAllChatsHistory)
    }
)

function handleHide() {
    onDialogHide()
    searchStore.searchValueOfAllChatsHistory = ''
    searchStore.resultOfAllChatsHistorySearch = []
}

function handleClickChatHistoryItem(historyItem: tResultOfChatHistorySearch) {
    if (historyItem.type === 'single') {
        searchStore.focusChatHistoryInHistoryList(historyItem.id)
    } else {
        searchStore.focusChatHistoryInHistoryList(historyItem.id.groupId, historyItem.id.hostId)
    }
}
</script>
