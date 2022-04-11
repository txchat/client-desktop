import { ref, Ref } from 'vue'
import { discApi } from '@/api/disc'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import { useInitialChatServerUrlStore } from '@/urls/initial-chat-server'

interface UsableDiscover {
    /** 查找官方提供的聊天服务器和区块链节点 */
    disc: () => Promise<void>
    /** 正在查找 */
    loading: Ref<boolean>
    /** 查找出错 */
    error: Ref<null | string | Error>
}

export function useDisc(): UsableDiscover {
    const initialChatServerUrlStore = useInitialChatServerUrlStore()
    const chainNodeUrlStore = useChainNodeUrlStore()

    const loading = ref(false)
    const error = ref<null | string | Error>(null)

    async function disc() {
        loading.value = true
        const discResult = await discApi.disc()
        loading.value = false

        if (discResult.status !== 200) {
            error.value = discResult.statusText
            return Promise.reject(discResult.statusText)
        }

        if (discResult.data.result !== 0) {
            error.value = discResult.data.message
            return Promise.reject(discResult.data.message)
        }

        initialChatServerUrlStore.officials = discResult.data.data.servers
        initialChatServerUrlStore.officials.forEach((s) => (s.official = true))
        if (!initialChatServerUrlStore.servers.some((s) => s.selected)) {
            initialChatServerUrlStore.officials[0].selected = true
        }
        initialChatServerUrlStore.ping()

        chainNodeUrlStore.officials = discResult.data.data.nodes
        chainNodeUrlStore.officials.forEach((c) => (c.official = true))
        if (!chainNodeUrlStore.nodes.some((n) => n.selected)) {
            chainNodeUrlStore.officials[0].selected = true
            chainNodeUrlStore.save() // 更新选中的节点缓存
        }
        chainNodeUrlStore.ping()
    }

    return {
        disc,
        loading,
        error,
    }
}
