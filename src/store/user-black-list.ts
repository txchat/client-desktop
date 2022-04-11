import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { blockChainApi } from '@/api/chain-base'
import { useAccountStore } from '@/store/user-account'
import { MiscTableKeys } from './misc-table-key'

export const useUserBlackListStore = defineStore({
    id: 'user: black list',

    state() {
        return {
            blackList: [] as string[],
        }
    },

    actions: {
        /** 从本地数据库拿黑名单列表 */
        load(): Promise<string[]> {
            return new Promise((resolve) => {
                const accountStore = useAccountStore()
                if (!accountStore.accountDB) throw new Error('初始化好友列表失败，accountDB 须先被初始化')

                accountStore.accountDB?.misc.getItem<string[]>(MiscTableKeys.BlackList).then((list) => {
                    if (list) this.blackList = list
                    resolve(list || [])
                })
            })
        },

        /** 从区块链上拿黑名单列表 */
        get(): Promise<string[]> {
            return new Promise((resolve, reject) => {
                const accountStore = useAccountStore()
                if (!accountStore.account) throw new Error('无法调用 getFriends: accountStore 中不存在账户信息')
                const { address, publicKeyHex: publicKey, privateKeyHex: privateKey } = accountStore.account
                blockChainApi
                    .getBlackList(address, { publicKey, privateKey })
                    .then((res) => {
                        this.blackList = res
                        this.save()
                        resolve(res)
                    })
                    .catch((err) => {
                        console.error(err)
                        reject(err)
                    })
            })
        },

        save() {
            const { account, accountDB } = useAccountStore()
            if (!account || !accountDB) throw new Error('saveError: account 或 accountDB 为空')
            return accountDB.misc.setItem(MiscTableKeys.BlackList, toRaw(this.blackList))
        },

        /** 将一个用户添加至黑名单 */
        add(targetAddress: string): Promise<void> {
            return new Promise((resolve, reject) => {
                const { account, accountDB } = useAccountStore()
                if (!account || !accountDB) throw new Error('无法添加到黑名单: account 或 accountDB 为空')

                const { publicKeyHex: pubkey, privateKeyHex: privkey } = account
                blockChainApi
                    .updateBlackList({ targetAddress, privkey, pubkey }, 1)
                    .then(() => {
                        this.blackList.push(targetAddress)
                        return this.save()
                    })
                    .then(() => {
                        resolve()
                    })
                    .catch((err) => reject(err))
            })
        },

        /** 将一个用户从黑名单移除 */
        remove(targetAddress: string): Promise<void> {
            return new Promise((resolve, reject) => {
                const { account, accountDB } = useAccountStore()
                if (!account || !accountDB) throw new Error('无法从黑名单删除: account 或 accountDB 为空')

                const { publicKeyHex: pubkey, privateKeyHex: privkey } = account
                blockChainApi
                    .updateBlackList({ targetAddress, privkey, pubkey }, 2)
                    .then(() => {
                        const i = this.blackList.findIndex((addr) => addr === targetAddress)
                        if (i === -1) {
                            resolve()
                            return
                        }
                        this.blackList.splice(i, 1)
                        return this.save()
                    })
                    .then(() => {
                        resolve()
                    })
                    .catch((err) => reject(err))
            })
        },
    },
})
