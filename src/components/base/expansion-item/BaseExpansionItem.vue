<template>
    <q-expansion-item
        :label="label"
        :default-opened="!!defaultOpend"
        switch-toggle-side
        expand-icon-class="-rotate-90 transform -translate-y-1/3 text-subtle"
        class="__base-expansion-item"
    >
        <slot></slot>
    </q-expansion-item>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    defaultOpend?: boolean
}>()
</script>

<style lang="scss">
.__base-expansion-item {
    .q-item {
        padding: 8px;
        padding-left: 0px;
        padding-right: 16px;
    }
    .q-item__section--avatar {
        min-width: initial;
    }
    .q-expansion-item__toggle-icon--rotated {
        transform: rotate(90deg);
    }
}
</style>
