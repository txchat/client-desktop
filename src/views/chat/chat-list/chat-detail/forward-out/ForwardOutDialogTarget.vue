<template>
    <div @click.stop="checked = !checked" class="h-13 flex items-center space-x-2.5 cursor-pointer">
        <base-checkbox v-model="checked"></base-checkbox>
        <q-avatar rounded size="30px">
            <q-img :src="avatar" no-spinner no-transition></q-img>
        </q-avatar>
        <span>{{ label }}</span>
    </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
    label: string
    avatar: string
    modelValue: boolean
}>()

defineEmits<{
    (e: 'update:modelValue', v: boolean): void
}>()

const checked = useVModel(props, 'modelValue')
</script>
