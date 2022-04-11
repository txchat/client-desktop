<template>
    <NullEnterpriseVue v-if="notNullEnterprise && !myProfile?.staffInfo" />
    <div v-else class="flex h-full">
        <SideBarVue />

        <div class="flex-grow">
            <ChatListVue v-show="route === 'chat'" />
            <FriendListVue v-show="route === 'friend'" />
            <SettingsVue v-show="route === 'settings'" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, watchPostEffect, defineAsyncComponent } from 'vue'
import { setTitle } from '@/utils/title'
import { storeToRefs } from 'pinia'
import { useRouter } from '@/router'
import { useModulesStore } from '@/urls/modules'
import { useAccountStore } from '@/store/user-account'
import { useProfileStore } from '@/store/user-profile'

import SideBarVue from './SideBar.vue'
import SettingsVue from './settings/Settings.vue'
import ChatListVue from './chat-list/ChatList.vue'
import FriendListVue from './friend-list/FriendList.vue'
const NullEnterpriseVue = defineAsyncComponent(() => import('./NullEnterprise.vue'))

// 页面标题
setTitle('聊天')

// 页面切换
const router = useRouter()
const { route } = toRefs(router)

const accountStore = useAccountStore()

// 加载用户资料
const { account } = storeToRefs(accountStore)
const userProfileStore = useProfileStore()
userProfileStore.load(account.value!.address)
watchPostEffect(() => useModulesStore().finished && account.value && userProfileStore.get(account.value.address))

const notNullEnterprise = require('themeConfig').notNullEnterprise
const { myProfile } = storeToRefs(useProfileStore())
</script>
