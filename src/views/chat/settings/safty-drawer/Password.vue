<template>
    <div class="drawer" style="width: 340px">
        <div class="flex-nowrap h-12 m-4">
            <div class="font-bold text-base text-center">{{ hasPassword ? '修改密码' : '设置密码' }}</div>
        </div>
        <PasswordSetVue v-if="!hasPassword" @success="$emit('success')" />
        <PasswordChangeVue v-else @success="$emit('success')" />
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { useAccountStore } from '@/store/user-account'
import PasswordChangeVue from './PasswordChange.vue'
import PasswordSetVue from './PasswordSet.vue'

defineEmits<{
    (e: 'success'): void
}>()

const accountStore = useAccountStore()

const hasPassword = accountStore.localStoredAccount?.encryptedMnemonic
</script>
