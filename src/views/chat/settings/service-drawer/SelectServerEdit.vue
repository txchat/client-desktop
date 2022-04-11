<template>
    <div class="server-edit-container bg-white absolute inset-y-0 right-0 flex flex-col">
        <!-- nav bar -->
        <div class="flex justify-between items-center flex-nowrap h-12 mb-8">
            <q-avatar class="w-15">
                <base-btn color="dark" icon="arrow_back_ios_new" @click="$emit('dismiss')" size="12px" round flat />
            </q-avatar>
            <div class="font-bold text-base">{{ props.method === 'add' ? '添加服务器' : '编辑服务器' }}</div>
            <base-btn
                v-if="props.method === 'edit'"
                @click="deleteItem"
                :disable="loading || (target === 0 && chatServerStore.chatServers?.length === 1)"
                color="negative"
                flat
            >
                删除
            </base-btn>
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
            :loading="loading"
            class="mt-4"
        >
            {{ props.method === 'add' ? '添加' : '修改' }}
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, toRefs } from 'vue'
import { Notify } from 'quasar'
import { storeToRefs } from 'pinia'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import { useEditingNetworkItemStore } from '@/urls/editing-network-item'
import { urlRemovePrefix } from '@/utils/url-replace'
import { useChatServerStore } from '@/store/user-chat-server'
import { useConnectionStore } from '@/store/user-connection'
import { useOaStore } from '@/store/user-oa'

const props = defineProps<{
    method: 'add' | 'edit'
    target: 0 | 1
    index?: number
}>()

const emit = defineEmits(['dismiss'])

const chatServerStore = useChatServerStore()
const connectionStore = useConnectionStore()
const { chatServers } = toRefs(chatServerStore)

const loading = ref(false)

const editingNetworkItemStore = useEditingNetworkItemStore()
const { editing } = storeToRefs(editingNetworkItemStore)

const chainNodeUrlStore = useChainNodeUrlStore()
const { customs: customNodes, officials: officialNodes, nodes } = storeToRefs(chainNodeUrlStore)

function commitEditing() {
    if (duplicatedNetwork()) return

    // 编辑区块链节点
    if (props.target === 1) {
        if (props.method === 'add') {
            const newNode = {
                ...editing.value,
                isOfficial: false,
                online: false,
                selected: false,
            }
            customNodes.value.push(newNode)
        } else {
            if (props.index === undefined) throw new Error('编辑区块链节点错误：未指定服务器 index')
            customNodes.value[props.index].name = editing.value.name
            customNodes.value[props.index].address = editing.value.address
        }
        chainNodeUrlStore.save()
        emit('dismiss')
    }

    // 编辑聊天服务器
    else {
        loading.value = true
        if (props.method === 'add') {
            // 添加聊天服务器
            chatServerStore.addChatServer(editing.value.name, editing.value.address).then(() => {
                chatServerStore.chatServers!.push({
                    id: (chatServerStore.chatServers!.length + 1).toString(),
                    name: editing.value.name,
                    address: editing.value.address,
                })
                connectionStore.connect(editing.value.address)
                Notify.create('添加聊天服务器成功，请耐心等待，稍后查看结果...')
                emit('dismiss')
            })
        } else {
            // 修改聊天服务器
            const targetServer = chatServers.value![props.index!]

            chatServerStore.editChatServer(targetServer.id, editing.value.name, editing.value.address).then(() => {
                // 特殊情况判断: 如果修改前的 address 正好是所在企业的聊天服务器, 则不断开连接
                if (useOaStore().enterprise?.imServer !== targetServer.address) {
                    connectionStore.disconnect(targetServer.address)
                }
                chatServers.value!.splice(props.index!, 1, {
                    id: targetServer.id,
                    name: editing.value.name,
                    address: editing.value.address,
                })
                connectionStore.connect(editing.value.address)
                Notify.create('修改聊天服务器成功，请耐心等待，稍后查看结果...')
                emit('dismiss')
            })
        }
    }
}

function duplicatedNetwork(): boolean {
    if (props.method === 'add') {
        if (props.target === 0) {
            const index = chatServerStore.chatServers?.findIndex(
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
            const serversWithSameAddress = chatServerStore.chatServers?.filter(
                (s) => urlRemovePrefix(s.address) === urlRemovePrefix(editing.value.address)
            )
            if (serversWithSameAddress && serversWithSameAddress.length === 1) {
                const index = chatServerStore.chatServers?.findIndex(
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
                console.log(index)
                console.log(props.index)

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
    if (props.target === 1) {
        // 删区块链节点
        const targetItem = customNodes.value[props.index as number]
        targetItem.selected && officialNodes.value.length > 0 && (officialNodes.value[0].selected = true)
        customNodes.value.splice(props.index as number, 1)
        chainNodeUrlStore.save()
        emit('dismiss')
    } else {
        // 删聊天服务器
        loading.value = true
        const targetServer = chatServers.value![props.index!]
        chatServerStore.deleteServerGroup(targetServer.id).then(() => {
            connectionStore.disconnect(targetServer.address)
            Notify.create('删除聊天服务器成功，请耐心等待，稍后查看结果...')
            emit('dismiss')
        })
    }
}

onBeforeUnmount(() => editingNetworkItemStore.$reset())
</script>

<style scoped lang="scss">
.server-edit-container {
    width: 400px;
    padding: 30px;
}
</style>
