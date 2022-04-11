<template>
    <div class="chat-drawer-container absolute inset-y-0 right-0 bg-white pl-5 pr-1 pt-8 flex flex-col flex-grow">
        <!-- 聊天对象为个人的抽屉 -->
        <DrawerSingle v-if="chat.type === 'single'" :user-address="chat.id" />
        <!-- 聊天对象为群聊的抽屉 -->
        <DrawerGroup v-else :host-id="chat.id.hostId" :group-id="chat.id.groupId" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Chat } from '@/types/user-chat'
const DrawerSingle = defineAsyncComponent(() => import('./DrawerSingle.vue'))
const DrawerGroup = defineAsyncComponent(() => import('./DrawerGroup.vue'))

defineProps<{
    chat: Chat
}>()
</script>

<style lang="scss" scoped>
.chat-drawer-container {
    width: 270px;
    box-shadow: 0px 0px 14px 0px rgba(36, 55, 78, 0.1);
}
</style>
