<template>
    <div v-if="member.memberType !== 10" @click="openProfileDialog" class="h-10 flex items-center my-1">
        <q-avatar rounded size="30px" class="mr-2.5">
            <q-img
                :src="profileStore.userProfiles[member.memberId]?.avatar || require('theme/icons/default-avatar.svg')"
                fit="contain"
                no-spinner
            ></q-img>
        </q-avatar>
        <div class="break-all line-clamp-1">
            {{ truncate(displayName) }}
        </div>
        <q-space></q-space>
        <q-badge
            v-if="[1, 2].includes(member.memberType)"
            :color="member.memberType === 2 ? 'secondary' : 'orange-light'"
            :text-color="member.memberType === 2 ? 'primary' : 'orange'"
        >
            {{ member.memberType === 2 ? '群主' : '管理员' }}
        </q-badge>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from 'quasar'
import { useProfileStore } from '@/store/user-profile'
import { truncate } from '@/utils/string-truncate'
import { ChatGroup, ChatGroupMember } from '@/types/user-chat-group'
import ChatDetailDialogVue from '../ChatDetailDialog.vue'

const props = defineProps<{
    chatGroup: ChatGroup
    member: ChatGroupMember
}>()

const profileStore = useProfileStore()

if (!(props.member.memberId in profileStore.userProfiles)) {
    profileStore.load(props.member.memberId).then((profile) => {
        if (!profile) profileStore.get(props.member.memberId)
    })
}

const displayName = computed(() => {
    const userProfile = profileStore.userProfiles[props.member.memberId]
    return (
        userProfile?.remark ||
        props.member.memberName ||
        userProfile?.staffInfo?.name ||
        userProfile?.nickname ||
        props.member.memberId
    )
})

function openProfileDialog() {
    profileStore.get(props.member.memberId)
    Dialog.create({
        component: ChatDetailDialogVue,
        componentProps: {
            targetType: 'single',
            targetId: props.member.memberId,
            groupIdOfTargetUser: {
                hostId: props.chatGroup.host,
                groupId: props.chatGroup.id,
            },
        },
    })
}
</script>
