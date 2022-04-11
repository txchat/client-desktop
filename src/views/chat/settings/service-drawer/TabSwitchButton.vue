<template>
    <base-btn
        @click="$emit('click')"
        :color="props.isActive ? 'secondary' : 'white'"
        :text-color="props.isActive ? 'primary' : 'grey-6'"
    >
        <slot></slot>
    </base-btn>
</template>

<script setup lang="ts">
const props = defineProps({
    isActive: Boolean,
})

defineEmits(['click'])
</script>
