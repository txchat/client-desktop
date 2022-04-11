<template>
    <slot></slot>

    <div class="bg-gray-1 px-5 rounded-md mb-3">
        <q-input
            v-model="password"
            type="password"
            placeholder="请设置8-16位数字、字母或符号组合"
            borderless
            class="py-1"
            input-class="placeholder-gray-500 placeholder-center"
            dense
        />
    </div>

    <div class="bg-gray-1 px-5 rounded-md">
        <q-input
            v-model="confirmPassword"
            type="password"
            placeholder="再次输入密码 "
            borderless
            class="py-1"
            input-class="placeholder-gray-500 placeholder-center"
            dense
        />
    </div>

    <base-btn @click="setPassword().then(() => $emit('success'))" :disable="!valid" :loading="loading" class="mt-8">
        确定
    </base-btn>
</template>

<script setup lang="ts">
import { usePasswordSet } from '@/composables/user/usePasswordSet'

defineEmits<{
    (e: 'success'): void
}>()

const { loading, password, confirmPassword, valid, setPassword } = usePasswordSet()
</script>
