<template>
    <q-checkbox v-model="checked" :class="!square && '__base-checkbox'" size="32px" color="primary" keep-color>
        <slot></slot>
    </q-checkbox>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        square?: boolean
    }>(),
    { modelValue: false }
)

const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
}>()

const checked = useVModel(props, 'modelValue', emit)
</script>

<style lang="scss">
.__base-checkbox {
    .q-checkbox__bg {
        border-radius: 16px;
    }
}
</style>
