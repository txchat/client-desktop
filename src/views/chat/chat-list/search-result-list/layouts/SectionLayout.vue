<template>
    <template v-if="length !== 0">
        <div class="mb-2.5">
            <div class="px-5 pb-2 caption">{{ title }}</div>
            <slot name="list" :showMore="showMore"></slot>
            <div
                v-if="length && length > 3"
                @click.stop="!showMore ? handleClickSeeMore() : handleClickPackUp()"
                class="px-5 caption text-primary cursor-pointer h-7 flex items-center hover:bg-gray-1"
            >
                <div v-if="!showMore" class="w-full">查看更多</div>
                <div v-else class="w-full">收起</div>
            </div>
        </div>
    </template>
</template>
<script setup lang="ts">
import { PropType, watch } from 'vue'

const props = defineProps({
    title: String,
    searchValue: String,
    length: Number,
    showMore: Boolean,
    setShowMore: {
        type: Function as PropType<(show: boolean) => void>,
        required: true,
    },
})

function handleClickSeeMore() {
    props.setShowMore(true)
}

function handleClickPackUp() {
    props.setShowMore(false)
}

watch(
    () => props.searchValue,
    () => {
        props.setShowMore(false)
    }
)
</script>
<style></style>
