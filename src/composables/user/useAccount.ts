import { ref, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Dialog, Notify } from 'quasar'

import { useRouter } from '@/router'
import { useOaStore } from '@/store/user-oa'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'
import { useAccountStore } from '@/store/user-account'
import { useConnectionStore } from '@/store/user-connection'
import { useChatServerStore } from '@/store/user-chat-server'
import { useUserBlackListStore } from '@/store/user-black-list'
import { useInitialChatServerUrlStore } from '@/urls/initial-chat-server'
import { Account } from '@/types/user-account'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useProfileStore } from '@/store/user-profile'
import { useSearchStore } from '@/store/user-search'
import { generateAccount } from '@/utils/account/generateAccount'

interface UsableUserAccount {
    /**
     * 注册新的账号
     * @param mnemonic 助记词
     * @param doNotLogin 注册但不自动登录 (默认为 false)
     */
    register: (mnemonic: string, doNotLogin?: boolean, skipedVerification?: boolean) => Promise<Account>

    /** 注册状态 */
    registing: Ref<boolean>

    /** 退出登录 */
    logout: () => void
}

export function useAccount(): UsableUserAccount {
    const accountStore = useAccountStore()

    const registing = ref(false)

    async function register(mnemonic: string, doNotLogin?: boolean, skipedVerification?: boolean): Promise<Account> {
        registing.value = true
        const { current } = storeToRefs(useInitialChatServerUrlStore())
        if (!current.value) throw new Error('未选择服务器')

        // 生成空白账户信息
        const account = generateAccount(mnemonic)

        // 获取用户设置的聊天服务器地址和区块链节点
        const serverName = current.value.name
        const serverAddress = current.value.address

        try {
            await accountStore.registerUser(account, serverName, serverAddress)
            if (!doNotLogin)
                accountStore.login(account, skipedVerification ? '创建助记词, 跳过校验' : '创建助记词, 已校验')
            return account
        } catch (error) {
            Notify.create(error instanceof Error ? error.message : (error as string))
            return Promise.reject(error)
        } finally {
            registing.value = false
        }
    }

    function logout() {
        Dialog.create({ title: '退出登录', message: '确定要退出当前账号吗? ', cancel: true }).onOk(() => {
            useRouter().$reset()
            useFriendStore().$reset()
            useChatStore().$reset()
            useUserBlackListStore().$reset()
            useConnectionStore().reset()
            useChatServerStore().$reset()
            useOaStore().$reset()
            useChatGroupStore().$reset()
            useProfileStore().$reset()
            useSearchStore().$reset()
            accountStore.logout()
        })
    }

    return {
        registing,
        register,
        logout,
    }
}
