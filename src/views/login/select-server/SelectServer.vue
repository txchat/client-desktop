<template>
    <div class="select-server-container bg-white p-7 absolute inset-y-0 right-0 flex flex-col">
        <!-- tab switch buttons -->
        <div class="text-center mt-7 mb-5 space-x-3">
            <base-btn-group
                :items="[
                    { id: 'chatServer', label: '聊天服务' },
                    { id: 'chainNode', label: '区块链节点' },
                ]"
                @switch="tab = ($event as Tab)"
            >
            </base-btn-group>
        </div>

        <q-carousel
            v-model="tab"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            keep-alive
            class="flex-grow mb-3"
        >
            <q-carousel-slide name="chatServer">
                <TabViewServer @edit-server="(i) => showEdit('edit', 'chatServer', i)" />
            </q-carousel-slide>
            <q-carousel-slide name="chainNode">
                <TabViewNode @edit-node="(i) => showEdit('edit', 'chainNode', i)" />
            </q-carousel-slide>
        </q-carousel>

        <!-- `add server / node` buttons -->
        <div class="space-x-4 mx-auto">
            <base-btn @click="showEdit('add', 'chatServer')">添加聊天服务器 </base-btn>
            <base-btn @click="showEdit('add', 'chainNode')"> 添加区块链节点</base-btn>
        </div>

        <transition name="slide">
            <ServerEditVue
                v-if="show"
                :method="editingMethod"
                :target="editingTarget === 'chatServer' ? 0 : 1"
                :index="editingIndex"
                @dismiss="show = false"
            />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEditingNetworkItemStore } from '@/urls/editing-network-item'
import { useInitialChatServerUrlStore } from '@/urls/initial-chat-server'
import { useChainNodeUrlStore } from '@/urls/chain-node'

import TabViewServer from './TabViewServer.vue'
import TabViewNode from './TabViewNode.vue'
import ServerEditVue from './SelectServerEdit.vue'

const editingNetworkItemStore = useEditingNetworkItemStore()
const { editing } = storeToRefs(editingNetworkItemStore)

const initialChatServerUrlStore = useInitialChatServerUrlStore()
const { customs: customInitialServers } = storeToRefs(initialChatServerUrlStore)

const chainNodeUrlStore = useChainNodeUrlStore()
const { customs: customNodes } = storeToRefs(chainNodeUrlStore)

/** 0: InitialChatServer; 1: ChainNode */
type Tab = 'chatServer' | 'chainNode'
type EditingMethod = 'add' | 'edit'

// props of `ServerEditVue`
const tab = ref<Tab>('chatServer')
const show = ref(false)
const editingTarget = ref<Tab>('chatServer')
const editingMethod = ref<EditingMethod>('add')
const editingIndex = ref<undefined | number>(undefined)

function showEdit(method: EditingMethod, target: Tab, index?: number) {
    show.value = true
    editingMethod.value = method
    editingTarget.value = target

    if (method === 'edit') {
        editingIndex.value = index as number
    }

    if (method === 'edit' && target === 'chatServer') {
        editing.value.name = customInitialServers.value[index as number].name
        editing.value.address = customInitialServers.value[index as number].address
    } else if (method === 'edit' && target === 'chainNode') {
        editing.value.name = customNodes.value[index as number].name
        editing.value.address = customNodes.value[index as number].address
    }
}
</script>

<style scoped lang="scss">
.select-server-container {
    width: 400px;
    box-shadow: 0px 0px 14px 0px rgba(36, 55, 78, 0.1);
}
</style>
