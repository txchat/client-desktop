<template>
    <div class="chat-list-search-container pl-4 pr-2.5 py-4 flex flex-nowrap items-center">
        <BaseSearchInput v-model="searchStore.searchValueOfAll" />
        <base-btn @click="openAddFriendDialog" flat dense round class="mx-1" color="subtle">
            <i class="iconfont text-subtle text-2xl">&#xe622;</i>
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { debouncedWatch, useEventListener } from '@vueuse/core'
import { useSearchStore } from '@/store/user-search'
import AddFriendDialogVue from './AddFriendDialog.vue'

const input = ref<HTMLInputElement | null>(null)

const searchStore = useSearchStore()
const quasar = useQuasar()

debouncedWatch(
    () => searchStore.searchValueOfAll,
    (str) => {
        if (str === '') {
            searchStore.clearSearch()
            return
        }

        searchStore.resultOfFriendsSearch = searchStore.getMatchedFriends(str)
        searchStore.resultOfChatGroupsSearch = searchStore.getMatchedChatGroups(str)
        searchStore.resultOfChatsHistorySearch = searchStore.getMatchedChatsHistoryFromAll(str)
    },
    { debounce: 400 }
)

useEventListener(window, 'click', (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const chat = document.querySelector('#chat')

    if (!(chat && chat.contains(target))) {
        searchStore.searchValueOfAll = ''
    }
})

useEventListener(window, 'keyup', function (e: KeyboardEvent) {
    if (e.code === 'Escape') {
        searchStore.searchValueOfAll = ''
        input.value?.blur()
    } else if (e.code === 'Slash') {
        if (document.activeElement !== document.getElementById('editingArea')) input.value?.focus()
    }
})

function openAddFriendDialog() {
    quasar.dialog({ component: AddFriendDialogVue }).onOk(() => quasar.notify('添加好友成功'))
}
</script>
