<template>
    <div class="h-full flex flex-col">
        <q-card class="text-primary bg-secondary p-3" flat>
            1. 需选择或添加一台服务器为默认区块链节点，用于上传和获取账户信息。 <br />
            2. 可前往[我的]-[服务器]页面切换。
        </q-card>

        <q-scroll-area class="mt-3 flex-grow">
            <p class="text-xs text-subtle mb-2">官方提供上传/获取账户信息的区块链节点</p>
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
                            :key="'custom-' + server.address + i"
                            :name="server.name"
                            :url="server.address"
                            :selected="server.selected"
                            :online="server.online"
                            :no-setting-btn="server.official"
                            @update-value="changeSelect"
                            @click-edit="$emit('edit-node', i)"
                        />
                    </div>
                </div>
            </div>

            <p v-if="customs.length" class="text-xs text-subtle my-2">自己添加的区块链节点</p>
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
                    @click-edit="$emit('edit-node', i)"
                />
            </div>
        </q-scroll-area>
    </div>
</template>

<script setup lang="ts">
import { useDisc } from '@/composables/startup'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import NetworkItemVue from '@/components/NetworkItem.vue'

defineEmits<{
    (e: 'edit-node', value: number): void
}>()

const { officials, customs, save } = useChainNodeUrlStore()
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
