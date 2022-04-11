<template>
    <div class="drawer" style="width: 400px">
        <div class="flex-nowrap h-12 m-4">
            <div class="font-bold text-base text-center">{{ bindingItem === 'phone' ? '绑定手机号' : '绑定邮箱' }}</div>
        </div>

        <q-carousel
            v-if="accountStore.account"
            v-model="slide"
            style="width: 340px"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            control-color="primary"
            class="rounded-borders"
        >
            <q-carousel-slide name="password" class="w-full flex flex-col">
                <password-set-vue @success="slide = 'binding'">
                    <p class="text-xs text-subtle mb-3">请先设置密聊密码</p>
                </password-set-vue>
            </q-carousel-slide>

            <q-carousel-slide name="binding" class="w-full flex flex-col">
                <div v-if="bindingItem === 'phone'">
                    <div class="bg-gray-1 rounded-md mb-2.5">
                        <q-input
                            v-model="phoneNumber"
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
                        >
                            <template v-slot:after>
                                <base-btn
                                    @click="getCaptcha"
                                    :disable="gettingCaptcha || cooldown > 0 || !phoneRegExp.test(phoneNumberTrimmed)"
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

                <div v-else>
                    <div class="bg-gray-1 rounded-md mb-2.5">
                        <q-input v-model="emailAddress" borderless dense type="text" placeholder="请输入邮箱">
                            <template v-slot:prepend>
                                <q-icon class="ml-4 mr-12" name="mail" />
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

                <base-btn
                    @click="bindPreflight"
                    :disable="!validEditingData"
                    :loading="loading"
                    :color="validEditingData ? 'primary' : 'subtle'"
                    class="mt-5"
                >
                    绑定
                </base-btn>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Notify, Dialog } from 'quasar'
import { useAccountStore } from '@/store/user-account'
import { useSafetyStore } from '@/store/user-safety'
import PasswordSetVue from './PasswordSet.vue'
import BindingWarnDialogVue from './BindingWarnDialog.vue'

const props = defineProps<{
    bindingItem: 'phone' | 'email'
}>()

const emit = defineEmits<{
    (e: 'success'): void
}>()

const accountStore = useAccountStore()
const safetyStore = useSafetyStore()

const { encryptedMnemonic } = storeToRefs(safetyStore)

const slide = ref(encryptedMnemonic.value ? 'binding' : 'password')
const loading = ref(false)

const phoneNumber = ref('')
const emailAddress = ref('')
const captcha = ref('')

const gettingCaptcha = ref(false)
const cooldown = ref(0)
const cooldownInterval = ref<undefined | number>(undefined)

/** 去掉 `phoneNumber` 中的空格 */
const phoneNumberTrimmed = computed(() => {
    return phoneNumber.value.split(' ').join('')
})

const phoneRegExp = /^1[0-9]{10}$/
const emailRegExp = /\b[\w.-_]+@[\w.-_]+\.\w{2,4}\b/

const validEditingData = computed(() => {
    const validPhoneNumber = phoneRegExp.test(phoneNumberTrimmed.value)
    const validEmailNumber = emailRegExp.test(emailAddress.value)
    const validCaptcha = /^[0-9]{5}$/.test(captcha.value)

    if (props.bindingItem === 'phone') {
        return validPhoneNumber && validCaptcha
    } else {
        return validEmailNumber && validCaptcha
    }
})

function getCaptcha() {
    gettingCaptcha.value = true
    safetyStore
        .getCaptcha(props.bindingItem, props.bindingItem === 'phone' ? phoneNumberTrimmed.value : emailAddress.value)
        .then(() => {
            Notify.create('验证码已发送')
            cooldown.value = 60
            cooldownInterval.value = window.setInterval(() => {
                if (cooldown.value !== 0) cooldown.value--
                else window.clearInterval(cooldownInterval.value)
            }, 1000)
        })
        .catch(() => {
            Notify.create('发送验证码失败')
        })
        .finally(() => {
            gettingCaptcha.value = false
        })
}

function bindPreflight() {
    if (props.bindingItem === 'phone') {
        safetyStore.queryPhone(phoneNumberTrimmed.value).then((exists) => {
            if (exists) {
                Dialog.create({ component: BindingWarnDialogVue, componentProps: { bindType: 'phone' } }).onOk(bind)
                return
            }
            bind()
        })
    } else {
        safetyStore.queryEmail(emailAddress.value).then((exists) => {
            if (exists) {
                Dialog.create({ component: BindingWarnDialogVue, componentProps: { bindType: 'email' } }).onOk(bind)
                return
            }
            bind()
        })
    }
}

async function bind() {
    if (!encryptedMnemonic.value) {
        Notify.create('请先设置密码')
        return
    }

    try {
        if (props.bindingItem === 'phone') {
            await safetyStore.bindPhone(encryptedMnemonic.value, phoneNumberTrimmed.value, captcha.value)
        } else {
            await safetyStore.bindEmail(encryptedMnemonic.value, emailAddress.value, captcha.value)
        }
        await safetyStore.getBindings()
        Notify.create('绑定成功！')
        emit('success')
    } catch (error) {
        console.error(error)
        Notify.create(error as string)
    }
}
</script>
