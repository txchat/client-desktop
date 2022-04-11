<template>
    <div class="friend-list h-full w-full flex">
        <div class="w-64 h-full bg-gray-2 flex flex-col">
            <SearchBarVue />

            <q-scroll-area class="h-full w-full">
                <SearchResultVue v-if="searchStore.searchValueOfAll.trim() !== ''" />
                <div v-else>
                    <div v-if="staffInfo && enterpriseInfo" class="px-5 py-1">
                        <div class="flex items-center">
                            <q-img
                                :src="enterpriseInfo.avatar || require('theme/icons/default-avatar-oa.svg')"
                                :placeholder-src="require('theme/icons/default-avatar-oa.svg')"
                                :ratio="1"
                                width="40px"
                                height="40px"
                                class="rounded"
                                no-spinner
                            />
                            <div class="pl-2 flex-grow">
                                <p class="flex items-center justify-between">
                                    <span class="break-all line-clamp-1" style="max-width: 100px">
                                        {{ enterpriseInfo.name }}
                                    </span>
                                    <base-btn
                                        v-if="staffInfo.isAdmin"
                                        @click="openEnterpriseManage"
                                        class="float-right"
                                        padding="2px 10px"
                                        flat
                                    >
                                        管理
                                    </base-btn>
                                </p>
                                <div class="text-subtle text-sm break-all line-clamp-1" style="max-width: 160px">
                                    团队号 {{ enterpriseInfo.id }}
                                </div>
                            </div>
                        </div>

                        <div @click="openEnterprise" class="pl-2.5 pr-1 pt-2 h-12 flex items-center cursor-pointer">
                            <q-img :src="require('theme/icons/icon-oa-arch.png')" width="30px" height="30px"></q-img>
                            <span class="ml-2 flex-grow">组织架构</span>
                            <q-icon name="more_vert" color="subtle"></q-icon>
                        </div>
                    </div>
                    <base-expansion-item label="黑名单">
                        <FriendListItemVue
                            v-for="addr in blackList"
                            :key="addr"
                            :user-address="addr"
                            :selected="focusedUser === addr && targetType === 'user'"
                            @click="focusUser(addr)"
                            class="px-5"
                        />
                    </base-expansion-item>
                    <base-expansion-item label="群聊">
                        <GroupListVue
                            :selected="{ hostId: focusedGroup?.hostId, groupId: focusedGroup?.group.id }"
                            @select-group="focusGroup"
                        >
                        </GroupListVue>
                    </base-expansion-item>
                    <base-expansion-item label="好友" default-opend>
                        <FriendListAlphabetizedVue @select-friend="focusUser($event)" />
                    </base-expansion-item>
                </div>
            </q-scroll-area>
        </div>

        <FriendDetailVue v-if="targetType === 'user'" :user-address="focusedUser" class="flex-grow" />
        <GroupDetailVue v-else class="flex-grow"></GroupDetailVue>
    </div>
</template>

<script setup lang="ts">
import { toRefs, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Dialog } from 'quasar'
import { useOaStore } from '@/store/user-oa'
import { useModulesStore } from '@/urls/modules'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'
import { useProfileStore } from '@/store/user-profile'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useUserBlackListStore } from '@/store/user-black-list'
import { ChatGroup } from '@/types/user-chat-group'
import { useSearchStore } from '@/store/user-search'
import { useServer } from '@/composables/user/useServer'

import SearchBarVue from '../search/SearchBar.vue'
import GroupListVue from '@/components/group-list/GroupList.vue'
import FriendListItemVue from '@/components/friend-list/FriendListItem.vue'
import FriendDetailVue from './FriendDetail.vue'
import GroupDetailVue from './GroupDetail.vue'
import EnterpriseDialogVue from '../enterprise/EnterpriseDialog.vue'
import SearchResultVue from '../chat-list/search-result-list/List.vue'
import FriendListAlphabetizedVue from '@/components/friend-list/FriendListAlphabetized.vue'
import { whenever } from '@vueuse/shared'

const searchStore = useSearchStore()
const profileStore = useProfileStore()

// 加载好友列表
const friendStore = useFriendStore()
friendStore.load().then(friendStore.get)

// 加载群聊列表
const chatGroupStore = useChatGroupStore()
chatGroupStore.load()
const { focusedGroup } = storeToRefs(chatGroupStore)

// 加载黑名单
const blackListStore = useUserBlackListStore()
const { blackList } = toRefs(blackListStore)
blackListStore.load().then(blackListStore.get)

// 选择一个用户或群聊
const targetType = ref<'user' | 'group'>('user')
const { focusedUser } = toRefs(friendStore)
function focusUser(address: string) {
    targetType.value = 'user'
    focusedUser.value = address
    profileStore.get(address) // 从区块链获取好友的最新资料
}

function focusGroup(hostId: string, group: ChatGroup) {
    targetType.value = 'group'
    chatGroupStore.focusedGroup = { hostId, group }
    chatGroupStore.getChatGroup(hostId, group.id)
}

function openEnterprise() {
    Dialog.create({
        component: EnterpriseDialogVue,
    }).onOk((address: string) => {
        focusUser(address)
    })
}

function openEnterpriseManage() {
    window.open('/oa-admin', '_blank')
}

const oaStore = useOaStore()
const { enterprise: enterpriseInfo } = toRefs(oaStore)

const moduleStore = useModulesStore()

const staffInfo = computed(() => {
    if (!moduleStore.oaEnabled || !profileStore.myProfile?.staffInfo) return null
    if (!oaStore.enterprise) oaStore.getEnterprise()
    return profileStore.myProfile?.staffInfo || null
})

const { establish } = useServer()
whenever(
    () => moduleStore.oaEnabled && profileStore.myProfile?.staffInfo && useChatStore().chatList,
    () => establish(profileStore.myProfile!.staffInfo!.imServer),
    { immediate: true, flush: 'post' }
)
</script>
