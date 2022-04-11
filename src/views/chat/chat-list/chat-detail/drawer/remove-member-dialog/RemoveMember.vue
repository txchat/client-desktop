<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <dialog-content-layout style="height: 600px; width: 640px; max-width: 640px" no-head class="q-dialog-plugin">
            <div class="h-full flex px-5 space-x-5">
                <!-- 左半边 -->
                <q-scroll-area class="w-1/2">
                    <MemberItemVue
                        v-for="(member, i) in membersProfiles"
                        :key="i"
                        :label="member.label"
                        :avatar="member.avatar"
                        :modelValue="selected.has(member.id)"
                        @update:model-value="
                            selected.has(member.id) ? selected.delete(member.id) : selected.add(member.id)
                        "
                    />
                </q-scroll-area>
                <!-- 右半边 -->
                <div class="w-1/2 h-full flex flex-col">
                    <div class="flex-grow">
                        <h6 class="h-10 leading-10 font-medium">移除成员</h6>
                        <div v-for="profile in removeList" :key="profile.id" class="h-13 flex items-center space-x-2.5">
                            <q-avatar rounded size="30px">
                                <q-img :src="profile.avatar" no-spinner no-transition></q-img>
                            </q-avatar>
                            <span class="flex-grow">{{ profile.label }}</span>
                            <button @click="removeMemberFromList(profile.id)">
                                <i class="iconfont text-3xl text-gray-5 float-right">&#xe607;</i>
                            </button>
                        </div>
                    </div>
                    <q-card-actions align="right" class="p-0 mb-4 pt-5 space-x-5">
                        <base-btn @click="onDialogCancel" outline padding="8px 25px">取消</base-btn>
                        <base-btn
                            @click="remove"
                            :disable="Array.from(selected).length === 0"
                            :loading="removing"
                            padding="8px 25px"
                        >
                            移除
                        </base-btn>
                    </q-card-actions>
                </div>
            </div>
        </dialog-content-layout>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Notify, useDialogPluginComponent } from 'quasar'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { ChatGroupMember } from '@/types/user-chat-group'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useProfileStore } from '@/store/user-profile'

import MemberItemVue from '../add-member-dialog/MemberItem.vue'
import DialogContentLayout from '@/layouts/DialogContentLayout.vue'

const props = defineProps<{
    hostId: string
    groupId: string
    members: ChatGroupMember[]
}>()

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()

const groupStore = useChatGroupStore()
const profileStore = useProfileStore()

const removing = ref(false)
const selected = ref<Set<string>>(new Set())

const membersProfiles = computed(() => {
    return props.members
        .filter((member) => member.memberId !== profileStore.myProfile?.address)
        .map((member) => {
            const { displayAvatar, displayName } = useUserProfile(member.memberId)
            return {
                id: member.memberId,
                label: displayName.value,
                avatar: displayAvatar.value,
            }
        })
})

const removeList = computed(() => membersProfiles.value.filter((member) => selected.value.has(member.id)))

async function remove() {
    removing.value = true
    try {
        await groupStore.removeMembers(props.hostId, props.groupId, Array.from(selected.value))
        onDialogOK()
        Notify.create('用户已被移出群聊')
    } catch (error) {
        console.log(error)
        Notify.create({ message: error instanceof Error ? error.message : (error as string) })
    } finally {
        removing.value = false
    }
}

function removeMemberFromList(id: string) {
    selected.value.delete(id)
}
</script>
