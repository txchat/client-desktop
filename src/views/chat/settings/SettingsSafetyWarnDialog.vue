<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
        <q-card class="q-dialog-plugin p-4" style="width: 400px">
            <q-card-section class="flex justify-between items-center">
                <i class="w-9"> </i>
                <span class="font-bold text-base">备份助记词</span>
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
                <p>您没有备份助记词，可通过绑定手机/邮箱和密聊密码加密上传至官方服务器，提供助记词找回服务。</p>
                <p class="text-negative">
                    为了您的账户安全，请务必自行备份或加密上传助记词，也可前往【安全管理】进行操作。
                </p>
            </q-card-section>

            <q-card-actions align="center">
                <base-btn @click="onDialogOK('phone')" class="flex-grow">绑定手机</base-btn>
                <i class="w-4"></i>
                <base-btn @click="onDialogOK('email')" class="flex-grow">绑定邮箱</base-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { useDialogPluginComponent } from 'quasar'
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
</script>
