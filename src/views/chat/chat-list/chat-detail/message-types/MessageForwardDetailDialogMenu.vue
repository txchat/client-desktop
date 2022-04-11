<template>
    <q-menu transition-show="jump-down" transition-hide="jump-up" anchor="bottom right" self="top left">
        <q-list style="min-width: 100px">
            <q-item v-if="item.msgType === MsgType.Text" @click="copy(item.msg?.content)" clickable v-close-popup>
                <q-item-section>复制</q-item-section>
            </q-item>

            <q-item
                v-if="[MsgType.Image, MsgType.Video, MsgType.File].includes(item.msgType!)"
                @click="download(item.msg.rawMessage)"
                clickable
                v-close-popup
            >
                <q-item-section> 下载 </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useDownload } from '@/composables/useDownload'
import { ForwardItem } from '@/types/messages/forward'
import { MsgType } from '@/types/user-chat'

defineProps<{
    item: ForwardItem
}>()

const { copy } = useClipboard()

function download(rawMessage: File) {
    useDownload(URL.createObjectURL(rawMessage), rawMessage.name)
}
</script>
