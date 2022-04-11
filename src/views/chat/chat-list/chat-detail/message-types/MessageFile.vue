<template>
    <div @click="download" class="chat-message-file w-64 h-20 bg-white rounded p-2.5 flex cursor-pointer">
        <q-img
            :src="fileIcon"
            width="56px"
            height="56px"
            style="min-width: 56px"
            class="chat-message-file-img mr-2.5"
            no-spinner
            no-transition
        >
            <!-- 文件上灰色遮罩 -->
            <transition name="fade">
                <div v-if="showProgress" class="chat-message-file-img-drop">
                    <!-- 上传进度圆圈 -->
                    <q-circular-progress
                        :value="uploadProgress?.percentage && uploadProgress.percentage * 100"
                        class="w-full h-full"
                        :thickness="1"
                        color="white"
                        track-color="dark"
                    />
                </div>
            </transition>
        </q-img>
        <div class="flex flex-col justify-between">
            <p class="flex-grow text-sm line-clamp-2 break-all">
                <slot>{{ content.name }}</slot>
            </p>
            <p class="caption leading-normal">{{ formatBytes(content.size) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dtalk } from '@/utils/message-codec/protobuf'
import { UploadProgress } from '@/types/user-chat'
import { useDownload } from '@/composables/useDownload'

type FileContent = dtalk.proto.IFileMsg & {
    rawMessage?: File
}

const props = defineProps<{
    content: FileContent
    state?: 'pending' | 'success' | 'failure' | null
    uploadProgress?: UploadProgress
}>()

const fileIcon = computed(() => {
    if (!props.content.name) return require('@/assets/icons/file_unknown.png')

    const ext = props.content.name.match(/\.[a-zA-Z0-9]+$/g)
    if (!ext || !ext.length) return require('@/assets/icons/file_unknown.png')

    switch (ext[0].toLowerCase()) {
        case '.doc':
        case '.docx':
            return require('@/assets/icons/file_word.png')
        case '.xls':
        case '.xlsx':
            return require('@/assets/icons/file_excel.png')
        case '.pdf':
            return require('@/assets/icons/file_pdf.png')
        case '.mp3':
        case '.ogg':
        case '.aac':
        case '.wav':
            return require('@/assets/icons/file_music.png')
        case '.m4v':
        case '.mp4':
        case '.mov':
        case '.avi':
        case '.mkv':
        case '.wmv':
            return require('@/assets/icons/file_video.png')
        default:
            return require('@/assets/icons/file_unknown.png')
    }
})

const showProgress = computed(() => {
    if (props.state === 'pending') {
        return props.uploadProgress != undefined && props.uploadProgress.percentage < 100
    } else return false
})

function download() {
    // TODO: 下载的文件名为原始上传文件名，而非 OSS 后台保存的对象名
    useDownload(
        props.content.rawMessage ? URL.createObjectURL(props.content.rawMessage) : props.content.mediaUrl || '',
        props.content.name || ''
    )
}

function formatBytes(bytes: number | string, decimals = 2) {
    let _bytes: number = typeof bytes === 'string' ? Number(bytes) : bytes
    if (_bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['字节', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(_bytes) / Math.log(k))
    return parseFloat((_bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
</script>

<style lang="scss">
.chat-message-file {
    .q-img__content {
        @apply rounded overflow-hidden;

        .chat-message-file-img-drop {
            padding: 0;
            width: 200%;
            height: 200%;
            transform: translate(-25%, -25%);
            opacity: 0.5;
        }
    }
}
</style>
