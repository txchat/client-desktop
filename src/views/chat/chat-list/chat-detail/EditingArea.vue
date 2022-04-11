<template>
    <div
        v-if="isGroup && (connectionState === undefined || connectionState === 'not-exist')"
        class="px-7 flex justify-between items-center text-subtle"
    >
        <div class="cursor-not-allowed">未连接当前群聊服务器，无法收发消息！</div>
        <base-btn @click="router.route = 'settings'" color="secondary" text-color="primary"> 添加服务器 </base-btn>
    </div>

    <div v-else-if="isGroup && groupProfile?.status !== 0" class="px-7 flex justify-between items-center text-subtle">
        <div class="cursor-not-allowed">当前群聊已解散, 无法收发消息！</div>
        <base-btn @click="router.route = 'settings'" color="secondary" text-color="primary"> 管理服务器 </base-btn>
    </div>

    <div
        v-else-if="isGroup && connectionState === 'not-connected'"
        class="px-7 flex justify-between items-center text-subtle"
    >
        <div class="cursor-not-allowed">当前群聊服务器异常，无法收发消息！</div>
        <base-btn @click="router.route = 'settings'" color="secondary" text-color="primary"> 管理服务器 </base-btn>
    </div>

    <div v-else-if="isGroup && groupMuteType === 1" class="flex justify-center items-center text-subtle">
        <span>当前全员禁言中, 只有群主和管理员可以发送消息</span>
    </div>

    <div v-else-if="isGroup && isMyselfMuted" class="flex-row justify-center items-center text-subtle">
        已禁言至 {{ date.formatDate(myMuteTime, 'YYYY/M/D HH:mm:ss') || '永久' }}
    </div>

    <div v-else class="flex-col pl-7">
        <!-- tool bar -->
        <div class="py-4 flex items-center space-x-2.5">
            <!-- mention -->
            <button
                v-if="targetChat.type === 'group'"
                @click.stop="addMention"
                class="editing-area-button flex justify-center"
            >
                <i class="iconfont text-2xl">&#xe634;</i>
            </button>

            <button v-if="isEnv.electron" @click="screenCapture" class="editing-area-button flex justify-center">
                <i class="iconfont" style="font-size: 1.625rem">&#xe638;</i>
            </button>

            <!-- send file button -->
            <button @click="fileInput && fileInput.click()" class="editing-area-button">
                <i class="iconfont">&#xe62d;</i>
            </button>

            <!-- audio call -->
            <button @click="audioCall" class="editing-area-button">
                <i class="iconfont">&#xe62b;</i>
            </button>

            <!-- video call -->
            <button @click="videoCall" class="editing-area-button">
                <i class="iconfont">&#xe62c;</i>
            </button>

            <!-- 消息记录 -->
            <button @click="queryMessageCall" class="editing-area-button">
                <i class="iconfont text-lg">&#xe605;</i>
            </button>
        </div>

        <div class="w-full pb-2">
            <textarea
                id="editingArea"
                v-model="text"
                ref="chatInput"
                class="w-full outline-none resize-none overflow-y-scroll"
                :class="refering ? 'h-16' : 'h-28'"
                maxlength="2500"
                rows="3"
                @keydown.enter.prevent.exact="send"
                @keydown.ctrl.enter.exact="text += '\n'"
                @keydown.meta.enter.exact="text += '\n'"
                @keydown.up.exact="mentioning && $event.preventDefault()"
                @keydown.down.exact="mentioning && $event.preventDefault()"
                @keydown.ctrl.p.exact="mentioning && $event.preventDefault()"
                @keydown.ctrl.n.exact="mentioning && $event.preventDefault()"
                @paste="pasteHandler"
            >
            </textarea>
            <div v-if="refering" class="flex items-center">
                <ReferedMessageVue :message="refering" />
                <button @click="refering = null" class="text-subtle">
                    <i class="iconfont text-3xl">&#xe607;</i>
                </button>
            </div>
            <EditingAreaMentionDialogVue
                v-if="targetChat.type === 'group'"
                :group-id="targetChat.id"
                @mentioning="mentioning = $event"
            />
        </div>
        <!-- file receiver -->
        <input v-show="false" ref="fileInput" name="file" type="file" accept="*" @change="receiveImage" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive, toRaw } from 'vue'
import { useQuasar, date, Dialog } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRouter } from '@/router'
import { useSendFile } from './useSendFile'
import { useChatStore } from '@/store/user-chat'
import { useMagicKeys, whenever } from '@vueuse/core'
import { isEnv } from '@/utils/env'
import { MsgType } from '@/types/user-chat'
import { useGroupProfile } from '@/composables/user/useGroupProfile'

import QueryChatHistoryWithSomeOneVue from './QueryChatHistoryWithSomeOne.vue'
import EditingAreaSendImageVue from './EditingAreaSendImage.vue'
import EditingAreaMentionDialogVue from './EditingAreaMentionDialog.vue'
import ReferedMessageVue from './ReferedMessage.vue'

