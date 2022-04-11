<template>
    <div
        :class="[
            fromMyself ? 'bg-secondary' : 'bg-white',
            fromMyself ? 'rounded-text-msg-bubble-myself' : 'rounded-text-msg-bubble-opposite',
        ]"
        class="py-3 px-4 text-sm text-subtle max-w-chat-msg-text break-all"
    >
        不支持的消息类型，请在手机端查看
    </div>
</template>

<script setup lang="ts">
defineProps<{
    fromMyself: boolean
}>()
</script>
