<template>
    <app-container-vue>
        <LoginVue v-if="!accountStore.isLoggedIn" />
        <ChatVue v-else />
    </app-container-vue>
</template>

<script setup lang="ts">
import { useAccountStore } from './store/user-account'
import { useStartup } from './useStartup'
import LoginVue from '@/views/login/Login.vue'
import ChatVue from '@/views/chat/Chat.vue'
import AppContainerVue from './layouts/AppContainer.vue'

const accountStore = useAccountStore()

useStartup()
</script>
