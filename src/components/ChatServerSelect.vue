<template>
    <div
        class="bg-gray-1 h-18 flex transition-opacity duration-300"
        :class="[
            isMyselfInEnterprise ? 'cursor-auto' : switchingServer ? ' cursor-not-allowed' : 'cursor-pointer',
            { 'opacity-50': switchingServer },
        ]"
    >
        <NetworkItemVue
            v-if="server"
            name="接收TA消息的服务器"
            :url="server.address"
            :no-checkbox="true"
            :online="!!connectionStore.connections[urlRemovePrefix(server.address)]?.instance"
            :no-setting-btn="isMyselfInEnterprise"
        />

        <q-menu
            v-if="!isMyselfInEnterprise && !switchingServer"
            fit
            transition-show="jump-down"
            transition-hide="jump-up"
        >
            <q-list style="min-width: 100px">
                <div
                    v-for="backupServer in servers"
                    :key="backupServer.address"
                    @click="selectAnotherServer(backupServer)"
                    class="h-14 flex items-center hover:bg-gray-1 cursor-pointer"
                >
                    <div class="h-full flex items-center">
                        <i class="iconfont text-primary text-base mx-2.5">
                            {{ server?.id === backupServer.id ? '&#xe62a;' : '&#xe637;' }}
                        </i>
                    </div>
                    <div class="text-left">
                        <div class="flex items-center">
                            {{ backupServer.name }}
                            <div
                                :class="
                                    !!connectionStore.connections[urlRemovePrefix(backupServer.address)]?.instance
                                        ? 'bg-positive'
                                        : 'bg-negative'
                                "
                                class="ml-1.5 w-2 h-2 inline-block rounded-md"
                            ></div>
                        </div>
                        <div class="text-xs text-subtle">{{ backupServer.address }}</div>
                    </div>
                </div>
            </q-list>
        </q-menu>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useFriendStore } from '@/store/user-friend'
import { useChatServerStore } from '@/store/user-chat-server'
import NetworkItemVue from '@/components/NetworkItem.vue'
import { Server } from '@/types/user-chat-server'
import { useOaStore } from '@/store/user-oa'
import { urlRemovePrefix } from '@/utils/url-replace'
import { useConnectionStore } from '@/store/user-connection'
import { useProfileStore } from '@/store/user-profile'

const props = defineProps<{
    assignedServerIds: string[]
    targetAddress: string
}>()

const profileStore = useProfileStore()
const isMyselfInEnterprise = computed(() => !!profileStore.myProfile?.staffInfo)

const chatServerStore = useChatServerStore()
const { chatServers } = toRefs(chatServerStore)
const connectionStore = useConnectionStore()

const servers = computed(() => {
    const connctedServers: Server[] = []

    const oaStore = useOaStore()
    if (oaStore.enterprise?.imServer)
        connctedServers.push({ id: '0', name: '企业聊天服务器', address: oaStore.enterprise.imServer })

    chatServerStore.chatServers &&
        chatServerStore.chatServers.forEach((s) => {
            if (urlRemovePrefix(s.address) !== urlRemovePrefix(oaStore.enterprise?.imServer || ''))
                connctedServers.push(s)
        })
    return connctedServers
})

const server = computed(() => {
    // 若我的账户已加入企业, 别人向我发消息都只能往企业聊天服务器上发
    if (isMyselfInEnterprise.value)
        return {
            id: '0',
            name: '企业聊天服务器',
            address: profileStore.myProfile!.staffInfo?.imServer,
        } as Server

    if (!chatServers.value) return null

    if (props.assignedServerIds.length === 0) return servers.value[0]

    const index = servers.value.findIndex((s) => s.id === props.assignedServerIds[0])
    if (index === -1) {
        return servers.value[0]
    } else {
        return servers.value[index]
    }
})

// 将与该好友的聊天分配到其他服务器
const switchingServer = ref(false)
function selectAnotherServer(server: Server) {
    switchingServer.value = true
    const friendStore = useFriendStore()
    friendStore
        .switchServer(props.targetAddress, server.id)
        .then(() => {
            friendStore.friends![props.targetAddress].assignedServerIds = [server.id]
        })
        .catch((err) => console.log(err))
        .finally(() => (switchingServer.value = false))
}
</script>
