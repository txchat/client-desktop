import { ref, Ref, computed, ComputedRef } from 'vue'
import { Notify } from 'quasar'
import { useAccountStore } from '@/store/user-account'
import { regPassword, regPasswordTooSimple, useSafetyStore } from '@/store/user-safety'
import { encryptMnemonic } from '@/utils/cipher'
import { Account } from '@/types/user-account'

interface UsablePasswordSet {
    loading: Ref<boolean>
    password: Ref<string>
    confirmPassword: Ref<string>
    valid: ComputedRef<boolean>
    precheck: () => boolean
    setPassword: (_account?: Account) => Promise<string>
}

export function usePasswordSet(): UsablePasswordSet {
    const loading = ref(false)
    const password = ref('')
    const confirmPassword = ref('')
    const valid = computed(() => regPassword.test(password.value) && regPassword.test(confirmPassword.value))

    function precheck() {
        if (password.value !== confirmPassword.value) {
            Notify.create('两次输入的密码不一致')
            return false
        }

        if (password.value.match(regPasswordTooSimple)) {
            Notify.create('密码不能是纯字母或数字')
            return false
        }

        if (regPassword.test(password.value) === false) {
            Notify.create('密码格式不正确')
            return false
        }

        return true
    }

    async function setPassword(_account?: Account): Promise<string> {
        const accountStore = useAccountStore()
        const account = _account || accountStore.account
        const safetyStore = useSafetyStore()

        if (!account) throw new Error('设置密码失败：未登录且没有指定 account')
        if (!precheck()) return Promise.reject()

        loading.value = true
        try {
            let dismiss: undefined | (() => void)
            const encryptedMnemonic = await encryptMnemonic(account.mnemonic, password.value, () => {
                dismiss = Notify.create('正在设置密码, 请耐心等待...')
            })
            await safetyStore.setPassword(encryptedMnemonic, _account)
            dismiss?.()
            if (accountStore.localStoredAccount) {
                safetyStore.encryptedMnemonic = encryptedMnemonic
            }

            return encryptedMnemonic
        } catch (err) {
            Notify.create(err instanceof Error ? err.message : (err as string))
            return Promise.reject(err)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        password,
        confirmPassword,
        valid,
        precheck,
        setPassword,
    }
}
