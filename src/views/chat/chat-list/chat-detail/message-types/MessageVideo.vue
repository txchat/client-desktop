<template>
    <q-img
        @click="emitClick"
        ref="qimg"
        :src="posterImgSrc"
        :ratio="posterImgRatio"
        class="bg-white w-36 relative rounded-md"
        :no-spinner="fromMyself"
        spinner-size="md"
        spinner-color="primary"
    >
        <!-- 图片上灰色遮罩 -->
        <transition name="fade">
            <div v-if="showProgress" class="absolute-full flex flex-center">
                <!-- 上传进度圆圈 -->
                <q-circular-progress
                    :value="uploadProgress?.percentage && uploadProgress.percentage * 100"
                    size="45px"
                    :thickness="1"
                    color="white"
                    track-color="grey-6"
                    class="q-ma-md"
                />
            </div>
            <div v-else class="absolute-full flex flex-center">
                <q-avatar :font-size="playButtonSize || '52px'" text-color="white" icon="play_circle" />
            </div>
        </transition>
    </q-img>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QImg } from 'quasar'
import type { UploadProgress } from '@/types/user-chat'
import type { dtalk } from '@/utils/message-codec/protobuf'
import { whenever } from '@vueuse/core'

type ImageContent = dtalk.proto.IVideoMsg & {
    rawMessage?: File
}

const props = defineProps<{
    fromMyself?: boolean
    content: ImageContent
    uploadProgress?: UploadProgress
    state?: 'pending' | 'success' | 'failure' | null
    playButtonSize?: string
}>()

const emit = defineEmits<{
    (e: 'click-video', el: HTMLElement): void
}>()

const qimg = ref<QImg | null>(null)

const posterImgSrc = ref<string | undefined>(undefined)

const stop = whenever(
    () => props.content.rawMessage,
    async (file) => {
        const canvas = await drawVideoToCanvas(URL.createObjectURL(file))
        canvas.toBlob((blob) => {
            blob && (posterImgSrc.value = URL.createObjectURL(blob))
            stop()
        })
    },
    { immediate: true }
)

const posterImgRatio = computed(() => {
    if (props.content.width && props.content.height) return props.content.width / props.content.height
    else return 1
})

const showProgress = computed(() => {
    if (props.state === 'pending') {
        return props.uploadProgress != undefined && props.uploadProgress.percentage < 100
    } else return false
})

/** 绘制缩略图 */
function drawVideoToCanvas(url: string): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const video = document.createElement('video')
        video.crossOrigin = 'anonymous'

        video.onloadedmetadata = () => {
            video.currentTime = 0
        }

        video.onseeked = () => {
            // delay the drawImage call, otherwise we get an empty canvas on iOS
            // see https://stackoverflow.com/questions/44145740/how-does-double-requestanimationframe-work
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    canvas.height = video.videoHeight
                    canvas.width = video.videoWidth
                    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)

                    resolve(canvas)
                })
            })
        }

        video.onerror = () => {
            reject(video.error)
        }

        video.src = url
        video.load()
    })
}

function emitClick() {
    if (!qimg.value) return
    emit('click-video', qimg.value.$el)
}
</script>
