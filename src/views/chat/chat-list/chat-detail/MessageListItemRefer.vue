<template>
    <div v-if="message.reference" class="pt-1">
        <ReferedMessageVue
            v-if="
                !targetMessage ||
                targetMessage.isRecalled ||
                [MsgType.Text, MsgType.File, MsgType.Image, MsgType.Video].includes(targetMessage.type)
            "
            :message="targetMessage"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChatStore } from '@/store/user-chat'
import { Message, MsgType } from '@/types/user-chat'
import ReferedMessageVue from './ReferedMessage.vue'

const props = defineProps<{
    message: Message
}>()

const chatStore = useChatStore()

const targetMessage = computed(() => {
    if (!props.message.reference) return
    return chatStore.findMessageByLogId(props.message.reference.ref)
})
</script>
