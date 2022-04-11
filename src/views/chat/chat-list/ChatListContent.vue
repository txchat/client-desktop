<template>
    <q-slide-transition>
        <div v-if="!everyServerConnected" class="h-10 leading-10 text-center text-negative bg-negative-light text-xs">
            <p v-if="anyServersFailed" @click="useRouter().route = 'settings'" class="cursor-pointer">
                服务器未连接，点击查看
            </p>
            <p v-else>正在连接服务器...</p>
        </div>
    </q-slide-transition>

    <div class="pl-5 py-2 space-x-1 flex">
        <base-btn-group :items="items" button-padding="5px 11px" @switch="tab = $event">
            <template #default="{ item }">
                <q-badge v-if="item.unreadLength" color="red" rounded floating>
                    {{ item.unreadLength }}
                </q-badge>
            </template>
        </base-btn-group>
    </div>

    <ChatListItemVue
        v-for="chat in chatList?.filter((c) => !blackList.some((addr) => addr === c.id))"
        v-show="tab === 'all' || chat.type === tab"
        :key="chat.type === 'single' ? chat.id : chat.id.hostId + '->' + chat.id.groupId"
        :chat="chat"
        :selected="focusedChat?.id === chat.id"
        @update:selected="focusChat(chat)"
        @update:pinned="chat.pinned = $event"
        @update:do-not-disturb="chat.doNotDisturb = $event"
    />
</template>

<script lang="ts" setup>
import { toRefs, ref, watch, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from '@/router'
import { useEventListener, useFavicon, useIntervalFn } from '@vueuse/core'
import { useConnectionStore } from '@/store/user-connection'
import { useUserBlackListStore } from '@/store/user-black-list'
import { useChatStore } from '@/store/user-chat'
import { useProfileStore } from '@/store/user-profile'
import { useChatGroupStore } from '@/store/user-chat-group'
import { emptyTitle, isTitleEmpty, setTitle } from '@/utils/title'
import { Chat } from '@/types/user-chat'
import { isEnv } from '@/utils/env'

import ChatListItemVue from './ChatListItem.vue'

// 连接
const connectionStore = useConnectionStore()
const { anyServersFailed, everyServerConnected } = storeToRefs(connectionStore)

// 消息
const chatStore = useChatStore()
const { chatList, focusedChat, totalUnreadLength, singleChatUnreadLength, groupChatUnreadLength } = toRefs(chatStore)

const items = reactive([
    { id: 'all', label: '全部', unreadLength: totalUnreadLength },
    { id: 'single', label: '私聊', unreadLength: singleChatUnreadLength },
    { id: 'group', label: '群聊', unreadLength: groupChatUnreadLength },
])

// 当有未读新消息时，网页标签上有红点提示和未读条数，且标签文字闪烁
const { pause, resume } = useIntervalFn(
    () => {
        if (isTitleEmpty()) setTitle(`(${totalUnreadLength.value}条)聊天`)
        else emptyTitle()
    },
    1000,
    { immediate: false }
)

useEventListener(window, 'focus', () => {
    if (isEnv.electron) return
    pause()
    setTitle('聊天')
    useFavicon(require('theme/icons/favicon.ico'))
})

watch(totalUnreadLength, (n, o) => {
    if (n > o && !document.hasFocus()) {
        if (isEnv.electron) {
            window.electron?.notification()
        } else {
            resume()
            setTitle(`(${totalUnreadLength.value}条)聊天`)
            useFavicon(require('theme/icons/favicon-unread.png'))
        }
    } else pause()

    window.electron?.setDockBadge(n ? n.toString() : '')
})

// 消息筛选
const tab = ref<string>('all')

// 黑名单
const { blackList } = toRefs(useUserBlackListStore())

// 切换聊天对象
async function focusChat(chat: Chat) {
    // @note 不要在这里调用 clearUnread, 而是在 MessageList 中

    chatStore.focusChat(chat)
    // 从区块链获取好友的最新资料
    if (chat.type === 'single') useProfileStore().get(chat.id)
    else useChatGroupStore().getChatGroup(chat.id.hostId, chat.id.groupId)
}
</script>
