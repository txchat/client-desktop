<template>
    <div>
        <h1 class="text-2xl font-bold leading-loose">邮箱登录</h1>
        <p class="text-sm text-subtle leading-normal">邮箱找回助记词登录</p>

        <div class="pt-10 space-y-5">
            <div class="bg-gray-1 rounded-md mb-2.5">
                <q-input v-model="emailAddress" autofocus borderless dense type="text" placeholder="请输入邮箱">
                    <template v-slot:prepend>
                        <q-icon class="ml-4 mr-12" name="mail" />
                    </template>
                </q-input>
            </div>

            <div class="bg-gray-1 rounded-md">
                <q-input
                    v-model="captcha"
                    @keyup.enter="retrieveMnemonicEmail"
                    input-class="placeholder-center text-center text-dark text-base font-bold"
                    mask="#####"
                    borderless
                    dense
                    type="text"
                    placeholder="请输入验证码"
                >
                    <template v-slot:after>
                        <base-btn
                            @click="getCaptcha"
                            :disable="gettingCaptcha || cooldown > 0 || !emailRegExp.test(emailAddress)"
                            :loading="gettingCaptcha"
                            :color="cooldown > 0 ? 'subtle' : 'primary'"
                            style="width: 130px"
                            flat
                            dense
                        >
                            {{ cooldown > 0 ? cooldown + 's 后再次获取' : '获取验证码' }}
                        </base-btn>
                    </template>
                </q-input>
            </div>
        </div>

        <p class="text-sm text-subtle py-4">{{ notifyMessage }}</p>

        <base-btn
            @click="retrieveMnemonicEmail()"
            :loading="retrieving"
            :disable="gettingCaptcha || retrieving || !validEditingData"
            class="w-full mb-2"
            padding="8px"
        >
            登录
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dialog, Notify } from 'quasar'
import { useSafetyStore } from '@/store/user-safety'
import { SafetyInfo } from '@/types/user-safety'

const emit = defineEmits<{
    (e: 'exists', safetyInfo: SafetyInfo): void
    (e: 'switch-method'): void
}>()

const backupStore = useSafetyStore()

const emailAddress = ref('')
const captcha = ref('')
const cooldown = ref(0)
const cooldownInterval = ref<undefined | number>(undefined)
const gettingCaptcha = ref(false)
const retrieving = ref(false)
const notifyMessage = ref('')

const emailRegExp = /[a-z0-9._]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const validEditingData = computed(() => {
    const validEmailAddress = emailRegExp.test(emailAddress.value)
    const validCaptcha = /^[0-9]{5}$/.test(captcha.value)
    return validEmailAddress && validCaptcha
})

function promptEmpty() {
    Dialog.create({
        title: '邮箱未绑定',
        message: '邮箱未绑定账号，请选择其他方式登录！',
        cancel: true,
        ok: {
            label: '手机登录',
            flat: true,
        },
    }).onOk(() => emit('switch-method'))
}

async function getCaptcha() {
    const exists = await backupStore.queryEmail(emailAddress.value)
    if (!exists) {
        promptEmpty()
        return
    }

    gettingCaptcha.value = true
    notifyMessage.value = ''
    backupStore
        .getCaptcha('email', emailAddress.value)
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

async function retrieveMnemonicEmail() {
    if (!validEditingData.value) return

    retrieving.value = true
    notifyMessage.value = ''

    try {
        const safetyInfo = await backupStore.retrieveWithEmail(emailAddress.value, captcha.value)
        if (Object.values(safetyInfo).length < 1) {
            promptEmpty()
            return
        }
        emit('exists', safetyInfo)
    } catch (error) {
        Notify.create(error instanceof Error ? error.message : (error as string))
    } finally {
        retrieving.value = false
    }
}
</script>
