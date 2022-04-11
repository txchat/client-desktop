<template>
    <div
        class="flex items-start flex-nowrap py-1.5"
        :class="{ 'flex-row-reverse': fromMyself }"
        @mouseover="isHovering = true"
        @mouseout="isHovering = false"
    >
        <q-avatar @click="$emit('click-avatar')" rounded size="35px" class="mx-4">
            <q-img :src="avatar || require('theme/icons/default-avatar.svg')" no-spinner no-transition />
            <slot name="avatar-menu"></slot>
        </q-avatar>

        <div class="flex-grow">
            <p v-if="displayName" class="text-subtle text-sm mb-1" :class="{ 'text-right': fromMyself }">
                {{ displayName }}
            </p>

            <slot :is-hovering="isHovering"> </slot>

            <slot name="below-content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    fromMyself?: boolean
    avatar?: string
    displayName?: string
}>()

defineEmits<{
    (e: 'click-avatar'): void
}>()

const isHovering = ref(false)
</script>
