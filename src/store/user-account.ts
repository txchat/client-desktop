import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import localforage from 'localforage'
import { LocalStorageKeys } from './local-key'
import { generateAccount, generateToken, OSS } from '@/utils/account'
import { Account, LocalStoredAccount, LoginType } from '@/types/user-account'
import { blockChainApi } from '@/api/chain-base'

export const useAccountStore = defineStore('user: account', () => {
    const loginType = ref<LoginType | null>(null)

    const _account = JSON.parse(localStorage.getItem(LocalStorageKeys.AccountInfo) || 'null')
    if (_account) loginType.value = '本地存储'

    // 本地存储的账户信息 (不包含私钥等敏感信息)
    const localStoredAccount = ref<LocalStoredAccount | null>(_account)

    // 账户信息
    const account = computed(() =>
        localStoredAccount.value ? generateAccount(localStoredAccount.value.mnemonic) : null
    )

    // 是否已登录
    const isLoggedIn = computed(() => !!account.value)

    // 本地存储数据库
    const accountDB = computed(() => {
        if (!account.value) return null

        const name = account.value.address
        const tables = {
            friends: localforage.createInstance({ name, storeName: 'friends' }),
            userProfiles: localforage.createInstance({ name, storeName: 'userProfiles' }),
            remarks: localforage.createInstance({ name, storeName: 'remarks' }),
            chats: localforage.createInstance({ name, storeName: 'chats' }),
            misc: localforage.createInstance({ name, storeName: 'misc' }),
            chatGroups: localforage.createInstance({ name, storeName: 'chatGroups' }),
            files: localforage.createInstance({ name, storeName: 'files' }),
            safety: localforage.createInstance({ name, storeName: 'safety' }),
            lastMessage: localforage.createInstance({ name, storeName: 'lastMessage' }),
        }
        return tables
    })

    const oss = computed(() => {
        if (!account.value) return null
        return new OSS({
            appId: 'dtalk',
            requestUrl: '/oss',
            authorization: () => {
                if (!account.value) return {}
                return { 'FZM-SIGNATURE': generateToken(account.value) }
            },
        })
    })

    function login(account: Account, type: LoginType = '本地存储') {
        if (localStoredAccount.value) throw new Error('已登录, 不能重复登录')

        loginType.value = type
        const storedAccount = {
            mnemonic: account.mnemonic,
            publicKey: account.publicKeyHex,
            address: account.address,
        }

        localStorage.setItem(LocalStorageKeys.AccountInfo, JSON.stringify(storedAccount))
        localStoredAccount.value = storedAccount
    }

    function logout() {
        localStoredAccount.value = null
        loginType.value = null
        localStorage.removeItem(LocalStorageKeys.AccountInfo)
    }

    async function registerUser(account: Account, serverName: string, serverAddress: string): Promise<void> {
        const { publicKeyHex: pubkey, privateKeyHex: privkey } = account
        try {
            await blockChainApi.updateUser({ avatar: '', nickname: '', phone: '', email: '', pubkey, privkey })
            await blockChainApi.updateChatServer({ name: serverName, value: serverAddress, pubkey, privkey }, 1)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async function changeNickname(newNickname: string) {
        if (!account.value) throw new Error('未登录')
        const { publicKeyHex: pubkey, privateKeyHex: privkey } = account.value
        return blockChainApi.updateUser({ nickname: newNickname, pubkey, privkey })
    }

    return {
        localStoredAccount,
        loginType,
        account,
        isLoggedIn,
        accountDB,
        oss,
        login,
        logout,
        registerUser,
        changeNickname,
    }
})
