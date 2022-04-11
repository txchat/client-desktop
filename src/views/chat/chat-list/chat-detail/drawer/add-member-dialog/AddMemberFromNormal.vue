<template>
    <div>
        <BaseSearchInput v-model="searchInputValue" class="mt-3 mb-2 mr-4" />

        <!-- 非搜索状态显示 -->
        <div v-if="!searchInputValue.length">
            <base-expansion-item class="mr-4" label="最近聊天" default-opened>
                <MemberItemVue
                    v-for="(chat, index) in chatList"
                    :key="index"
                    :label="chat.label"
                    :avatar="chat.avatar"
                    :model-value="selected.has(chat.id as string)"
                    @update:model-value="selected.has(chat.id as string)
                        ? selected.delete(chat.id as string)
                        : selected.add(chat.id as string)
                    "
                />
            </base-expansion-item>

            <base-expansion-item class="mr-2" label="好友">
                <friend-list-alphabetized-vue
                    @select-friend="selected.add($event)"
                    same-background-color
                    :item-class="'cursor-pointer'"
                >
                    <template v-slot:default="{ address }">
                        <base-checkbox
                            :model-value="selected.has(address)"
                            @update:model-value="selected.add(address)"
                        ></base-checkbox>
                    </template>
                </friend-list-alphabetized-vue>
            </base-expansion-item>
        </div>

        <!-- 搜索状态显示 -->
        <div v-else>
            <div v-if="friendResult.length">
                <p class="text-subtle text-sm">联系人</p>
                <MemberItemVue
                    v-for="item in friendResult"
                    :key="item.address"
                    :label="item.remark || truncate(item.nickname) || truncate(item.address)"
                    :avatar="item.avatar"
                    :model-value="selected.has(item.address)"
                    @update:model-value="selected.add(item.address)"
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
import { tResultOfFriendSearch } from '@/types/user-search'
import FriendListAlphabetizedVue from '@/components/friend-list/FriendListAlphabetized.vue'
import MemberItemVue from './MemberItem.vue'

const props = defineProps<{
    modelValue: Set<string>
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: Set<string>): void
}>()

const selected = useVModel(props, 'modelValue', emit)
const searchInputValue = ref('')

const chatStore = useChatStore()
/** 最近聊天列表 */
const chatList = computed(() => {
    return chatStore.chatList
        ?.filter((chat) => chat.type === 'single')
        .map((chat) => {
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

const searchStore = useSearchStore()
const friendResult = ref<tResultOfFriendSearch[]>([])

debouncedWatch(
    searchInputValue,
    (value) => {
        if (!value.length) return

        friendResult.value = searchStore.getMatchedFriends(value)
    },
    { debounce: 400 }
)
</script>
