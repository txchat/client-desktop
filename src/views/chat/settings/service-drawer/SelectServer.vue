<template>
    <div class="select-server-container drawer">
        <!-- tab switch buttons -->
        <div class="text-center mt-7 mb-5">
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
import { ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatServerStore } from '@/store/user-chat-server'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import { useEditingNetworkItemStore } from '@/urls/editing-network-item'

import TabViewServer from './TabViewServer.vue'
import TabViewNode from './TabViewNode.vue'
import ServerEditVue from './SelectServerEdit.vue'

const props = defineProps<{
    showNodePage?: boolean
}>()

const chatServerStore = useChatServerStore()
const { chatServers } = toRefs(chatServerStore)

const { customs } = storeToRefs(useChainNodeUrlStore())
const { editing } = storeToRefs(useEditingNetworkItemStore())

type Tab = 'chatServer' | 'chainNode'
type EditingMethod = 'add' | 'edit'

// props of `ServerEditVue`
const tab = ref<Tab>(props.showNodePage ? 'chainNode' : 'chatServer')
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
        if (!chatServers.value) throw new Error('无法编辑服务器：服务器列表为空')
        editing.value.name = chatServers.value[index as number].name
        editing.value.address = chatServers.value[index as number].address
    } else if (method === 'edit' && target === 'chainNode') {
        editing.value.name = customs.value[index as number].name
        editing.value.address = customs.value[index as number].address
    }
}
</script>

<style scoped lang="scss">
.select-server-container {
    width: 400px;
}
</style>
