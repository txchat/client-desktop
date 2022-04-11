<template>
    <div class="pr-3 h-full flex flex-col">
        <div class="flex items-center">
            <span class="font-bold truncate">{{ displayName }}</span>
            <!-- 修改群信息按钮 -->
            <base-btn
                v-if="[1, 2].includes(groupProfile?.person.memberType || 0)"
                @click="openEditGroupNameDialog"
                round
                color="white"
                text-color="subtle"
                dense
                class="m-1"
            >
                <i class="iconfont text-subtle text-xs">&#xe631;</i>
            </base-btn>
        </div>

        <p class="text-subtle text-sm py-1">群号 {{ groupProfile?.markId }}</p>
        <p v-if="groupProfile?.publicName !== groupProfile?.name" class="text-subtle text-sm py-1">
            公开群名: {{ groupProfile?.publicName }}
        </p>

        <div
            name="群所在的服务器"
            :no-checkbox="true"
            :online="true"
            class="my-2 w-full h-18 bg-gray-1 px-3 rounded-sm flex flex-col justify-center"
        >
            <div>群所在的服务器</div>
            <div class="pt-1 text-sm text-subtle">
                {{ hostId }}
                <span
                    :class="
                        connectionState === 'connected'
                            ? 'bg-positive'
                            : connectionState === 'not-exist'
                            ? 'bg-subtle'
                            : 'bg-negative'
                    "
                    class="ml-1.5 w-2.5 h-2.5 inline-block rounded-md"
                ></span>
            </div>
        </div>

        <q-scroll-area v-if="groupProfile" class="flex-grow pt-2 pr-4">
            <BaseSearchInput v-model="searchValue" class="mb-4" />

            <div
                v-if="
                    !filterdMembers && (groupProfile.joinType === 0 || [1, 2].includes(groupProfile.person.memberType))
                "
                @click="addMembers"
                class="flex items-center h-10 my-1 cursor-pointer"
            >
                <q-avatar size="30px" rounded class="mr-2.5" color="secondary" text-color="primary">
                    <q-icon name="add" />
                </q-avatar>
                <div class="break-all line-clamp-1">添加成员</div>
            </div>

            <div
                v-if="!filterdMembers && [1, 2].includes(groupProfile.person.memberType)"
                @click="removeMembers"
                class="flex items-center h-10 my-1 cursor-pointer"
            >
                <q-avatar size="30px" rounded class="mr-2.5" color="secondary" text-color="primary">
                    <q-icon name="remove" />
                </q-avatar>
                <div class="break-all line-clamp-1">移除成员</div>
            </div>

            <DrawerGroupMemberVue
                v-for="member in filterdMembers || groupProfile?.members"
                :key="member.memberId"
                :member="member"
                :chat-group="groupProfile"
            />
        </q-scroll-area>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { Dialog } from 'quasar'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useGroupProfile } from '@/composables/user/useGroupProfile'
import { debouncedWatch } from '@vueuse/core'
import { ChatGroupMember } from '@/types/user-chat-group'
import { useUserProfile } from '@/composables/user/useUserProfile'
import DrawerGroupNameEditDialogVue from './DrawerGroupNameEditDialog.vue'
import AddMemberVue from './add-member-dialog/AddMember.vue'
import RemoveMemberVue from './remove-member-dialog/RemoveMember.vue'
const DrawerGroupMemberVue = defineAsyncComponent(() => import('./DrawerGroupMember.vue'))

const props = defineProps<{
    /** 群所在的服务器地址 */
    hostId: string
    /** 群 id */
    groupId: string
}>()

const { displayName, groupProfile, connectionState } = useGroupProfile(props)

useChatGroupStore().getMemberList(props.hostId, props.groupId)

function openEditGroupNameDialog() {
    Dialog.create({
        component: DrawerGroupNameEditDialogVue,
        componentProps: { groupInfo: groupProfile.value },
    })
}

// 搜索群成员
const searchValue = ref('')
const filterdMembers = ref<SearchableMember[] | null>(null)

interface SearchableMember extends ChatGroupMember {
    address: string
    nickname?: string
    remark?: string
    groupName?: string
    oaName?: string
}

debouncedWatch(
    searchValue,
    (inputValue) => {
        if (!inputValue || !groupProfile.value || !groupProfile.value.members) {
            filterdMembers.value = null
            return
        }

        const members = groupProfile.value.members
        const searchableMembers = members.map((m) => {
            const { userProfile } = useUserProfile(m.memberId)
            return {
                ...m,
                address: m.memberId,
                nickname: userProfile.value?.nickname,
                remark: userProfile.value?.remark,
                groupName: m.memberName,
                oaName: userProfile.value?.staffInfo?.name,
            } as SearchableMember
        })
        filterdMembers.value = searchableMembers.filter((member) => {
            const { nickname, remark, groupName, oaName, address } = member
            return (
                nickname?.includes(inputValue) ||
                remark?.includes(inputValue) ||
                groupName?.includes(inputValue) ||
                oaName?.includes(inputValue) ||
                address.includes(inputValue)
            )
        })
    },
    { debounce: 400 }
)

function addMembers() {
    Dialog.create({
        component: AddMemberVue,
        componentProps: props,
    }).onOk(() => {
        useChatGroupStore().getMemberList(props.hostId, props.groupId)
    })
}

function removeMembers() {
    Dialog.create({
        component: RemoveMemberVue,
        componentProps: { members: groupProfile.value?.members, ...props },
    }).onOk(() => {
        useChatGroupStore().getMemberList(props.hostId, props.groupId)
    })
}
</script>
