<template>
    <div class="bg-gray-1 px-5 pt-1.5 rounded-md mb-4">
        <div class="text-xs text-subtle">旧密码</div>
        <q-input
            v-model="oldPassword"
            placeholder="请输入旧密码"
            borderless
            type="password"
            class="pt-3 pb-1"
            input-class="placeholder-gray-500"
            dense
        />
    </div>

    <div class="bg-gray-1 px-5 pt-1.5 rounded-md mb-4">
        <div class="text-xs text-subtle">新密码</div>
        <q-input
            v-model="password"
            type="password"
            placeholder="请设置8-16位数字、字母或符号组合"
            borderless
            class="py-1"
            input-class="placeholder-gray-500"
            dense
        />
        <q-input
            v-model="confirmPassword"
            type="password"
            placeholder="再次输入密码 "
            borderless
            class="py-1"
            input-class="placeholder-gray-500 "
            dense
        />
    </div>

    <base-btn @click="change" :disable="!validEditingData" :loading="loading" class="mt-5"> 确定 </base-btn>

    <p class="text-primary text-xs mt-7">提示：若已忘记旧密码，可退出账户，通过导入助记词登录账户后重新设置密码！</p>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
import { Notify } from 'quasar'
import { regPasswordLength } from '@/store/user-safety'
import { usePasswordVerify } from '@/composables/user/usePasswordVerify'
import { usePasswordSet } from '@/composables/user/usePasswordSet'

const emit = defineEmits<{
    (e: 'success'): void
}>()

const { password: oldPassword, verifyPassword } = usePasswordVerify()
const { password, confirmPassword, precheck, setPassword } = usePasswordSet()

const loading = ref(false)

const validEditingData = computed(() => {
    return [oldPassword.value, password.value, confirmPassword.value].every((v) => regPasswordLength.test(v))
})

async function change() {
    if (!precheck()) return

    loading.value = true

    if (!(await verifyPassword())) {
        loading.value = false
        Notify.create('旧密码不正确')
        return
    }

    setPassword()
        .then(() => {
            emit('success')
            Notify.create('密聊密码更改成功')
        })
        .finally(() => {
            loading.value = false
        })
}
</script>
