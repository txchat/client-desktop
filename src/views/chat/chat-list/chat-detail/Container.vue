<template>
    <div class="bg-gray-1 flex flex-col relative" @click="clickHandler" @dragenter="overChatArea = true">
        <div class="h-16 flex justify-between items-center px-5">
            <h3 class="font-bold">
                {{ displayName }}
                <span v-if="chat.type === 'group' && groupProfile">({{ groupProfile.memberNum }})</span>
                <span
                    v-if="chat.type === 'group'"
                    class="ml-2 font-normal text-sm rounded px-1.5 py-1"
                    :class="[
                        connectionState === 'not-exist'
                            ? ' text-subtle'
                            : connectionState === 'connected'
                            ? 'text-positive'
                            : ' text-negative',

                        connectionState === 'not-exist'
                            ? ' bg-gray-4'
                            : connectionState === 'connected'
                            ? 'bg-positive-light'
                            : ' bg-negative-light',
                    ]"
                >
                    {{ chat.id.hostId }}
                </span>
            </h3>
            <base-btn @click.stop="showDrawer = true" round flat size="11px">
                <i class="iconfont text-2xl text-subtle">&#xe623;</i>
            </base-btn>
        </div>

        <MessageListVue
            :key="chat.type === 'single' ? chat.id : `${chat.id.hostId}->${chat.id.groupId}`"
            :chat="chat"
            class="flex-grow"
        />

        <component
            :is="multiSelecting ? MultiSelectControlVue : EditingAreaVue"
            :key="chat.type === 'single' ? chat.id : `${chat.id.hostId}->${chat.id.groupId}`"
            class="h-52 bg-white"
        >
        </component>

        <transition name="slide">
            <ProfileDrawerVue
                v-if="showDrawer"
                @click.stop
                :chat="chat"
                :key="chat.type === 'single' ? chat.id : `${chat.id.hostId}->${chat.id.groupId}`"
            />
        </transition>

        <transition name="fade">
            <div
                v-show="showDragMask"
                @dragleave="overChatArea = false"
                @drop="dropHandler"
                :class="{ 'bg-opacity-10': overChatArea }"
                class="absolute inset-0 bg-gray-100 transition-colors duration-1000 ease-out backdrop-filter backdrop-blur-sm"
            >
                <div
                    class="absolute inset-10 border-2 border-dashed border-dark pointer-events-none flex justify-center"
                >
                    <p class="self-center text-center text-2xl font-bold">
                        {{ overChatArea ? '松开鼠标发送' : '拖拽到这里发送' }}
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { Chat } from '@/types/user-chat'
import { useSendFile } from './useSendFile'
import { useChatStore } from '@/store/user-chat'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useGroupProfile } from '@/composables/user/useGroupProfile'

import MessageListVue from './MessageList.vue'
import EditingAreaVue from './EditingArea.vue'
import MultiSelectControlVue from './MultiSelectControl.vue'
const ProfileDrawerVue = defineAsyncComponent(() => import('./drawer/Drawer.vue'))

const props = defineProps<{
    chat: Chat
}>()

const chatStore = useChatStore()

const { multiSelecting } = storeToRefs(chatStore)

// 响应式跟踪好友资料
const displayName = computed(() =>
    props.chat.type === 'single'
        ? useUserProfile(props.chat.id).displayName.value
        : useGroupProfile(props.chat.id).displayName.value
)
const groupProfile = computed(() =>
    props.chat.type === 'single' ? null : useGroupProfile(props.chat.id).groupProfile.value
)
const connectionState = computed(() =>
    props.chat.type === 'single' ? null : useGroupProfile(props.chat.id).connectionState.value
)

// 弹出/隐藏侧边栏
const showDrawer = ref(false)

watch(
    () => chatStore.focusedChat?.id,
    () => (showDrawer.value = false)
)

// 点击了聊天界面, 但没有选中任何文本, 则聚焦输入框
function clickHandler() {
    showDrawer.value = false
    const selection = window.getSelection()
    if (
        !selection ||
        (selection.anchorNode === selection.focusNode && selection.focusOffset === selection.anchorOffset)
    ) {
        document.getElementById('editingArea')?.focus()
    }

    if (props.chat.unreadLength) {
        chatStore.clearUnread(chatStore.findChat(props.chat.type, props.chat.id).index)
    }
}

// 文件拖拽
const showDragMask = ref(false)
const overChatArea = ref(false)

function handleGlobalDragAndDrop(v: boolean) {
    return (e: DragEvent | MouseEvent) => {
        e.preventDefault()
        showDragMask.value = v
    }
}

window.addEventListener('mouseout', handleGlobalDragAndDrop(false))
window.addEventListener('dragover', handleGlobalDragAndDrop(true))
window.addEventListener('drop', handleGlobalDragAndDrop(false))

function dropHandler(e: DragEvent) {
    showDragMask.value = false
    useSendFile().send(e.dataTransfer?.files[0])
}
</script>
