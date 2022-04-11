<template>
    <div class="h-full flex flex-col">
        <q-card class="text-primary bg-secondary p-3" flat>
            1. 新用户需选择或添加一台服务器为默认服务器，用于接收好友聊天消息；<br />
            2. 若为已注册账户，原默认服务器不变，可前往[我的]-[服务器]页面切换。
        </q-card>

        <q-scroll-area class="mt-3 flex-grow">
            <p class="text-xs text-subtle mb-2">官方提供接收聊天消息的服务器</p>
            <div class="space-y-2">
                <div v-if="error" class="py-2 space-x-2 flex justify-center items-center">
                    <span> 加载官方服务出错</span>
                    <base-btn @click="disc" dense flat>重新加载</base-btn>
                </div>
                <div v-else>
                    <div v-if="loading" class="py-2 text-center">正在加载...</div>
                    <div v-else>
                        <NetworkItemVue
                            v-for="(server, i) in officials"
                            :key="'official-' + server.address + i"
                            :name="server.name"
                            :url="server.address"
                            :selected="server.selected"
                            :online="server.online"
                            :no-setting-btn="server.official"
                            @update-value="changeSelect"
                        />
                    </div>
                </div>
            </div>

            <p v-if="customs.length" class="text-xs text-subtle my-2">自己添加的服务器</p>
            <div class="space-y-2">
                <NetworkItemVue
                    v-for="(server, i) in customs"
                    :key="'custom-' + server.address + i"
                    :name="server.name"
                    :url="server.address"
                    :selected="server.selected"
                    :online="server.online"
                    :no-setting-btn="server.official"
                    @update-value="changeSelect"
                    @click-edit="$emit('edit-server', i)"
                />
            </div>
        </q-scroll-area>
    </div>
</template>

<script setup lang="ts">
import { useDisc } from '@/composables/startup'
import { useInitialChatServerUrlStore } from '@/urls/initial-chat-server'
import NetworkItemVue from '@/components/NetworkItem.vue'

defineEmits<{
    (e: 'edit-server', value: number): void
}>()
const { officials, customs, save } = useInitialChatServerUrlStore()
const { disc, loading, error } = useDisc()

function changeSelect(address: string) {
    officials.forEach((s) => (s.selected = false))
    customs.forEach((s) => (s.selected = false))

    const selected = officials.find((s) => s.address === address) || customs.find((s) => s.address === address)

    if (!selected) return
    selected.selected = true
    save()
}
</script>
