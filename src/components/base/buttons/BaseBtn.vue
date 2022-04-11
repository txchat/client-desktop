<template>
    <q-btn
        :color="color"
        :rounded="rounded"
        :text-color="textColor"
        :unelevated="unelevated"
        :loading="loading"
        :disable="disable || loading"
        :flat="flat"
    >
        <slot></slot>
    </q-btn>
</template>

<script setup lang="ts">
interface Props {
    color?: string
    textColor?: string
    flat?: boolean
    rounded?: boolean
    unelevated?: boolean
    loading?: boolean
    /** loading 状态会自动 disable */
    disable?: boolean
}

withDefaults(defineProps<Props>(), {
    color: 'primary',
    rounded: true,
    unelevated: true,
})
</script>