const router = useRouter()
const quasar = useQuasar()
const chatStore = useChatStore()

const { editingText: text, editingMention: mention, editingRefering: refering } = storeToRefs(chatStore)

const targetChat = reactive(chatStore.focusedChat!)
const fileInput = ref<HTMLInputElement | undefined>(undefined)
onMounted(() => chatInput.value?.focus())

const chatInput = ref<HTMLTextAreaElement | undefined>(undefined)
watch(
    text,
    () => {
        if (chatInput.value) {
            // 撤回的消息点击重新编辑后, 聚焦输入框
            if (document.activeElement !== chatInput.value) chatInput.value.focus()

            /**
             * textarea autogrow
             * @see https://codepen.io/vsync/pen/frudD
             */
            const el = chatInput.value,
                minHeight = 23
            el.rows = 1
            const rows = el.scrollHeight === minHeight ? 0 : Math.floor(el.scrollHeight / minHeight)
            el.rows = rows + 1
            el.parentElement && (el.parentElement.scrollTop = el.parentElement?.scrollHeight)
        }
    },
    { flush: 'post' }
)

const isGroup = computed(() => chatStore.focusedChat?.type === 'group')
const connectionState = computed(() =>
    targetChat.type === 'single' ? null : useGroupProfile(targetChat.id).connectionState.value
)

const groupMuteType = computed(() => {
    if (targetChat.type === 'single') return
    const group = useGroupProfile(targetChat.id).groupProfile.value
    if ([1, 2].includes(group?.person.memberType || 0)) return 0
    return group?.muteType
})

const myMuteTime = computed(() => {
    if (targetChat.type === 'single') return
    return useGroupProfile(targetChat.id).groupProfile.value?.person.memberMuteTime
})

const isMyselfMuted = computed(() => {
    if (!myMuteTime.value) return
    return date.getDateDiff(myMuteTime.value, Date.now(), 'seconds') > 0
})

const groupProfile = computed(() => {
    if (targetChat.type === 'single') return
    return useGroupProfile(targetChat.id).groupProfile.value
})

/** 正在使用输入法打字 */
function send(e: KeyboardEvent) {
    if (e.isComposing) return
    if (mentioning.value) return
    if (!text.value.trim()) return
    chatStore
        .sendMessage({
            type: MsgType.Text,
            content: { content: text.value, mention: toRaw(mention.value.map((m) => m.address)) },
            refering: toRaw(chatStore.editingRefering),
        })
        .catch((err) => console.error(err))
    chatStore.clearEditingText()
}

function receiveImage(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files && input.files[0]
    if (!file) return
    useSendFile().send(file)
    input.value = '' // 防止 image input 第二次上传同一张图片失效
}

function audioCall() {
    quasar.notify('暂未开放')
}

function videoCall() {
    quasar.notify('暂未开放')
}

function queryMessageCall() {
    Dialog.create({
        component: QueryChatHistoryWithSomeOneVue,
        componentProps: {
            chat: targetChat,
        },
    })
}

// 图片粘贴
function pasteHandler(e: ClipboardEvent) {
    if (e.clipboardData?.files.length) {
        const file = e.clipboardData.files[0]
        if (file.name.match(/(.jpg$)|(.jpeg$)|(.png$)|(.gif$)/i)) {
            showSendImageDialog(file)
        }
    }
}

// 截图完成回调
window.electron?.onScreenCaptured(async (event, imageData) => {
    const file = new File([imageData.buffer], 'screen.png', { type: 'image/png' })
    showSendImageDialog(file)
})

// 打开发送图片对话框
function showSendImageDialog(image: File) {
    Dialog.create({
        component: EditingAreaSendImageVue,
        componentProps: {
            file: image,
        },
    })
        .onOk(() => {
            useSendFile().send(image)
        })
        .onDismiss(() => {
            chatInput.value?.focus()
        })
}

const mentioning = ref(false)
function addMention() {
    const el = chatInput.value
    if (!el) return
    el.setRangeText('@', el.selectionStart, el.selectionEnd, 'end')
    text.value = el.value
}

const keys = useMagicKeys()
const screenCaptureShortcut4Win = keys['Alt+Ctrl+A']
const screenCaptureShortcut4Mac = keys['Meta+Ctrl+A']
whenever(() => screenCaptureShortcut4Win.value || screenCaptureShortcut4Mac.value, screenCapture)

function screenCapture() {
    window.electron?.screenCapture()
}
</script>

<style lang="scss">
#editingArea::-webkit-scrollbar-thumb {
    background-color: #c5c6c6;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: padding-box;
}

#editingArea::-webkit-scrollbar {
    width: 16px;
}

button.editing-area-button {
    @apply w-9 px-2 pt-1 pb-0 text-subtle hover:text-primary;
}
</style>
