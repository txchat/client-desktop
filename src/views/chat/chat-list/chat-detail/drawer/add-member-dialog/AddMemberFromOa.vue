<template>
    <div class="pt-1">
        <iframe
            ref="insetIframe"
            src="/oa/team/selector?type=multiple&excludeSelf=true"
            width="100%"
            height="494px"
            frameborder="0"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener, useVModel } from '@vueuse/core'
import { PostedMessage, useH5Bridge, Method } from '@/utils/bridge'

const props = defineProps<{
    modelValue: Set<string>
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: Set<string>): void
}>()

const selected = useVModel(props, 'modelValue', emit)
let _postMessage: <T>(method: Method, body: T) => void

const insetIframe = ref<HTMLIFrameElement | null>(null)
onMounted(() => {
    if (insetIframe.value?.contentWindow) {
        const targetWindow = insetIframe.value?.contentWindow
        _postMessage = useH5Bridge(targetWindow).postMessage
    }
})

function syncSelectedUser() {
    _postMessage('selectUser', Array.from(selected.value))
}

defineExpose({
    syncSelectedUser,
})

// 监听来自子窗口的'更改选中目标'行为
useEventListener('message', ({ data }: MessageEvent<PostedMessage<string | string[]>>) => {
    // 显示一个员工的详细资料
    if (data.method === 'selectUser') {
        if (typeof data.body === 'string') {
            selected.value.add(data.body)
        } else {
            selected.value = new Set(data.body)
        }
    }
})
</script>
