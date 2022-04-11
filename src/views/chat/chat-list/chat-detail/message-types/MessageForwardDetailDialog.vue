<template>
    <q-dialog ref="dialogRef" style="z-index: 1039" @hide="onDialogHide" :no-esc-dismiss="showingGallery">
        <dialog-content-layout @hide="onDialogCancel" :title="title" class="bg-gray-1">
            <q-scroll-area style="height: 60vh">
                <div v-if="message.content.items.length > 1" class="flex items-center">
                    <div class="h-px flex-grow bg-gray-4 ml-5 mr-3"></div>
                    <div class="text-sm text-subtle">
                        {{ date.formatDate(message.content.items[0].datetime, 'YYYY/MM/DD') }}
                        ~
                        {{
                            date.formatDate(
                                message.content.items[message.content.items.length - 1].datetime,
                                'YYYY/MM/DD'
                            )
                        }}
                    </div>
                    <div class="h-px flex-grow bg-gray-4 ml-3 mr-8"></div>
                </div>
                <div v-for="(item, i) in (message.content as ForwardMessage)?.items" :key="i">
                    <div
                        v-if="i === 0 || item.datetime - message.content.items[i - 1].datetime > 1000 * 60 * 3"
                        class="text-xs text-gray-400 text-center pb-2 pt-4"
                    >
                        {{ date.formatDate(item.datetime, 'MM月DD日 HH:mm') }}
                    </div>
                    <message-layout :avatar="item.avatar!" :display-name="item.name!">
                        <template v-slot="{ isHovering }">
                            <div style="max-width: 80%" class="flex">
                                <MessageTextVue v-if="item.msgType === MsgType.Text && item.msg" :content="item.msg" />
                                <MessageImageVue
                                    v-else-if="item.msgType === MsgType.Image"
                                    :content="item.msg"
                                    style="max-height: 180px"
                                    @click-image="mediaMessageClickHandler(i, $event)"
                                />
                                <MessageVideoVue
                                    v-else-if="item.msgType === MsgType.Video"
                                    @click-video="mediaMessageClickHandler(i, $event)"
                                    :content="item.msg"
                                    style="max-height: 150px; min-height: 100px"
                                />
                                <MessageFileVue v-else-if="item.msgType === MsgType.File" :content="item.msg" />
                                <MessageTextVue
                                    v-else
                                    :content="{ content: messageSnapshot(item.msgType || MsgType.System) }"
                                />

                                <!-- hover 选项 -->
                                <div class="mx-2 self-end relative">
                                    <div :class="[!isHovering && 'opacity-0']" class="space-x-1 flex">
                                        <!-- 更多 -->
                                        <button
                                            class="w-6 h-6 text-center rounded text-subtle bg-gray-4 hover:text-primary hover:bg-secondary"
                                        >
                                            <i class="iconfont text-lg leading-6"> &#xe623; </i>
                                            <MessageForwardDetailDialogMenuVue :item="item" />
                                        </button>
                                    </div>
                                </div></div
                        ></template>
                    </message-layout>
                </div>
            </q-scroll-area>
        </dialog-content-layout>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useDialogPluginComponent, date } from 'quasar'
import { Message, MsgType } from '@/types/user-chat'
import type { ForwardMessage } from '@/types/messages/forward'
import { useChatStore } from '@/store/user-chat'
import { dtalk } from '@/utils/message-codec/protobuf'
import { getFileName } from '@/utils/fileName'
import { openMediaGallery } from '@/utils/openMediaGallery'
import { messageSnapshot } from '@/utils/message-snapshot'
import DialogContentLayout from '@/layouts/DialogContentLayout.vue'
import MessageLayout from '@/layouts/MessageLayout.vue'
import MessageTextVue from './MessageText.vue'
import MessageImageVue from './MessageImage.vue'
import MessageVideoVue from './MessageVideo.vue'
import MessageFileVue from './MessageFile.vue'
import MessageForwardDetailDialogMenuVue from './MessageForwardDetailDialogMenu.vue'

const props = defineProps<{
    title: string
    message: Message
}>()

const { message } = toRefs(props)

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const chatStore = useChatStore()
const chat = chatStore.findChat(props.message.fromChat.type, props.message.fromChat.id).chat

const showingGallery = ref(false)

;(async () => {
    if (!chat) return

    if (message.value.isRecalled) return

    // 读取缓存的文件
    let i = 0
    for await (const item of (message.value.content as ForwardMessage).items) {
        const url = item.msg?.mediaUrl

        if (url && [MsgType.Video, MsgType.Audio, MsgType.Image, MsgType.File].includes(item.msgType!)) {
            ;(message.value.content as ForwardMessage).items[i].msg.rawMessage = await chatStore.loadFile(url)

            Object.defineProperty(item.msg, 'rawMessage', { enumerable: false })
        }
        i++
    }
})()

function mediaMessageClickHandler(_index: number, el: HTMLElement | null) {
    if (!el) return

    const clickedItem = props.message.content.items[_index]
    let index
    const mediaItems = (props.message.content as ForwardMessage).items
        .filter((item) => item.msgType && [MsgType.Image, MsgType.Video].includes(item.msgType))
        .map((item, i) => {
            if (item === clickedItem) index = i
            if (item.msgType === MsgType.Image) {
                const content = item.msg as dtalk.proto.IImageMsg & {
                    rawMessage?: File
                }

                return {
                    src: content.rawMessage ? URL.createObjectURL(content.rawMessage) : content.mediaUrl || '',
                    download: content.rawMessage?.name || getFileName(content.mediaUrl) || 'unknown_file.jpg',
                    width: String(content.width),
                }
            } else {
                const content = item.msg as dtalk.proto.IVideoMsg & {
                    rawMessage?: File
                }
                const src = content.rawMessage ? URL.createObjectURL(content.rawMessage) : content.mediaUrl || ''

                return {
                    video: {
                        source: [{ src, type: 'video/mp4' }],
                        tracks: [],
                        attributes: {
                            preload: 'none',
                            controls: 'controls',
                        } as unknown as HTMLVideoElement,
                    },
                    download: getFileName(content.mediaUrl) || 'unknown_file.mp4',
                    downloadUrl: src,
                    width: String(content.width),
                }
            }
        })

    showingGallery.value = true
    openMediaGallery(el, mediaItems, index, () => {
        showingGallery.value = false
    })
}
</script>
