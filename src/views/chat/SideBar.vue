<template>
    <div class="w-18 flex flex-col text-center">
        <!-- 用户头像 -->
        <div class="pt-8 pb-16">
            <q-avatar rounded size="44px">
                <q-img :src="avatar || require('theme/icons/default-avatar.svg')" no-spinner no-transition />
            </q-avatar>
        </div>

        <!-- 聊天按钮 -->
        <div class="pb-6">
            <base-btn
                @click="switchChatView('chat')"
                :color="route === 'chat' ? 'primary' : 'subtle'"
                size="15px"
                flat
                round
            >
                <i class="iconfont text-3xl">&#xe620;</i>
                <q-badge v-if="chatStore.totalUnreadLength" color="red" rounded floating>
                    {{ chatStore.totalUnreadLength }}
                </q-badge>
                <q-tooltip
                    anchor="center right"
                    self="center left"
                    transition-show="fade"
                    transition-hide="fade"
                    :delay="300"
                    :offset="[10, 10]"
                >
                    消息
                </q-tooltip>
            </base-btn>
        </div>

        <!-- 好友按钮 -->
        <div class="pb-6">
            <base-btn
                @click="switchChatView('friend')"
                :color="route === 'friend' ? 'primary' : 'subtle'"
                size="15px"
                flat
                round
            >
                <i class="iconfont text-3xl">&#xe61f;</i>
                <q-tooltip
                    transition-show="fade"
                    transition-hide="fade"
                    anchor="center right"
                    self="center left"
                    :delay="300"
                    :offset="[10, 10]"
                >
                    通讯录
                </q-tooltip>
            </base-btn>
        </div>

        <!-- OKR -->
        <div v-if="profile?.staffInfo">
            <base-btn @click="openOkrDialog" color="subtle" size="15px" flat round>
                <i class="iconfont text-3xl">&#xe632;</i>
                <q-tooltip
                    transition-show="fade"
                    transition-hide="fade"
                    anchor="center right"
                    self="center left"
                    :delay="300"
                    :offset="[10, 10]"
                >
                    OKR
                </q-tooltip>
            </base-btn>
        </div>

        <q-space></q-space>

        <!-- 下载按钮 -->
        <a
            :href="downloadHref"
            target="download"
            class="mx-3 my-5 pt-3 pb-2 rounded cursor-pointer bg-orange-light text-orange flex flex-col"
        >
            <i class="iconfont text-2xl">&#xe7fc;</i>
            <span class="text-sm mt-2">下载</span>
        </a>

        <!-- 设置按钮 -->
        <div class="pb-7 relative">
            <base-btn
                @click="switchChatView('settings')"
                :color="route === 'settings' ? 'primary' : 'subtle'"
                size="15px"
                flat
                round
            >
                <i class="iconfont text-3xl">&#xe61e;</i>

                <q-tooltip
                    anchor="center right"
                    self="center left"
                    transition-show="fade"
                    transition-hide="fade"
                    :delay="300"
                    :offset="[10, 10]"
                >
                    设置
                </q-tooltip>
            </base-btn>
            <span
                v-if="unprotected"
                style="width: 6px; height: 6px"
                class="bg-negative inline-block rounded-full absolute top-2 right-5"
            ></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, toRef, toRefs } from 'vue'
import { useRouter, Tab } from '@/router'
import { useChatStore } from '@/store/user-chat'
import { useAccountStore } from '@/store/user-account'
import { useProfileStore } from '@/store/user-profile'
import { useH5Bridge } from '@/utils/bridge'
import { storeToRefs } from 'pinia'
import { useSafetyStore } from '@/store/user-safety'

const router = useRouter()
const { route } = toRefs(router)

// 加载头像
const address = useAccountStore().account!.address
const profile = toRef(useProfileStore().userProfiles, address)
const avatar = computed(() => profile.value?.avatar)

function switchChatView(page: Tab) {
    route.value = page
}

const chatStore = useChatStore()
const { unprotected } = storeToRefs(useSafetyStore())

function openOkrDialog() {
    const windowReference = window.open('/okrpc', '_blank')
    windowReference && useH5Bridge(windowReference)
}

const downloadHref = process.env.VUE_APP_BASE_URL
</script>
