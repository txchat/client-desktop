<template>
    <ItemLayoutVue
        v-for="item in list"
        :key="item.type === 'single' ? item.id : item.id.hostId + '->' + item.id.groupId"
        class=""
        :class="{ 'bg-gray-4': isFocus(item) }"
        :display-avatar="getAvatar(item)"
        @click="handleClickChat(item)"
    >
        <template #mainTxt> {{ getMainTxt(item) }}</template>
        <template #subTxt>
            <Highlighter
                highlightClassName="highlightMark"
                :textToHighlight="getSubTxt(item)"
                :searchWords="item.matchedStr.split(' ')"
                :autoEscape="true"
            />
        </template>
    </ItemLayoutVue>
</template>
<script lang="ts" setup>
import { useChatGroupStore } from '@/store/user-chat-group'
import { useProfileStore } from '@/store/user-profile'
import { tResultOfChatHistorySearch } from '@/types/user-search'
import Highlighter from 'vue-highlight-words'
import { PropType } from 'vue'
import { dtalk } from '@/utils/message-codec/protobuf'

import ItemLayoutVue from './layouts/ItemLayout.vue'
import { truncate } from '@/utils/string-truncate'
import { GroupId } from '@/types/user-chat'

const emit = defineEmits(['click'])
const props = defineProps({
    list: Array as PropType<tResultOfChatHistorySearch[]>,
    focusedChatHistory: {
        type: Object as PropType<[string, string?]>,
    },
})

function isFocus(item: tResultOfChatHistorySearch) {
    if (!props.focusedChatHistory) return false
    if (item.type === 'group') {
        return (
            (item.id as GroupId).hostId === props.focusedChatHistory[1] &&
            (item.id as GroupId).groupId === props.focusedChatHistory[0]
        )
    } else {
        return item.id === props.focusedChatHistory[0]
    }
}

function getAvatar(item: tResultOfChatHistorySearch) {
    if (item.type === 'single') {
        const profile = getUserProfile(item.id as string)
        return profile?.avatar || require('theme/icons/default-avatar.svg')
    } else if (item.type === 'group') {
        const profile = getChatGroupProfile(item.id as GroupId)
        return profile.avatar || require('theme/icons/default-avatar-group.svg')
    }
}

function getMainTxt(item: tResultOfChatHistorySearch) {
    if (item.type === 'single') {
        const profile = getUserProfile(item.id as string)
        return (
            profile?.remark ||
            (profile?.nickname && (profile?.nickname === profile?.address ? false : profile.nickname)) ||
            (profile?.address && truncate(profile.address))
        )
    } else if (item.type === 'group') {
        const profile = getChatGroupProfile(item.id as GroupId)
        return profile.name
    }
}

function getSubTxt(item: tResultOfChatHistorySearch) {
    const bShowDetailMsg = item.matchedMessages.length === 1
    if (bShowDetailMsg) {
        if (item.matchedMessages[0].type === 1)
            return (item.matchedMessages[0].content as dtalk.proto.ITextMsg).content || ''
        else if (item.matchedMessages[0].type === 5)
            return (item.matchedMessages[0].content as dtalk.proto.IFileMsg).name
    } else {
        return item.matchedMessages.length + '条相关聊天记录'
    }
}

function handleClickChat(result: tResultOfChatHistorySearch) {
    emit('click', result)
}

function getUserProfile(id: string) {
    const profileStore = useProfileStore()
    return profileStore.userProfiles[id]
}

function getChatGroupProfile(groupId: GroupId) {
    const chatGroupStore = useChatGroupStore()
    return chatGroupStore.hosts[groupId.hostId][groupId.groupId]
}
</script>
