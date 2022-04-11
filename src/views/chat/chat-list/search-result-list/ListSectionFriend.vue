<template>
    <SectionLayoutVue
        title="联系人"
        :search-value="searchStore.searchValueOfAll"
        :length="searchStore.resultOfFriendsSearch.length"
        :show-more="searchStore.showMoreFriends"
        :set-show-more="(v) => (searchStore.showMoreFriends = v)"
    >
        <template #list="slotProp">
            <ItemLayoutVue
                v-for="item in getShowingList(slotProp.showMore)"
                :key="item.address"
                :display-avatar="item.avatar"
                @click.stop="gotoChatWith(item)"
            >
                <template #mainTxt>
                    <Highlighter
                        highlightClassName="highlightMark"
                        :textToHighlight="getMainTxt(item)"
                        :searchWords="item.matchedStr.split('')"
                        :autoEscape="true"
                    />
                </template>
                <template
                    #subTxt
                    v-if="
                        typeof item.remark == 'string' &&
                        item.remark !== '' &&
                        typeof item.nickname === 'string' &&
                        item.nickname !== ''
                    "
                >
                    昵称:
                    <Highlighter
                        v-if="item.matchedKeyName === 'nickname'"
                        highlightClassName="highlightMark"
                        :textToHighlight="item.nickname"
                        :searchWords="item.matchedStr.split('')"
                        :autoEscape="true"
                    />
                    <span v-else>{{ item.nickname }}</span>
                </template>
            </ItemLayoutVue>
        </template>
    </SectionLayoutVue>
</template>
<script setup lang="ts">
import { useRouter } from '@/router'
import { useUserBlackListStore } from '@/store/user-black-list'
import { useChatStore } from '@/store/user-chat'
import { useSearchStore } from '@/store/user-search'
import { tResultOfFriendSearch } from '@/types/user-search'
import { useQuasar } from 'quasar'
import { toRefs } from 'vue'

import Highlighter from 'vue-highlight-words'
import ItemLayoutVue from './layouts/ItemLayout.vue'
import SectionLayoutVue from './layouts/SectionLayout.vue'

const searchStore = useSearchStore()
const quasar = useQuasar()

function getShowingList(showMore: boolean) {
    if (showMore) return searchStore.resultOfFriendsSearch
    else {
        return searchStore.resultOfFriendsSearch.slice(0, 3)
    }
}

function getMainTxt(result: tResultOfFriendSearch) {
    if (result.matchedKeyName === 'nickname') {
        if (result.remark) {
            return result.remark
        } else {
            return result.nickname
        }
    } else if (result.matchedKeyName === 'remark') {
        return result.remark
    } else {
        return result.address
    }
}

function gotoChatWith(result: tResultOfFriendSearch) {
    const blackListStore = useUserBlackListStore()
    const isFriendBlocked = blackListStore.blackList.findIndex((addr) => addr === result.address) !== -1
    if (isFriendBlocked) {
        quasar.notify('该联系人已被移入黑名单')
        return
    }
    const router = useRouter()
    const { route } = toRefs(router)
    route.value = 'chat'
    const chatStore = useChatStore()
    const chat = chatStore.moveTop('single', result.address, true)
    chatStore.focusChat(chat)
    searchStore.clearSearch()
}
</script>
<style></style>
