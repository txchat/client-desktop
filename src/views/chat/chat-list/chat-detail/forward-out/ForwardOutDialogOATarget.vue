<template>
    <div class="pt-1">
        <iframe
            ref="insetIframe"
            src="/oa/team/selector?excludeSelf=true"
            width="100%"
            height="494px"
            frameborder="0"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEventListener, useVModel, whenever } from '@vueuse/core'
import { PostedMessage, useH5Bridge } from '@/utils/bridge'
import { ChatType, GroupId } from '@/types/user-chat'

const props = defineProps<{
    modelValue: [ChatType | null, string | GroupId | null]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: ['single', string]): void
}>()

const selected = useVModel(props, 'modelValue', emit)

const insetIframe = ref<HTMLIFrameElement | null>(null)
whenever(insetIframe, () => {
    const contentWindow = insetIframe.value?.contentWindow
    if (contentWindow) {
        const { postMessage: _postMessage } = useH5Bridge(contentWindow)
        // 把本地进行的'更改选中目标'行为告诉子窗口
        watch(
            () => selected.value,
            () => {
                if (selected.value[0] === 'group') {
                    _postMessage('unselectUser', null)
                } else {
                    _postMessage('selectUser', [selected.value[1]])
                }
            }
        )
    }
})

// 监听来自子窗口的'更改选中目标'行为
useEventListener('message', ({ data }: MessageEvent<PostedMessage<string>>) => {
    // 显示一个员工的详细资料
    if (data.method === 'selectUser') {
        if (data.body) {
            selected.value = ['single', data.body]
        }
    }
})
</script>
