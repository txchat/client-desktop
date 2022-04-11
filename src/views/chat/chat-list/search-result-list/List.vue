<template>
    <div>
        <SectionFriendVue />
        <SectionGroupVue />
        <SectionHistory />
        <div v-if="noResults" class="text-center text-sm text-subtle">没有匹配的搜索结果</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSearchStore } from '@/store/user-search'
import SectionFriendVue from './ListSectionFriend.vue'
import SectionGroupVue from './ListSectionGroup.vue'
import SectionHistory from './ListSectionHistory.vue'

const searchStore = useSearchStore()
const noResults = computed(
    () =>
        searchStore.resultOfChatsHistorySearch.length === 0 &&
        searchStore.resultOfFriendsSearch.length === 0 &&
        searchStore.resultOfChatGroupsSearch.length === 0
)
</script>

<style>
.highlightMark {
    color: #32b2f7;
    background-color: unset !important;
}
</style>
