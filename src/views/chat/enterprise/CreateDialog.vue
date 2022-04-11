<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" persistent class="q-dialog__backdrop_dark">
        <q-card>
            <i
                @click="onDialogCancel"
                class="iconfont absolute p-2 top-4 right-4 font-normal text-dark text-sm pt-1 pr-2 cursor-pointer"
            >
                &#xe626;
            </i>
            <iframe
                id="inset-iframe-window"
                :src="'/oa/team/create-team'"
                width="375px"
                height="650px"
                frameborder="0"
            ></iframe
        ></q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineEmits } from '@vue/runtime-core'
import { useDialogPluginComponent } from 'quasar'
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
</script>
