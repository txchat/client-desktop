<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" class="q-dialog__transparent_backdrop">
        <q-card class="q-dialog-plugin py-7">
            <q-card-section class="pb-7">
                <h3 class="text-center font-bold">修改群名</h3>
            </q-card-section>

            <q-card-section class="pb-2.5">
                <div class="bg-gray-1 px-5 pt-1.5 rounded-md">
                    <div class="text-xs text-subtle">
                        <span>加密群名</span>
                        <span class="float-right">{{ encryptedName.length }}/20</span>
                    </div>
                    <q-input
                        v-model="encryptedName"
                        borderless
                        class="py-2"
                        input-class="placeholder-gray-500 py-0"
                        maxlength="20"
                        dense
                    />
                </div>
            </q-card-section>

            <q-card-section class="pb-7.5">
                <div class="bg-gray-1 px-5 pt-1.5 rounded-md mb-2.5">
                    <div class="text-xs text-subtle">
                        <span>公开群名</span>
                        <span class="float-right">{{ publicName.length }}/20</span>
                    </div>
                    <q-input
                        v-model="publicName"
                        borderless
                        class="py-2"
                        input-class="placeholder-gray-500 py-0"
                        maxlength="20"
                        dense
                    />
                </div>
                <p class="pl-5 text-sm text-primary">加密群名仅群成员可见</p>
            </q-card-section>

            <q-card-actions align="center" class="mx-5 px-0">
                <base-btn @click="onDialogCancel" class="flex-grow mr-4 h-10" outline>取消</base-btn>
                <base-btn @click="modifyGroupName" :disable="!encryptedName || !publicName" class="flex-grow h-10">
                    修改
                </base-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Notify, useDialogPluginComponent } from 'quasar'
import { ChatGroup } from '@/types/user-chat-group'
import { useChatGroupStore } from '@/store/user-chat-group'

const props = defineProps<{
    groupInfo: ChatGroup
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const chatGroupStore = useChatGroupStore()
const encryptedName = ref(props.groupInfo.name)
const publicName = ref(props.groupInfo.publicName)

async function modifyGroupName() {
    try {
        await chatGroupStore.updateGroupName(
            props.groupInfo.host,
            props.groupInfo.id,
            // 如果 name 未修改, 则传空字符串, 否则加密后的字符串会不同, 导致发送通知
            encryptedName.value === props.groupInfo.name ? '' : encryptedName.value,
            publicName.value
        )
        onDialogOK()
    } catch (error) {
        Notify.create(error instanceof Error ? error.message : (error as string))
    }
}
</script>
