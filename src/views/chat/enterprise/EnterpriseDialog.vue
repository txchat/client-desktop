<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" persistent class="enterprise-manage q-dialog__backdrop_dark">
        <div class="flex shadow-none transform translate-x-4">
            <q-card class="rounded-3xl overflow-hidden">
                <iframe
                    ref="insetIframe"
                    :src="'/oa/team/team-frame'"
                    width="375px"
                    height="650px"
                    frameborder="0"
                ></iframe>
            </q-card>
            <i @click="onDialogCancel" class="iconfont p-2 font-normal text-white text-sm pt-1 pr-2 cursor-pointer">
                &#xe626;
            </i>
        </div>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import type { FocusedUser } from '@/utils/bridge'
import { useH5Bridge } from '@/utils/bridge'
import { useEventListener, whenever } from '@vueuse/core'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()

const insetIframe = ref<HTMLIFrameElement | null>(null)
whenever(insetIframe, () => {
    const contentWindow = insetIframe.value?.contentWindow
    contentWindow && useH5Bridge(contentWindow)
})

useEventListener('message', ({ data }: MessageEvent) => {
    // 显示一个员工的详细资料
    if (data.method === 'focusUser') {
        onDialogOK((data.body as FocusedUser).id)
    }
})
</script>

<style lang="scss" scoped>
.enterprise-manage .q-dialog__inner > div {
    box-shadow: none;
}
</style>
