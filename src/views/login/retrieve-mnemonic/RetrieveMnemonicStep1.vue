<template>
    <div class="mt-10 space-y-4">
        <MobileVue
            v-if="retrieveMethod === 'phone'"
            @exists="$emit('success', $event)"
            @not-exists="$emit('not-exists', $event)"
        />
        <EmailVue v-else @exists="$emit('success', $event)" @switch-method="retrieveMethod = 'phone'" />

        <div class="flex justify-center">
            <base-btn @click="switchRetrieveMethod" color="primary" flat>
                {{ retrieveMethod === 'phone' ? '邮箱找回登录' : '手机号找回登录' }}
            </base-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { SafetyInfo } from '@/types/user-safety'

import MobileVue from './RetrieveMnemonicStep1Mobile.vue'
const EmailVue = defineAsyncComponent(() => import('./RetrieveMnemonicStep1Email.vue'))

defineEmits<{
    /** 第一步成功, 返回绑定账户的安全信息 */
    (e: 'success', value: SafetyInfo): void
    /** 输入的手机号为空, 返回用户输入的验证码 */
    (e: 'not-exists', value: { phoneNumber: string; captcha: string }): void
}>()

const retrieveMethod = ref<'phone' | 'email'>('phone')

function switchRetrieveMethod() {
    if (retrieveMethod.value === 'phone') retrieveMethod.value = 'email'
    else retrieveMethod.value = 'phone'
}
</script>
