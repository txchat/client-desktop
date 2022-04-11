import { ref, Ref } from 'vue'
import { useAccountStore } from '@/store/user-account'
import { encryptMnemonic } from '@/utils/cipher'
import { Account } from '@/types/user-account'
import { Notify } from 'quasar'
import { useSafetyStore } from '@/store/user-safety'

interface UsablePasswordVerify {
    password: Ref<string>
    verifyPassword: () => Promise<boolean>
    loading: Ref<boolean>
}

export function usePasswordVerify(): UsablePasswordVerify {
    const safetyStore = useSafetyStore()

    const password = ref('')
    const loading = ref(false)

    async function verifyPassword(_account?: Account) {
        const accountStore = useAccountStore()
        const account = _account || accountStore.account
        if (!account) throw new Error('验证密码失败：未登录且没有指定 account')
        loading.value = true
        let dismiss: undefined | (() => void)
        const encrypted = await encryptMnemonic(account.mnemonic, password.value, () => {
            dismiss = Notify.create('正在验证密码, 请耐心等待...')
        })
        dismiss?.()
        loading.value = false
        return encrypted === safetyStore.encryptedMnemonic
    }

    return {
        password,
        verifyPassword,
        loading,
    }
}
