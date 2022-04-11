<template>
    <div class="w-full space-y-4 flex flex-col">
        <h1 class="text-2xl font-bold text-dark">{{ step1Result ? '输入' : '设置' }}密聊密码</h1>
        <div class="pt-4 pb-12 space-y-5">
            <div class="bg-gray-1 rounded-md">
                <q-input
                    ref="passwordInput1"
                    input-class="placeholder-center text-center text-dark text-base font-bold"
                    :model-value="step1Result ? password : password4Set"
                    @update:model-value="step1Result ? (password = String($event)) : (password4Set = String($event))"
                    @keyup.enter="step1Result && loginOrRegister()"
                    borderless
                    dense
                    type="password"
                    :placeholder="step1Result ? '请输入密聊密码' : '请设置密聊密码'"
                />
            </div>

            <div v-if="!step1Result" class="bg-gray-1 rounded-md">
                <q-input
                    input-class="placeholder-center text-center text-dark text-base font-bold"
                    @keyup.enter="loginOrRegister"
                    v-model="confirmPassword"
                    borderless
                    dense
                    type="password"
                    placeholder="再次确认密聊密码"
                />
            </div>
        </div>

        <base-btn
            @click="loginOrRegister"
            :disable="step1Result ? !password.length : !password4Set.length || !confirmPassword.length"
            :loading="loading"
            class="h-10"
        >
            {{ step1Result ? '登录' : '生成账号' }}
        </base-btn>

        <div>
            <base-btn @click="$emit('go-back')" padding="2px 14px" flat>返回</base-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar'
import { templateRef } from '@vueuse/core'
import { seed } from '@33cn/wallet-base'
import { decryptMnemonic } from '@/utils/cipher'
import { useAccountStore } from '@/store/user-account'
import { useAccount } from '@/composables/user/useAccount'
import { SafetyInfo } from '@/types/user-safety'
import { useSafetyStore } from '@/store/user-safety'
import { usePasswordSet } from '@/composables/user/usePasswordSet'
import { generateAccount } from '@/utils/account/generateAccount'

interface BindPhonePayload {
    phoneNumber: string
    captcha: string
}

const props = defineProps<{
    /** true: 存在的账户, 输入密码直接登录; false: 不存在的账户, 输入两次密码来注册并绑定手机 */
    step1Result: boolean
    step1Payload: SafetyInfo | BindPhonePayload
}>()

defineEmits<{
    (e: 'go-back'): void
}>()

const accountStore = useAccountStore()
const safetyStore = useSafetyStore()
const { register } = useAccount()
const { setPassword, password: password4Set, confirmPassword } = usePasswordSet()

const password = ref('')
const loading = ref(false)

// auto foucs after QCarouselSlide transition end
const passwordInput1 = templateRef('passwordInput1')
onMounted(() => setTimeout(() => passwordInput1.value?.focus(), 350))

async function loginOrRegister() {
    if (props.step1Result) {
        if (!password.value.length) return
    } else {
        if (!password4Set.value.length || !confirmPassword.value.length) return
    }

    // 登录
    if (props.step1Result) {
        const safetyInfo = props.step1Payload as SafetyInfo
        try {
            if (!safetyInfo.mnemonic || !safetyInfo.address) throw new Error('decryptError: 加密助记词或地址为空')
            let dismiss: undefined | (() => void)
            const mnemonic = await decryptMnemonic(safetyInfo.mnemonic, password.value, () => {
                loading.value = true
                dismiss = Notify.create('正在验证密码, 请耐心等待...')
            })
            dismiss?.()

            const decryptedAccount = generateAccount(mnemonic)
            if (decryptedAccount.address === safetyInfo.address) accountStore.login(decryptedAccount, '找回助记词')
            else Notify.create('密码不正确')
        } catch (error) {
            console.log(error)
            Notify.create('密码不正确')
        } finally {
            loading.value = false
        }
    }

    // 生成新账号
    else {
        const bindPhonePayload = props.step1Payload as BindPhonePayload

        try {
            const account = await register(seed.newMnemonicInCN(), true)
            const encryptedMne = await setPassword(account)
            await safetyStore.bindPhone(encryptedMne, bindPhonePayload.phoneNumber, bindPhonePayload.captcha, account)
            accountStore.login(account, '创建助记词, 已校验')
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }
}
</script>
