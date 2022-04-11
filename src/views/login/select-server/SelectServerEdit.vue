<template>
    <div class="server-edit-container bg-white absolute inset-y-0 right-0 flex flex-col">
        <!-- nav bar -->
        <div class="flex justify-between items-center flex-nowrap h-12 mb-8">
            <q-avatar class="w-15">
                <base-btn color="dark" icon="arrow_back_ios_new" @click="$emit('dismiss')" size="12px" round flat />
            </q-avatar>
            <div class="font-bold text-base">{{ props.method === 'add' ? '添加服务器' : '编辑服务器' }}</div>
            <base-btn v-if="props.method === 'edit'" @click="deleteItem" color="negative" flat>删除</base-btn>
            <span v-else class="w-15"></span>
        </div>

        <!-- inputs -->
        <div class="mt-2 space-y-4">
            <div class="bg-gray-1 px-5 pt-1.5 rounded-md">
                <div class="text-xs text-subtle">
                    <span>服务器名称</span>
                    <span class="float-right">{{ editing.name.length }}/15</span>
                </div>
                <q-input
                    v-model="editing.name"
                    placeholder="请输入服务器名称"
                    borderless
                    class="pt-3 pb-1"
                    maxlength="15"
                    input-class="placeholder-gray-500"
                    dense
                />
            </div>

            <div class="bg-gray-1 px-5 pt-1.5 rounded-md">
                <div class="text-xs text-subtle">服务器地址</div>
                <q-input
                    v-model="editing.address"
                    placeholder="请输入服务器地址"
                    borderless
                    class="pt-3 pb-1"
                    input-class="placeholder-gray-500"
                    dense
                />
            </div>
        </div>

        <!-- add button -->
        <base-btn
            @click="commitEditing"
            :disable="!(editing.name.length && editing.address.length)"
            class="mt-4"
            rounded
        >
            {{ props.method === 'add' ? '添加' : '修改' }}
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import { useInitialChatServerUrlStore } from '@/urls/initial-chat-server'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import { useEditingNetworkItemStore } from '@/urls/editing-network-item'
import { urlRemovePrefix } from '@/utils/url-replace'

const props = defineProps<{
    method: 'add' | 'edit'
    target: 0 | 1
    index?: number
}>()

const emit = defineEmits(['dismiss'])

const editingNetworkItemStore = useEditingNetworkItemStore()
const { editing } = storeToRefs(editingNetworkItemStore)

const initialChatServerUrlStore = useInitialChatServerUrlStore()
const {
    customs: customInitialServers,
    officials: officialInitialServers,
    servers,
} = storeToRefs(initialChatServerUrlStore)

const chainNodeUrlStore = useChainNodeUrlStore()
const { customs: customNodes, officials: officialNodes, nodes } = storeToRefs(chainNodeUrlStore)

function commitEditing() {
    if (duplicatedNetwork()) return

    if (props.method === 'add') {
        const newNetworkItem = {
            ...editing.value,
            isOfficial: false,
            online: false,
            selected: false,
        }
        if (props.target === 0) {
            customInitialServers.value.push(newNetworkItem)
            initialChatServerUrlStore.save()
        } else {
            customNodes.value.push(newNetworkItem)
            chainNodeUrlStore.save()
        }
    } else {
        if (props.target === 0) {
            if (props.index === undefined) throw new Error('修改聊天服务器错误：未指定服务器 index')
            customInitialServers.value[props.index].name = editing.value.name
            customInitialServers.value[props.index].address = editing.value.address
            initialChatServerUrlStore.save()
        } else {
            if (props.index === undefined) throw new Error('修改区块链节点错误：未指定服务器 index')
            customNodes.value[props.index].name = editing.value.name
            customNodes.value[props.index].address = editing.value.address
            chainNodeUrlStore.save()
        }
    }

    emit('dismiss')
}

function duplicatedNetwork(): boolean {
    if (props.method === 'add') {
        if (props.target === 0) {
            const index = servers.value.findIndex(
                (s) => urlRemovePrefix(s.address) === urlRemovePrefix(editing.value.address)
            )
            if (index !== -1) {
                Notify.create('该服务器地址已存在')
                return true
            }
        } else {
            const index = nodes.value.findIndex(
                (n) => urlRemovePrefix(n.address) === urlRemovePrefix(editing.value.address)
            )
            if (index !== -1) {
                Notify.create('该区块链节点地址已存在')
                return true
            }
        }
    } else {
        if (props.index === undefined) throw new Error('编辑服务器错误：检查时发现未指定服务器 index')
        if (props.target === 0) {
            const serversWithSameAddress = servers.value.filter(
                (s) => urlRemovePrefix(s.address) === urlRemovePrefix(editing.value.address)
            )

            if (serversWithSameAddress.length === 1) {
                const index = customInitialServers.value.findIndex(
                    (s) => urlRemovePrefix(s.address) === urlRemovePrefix(editing.value.address)
                )
                if (index !== props.index) {
                    Notify.create('检测到重复的聊天服务器地址')
                    return true
                }
            }
        } else {
            const nodesWithSameAddress = nodes.value.filter(
                (n) => urlRemovePrefix(n.address) === urlRemovePrefix(editing.value.address)
            )
            if (nodesWithSameAddress.length === 1) {
                const index = customNodes.value.findIndex(
                    (n) => urlRemovePrefix(n.address) === urlRemovePrefix(editing.value.address)
                )
                if (index !== props.index) {
                    Notify.create('该区块链节点地址已存在')
                    return true
                }
            }
        }
    }

    return false
}

function deleteItem() {
    if (props.target === 0) {
        // 若要删除的服务器为已选中的服务器，则由官方服务器代替被选中
        const targetItem = customInitialServers.value[props.index as number]
        targetItem.selected &&
            officialInitialServers.value.length > 0 &&
            (officialInitialServers.value[0].selected = true)
        customInitialServers.value.splice(props.index as number, 1)
        initialChatServerUrlStore.save()
    } else {
        const targetItem = customNodes.value[props.index as number]
        targetItem.selected && officialNodes.value.length > 0 && (officialNodes.value[0].selected = true)
        customNodes.value.splice(props.index as number, 1)
        chainNodeUrlStore.save()
    }

    emit('dismiss')
}

onBeforeUnmount(() => editingNetworkItemStore.$reset())
</script>

<style scoped lang="scss">
.server-edit-container {
    width: 400px;
    padding: 30px;
}
</style>
