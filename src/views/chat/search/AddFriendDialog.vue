<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="add-friend-card q-dialog-plugin p-7" style="width: 500px">
            <q-card-section class="p-0 flex justify-between">
                <span class="w-4"></span>
                <h1 class="text-base font-bold text-dark">添加好友</h1>
                <base-btn @click="onDialogCancel" color="subtle" flat round size="11px">
                    <i class="iconfont">&#xe626;</i>
                </base-btn>
            </q-card-section>

            <q-card-section class="mt-6 px-0">
                <div class="bg-gray-1 rounded-full pl-2">
                    <q-input
                        v-model="inputValue"
                        @update:model-value="showResult = false"
                        placeholder="搜索账号"
                        borderless
                    >
                        <template v-slot:prepend>
                            <i class="iconfont text-subtle text-2xl">&#xe625;</i>
                        </template>
                        <template v-slot:append>
                            <base-btn @click="searchUser" :loading="searching" padding="3px 16px">
                                查询
                                <template v-slot:loading>
                                    <q-spinner size="xs" />
                                </template>
                            </base-btn>
                        </template>
                    </q-input>
                </div>
            </q-card-section>

            <q-slide-transition>
                <q-card-section v-if="showResult && !result" class="p-0 text-center">
                    <q-img
                        :src="require('@/assets/images/chat-search-user-null.svg')"
                        class="mt-4"
                        height="160px"
                        fit="contain"
                        no-spinner
                        no-transition
                    />
                    <p class="text-xs text-subtle">没有匹配的对象</p>
                </q-card-section>

                <q-card-section v-else-if="showResult && result" class="p-0 text-center">
                    <div class="pt-8">
                        <div class="flex">
                            <q-img
                                :src="result.avatar || require('theme/icons/default-avatar.svg')"
                                height="90px"
                                style="min-width: 90px; max-width: 90px"
                                no-spinner
                                no-transition
                            />

                            <div class="ml-4 text-left overflow-hidden">
                                <h1 class="mb-2.5 text-2xl font-semibold break-words line-clamp-1">
                                    {{ truncate(result.nickname || result.address) }}
                                </h1>

                                <p class="flex">
                                    <span class="text-subtle mr-2.5" style="word-break: keep-all">账号</span>
                                    <span>{{ inputValue }}</span>
                                </p>

                                <p class="flex items-start">
                                    <span class="text-subtle mr-2.5 whitespace-nowrap">备注</span>
                                    <RemarkVue :address="inputValue" />
                                </p>
                            </div>
                        </div>

                        <div class="pt-6">
                            <base-btn v-if="relationship === 'myself'" disabled padding="10px 52px">
                                不可添加自己
                            </base-btn>

                            <base-btn v-else-if="relationship === 'in-blacklist'" disabled padding="10px 52px">
                                在黑名单中
                            </base-btn>

                            <base-btn v-else-if="relationship === 'friend'" @click="sendMessage" padding="10px 52px">
                                发送消息
                            </base-btn>

                            <base-btn
                                v-else-if="relationship === 'stranger'"
                                @click="addFriend"
                                :loading="addingFriend"
                                padding="10px 52px"
                            >
                                加为好友
                            </base-btn>
                        </div>
                    </div>
                </q-card-section>
            </q-slide-transition>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Notify, useDialogPluginComponent, useQuasar } from 'quasar'
import { validate } from 'bitcoin-address-validation'
import { useRouter } from '@/router'
import { useAccountStore } from '@/store/user-account'
import { useChatStore } from '@/store/user-chat'
import { useFriendStore } from '@/store/user-friend'
import { useProfileStore } from '@/store/user-profile'
import type { UserProfile } from '@/types/user-profile'
import { useUserBlackListStore } from '@/store/user-black-list'
import { truncate } from '@/utils/string-truncate'
import RemarkVue from '@/components/Remark.vue'

defineEmits([...useDialogPluginComponent.emits])

const quasar = useQuasar()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const accountStore = useAccountStore()
const friendStore = useFriendStore()
const userProfileStore = useProfileStore()

const inputValue = ref('')

// 搜索
const searching = ref(false)
const showResult = ref(false)
const result = ref<UserProfile | null>(null)
function searchUser() {
    if (!validate(inputValue.value)) {
        Notify.create('输入的账号格式有误, 请检查')
        return
    }

    showResult.value = false
    result.value = null
    searching.value = true

    userProfileStore
        .get(inputValue.value)
        .then((profile) => {
            showResult.value = true
            result.value = profile
        })
        .catch((err: Error | string) => {
            if (err instanceof Error) quasar.notify({ message: err.message })
            else {
                if (/Address Checksum error/i.test(err) || err.includes('Address too short')) showResult.value = true
                else quasar.notify({ message: err })
            }
        })
        .finally(() => (searching.value = false))
}

const relationship = computed<null | 'myself' | 'friend' | 'stranger' | 'in-blacklist'>(() => {
    if (!result.value) return null
    if (result.value.address === accountStore.account!.address) return 'myself'
    if (useUserBlackListStore().blackList.some((addr) => addr === inputValue.value)) return 'in-blacklist'
    if (friendStore.friends && inputValue.value in friendStore.friends) return 'friend'
    else return 'stranger'
})

// 添加好友
const addingFriend = ref(false)
function addFriend() {
    if (!result.value) return
    addingFriend.value = true
    friendStore
        .add(inputValue.value)
        .then(onDialogOK)
        .catch((err) => {
            quasar.notify('添加好友出现失败，请检查您的网络连接')
            console.error(err)
        })
        .finally(() => (addingFriend.value = false))
}

function sendMessage() {
    const router = useRouter()
    router.route = 'chat'
    const chatStore = useChatStore()
    chatStore.focusChat(chatStore.moveTop('single', inputValue.value))
    onDialogCancel()
}
</script>

<style lang="scss">
.add-friend-card .q-field {
    .q-field__control,
    .q-field__marginal {
        height: 30px;
    }
}
</style>
