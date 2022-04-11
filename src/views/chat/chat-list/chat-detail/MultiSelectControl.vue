<template>
    <div class="flex justify-between items-center px-3">
        <div class="w-10"></div>
        <div class="space-x-12 flex">
            <button @click="forwardMessage('multiMessageDiscrete')" class="flex flex-col items-center space-y-2.5">
                <base-btn color="positive-light" text-color="positive" size="16px" round>
                    <i class="iconfont text-3xl">&#xe635;</i>
                </base-btn>
                <span class="text-subtle text-sm">逐条转发</span>
            </button>

            <button @click="forwardMessage('multiMessageCombined')" class="flex flex-col items-center space-y-2.5">
                <base-btn color="positive-light" text-color="positive" size="16px" round>
                    <i class="iconfont text-2xl">&#xe636;</i>
                </base-btn>
                <span class="text-subtle text-sm">合并转发</span>
            </button>

            <button @click="deleteMessages" class="flex flex-col items-center space-y-2.5">
                <base-btn
                    :disable="!chatStore.multiSelecting?.size"
                    color="negative-light"
                    text-color="negative"
                    size="16px"
                    round
                >
                    <i class="iconfont text-2xl">&#xe7d2;</i>
                </base-btn>
                <span class="text-subtle text-sm">删除</span>
            </button>
        </div>
        <div>
            <!-- 取消多选状态 -->
            <base-btn @click="chatStore.deactivateMultiSelect()" round flat color="dark-subtle">
                <i class="iconfont">&#xe626;</i>
            </base-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/store/user-chat'
import { Dialog } from 'quasar'
import ForwardMessageDialogVue from './forward-out/ForwardOutDialog.vue'

const chatStore = useChatStore()

function forwardMessage(type: 'multiMessageDiscrete' | 'multiMessageCombined') {
    Dialog.create({
        component: ForwardMessageDialogVue,
        componentProps: {
            forwardType: type,
            messages: chatStore.focusedChat!.messages.filter((m, i) => chatStore.multiSelecting?.has(i)),
        },
    }).onOk(() => {
        chatStore.deactivateMultiSelect()
    })
}

function deleteMessages() {
    Dialog.create({
        title: `删除 ${chatStore.multiSelecting?.size} 条消息`,
        message: '删除这些消息后将不可恢复, 确定要删除消息吗?',
        cancel: true,
    }).onOk(() => {
        if (!chatStore.focusedChat || !chatStore.multiSelecting) return
        chatStore.deleteMessage(chatStore.focusedChat, ...Array.from(chatStore.multiSelecting))
        chatStore.multiSelecting = null
    })
}
</script>
