<template>
    <div class="flex" :class="{ 'justify-end': fromMyself }">
        <div
            @click="togglePlay"
            :class="[
                fromMyself ? 'bg-secondary' : 'bg-white',
                fromMyself ? 'rounded-text-msg-bubble-myself' : 'rounded-text-msg-bubble-opposite',
                { 'flex-row-reverse': !fromMyself },
            ]"
            :style="{ width: audioBarWidth || '0' }"
            class="my-1 py-2 px-3 flex justify-end items-center"
        >
            <div :class="{ 'text-right': fromMyself, 'opacity-0': state === 'pending', 'translate-x-4': fromMyself }">
                {{ content.time }}s
            </div>

            <MessageAudioWaveVue
                :fromMyself="fromMyself"
                :isPlaying="isPlaying"
                :class="{ 'opacity-0': state === 'pending', '-translate-x-2': fromMyself }"
            />
        </div>

        <div
            v-if="showUnreadMark"
            class="rounded-full ml-1 bg-red-500 transform translate-y-1"
            style="width: 6px; height: 6px"
        ></div>
    </div>
    <audio ref="audio" :src="audioSrc"></audio>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import type { dtalk } from '@/utils/message-codec/protobuf'
import MessageAudioWaveVue from './MessageAudioWave.vue'

type AudioContent = dtalk.proto.IAudioMsg & {
    rawMessage?: File
}

const props = defineProps<{
    fromMyself: boolean
    content: AudioContent
    state: 'pending' | 'success' | 'failure' | null
    listened: boolean
}>()

const emit = defineEmits<{
    (e: 'listened'): void
}>()

const isPlaying = ref(false)
const showUnreadMark = ref(props.state === null && !props.fromMyself && !props.listened)
const audio = ref<null | HTMLAudioElement>(null)

let tempUrl: string | undefined
const audioSrc = computed(() => {
    if (props.content.rawMessage) {
        tempUrl = URL.createObjectURL(props.content.rawMessage)
        return tempUrl
    }
    return props.content.mediaUrl || ''
})
onUnmounted(() => tempUrl && URL.revokeObjectURL(tempUrl))

const audioBarWidth = computed(() => {
    // 小于 2 秒时 width 为 90 px, 30 秒时 width 为 350 px
    if (!props.content.time) return
    if (props.content.time < 2) return '90px'
    if (props.content.time > 30) return '350px'
    const k = (350 - 90) / (30 - 2)
    const b = (90 * 15 - 350) / 14
    return k * props.content.time + b + 'px'
})
const togglePlay = () => {
    if (showUnreadMark.value) {
        showUnreadMark.value = false
        emit('listened')
    }
    // 上面的 emit 会导致整个组件 update, 因此需要等 update 完再播放, 否则 src 会变导致播放没声音
    nextTick(() => {
        // 正在播放的，停止
        if (isPlaying.value) {
            if (props.content.mediaUrl) {
                isPlaying.value = false
                audio.value && audio.value.load()
                audio.value && audio.value.pause()
            }
        }
        // 停止的，播放
        else {
            isPlaying.value = true
            setTimeout(() => {
                audio.value && audio.value.play()
            }, 500)
        }
    })
}

onMounted(() => {
    if (audio.value && props.content.mediaUrl) audio.value.load()
    audio.value && audio.value.addEventListener('pause', () => (isPlaying.value = false))
    audio.value && audio.value.addEventListener('ended', () => (isPlaying.value = false))
})
</script>
