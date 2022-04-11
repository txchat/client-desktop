<template>
    <q-card class="q-dialog-plugin __dialog-content">
        <q-card-section v-if="!noHead" class="px-5 pt-5 pb-0 flex justify-between">
            <div class="w-10"></div>
            <h1 v-if="title" class="text-base font-bold text-dark">{{ title }}</h1>
            <div class="w-10">
                <base-btn
                    v-if="!noCloseBtn"
                    @click="$emit('hide')"
                    :color="closeBtnColor || 'subtle'"
                    flat
                    round
                    size="11px"
                >
                    <i class="iconfont">&#xe626;</i>
                </base-btn>
            </div>
        </q-card-section>
        <q-card-section class="scroll px-0 h-full">
            <slot></slot>
        </q-card-section>
        <q-card-actions v-if="$slots['actions']" align="right">
            <slot name="actions"></slot>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
defineProps<{
    noHead?: boolean
    title?: string
    noCloseBtn?: boolean
    closeBtnColor?: string
}>()

defineEmits<{
    (e: 'hide'): void
}>()
</script>

<style lang="scss">
.__dialog-content {
    .q-card__section {
        padding-bottom: 0;
    }
}
</style>
