<template>
    <q-img
        @click="emitClick"
        ref="qimg"
        :src="imgSrc || undefined"
        :ratio="imgRatio"
        :width="width || '150px'"
        class="bg-white relative rounded-md"
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
        </transition>

        <slot name="menu"></slot>
    </q-img>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QImg } from 'quasar'
import { dtalk } from '@/utils/message-codec/protobuf'
import { Message, UploadProgress } from '@/types/user-chat'

type ImageContent = dtalk.proto.IImageMsg & {
    rawMessage?: File
}

const props = defineProps<{
    content: ImageContent
    fromMyself?: boolean
    width?: string
    uploadProgress?: UploadProgress
    state?: Message['state']
}>()

const emit = defineEmits<{
    (e: 'click-image', el: HTMLElement): void
}>()

const qimg = ref<QImg | null>(null)

const imgSrc = computed(() => {
    if (props.content.rawMessage) return URL.createObjectURL(props.content.rawMessage)
    else return props.content.mediaUrl
})

const imgRatio = computed(() => {
    if (props.content.width && props.content.height) return props.content.width / props.content.height
    else return 1
})

const showProgress = computed(() => {
    if (props.state === 'pending') {
        return props.uploadProgress != undefined && props.uploadProgress.percentage < 100
    } else return false
})

function emitClick() {
    if (!qimg.value) return
    emit('click-image', qimg.value.$el)
}
</script>
