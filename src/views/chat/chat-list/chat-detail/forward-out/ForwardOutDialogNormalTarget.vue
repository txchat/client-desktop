<template>
    <div>
        <BaseSearchInput v-model="searchInputValue" class="mt-3 mb-2 mr-4" />

        <!-- 非搜索状态显示 -->
        <div v-if="!searchInputValue.length">
            <base-expansion-item class="mr-4" label="最近聊天" default-opened>
                <ForwardMessageDialogTargetVue
                    v-for="chat in chatList"
                    :key="chat.type === 'single' ? (chat.id as string) : ((chat.id as GroupId).hostId + '-' + (chat.id as GroupId).groupId)"
                    :label="chat.label"
                    :avatar="chat.avatar"
                    :model-value="
                                    selected[0] === chat.type &&
                                    (chat.type === 'single'
                                        ? (chat.id as string) === selected[1]
                                        : (chat.id as GroupId).hostId === (selected[1] as GroupId).hostId &&
                                          (chat.id as GroupId).groupId === (selected[1] as GroupId).groupId)
                                "
                    @update:model-value="selected = [chat.type, chat.id]"
                />
            </base-expansion-item>

            <base-expansion-item class="mr-2" label="好友">
                <friend-list-alphabetized-vue
                    @select-friend="selected = ['single', $event]"
                    same-background-color
                    :item-class="'cursor-pointer'"
                >
                    <template v-slot:default="{ address }">
                        <base-checkbox
                            :model-value="selected[0] === 'single' && selected[1] === address"
                            @update:model-value="selected = ['single', address]"
                        ></base-checkbox>
                    </template>
                </friend-list-alphabetized-vue>
            </base-expansion-item>

            <base-expansion-item class="mr-2" label="群聊">
                <group-list-vue
                    @select-group="handleSelectGroup"
                    :selected="selected[0] === 'group' ? (selected[1] as GroupId) : {}"
                    same-background-color
                    :item-class="{ 'cursor-pointer': true }"
                >
                    <template v-slot:default="{ hostId, groupId }">
                        <base-checkbox
                            :model-value="
                                        selected[0] === 'group' 
                                            && (selected[1] as GroupId).hostId === hostId 
                                            && (selected[1] as GroupId).groupId === groupId
                                    "
                            @update:model-value="selected = ['group', { hostId: hostId as string, groupId }]"
                        ></base-checkbox>
                    </template>
                </group-list-vue>
            </base-expansion-item>
        </div>

        <!-- 搜索状态显示 -->
        <div v-else>
            <div v-if="friendResult.length">
                <p class="text-subtle text-sm">联系人</p>
                <ForwardMessageDialogTargetVue
                    v-for="item in friendResult"
                    :key="item.address"
                    :label="item.remark || truncate(item.nickname) || truncate(item.address)"
                    :avatar="item.avatar"
                    :model-value="selected[0] === 'single' && selected[1] === item.address"
                    @update:model-value="selected = ['single', item.address]"
                />
            </div>

            <div v-if="groupResult.length">
                <p class="text-subtle text-sm">群聊</p>
                <ForwardMessageDialogTargetVue
                    v-for="item in groupResult"
                    :key="item.host + '-' + item.id"
                    :label="item.name"
                    :avatar="item.avatar"
                    :model-value="
                        selected[0] === 'group' 
                            && (selected[1] as GroupId).hostId === item.host 
                            && (selected[1] as GroupId).groupId === item.id
                    "
                    @update:model-value="selected = ['group', { hostId: item.host, groupId: item.id }]"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { debouncedWatch, useVModel } from '@vueuse/core'
import { useChatStore } from '@/store/user-chat'
import { useSearchStore } from '@/store/user-search'
import { truncate } from '@/utils/string-truncate'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useGroupProfile } from '@/composables/user/useGroupProfile'
import type { ChatType, GroupId } from '@/types/user-chat'
import { tResultOfChatGroupsSearch, tResultOfFriendSearch } from '@/types/user-search'
import { ChatGroup } from '@/types/user-chat-group'
import FriendListAlphabetizedVue from '@/components/friend-list/FriendListAlphabetized.vue'
import GroupListVue from '@/components/group-list/GroupList.vue'
import ForwardMessageDialogTargetVue from './ForwardOutDialogTarget.vue'

const props = defineProps<{
    modelValue: [ChatType | null, string | GroupId | null]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: [ChatType, string | GroupId]): void
}>()

const selected = useVModel(props, 'modelValue', emit)
const searchInputValue = ref('')

const chatStore = useChatStore()
/** 最近聊天列表 */
const chatList = computed(() => {
    return chatStore.chatList?.map((chat) => {
        const profile = chat.type === 'single' ? useUserProfile(chat.id) : useGroupProfile(chat.id)
        return {
            id: chat.id,
            type: chat.type,
            avatar:
                profile.displayAvatar.value ||
                (chat.type === 'single'
                    ? require('theme/icons/default-avatar.svg')
                    : require('theme/icons/default-avatar-group.svg')),
            label: profile.displayName.value,
        }
    })
})

function handleSelectGroup(hostId: string, group: ChatGroup) {
    emit('update:modelValue', ['group', { hostId, groupId: group.id }])
}

const searchStore = useSearchStore()
const friendResult = ref<tResultOfFriendSearch[]>([])
const groupResult = ref<tResultOfChatGroupsSearch[]>([])

debouncedWatch(
    searchInputValue,
    (value) => {
        if (!value.length) return

        friendResult.value = searchStore.getMatchedFriends(value)
        groupResult.value = searchStore.getMatchedChatGroups(value)
    },
    { debounce: 400 }
)
</script>
