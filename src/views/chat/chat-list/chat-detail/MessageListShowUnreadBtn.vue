<template>
    <base-btn class="absolute" color="secondary" text-color="primary">
        <i class="iconfont mr-2 transform" :class="{ 'rotate-180': direction === 'up' }" style="font-size: 8px">
            &#xe633;
        </i>
        <slot></slot>
    </base-btn>
</template>

<script setup lang="ts">
defineProps<{
    direction: 'up' | 'down'
}>()
</script>
