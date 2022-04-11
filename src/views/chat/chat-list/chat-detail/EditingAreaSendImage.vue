<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section class="text-center">
                <h2 class="font-bold">发送图片</h2>
            </q-card-section>
            <q-card-section class="text-center">
                <q-img
                    :src="imgUrl"
                    :ratio="height && width ? width / height : 1"
                    width="300px"
                    style="max-height: 180px"
                    fit="contain"
                ></q-img>
            </q-card-section>
            <q-card-actions align="right">
                <base-btn flat label="取消" @click="onDialogCancel" />
                <base-btn autofocus flat label="发送" @click="onDialogOK" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const props = defineProps<{
    file: File
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const img = new Image()
const height = ref(0)
const width = ref(0)
const imgUrl = URL.createObjectURL(props.file)
img.src = imgUrl
img.onload = function () {
    height.value = img.height
    width.value = img.width
}
onUnmounted(() => URL.revokeObjectURL(imgUrl))
</script>
