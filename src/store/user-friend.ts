import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { blockChainApi } from '@/api/chain-base'
import { useAccountStore } from '@/store/user-account'
import { Friend, Friends } from '@/types/user-friend'

const ERR_NULL_ACCOUNT = 'accountStore 中没有账户信息'
const ERR_NULL_ACCOUNTDB = 'accountStore 中的 accountDB 为空'

export const useFriendStore = defineStore({
    id: 'user: friend',

    state() {
        return {
            friends: null as Friends | null,
            focusedUser: undefined as string | undefined,
        }
    },

    getters: {
        friendsLength(): number {
            if (!this.friends) return 0
            return Object.keys(this.friends).length
        },
    },

    actions: {
        /** 从本地数据库拿好友列表 */
        load(): Promise<void> {
            return new Promise((resolve) => {
                const { accountDB } = useAccountStore()
                if (!accountDB) throw new Error('初始化好友列表失败: ' + ERR_NULL_ACCOUNTDB)

                accountDB.friends.length().then((length) => {
                    if (!length) {
                        this.friends = {}
                        resolve()
                        return
                    }

                    const _friends: Friends = {}
                    accountDB?.friends
                        .iterate<Friend, void>((f) => {
                            _friends[f.address] = f
                        })
                        .then(() => {
                            this.friends = _friends
                            resolve()
                        })
                })
            })
        },

        /** 从区块链拿好友列表 */
        get(): Promise<Friends> {
            return new Promise((resolve, reject) => {
                const { account, accountDB } = useAccountStore()
                if (!account) throw new Error('从区块链拿好友列表失败: ' + ERR_NULL_ACCOUNT)

                const { address, publicKeyHex: publicKey, privateKeyHex: privateKey } = account

                const _friends: Friends = {}
                blockChainApi
                    .getFriends(address, { publicKey, privateKey })
                    .then((chainFriends) => {
                        chainFriends.forEach((cf) => {
                            _friends[cf.friendAddress] = {
                                address: cf.friendAddress,
                                assignedServerIds: cf.groups,
                            }
                        })
                        this.friends = _friends
                        return accountDB?.friends.clear()
                    })
                    .then(() => {
                        return accountDB && this.friends && saveObj(accountDB.friends, toRaw(this.friends))
                    })
                    .then(() => {
                        if (this.friends !== null) resolve(this.friends)
                        else reject('好友列表已被释放')
                    })
                    .catch((res) => reject(res))
            })
        },

        /** 添加好友 */
        add(address: string): Promise<void> {
            return new Promise((resolve) => {
                const { account, accountDB } = useAccountStore()
                if (!account) throw new Error('添加好友失败: ' + ERR_NULL_ACCOUNT)

                const { publicKeyHex: pubkey, privateKeyHex: privkey } = account
                const assignedServerIds = ['1']
                const friend = { address, assignedServerIds }
                blockChainApi
                    .UpdateFriends({ friendAddress: address, groups: assignedServerIds, pubkey, privkey }, 1)
                    .then(() => {
                        accountDB?.friends.setItem<Friend>(address, friend).then(() => {
                            this.friends && (this.friends[address] = friend)
                            resolve()
                        })
                    })
            })
        },

        /** 删除好友 */
        delete(friendAddress: string): Promise<void> {
            const { account, accountDB } = useAccountStore()
            if (!account) throw new Error('删除好友失败: ' + ERR_NULL_ACCOUNT)

            const { publicKeyHex: pubkey, privateKeyHex: privkey } = account

            return new Promise((resolve, reject) => {
                blockChainApi
                    .UpdateFriends({ friendAddress, pubkey, privkey }, 2)
                    .then(() => {
                        accountDB?.friends.removeItem(friendAddress).then(() => {
                            this.friends && delete this.friends[friendAddress]
                            resolve()
                        })
                    })
                    .catch((res) => {
                        reject(res)
                    })
            })
        },

        /** 切换聊天服务器 */
        switchServer(friendAddress: string, newServerId: string) {
            return new Promise((resolve) => {
                const { account, accountDB } = useAccountStore()
                if (!account) throw new Error('切换聊天服务器失败: ' + ERR_NULL_ACCOUNT)

                const { publicKeyHex: pubkey, privateKeyHex: privkey } = account

                blockChainApi.UpdateFriends({ friendAddress, pubkey, privkey, groups: [newServerId] }, 1).then(() => {
                    if (!this.friends) return
                    this.friends[friendAddress].assignedServerIds = [newServerId]
                    accountDB?.friends.setItem(friendAddress, toRaw(this.friends[friendAddress])).then(resolve)
                })
            })
        },
    },
})

/** 将一个对象保存到 IndexedDB, 使该对象的所有 property 映射为 key */
function saveObj<T>(localforage: LocalForage, obj: { [key: string]: T }) {
    const setPromises: Promise<T>[] = []
    Object.keys(obj).forEach((key) => {
        const value = obj[key]
        setPromises.push(localforage.setItem<T>(key, value))
    })
    return Promise.all(setPromises)
}
