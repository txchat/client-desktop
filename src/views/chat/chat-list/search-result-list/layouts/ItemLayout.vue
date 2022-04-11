<template>
    <div class="h-13 px-5 flex items-center cursor-pointer">
        <q-avatar size="40px" class="mr-3" rounded>
            <q-img :src="displayAvatar" fit="contain" no-spinner no-transition />
        </q-avatar>

        <div class="h-11 flex-grow flex flex-col" :class="slots.subTxt ? 'justify-between' : 'justify-center'">
            <div class="flex justify-between items-center">
                <p class="line-clamp-1 break-all">
                    <slot name="mainTxt"></slot>
                </p>
                <p class="caption">
                    <slot></slot>
                </p>
            </div>

            <div class="space-x-2 flex justify-between items-center" v-if="slots.subTxt">
                <p class="caption line-clamp-1 break-all leading-tight">
                    <slot name="subTxt"></slot>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSlots } from 'vue'

defineProps({
    displayAvatar: {
        type: String,
    },
})

const slots = useSlots()
</script>
<style></style>
