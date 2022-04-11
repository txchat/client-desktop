<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <dialog-content-layout
            :no-close-btn="version.force"
            @hide="onDialogCancel"
            width="400px"
            :style="{
                'background-image': `url(${require('@/assets/images/new-version-available.png')})`,
                'min-height': '300px',
            }"
            close-btn-color="white"
            class="bg-right-top bg-no-repeat"
        >
            <template v-slot>
                <div :style="{ 'margin-top': version.force ? '200px' : '180px' }" class="text-center">
                    <h2 class="font-bold text-xl">发现新版本</h2>
                    <p class="text-primary py-2.5">
                        <span class="mr-8">V{{ version.versionName }} </span>
                        <span>{{ formatBytes(Number(version.size)) }}</span>
                    </p>

                    <ol class="px-5 text-left">
                        <li v-for="(item, index) in version.description" :key="item">{{ index + 1 }}. {{ item }}</li>
                    </ol>
                </div>
            </template>

            <template v-slot:actions>
                <base-btn v-if="!version.force" flat :rounded="false" label="本次忽略" @click="onDialogCancel" />
                <base-btn :rounded="false" label="立即更新" @click="onDialogOK" />
            </template>
        </dialog-content-layout>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import DialogContentLayout from '@/layouts/DialogContentLayout.vue'
import { Version } from '@/types/version'

defineProps<{
    version: Version
}>()
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

/** 字节转为 KB、MB 等 */
function formatBytes(bytes: number, decimals = 1) {
    if (bytes === 0) return '0 KB'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['字节', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
</script>
