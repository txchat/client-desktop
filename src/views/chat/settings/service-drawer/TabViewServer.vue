<template>
    <div class="h-full flex flex-col">
        <q-scroll-area class="mt-3 flex-grow">
            <p class="text-xs text-subtle mb-2">接收聊天消息的服务器</p>
            <div class="space-y-2">
                <div>
                    <div v-if="!chatServers" class="py-2 text-center">正在加载...</div>
                    <div v-else>
                        <NetworkItemVue
                            v-for="(server, i) in chatServers"
                            :key="server.address"
                            :url="server.address"
                            :name="server.name"
                            :no-checkbox="true"
                            :online="!!connectionStore.connections[urlRemovePrefix(server.address)]?.instance"
                            @click-edit="$emit('edit-server', i)"
                            class="mb-2"
                        />
                    </div>
                </div>
            </div>
        </q-scroll-area>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { urlRemovePrefix } from '@/utils/url-replace'
import { useConnectionStore } from '@/store/user-connection'
import { useChatServerStore } from '@/store/user-chat-server'
import NetworkItemVue from '@/components/NetworkItem.vue'

defineEmits(['edit-server'])

const chatServerStore = useChatServerStore()
const connectionStore = useConnectionStore()
const { chatServers } = toRefs(chatServerStore)
</script>
