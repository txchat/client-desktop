<template>
    <!-- 消息气泡 -->
    <div
        v-if="!props.message.isRecalled"
        :class="[{ 'flex-row-reverse': fromMyself }, { 'ml-auto': fromMyself }]"
        class="flex w-full"
        style="max-width: 400px"
    >
        <MessageTextVue
            v-if="message.type === MsgType.Text"
            :content="message.content"
            :from-myself="fromMyself"
            :class="showingContextMenu && 'filter brightness-95'"
        >
            <template v-slot:menu>
                <MessageListItemBubbleMenuVue
                    v-if="!chatStore.multiSelecting"
                    @update:model-value="showingContextMenu = $event"
                    context-menu
                    :message="message"
                    :from-myself="fromMyself"
                />
            </template>
        </MessageTextVue>

        <MessageAudioVue
            v-else-if="message.type === MsgType.Audio"
            :state="message.state"
            :from-myself="fromMyself"
            :content="(message.content as OssRequiredMsgContent)"
            :listened="message.listenedAudioMessage || false"
            @listened="chatStore.markAudioMessageAsListened(message)"
        />

        <MessageImageVue
            v-else-if="message.type === MsgType.Image"
            @click-image="mediaMessageClickHandler($event)"
            :content="message.content"
            :from-myself="fromMyself"
            :upload-progress="message.uploadProgress"
            :state="message.state"
            style="max-height: 180px"
        >
            <MessageListItemBubbleMenuVue
                v-if="!chatStore.multiSelecting"
                context-menu
                :message="message"
                :from-myself="fromMyself"
            />
        </MessageImageVue>

        <MessageVideoVue
            v-else-if="message.type === MsgType.Video"
            @click-video="mediaMessageClickHandler($event)"
            :state="message.state"
            :from-myself="fromMyself"
            :content="(message.content as OssRequiredMsgContent)"
            :upload-progress="message.uploadProgress"
            style="max-height: 150px; min-height: 100px"
        />

        <MessageFileVue
            v-else-if="message.type === MsgType.File"
            :content="(message.content as OssRequiredMsgContent)"
            :state="message.state"
            :upload-progress="message.uploadProgress"
        />

        <MessageForwardVue v-else-if="message.type === MsgType.Forward" :message="message" :from-myself="fromMyself" />

        <MessageRedPacketVue
            v-else-if="message.type === MsgType.RedPacket"
            :content="(message.content as RedPacketMsgContent)"
            @update-status="updateRedpacketMessage(message, $event)"
            :from-myself="fromMyself"
            :from-address="message.from"
            :state="message.state"
        />

        <MessageUnsupportedVue v-else :from-myself="fromMyself" />

        <!-- 消息状态 -->
        <div
            v-if="message.state && message.state !== 'success'"
            class="w-10 self-stretch flex flex-row justify-center items-center"
        >
            <!-- 发送失败 -->
            <div
                v-if="message.state === 'failure'"
                @click="resend()"
                class="w-full h-full flex flex-row justify-center items-center"
            >
                <q-icon name="error" size="22px" color="negative" />
            </div>
            <!-- 正在发送 -->
            <q-spinner-ios
                v-else-if="message.state === 'pending' && !isMedia"
                color="grey"
                size="1.25rem"
                :thickness="5"
            />
            <q-icon
                v-else-if="message.state === 'pending' && isMedia"
                @click="abort"
                name="cancel"
                size="22px"
                color="negative"
            />
        </div>

        <!-- hover 选项 -->
        <div v-if="!chatStore.multiSelecting" class="mx-2 self-end relative" style="min-width: 52px">
            <div
                :class="[!showOptions && 'opacity-0', fromMyself && 'flex-row-reverse space-x-reverse']"
                class="space-x-1 flex"
            >
                <!-- 回复 -->
                <button
                    @click="reply"
                    v-if="[MsgType.Text, MsgType.File, MsgType.Image, MsgType.Video].includes(message.type)"
                    class="w-6 h-6 text-center rounded text-subtle bg-gray-4 hover:text-primary hover:bg-secondary"
                >
                    <i class="iconfont text-sm leading-6"> &#xe605; </i>
                </button>
                <!-- 更多 -->
                <button class="w-6 h-6 text-center rounded text-subtle bg-gray-4 hover:text-primary hover:bg-secondary">
                    <i class="iconfont text-lg leading-6"> &#xe623; </i>
                    <MessageListItemBubbleMenuVue
                        ref="menuVue"
                        anchor="bottom right"
                        self="top left"
                        :message="message"
                        :from-myself="fromMyself"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useChatStore } from '@/store/user-chat'
import { useAccountStore } from '@/store/user-account'
import { Message, MsgType } from '@/types/user-chat'
import { dtalk } from '@/utils/message-codec/protobuf'
import { useClickMediaMessageAndOpenGallery } from './useClickMediaMessageAndOpenGallery'
import type { RedPacketMsgContent, RedPacketStatus, OssRequiredMsgContent } from '@/types/messages'

import MessageTextVue from './message-types/MessageText.vue'
import MessageAudioVue from './message-types/MessageAudio.vue'
import MessageImageVue from './message-types/MessageImage.vue'
import MessageVideoVue from './message-types/MessageVideo.vue'
import MessageFileVue from './message-types/MessageFile.vue'
import MessageForwardVue from './message-types/MessageForward.vue'
import MessageRedPacketVue from './message-types/MessageRedPacket.vue'
import MessageUnsupportedVue from './message-types/MessageUnsupported.vue'
import MessageListItemBubbleMenuVue from './MessageListItemBubbleMenu.vue'

const props = defineProps<{
    message: Message
    fromMyself: boolean
    showOptions: boolean
}>()

const chatStore = useChatStore()

const showingContextMenu = ref(false)
const isMedia = computed(() => [MsgType.Image, MsgType.Video, MsgType.File].includes(props.message.type))

function abort() {
    if (props.message.isRecalled) return
    const url = (props.message.content as dtalk.proto.IFileMsg).mediaUrl
    if (url) {
        useAccountStore().oss?.abortUploading(url)
        chatStore.failMessageUploading(props.message.fromChat, props.message.uuid)
    }
}

function resend() {
    chatStore.sendMessage({
        type: props.message.type,
        content: props.message.content,
        resendMessageUuid: props.message.uuid,
    })
}

function updateRedpacketMessage(message: Message, event: { status: RedPacketStatus; receivedAmount: number }) {
    const content = message.content as RedPacketMsgContent
    content.status = event.status
    content.receivedAmount = event.receivedAmount
}

const menuVue = ref<InstanceType<typeof MessageListItemBubbleMenuVue> | null>(null)

function reply() {
    menuVue.value?.referTo()
}

const { mediaMessageClickHandler } = useClickMediaMessageAndOpenGallery()
</script>
