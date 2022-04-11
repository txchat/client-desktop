<template>
    <SectionLayoutVue
        title="群聊"
        :search-value="searchStore.searchValueOfAll"
        :length="searchStore.resultOfChatGroupsSearch.length"
        :show-more="searchStore.showMoreChatGroups"
        :set-show-more="(v: boolean) => (searchStore.showMoreChatGroups = v)"
    >
        <template #list="slotProp">
            <ItemLayoutVue
                v-for="item in getShowingList(slotProp.showMore)"
                :key="item.id"
                :display-avatar="item.avatar"
                @click="gotoChatWith(item)"
            >
                <template #mainTxt>
                    <Highlighter
                        highlightClassName="highlightMark"
                        :textToHighlight="getMainTxt(item)"
                        :searchWords="item.matchedStr.split('')"
                        :autoEscape="true"
                    />
                </template>
            </ItemLayoutVue>
        </template>
    </SectionLayoutVue>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from '@/router'
import { useChatStore } from '@/store/user-chat'
import { useSearchStore } from '@/store/user-search'
import { tResultOfChatGroupsSearch } from '@/types/user-search'

import Highlighter from 'vue-highlight-words'
import ItemLayoutVue from './layouts/ItemLayout.vue'
import SectionLayoutVue from './layouts/SectionLayout.vue'

const searchStore = useSearchStore()

function getShowingList(showMore: boolean) {
    if (showMore) return searchStore.resultOfChatGroupsSearch
    else {
        return searchStore.resultOfChatGroupsSearch.slice(0, 3)
    }
}

function getMainTxt(result: tResultOfChatGroupsSearch) {
    return result.name
}

function gotoChatWith(result: tResultOfChatGroupsSearch) {
    const router = useRouter()
    const { route } = toRefs(router)
    route.value = 'chat'

    const chatStore = useChatStore()
    const chat = chatStore.moveTop(
        'group',
        {
            hostId: result.host,
            groupId: result.id,
        },
        true
    )
    chatStore.focusChat(chat)
    searchStore.clearSearch()
}
</script>
