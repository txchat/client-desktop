<template>
    <q-dialog ref="dialogRef" @hide="handleHide" class="queryChatHistoryWithSomeOne">
        <q-card class="q-dialog-plugin overflow-hidden queryChatHistoryWithSomeOne-card">
            <q-card-section>
                <div class="flex items-center relative h-20">
                    <q-avatar size="44px" class="ml-7" rounded>
                        <q-img :src="displayAvatar" fit="contain" no-spinner no-transition />
                    </q-avatar>
                    <div class="font-bold text-base break-all ml-2.5">{{ displayName }}</div>
                    <i
                        @click="onDialogCancel"
                        class="iconfont p-2 font-normal text-black text-sm pt-1 pr-2 cursor-pointer absolute right-7 top-1/2 transform -translate-y-1/2"
                    >
                        &#xe626;
                    </i>
                </div>
                <BaseSearchInput class="w-3/4 mx-auto" v-model="searchStore.searchValueOfOneChatHistory" />
                <ChatHistory
                    :resultOfChatsHistorySearch="searchStore.resultOfOneChatHistorySearch"
                    mode="one"
                    @dismiss="onDialogOK"
            /></q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useDebounceFn } from '@vueuse/core'
import { useSearchStore } from '@/store/user-search'
import { Chat } from '@/types/user-chat'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useGroupProfile } from '@/composables/user/useGroupProfile'
import ChatHistory from '@/components/chat-history/index.vue'

const props = defineProps<{ chat: Chat }>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const { displayName, displayAvatar } =
    props.chat.type === 'single' ? useUserProfile(props.chat.id) : useGroupProfile(props.chat.id)

const searchStore = useSearchStore()
const debouncedGetMatchedChatHistoryFromOneChat = useDebounceFn((str: string, chat: Chat) => {
    searchStore.resultOfOneChatHistorySearch = searchStore.getMatchedChatHistoryFromOneChat(str, chat)
}, 400)

watch(
    () => searchStore.searchValueOfOneChatHistory,
    () => {
        debouncedGetMatchedChatHistoryFromOneChat(searchStore.searchValueOfOneChatHistory, props.chat)
    }
)

function handleHide() {
    onDialogHide()
    searchStore.searchValueOfOneChatHistory = ''
    searchStore.resultOfOneChatHistorySearch = undefined
}
</script>

<style lang="scss" scoped>
.queryChatHistoryWithSomeOne {
    .q-dialog__inner--minimized > div {
        max-width: 500px;
    }
    .queryChatHistoryWithSomeOne-card {
        width: 500px;
    }
}
</style>
