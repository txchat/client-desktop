<template>
    <div class="space-x-3">
        <base-btn
            v-for="(item, index) in items"
            :key="index"
            :color="index === activeIndex ? 'secondary' : 'transparent'"
            :text-color="index === activeIndex ? 'primary' : 'grey-6'"
            :padding="buttonPadding"
            @click="activeIndex = index"
        >
            {{ item.label }}
            <slot :item="item"></slot>
        </base-btn>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Item {
    id: string
    label: string
    [key: string]: unknown
}

const props = defineProps<{
    items: Item[]
    buttonPadding?: string
}>()

const emit = defineEmits<{
    (e: 'switch', activeItemId: string): void
}>()

const activeIndex = ref(0)

watch(activeIndex, (v) => {
    emit('switch', props.items[v].id)
})
</script>
