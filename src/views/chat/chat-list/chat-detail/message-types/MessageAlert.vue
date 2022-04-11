<template>
    <div class="text-center text-subtle text-sm">{{ fullText }} <slot></slot></div>
</template>

<script setup lang="ts">
interface Props {
    fullText?: string
}

withDefaults(defineProps<Props>(), {
    fullText: '未知的通知类型, 请前往手机端查看',
})
</script>
