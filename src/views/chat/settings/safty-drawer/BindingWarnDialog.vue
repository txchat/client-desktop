<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin pb-3">
            <q-card-section class="flex justify-between items-center">
                <i class="w-9"> </i>
                <span class="font-bold text-base">提示</span>
                <base-btn
                    @click="onDialogCancel"
                    class="float-right"
                    icon="close"
                    round
                    size="13px"
                    padding="5px"
                    flat
                    color="subtle"
                ></base-btn>
            </q-card-section>
            <q-card-section class="text-base">
                该{{
                    bindType === 'phone' ? '手机号' : '邮箱'
                }}已绑定过其他助记词账户，是否解除原绑定并重新绑定本地助记词账户？
            </q-card-section>
            <q-card-actions align="center">
                <base-btn @click="onDialogCancel" class="w-28 mr-4" outline padding="6px 16px"> 取消 </base-btn>
                <base-btn @click="onDialogOK('email')" class="w-28"> 解除并绑定 </base-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
defineProps<{
    bindType: 'phone' | 'email'
}>()
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
</script>
