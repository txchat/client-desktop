<template>
    <SectionLayoutVue
        title="聊天记录"
        :search-value="searchStore.searchValueOfAll"
        :length="searchStore.resultOfChatsHistorySearch.length"
        :show-more="searchStore.showMoreChatsHistory"
        :set-show-more="handleSetShowMore"
    >
        <template #list="slotProp">
            <ChatsHistoryList :list="getShowingList(slotProp.showMore)" @click="openDialogOfAllChatsHistory" />
        </template>
    </SectionLayoutVue>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/user-search'
import { Dialog } from 'quasar'
import { tResultOfChatHistorySearch } from '@/types/user-search'

import HistoryDialogVue from './ListSectionHistoryDialog.vue'
import SectionLayoutVue from './layouts/SectionLayout.vue'
import ChatsHistoryList from './ListSectionHistoryList.vue'

const searchStore = useSearchStore()

function getShowingList(showMore: boolean) {
    if (showMore) return searchStore.resultOfChatsHistorySearch
    else {
        return searchStore.resultOfChatsHistorySearch.slice(0, 3)
    }
}

function openDialogOfAllChatsHistory(record?: tResultOfChatHistorySearch) {
    searchStore.resultOfAllChatsHistorySearch = searchStore.resultOfChatsHistorySearch
    searchStore.searchValueOfAllChatsHistory = searchStore.searchValueOfAll

    if (record) {
        if (record.type === 'single') {
            searchStore.focusChatHistoryInHistoryList(record.id)
        } else {
            searchStore.focusChatHistoryInHistoryList(record.id.groupId, record.id.hostId)
        }
    } else {
        searchStore.focusChatHistoryInHistoryList('', '')
    }

    Dialog.create({
        component: HistoryDialogVue,
        componentProps: {},
    })

    searchStore.clearSearch()
}

function handleSetShowMore(v: boolean) {
    if (v === false) {
        searchStore.showMoreChatsHistory = false
    } else {
        openDialogOfAllChatsHistory()
    }
}
</script>
