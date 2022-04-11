<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <dialog-content-layout style="height: 600px; width: 640px; max-width: 640px" no-head class="q-dialog-plugin">
            <div class="h-full flex px-5 space-x-5">
                <!-- 左半边 -->
                <q-scroll-area class="w-1/2">
                    <div
                        v-if="profileStore.myProfile?.staffInfo"
                        @click="isSelectingFromOA ? (isSelectingFromOA = false) : (isSelectingFromOA = true)"
                        class="mr-4 mb-1 p-3 rounded-md grid items-center cursor-pointer"
                        :class="isSelectingFromOA ? 'bg-gray-4' : 'bg-gray-1'"
                        style="grid-template-columns: 30px 1fr 18px; gap: 10px"
                    >
                        <q-img :src="require('theme/icons/default-avatar-oa.svg')" no-spinner />
                        <div>
                            <p>从组织架构选择</p>
                            <p class="text-subtle text-sm">{{ profileStore.myProfile.staffInfo.entName }}</p>
                        </div>
                        <q-icon :name="isSelectingFromOA ? 'cancel' : 'more_vert'" color="subtle" size="18px"></q-icon>
                    </div>

                    <AddMemberFromNormalVue v-show="!isSelectingFromOA" v-model="selected" />
                    <AddMemberFromOaVue ref="oaIframe" v-show="isSelectingFromOA" v-model="selected" />
                </q-scroll-area>
                <!-- 右半边 -->
                <div class="w-1/2 h-full flex flex-col">
                    <div class="flex-grow">
                        <h6 class="h-10 leading-10 font-medium">添加成员</h6>
                        <div
                            v-for="profile in selectedProfiles"
                            :key="profile.id"
                            class="h-13 flex items-center space-x-2.5"
                        >
                            <q-avatar rounded size="30px">
                                <q-img :src="profile.avatar" no-spinner no-transition></q-img>
                            </q-avatar>
                            <span class="flex-grow">{{ profile.displayName }}</span>
                            <button @click="deleteMember(profile.id)">
                                <i class="iconfont text-3xl text-gray-5 float-right">&#xe607;</i>
                            </button>
                        </div>
                    </div>
                    <q-card-actions align="right" class="p-0 mb-4 pt-5 space-x-5">
                        <base-btn @click="onDialogCancel" outline padding="8px 25px">取消</base-btn>
                        <base-btn
                            @click="addMembers"
                            :disable="Array.from(selected).length === 0"
                            :loading="adding"
                            padding="8px 25px"
                        >
                            添加
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
import { useChatGroupStore } from '@/store/user-chat-group'
import { useProfileStore } from '@/store/user-profile'

import DialogContentLayout from '@/layouts/DialogContentLayout.vue'
import AddMemberFromNormalVue from './AddMemberFromNormal.vue'
import AddMemberFromOaVue from './AddMemberFromOa.vue'

const props = defineProps<{
    hostId: string
    groupId: string
}>()

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()

const profileStore = useProfileStore()
const groupStore = useChatGroupStore()

const isSelectingFromOA = ref(false)
const adding = ref(false)
const selected = ref<Set<string>>(new Set())
const oaIframe = ref<typeof AddMemberFromOaVue | null>(null)

const selectedProfiles = computed(() => {
    return Array.from(selected.value).map((i) => {
        const { userProfile, displayAvatar, displayName } = useUserProfile(i)
        return {
            id: i,
            avatar: displayAvatar.value,
            profile: userProfile.value,
            displayName: displayName.value,
        }
    })
})

async function addMembers() {
    adding.value = true
    try {
        await groupStore.addMembers(props.hostId, props.groupId, Array.from(selected.value))
        onDialogOK()
    } catch (error) {
        console.log(error)
        Notify.create({ message: error instanceof Error ? error.message : (error as string) })
    } finally {
        adding.value = false
    }
}

function deleteMember(id: string) {
    selected.value.delete(id)
    oaIframe.value?.syncSelectedUser()
}
</script>
