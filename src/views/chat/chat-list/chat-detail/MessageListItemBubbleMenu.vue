<template>
    <q-menu
        @update:model-value="updateHandler"
        transition-show="jump-down"
        transition-hide="jump-up"
        @hide="refocusEditingArea"
    >
        <q-list style="min-width: 100px">
            <q-item v-if="message.type === MsgType.Text" @click="copy(message.content.content)" clickable v-close-popup>
                <q-item-section>复制</q-item-section>
            </q-item>

            <q-item
                v-if="[MsgType.Image, MsgType.Video, MsgType.File].includes(message.type)"
                @click="download"
                clickable
                v-close-popup
            >
                <q-item-section> 下载 </q-item-section>
            </q-item>

            <q-item @click="chatStore.activateMultiSelect(message.uuid)" clickable v-close-popup>
                <q-item-section> 多选 </q-item-section>
            </q-item>

            <q-item
                v-if="
                    message.logid && [MsgType.Text, MsgType.File, MsgType.Image, MsgType.Video].includes(message.type)
                "
                @click="referTo"
                clickable
                v-close-popup
            >
                <q-item-section> 回复 </q-item-section>
            </q-item>

            <q-item
                v-if="[MsgType.Text, MsgType.File, MsgType.Image, MsgType.Video].includes(message.type)"
                @click="forwardMessage"
                clickable
                v-close-popup
            >
                <q-item-section> 转发 </q-item-section>
            </q-item>

            <q-item @click="deleteMessage" clickable v-close-popup>
                <q-item-section> 删除 </q-item-section>
            </q-item>

            <q-item v-if="recallable" @click="chatStore.recallMessage(message)" clickable v-close-popup>
                <q-item-section> 撤回 </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from 'quasar'
import { useClipboard } from '@vueuse/core'
import { useChatStore } from '@/store/user-chat'
import { useProfileStore } from '@/store/user-profile'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useDownload } from '@/composables/useDownload'
import { Message, MsgType } from '@/types/user-chat'
import { useMention } from './useMention'
import ForwardMessageDialogVue from './forward-out/ForwardOutDialog.vue'

const props = defineProps<{
    message: Message
    fromMyself: boolean
}>()

const emit = defineEmits<{
    (e: 'update:model-value', v: boolean): void
}>()

defineExpose({ referTo })

const chatStore = useChatStore()

function referTo() {
    chatStore.editingRefering = props.message
    if (props.message.fromChat.type === 'group' && !props.fromMyself) {
        useMention(props.message.from, props.message.fromChat.id)
    }
}

const { copy } = useClipboard()

function forwardMessage() {
    Dialog.create({
        component: ForwardMessageDialogVue,
        componentProps: {
            forwardType: 'singleMessage',
            messages: [props.message],
        },
    })
}

function deleteMessage() {
    Dialog.create({
        title: '删除本地消息',
        message: '删除消息后将不可恢复, 确定要删除消息吗?',
        cancel: true,
    }).onOk(() => {
        chatStore.deleteMessage(props.message.fromChat, props.message.uuid)
    })
}

function download() {
    const rawMessage = props.message.content.rawMessage as File
    useDownload(
        rawMessage ? URL.createObjectURL(rawMessage) : props.message.content.mediaUrl,
        props.message.content.name || rawMessage.name
    )
}

const recallable = computed(() => {
    if (!['success', null].includes(props.message.state)) return false
    if (!props.message.logid) return false
    if (props.fromMyself) return true
    else if (props.message.fromChat.type === 'group') {
        // 撤回他人的消息, 我必须比他群内地位高
        const { hostId, groupId } = props.message.fromChat.id
        const group = useChatGroupStore().hosts[hostId][groupId]
        const targetUserIdentity = group.members?.find((m) => m.memberId === props.message.from)?.memberType
        const myIdentity = group.members?.find((m) => m.memberId === useProfileStore().myProfile?.address)?.memberType
        if (myIdentity) {
            if (targetUserIdentity) return myIdentity > targetUserIdentity
            else return true
        }
        return false
    } else return false
})

function refocusEditingArea() {
    document.getElementById('editingArea')?.focus()
}

function updateHandler(e: boolean) {
    emit('update:model-value', e)
}
</script>
