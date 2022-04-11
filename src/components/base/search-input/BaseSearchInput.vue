<template>
    <div class="__base-search-input px-3 rounded-full bg-gray-3">
        <q-input borderless placeholder="搜索" v-model="value" autocomplete="off" ref="input" tabindex="0">
            <template v-slot:prepend>
                <i class="iconfont text-subtle text-2xl">&#xe625;</i>
            </template>
            <template v-slot:after>
                <div
                    v-if="value"
                    @click="value = ''"
                    class="rounded-full cursor-pointer transform translate-x-1 text-subtle"
                >
                    <i class="iconfont text-2xl">&#xe607;</i>
                </div>
            </template>
        </q-input>
    </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

interface Props {
    modelValue: string
    showClear?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showClear: true,
})

const emit = defineEmits<{
    (e: 'update:modelValue', v: string): void
}>()

const value = useVModel(props, 'modelValue', emit)
</script>

<style lang="scss">
.__base-search-input {
    .q-field__control,
    .q-field__marginal {
        height: 30px;
    }
}
</style>
