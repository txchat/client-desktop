import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Dialog } from 'quasar'
import { whenever } from '@vueuse/core'
import { useRouter } from '@/router'
import { useAccountStore } from './user-account'
import { backupApi } from '@/api/user-safety'
import { Account } from '@/types/user-account'
import SettingsSafetyWarnDialog from '@/views/chat/settings/SettingsSafetyWarnDialog.vue'

export const regPassword = /^([\w^\\|<>[\]{}#%+-=~/:;()$&"`?!*@,.']){8,16}$/
export const regPasswordTooSimple = /(^[a-zA-Z]{8,16}$)|(^[0-9]{8,16}$)|^([^A-Za-z0-9]{8,16}$)/
export const regPasswordLength = /^.{8,16}$/

export const useSafetyStore = defineStore('user: safety', () => {
    const accountStore = useAccountStore()
    const router = useRouter()

    const phone = ref<string | null>(null)
    const email = ref<string | null>(null)
    const encryptedMnemonic = ref<string | null>(null)

    const doneExportMnemonic = ref<boolean>(false)

    /** 为 true 情况: 用户未导出过助记词, 且为绑定手机或邮箱 */
    const unprotected = computed(() => !phone.value && !email.value && !doneExportMnemonic.value)

    // 登录成功后要做的事
    whenever(
        () => accountStore.isLoggedIn,
        async () => {
            // 如果用户通过 "创建助记词登录" 的方式登录, 并且跳过助记词校验, 提示绑定手机或邮箱
            if (accountStore.loginType === '创建助记词, 跳过校验') {
                Dialog.create({ component: SettingsSafetyWarnDialog }).onOk((bindType: 'phone' | 'email') => {
                    router.backupTarget = bindType
                    router.route = 'settings'
                })
            }

            doneExportMnemonic.value = !!(await accountStore.accountDB?.safety.getItem('doneExportMnemonic'))

            getBindings()
        },
        { immediate: true }
    )

    // 退出登录后, 清空安全绑定信息
    whenever(
        () => !accountStore.isLoggedIn,
        () => {
            phone.value = null
            email.value = null
            encryptedMnemonic.value = null
            doneExportMnemonic.value = false
        }
    )

    // ACTIONS
    function setPassword(encryptedMnemonic: string, account?: Account) {
        const _account = account || accountStore.account
        if (!_account) throw new Error('设置密码失败：未登录且没有指定 account')
        return backupApi.setPassword(encryptedMnemonic, _account)
    }

    function saveDoneExportMnemonic() {
        doneExportMnemonic.value = true
        accountStore.accountDB?.safety.setItem('doneExportMnemonic', true)
    }

    async function getBindings() {
        if (!accountStore.account) throw new Error('设置密码失败：账户未登录')

        const safetyInfo = await backupApi.getBindings(accountStore.account)
        const { phone: _phone, email: _email, mnemonic: _encryptedMnemonic } = safetyInfo

        if (_phone) phone.value = _phone
        if (_email) email.value = _email
        if (_encryptedMnemonic) encryptedMnemonic.value = _encryptedMnemonic

        return safetyInfo
    }

    function getCaptcha(type: 'phone' | 'email', dst: string) {
        if (type === 'phone') return backupApi.getPhoneCaptcha('86', dst)
        else return backupApi.getEmailCaptcha(dst)
    }

    function queryPhone(phone: string) {
        return backupApi.queryPhone('86', phone)
    }

    function bindPhone(encryptedMnemonic: string, phoneNumber: string, smsCaptcha: string, account?: Account) {
        const _account = account || accountStore.account
        if (!_account) throw new Error('bindPhoneError: 未登录且没有指定 account')
        return backupApi.bindPhone({ regionCode: '86', phoneNumber, smsCaptcha, encryptedMnemonic }, _account)
    }

    function retrieveWithPhone(phoneNumber: string, smsCaptcha: string) {
        return backupApi.retrieveWithPhone('86', phoneNumber, smsCaptcha)
    }

    function queryEmail(email: string) {
        return backupApi.queryEmail(email)
    }

    function bindEmail(encryptedMnemonic: string, emailAddress: string, emailCaptcha: string) {
        if (!accountStore.account) throw new Error('设置密码失败：账户未登录')
        return backupApi.bindEmail({ emailAddress, emailCaptcha, encryptedMnemonic }, accountStore.account)
    }

    function retrieveWithEmail(emailAddress: string, emailCaptcha: string) {
        return backupApi.retrieveWithEmail(emailAddress, emailCaptcha)
    }

    return {
        phone,
        email,
        unprotected,
        encryptedMnemonic,
        saveDoneExportMnemonic,
        setPassword,
        getBindings,
        getCaptcha,
        queryPhone,
        bindPhone,
        retrieveWithPhone,
        queryEmail,
        bindEmail,
        retrieveWithEmail,
    }
})
