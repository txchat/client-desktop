<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" class="q-dialog__backdrop_dark">
        <q-card class="q-dialog-plugin">
            <q-card-section class="flex flex-col justify-center h-20 px-4">
                <h3 class="text-center font-bold">
                    <span class="w-5 float-left font-normal text-subtle text-sm pt-1 pr-2 opacity-0"></span>
                    加入团队
                    <i
                        @click="onDialogCancel"
                        class="iconfont float-right font-normal text-subtle text-sm pt-1 pr-2 cursor-pointer"
                    >
                        &#xe626;
                    </i>
                </h3>
            </q-card-section>

            <q-card-section class="px-8">
                请打开谈信手机app，加入团队。也可扫描下方二维码下载，体验安全感团队。
            </q-card-section>

            <q-card-section class="text-center my-8">
                <q-img :src="require('theme/icons/qrcode.png')" width="113px"></q-img>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
</script>
