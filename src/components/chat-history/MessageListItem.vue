<template>
    <div @mouseover="hovered = true" @mouseleave="hovered = false">
        <div class="flex items-start flex-nowrap py-1.5 overflow-hidden" :class="{ 'flex-row-reverse': fromMyself }">
            <!-- 头像  -->
            <q-avatar rounded size="35px" class="mx-4">
                <q-img :src="displayAvatar" no-spinner no-transition />
            </q-avatar>

            <div class="flex-grow overflow-hidden border-b border-gray-1 pb-2.5">
                <div
                    class="text-subtle text-sm mb-1 flex justify-between items-center overflow-hidden"
                    :class="{ 'text-right': fromMyself }"
                >
                    <div class="flex-grow overflow-hidden overflow-ellipsis">
                        {{ displayName }}
                    </div>
                    <div class="text-xs text-gray-400 text-center whitespace-nowrap">
                        {{ date.formatDate(message.datetime, 'MM月DD日 HH:mm') }}
                    </div>
                </div>
                <!-- 消息气泡 -->
                <div
                    :class="[{ 'flex-row-reverse': fromMyself }, { 'ml-auto': fromMyself }]"
                    class="chat-bubble flex w-full justify-between"
                >
                    <div class="break-all" v-if="message.type === 1">
                        <MessageTextVue
                            class="message-text"
                            :class="backgroundClass"
                            :from-myself="fromMyself"
                            :content="message.content"
                        >
                            <Highlighter
                                highlightClassName="highlightMark"
                                :textToHighlight="(message.content as dtalk.proto.ITextMsg).content"
                                :searchWords="matchedStr.split('')"
                                :autoEscape="true"
                            />
                        </MessageTextVue>
                    </div>

                    <MessageFileVue
                        v-else-if="message.type === 5"
                        :content="(message.content as OssRequiredMsgContent)"
                        :state="message.state"
                        :upload-progress="message.uploadProgress"
                    >
                        <Highlighter
                            highlightClassName="highlightMark"
                            :textToHighlight="(message.content as dtalk.proto.IFileMsg).name"
                            :searchWords="matchedStr.split('')"
                            :autoEscape="true"
                        />
                    </MessageFileVue>

                    <div class="w-20 flex-shrink-0">
                        <div v-if="hovered" @click="locateMessage" class="text-primary cursor-pointer text-sm">
                            定位至聊天
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { date } from 'quasar'
import { useRouter } from '@/router'
import { useChatStore } from '@/store/user-chat'
import type { Message } from '@/types/user-chat'
import type { OssRequiredMsgContent } from '@/types/messages'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { dtalk } from '@/utils/message-codec/protobuf'

import Highlighter from 'vue-highlight-words'
import MessageTextVue from '@/views/chat/chat-list/chat-detail/message-types/MessageText.vue'
import MessageFileVue from '@/views/chat/chat-list/chat-detail/message-types/MessageFile.vue'

const props = defineProps<{
    fromMyself: boolean
    message: Message
    matchedStr: string
    backgroundClass?: string
}>()

const emit = defineEmits<{
    (e: 'dismiss'): void
}>()

const hovered = ref(false)

const { userProfile, displayAvatar } = useUserProfile(props.message.from)
const displayName = computed(() => {
    // 个人资料
    if (userProfile.value?.remark) return userProfile.value?.remark

    // 群内昵称
    const chatGroupStore = useChatGroupStore()
    const chat = props.message.fromChat
    if (chat.type === 'group' && chat.id.hostId in chatGroupStore.hosts) {
        const host = chatGroupStore.hosts[chat.id.hostId]
        const group = host[chat.id.groupId]
        if (group) {
            const member = group.members?.find((m) => m.memberId === props.message.from)
            if (member && member.memberName) return member.memberName
        }
    }

    return userProfile.value?.staffInfo?.name || userProfile.value?.nickname || props.message.from
})

const chatStore = useChatStore()
function locateMessage() {
    useRouter().route = 'chat'
    chatStore.locatingMessage = props.message
    chatStore.focusChat(props.message.fromChat)
    emit('dismiss')
}
</script>

<style lang="scss" scoped>
.message-text {
    padding: 0 !important;
}
</style>
