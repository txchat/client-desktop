import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { useTimeout } from '@vueuse/core'
import { blockChainApi } from '@/api/chain-base'
import { useAccountStore } from './user-account'
import { Server } from '@/types/user-chat-server'
import { Account } from '@/types/user-account'

export const useChatServerStore = defineStore({
    id: 'user: chat server',

    state() {
        return {
            chatServers: null as Server[] | null,
            gettingServerError: null as Error | null,
        }
    },

    actions: {
        async get() {
            try {
                fetchTimes = 0
                this.gettingServerError = null
                this.chatServers = await getChatServersPoller()
                return this.chatServers
            } catch (error) {
                console.error(error)
                this.gettingServerError = error instanceof Error ? error : new Error('获取服务器失败')
                return Promise.reject(error)
            }
        },

        /**
         * 涉及区块链交易的方法
         */

        /** 添加聊天服务器 */
        addChatServer(name: string, value: string) {
            const accountStore = useAccountStore()
            if (!accountStore.account) throw new Error('无法添加聊天服务器：用户未登录')
            const { publicKeyHex: pubkey, privateKeyHex: privkey } = accountStore.account as Account
            return blockChainApi.updateChatServer({ name, value, pubkey, privkey }, 1)
        },

        /** 编辑聊天服务器 */
        editChatServer(id: string, name: string, value: string) {
            const accountStore = useAccountStore()
            if (!accountStore.account) throw new Error('无法添加聊天服务器：用户未登录')
            const { publicKeyHex: pubkey, privateKeyHex: privkey } = accountStore.account as Account
            return blockChainApi.updateChatServer({ name, value, pubkey, privkey, id }, 3)
        },

        /** 删除聊天服务器 */
        deleteServerGroup(id: string): Promise<void> {
            const accountStore = useAccountStore()
            return new Promise((resolve, reject) => {
                if (!accountStore.account) throw new Error('无法添加聊天服务器：用户未登录')
                const { publicKeyHex: pubkey, privateKeyHex: privkey } = accountStore.account as Account
                blockChainApi
                    .updateChatServer({ pubkey, privkey, id }, 2)
                    .then(() => {
                        this.chatServers?.splice(
                            this.chatServers.findIndex((s) => s.id === id),
                            1
                        )
                        resolve()
                    })
                    .catch((res) => {
                        reject(res)
                    })
            })
        },
    },
})

/**
 * 获取我的全部服务器分组
 * @param searcher 发送请求的主体
 * @returns 服务器分组信息
 */
export async function getFromChain(searcher?: Account): Promise<Server[]> {
    const account = searcher || useAccountStore().account
    if (!account) throw new Error('getFromChainError: 未指定用户且未登录')

    try {
        const _servers = [] as Server[]
        const { address, publicKeyHex: publicKey, privateKeyHex: privateKey } = account
        const chainServers = await blockChainApi.getChatServers(address, { publicKey, privateKey })
        chainServers.forEach((g) => _servers.push({ id: g.id, name: g.name, address: g.value }))

        return _servers
    } catch (error) {
        Notify.create(error instanceof Error ? error.message : (error as string))
        return Promise.reject(error)
    }
}

let fetchTimes: number

/** 轮询聊天服务器 */
async function getChatServersPoller(): Promise<Server[]> {
    const account = useAccountStore().account
    if (!account) throw new Error('getChatServersError: 未登录')
    fetchTimes++
    if (fetchTimes > 15) return Promise.reject('无法查询到聊天服务器: 轮询次数过多')
    const result = await getFromChain(account)
    if (!result.length) {
        await useTimeout(1000)
        return getChatServersPoller()
    } else {
        return result
    }
}
