<template>
    <div>
        <h1 class="text-2xl font-bold leading-loose">手机登录</h1>
        <p class="text-sm text-subtle leading-normal">手机号未绑定账号将自动生成账号</p>

        <div class="pt-10 space-y-5">
            <div class="bg-gray-1 rounded-md">
                <q-input
                    v-model="phoneNumber"
                    autofocus
                    input-class="phone-number-input font-bold text-base text-dark"
                    mask="### #### ####"
                    borderless
                    dense
                    type="text"
                    placeholder="请输入手机号"
                >
                    <template v-slot:prepend>
                        <span class="text-dark text-base font-bold px-4">+86</span>
                    </template>
                </q-input>
            </div>

            <div class="bg-gray-1 rounded-md">
                <q-input
                    input-class="placeholder-center text-center text-dark text-base font-bold"
                    mask="#####"
                    v-model="captcha"
                    borderless
                    dense
                    type="text"
                    placeholder="请输入验证码"
                    @keyup.enter="retrieveMnemonicPhone"
                >
                    <template v-slot:after>
                        <base-btn
                            @click="getCaptcha"
                            :disable="gettingCaptcha || cooldown > 0 || !/^1[0-9]{10}$/.test(phoneNumberTrimmed)"
                            :loading="gettingCaptcha"
                            :color="cooldown > 0 ? 'subtle' : 'primary'"
                            style="width: 130px"
                            no-caps
                            flat
                            dense
                        >
                            {{ cooldown > 0 ? `已发送${cooldown}s` : '获取验证码' }}
                        </base-btn>
                    </template>
                </q-input>
            </div>
        </div>

        <p class="text-sm text-subtle py-4">{{ notifyMessage }}</p>

        <base-btn
            @click="retrieveMnemonicPhone"
            :loading="retrieving"
            :disable="gettingCaptcha || retrieving || !validEditingData"
            class="w-full mb-2"
            padding="8px"
        >
            注册/登录
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Notify } from 'quasar'
import { useSafetyStore } from '@/store/user-safety'
import type { SafetyInfo } from '@/types/user-safety'

const emit = defineEmits<{
    (e: 'exists', value: SafetyInfo): void
    (e: 'not-exists', value: { phoneNumber: string; captcha: string }): void
}>()

const backupStore = useSafetyStore()

const phoneNumber = ref('')
/** 去掉 `phoneNumber` 中的空格 */
const phoneNumberTrimmed = computed(() => phoneNumber.value.split(' ').join(''))
const captcha = ref('')
const cooldown = ref(0)
const cooldownInterval = ref<undefined | number>(undefined)
const gettingCaptcha = ref(false)
const retrieving = ref(false)
const notifyMessage = ref('')

const validEditingData = computed(() => {
    const validPhoneNumber = /^1[0-9]{10}$/.test(phoneNumberTrimmed.value)
    const validCaptcha = /^[0-9]{5}$/.test(captcha.value)
    return validPhoneNumber && validCaptcha
})

function getCaptcha() {
    gettingCaptcha.value = true
    notifyMessage.value = ''
    backupStore
        .getCaptcha('phone', phoneNumberTrimmed.value)
        .then(() => {
            notifyMessage.value = '短信验证码已发送，请耐心等待'
            cooldown.value = 60
            cooldownInterval.value = window.setInterval(() => {
                if (cooldown.value !== 0) cooldown.value--
                else window.clearInterval(cooldownInterval.value)
            }, 1000)
        })
        .catch((res) => Notify.create({ message: res, color: 'negative' }))
        .finally(() => (gettingCaptcha.value = false))
}

async function retrieveMnemonicPhone() {
    if (!validEditingData.value) return

    retrieving.value = true
    notifyMessage.value = ''

    try {
        const bound = await backupStore.queryPhone(phoneNumberTrimmed.value)
        if (bound) {
            const safetyInfo = await backupStore.retrieveWithPhone(phoneNumberTrimmed.value, captcha.value)
            emit('exists', safetyInfo)
        } else emit('not-exists', { captcha: captcha.value, phoneNumber: phoneNumberTrimmed.value })
    } catch (error) {
        Notify.create(error instanceof Error ? error.message : (error as string))
    } finally {
        retrieving.value = false
    }
}
</script>
