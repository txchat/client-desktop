<template>
    <div id="chat" class="h-full w-full flex">
        <div class="w-64 h-full bg-gray-2 flex flex-col">
            <SearchBarVue />

            <q-scroll-area class="w-full flex-grow">
                <keep-alive>
                    <component
                        :is="searchStore.searchValueOfAll.trim() === '' ? ChatListVue : SearchResultVue"
                    ></component>
                </keep-alive>
            </q-scroll-area>
        </div>

        <div v-if="!chatList || chatList.length === 0" class="flex flex-col flex-grow justify-center items-center">
            <q-img :src="require('@/assets/images/chat-list-null.svg')" height="200px" fit="contain" no-spinner />
            <p class="mt-5 mb-7 text-xs text-subtle">暂无好友消息</p>
            <base-btn @click="useRouter().route = 'friend'" outline padding="6px 36px">开启聊天</base-btn>
        </div>

        <div v-else-if="!focusedChat" class="flex justify-center items-center flex-grow">
            <q-img :src="require('theme/icons/logo-plain-text.svg')" height="55px" fit="contain" no-spinner />
        </div>

        <ChatDetailVue v-else :chat="focusedChat" class="flex-grow" />
    </div>
</template>

<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
import { invoke } from '@vueuse/core'
import { useRouter } from '@/router'
import { useChatStore } from '@/store/user-chat'
import { useReceiveMessage } from './useReceiveMessage'
import { useConnectionStore } from '@/store/user-connection'
import { useChatServerStore } from '@/store/user-chat-server'
import { useSearchStore } from '@/store/user-search'
import { fromQr, getJoinedGroup } from '@/utils/from-qr'
import { useServer } from '@/composables/user/useServer'

import SearchBarVue from '../search/SearchBar.vue'
import ChatDetailVue from './chat-detail/Container.vue'
import ChatListVue from './ChatListContent.vue'
import SearchResultVue from './search-result-list/List.vue'

const searchStore = useSearchStore()
const chatStore = useChatStore()
const chatServerStore = useChatServerStore()
const connectionStore = useConnectionStore()
const { establish } = useServer()

const { chatList, focusedChat } = toRefs(chatStore)

invoke(async () => {
    // 载入本地缓存的聊天记录
    await chatStore.load()
    // 获取聊天服务器列表
    const servers = await chatServerStore.get()
    // 从所有聊天服务器同步离线消息, 然后建立连接
    servers.forEach(async (s) => establish(s.address))

    if (fromQr()) {
        const group = getJoinedGroup()
        if (!group) return
        chatStore.focusChat(chatStore.moveTop('group', { hostId: group.hostId, groupId: group.gid }, true))
    }
})

// 监听聊天服务器的连接变化
watchEffect(() => {
    Object.values(connectionStore.connections).forEach((c) => {
        if (!c?.instance) return
        const address = c.instance.origin
        const { receiveMessage } = useReceiveMessage(c.instance.host)
        c.instance.onReceiveMessage = receiveMessage
        c.instance.onLoseConnection = () => {
            delete c.instance
            c.status = 'failed'
            c.error = new Error('连接被断开, 正在尝试重连')
            connectionStore.connect(address)
        }
    })
})
</script>
