<template>
    <div
        :class="[
            fromMyself ? 'bg-bubble' : 'bg-white',
            fromMyself ? 'rounded-text-msg-bubble-myself' : 'rounded-text-msg-bubble-opposite',
        ]"
        class="py-3 px-4 max-w-chat-msg-text transition duration-300"
    >
        <slot>
            <p
                class="chat-bubble-text-message whitespace-pre-wrap"
                style="overflow-wrap: anywhere"
                v-html="linkifyString(content.content || '')"
            ></p>
        </slot>
        <slot name="menu"> </slot>
    </div>
</template>

<script setup lang="ts">
import linkifyString from 'linkify-string'
import { dtalk } from '@/utils/message-codec/protobuf'

type TextMessageContent = dtalk.proto.ITextMsg

defineProps<{
    content: TextMessageContent
    fromMyself?: boolean
}>()
</script>

<style lang="scss">
.chat-bubble-text-message > a {
    @apply text-primary;
}
</style>
