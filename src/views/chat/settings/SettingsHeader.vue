<template>
    <div class="flex mb-12">
        <q-avatar rounded size="240px">
            <q-img :src="avatar || require('theme/icons/default-avatar.svg')" height="240px" />
        </q-avatar>
        <div class="px-5" style="min-width: 450px">
            <h1 class="text-2xl font-bold mb-2.5 mt-12 cursor-pointer break-all line-clamp-1">
                <span v-if="!nickname || nickname === address">
                    请设置昵称
                    <i class="iconfont text-subtle text-sm ml-1">&#xe631;</i>
                </span>
                <span v-else>{{ truncate(nickname || address) }}</span>
                <q-popup-edit
                    v-model="nickname"
                    @save="changeNickname"
                    :validate="nicknameValidation"
                    buttons
                    v-slot="scope"
                >
                    <h3 class="py-4 font-bold">修改昵称</h3>
                    <q-input
                        v-model="scope.value"
                        outlined
                        autofocus
                        @keyup.enter="scope.set"
                        :error="errorNickname"
                        :error-message="errorMessageNickname"
                    />
                </q-popup-edit>
            </h1>
            <div v-if="!require('themeConfig').hideAddress" class="mb-5">账号: {{ accountStore.account?.address }}</div>
            <div class="flex justify-between items-start">
                <base-btn @click="logout" padding="10px 20px">退出登录</base-btn>
                <div @click="downloadQrCode" class="text-center cursor-pointer">
                    <p class="text-xs text-subtle">点击二维码保存图片</p>
                    <div class="p-2 bg-gray-2 rounded">
                        <QrcodeVue ref="qrcodeElement" :value="'https://3syxin.com/?uid=' + address" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed, ComponentPublicInstance } from 'vue'
import { Notify } from 'quasar'
import QrcodeVue from 'qrcode.vue'
import { truncate } from '@/utils/string-truncate'
import { useAccountStore } from '@/store/user-account'
import { useProfileStore } from '@/store/user-profile'
import { useAccount } from '@/composables/user/useAccount'

const accountStore = useAccountStore()
const address = accountStore.account!.address
const profile = toRef(useProfileStore().userProfiles, address)

const { logout } = useAccount()

const nickname = computed({
    get: () => profile.value?.nickname,
    set: (val) => {
        if (!profile.value || !val) return
        profile.value.nickname = val
    },
})
const avatar = computed({
    get: () => profile.value?.avatar,
    set: (val) => {
        if (!profile.value || !val) return
        profile.value.avatar = val
    },
})

function changeNickname(value: string) {
    accountStore
        .changeNickname(value)
        .then(() => Notify.create('修改昵称中，请耐心等待，稍后查看结果...'))
        .catch((res) => Notify.create(res instanceof Error ? res.message : (res as string)))
}

// 二维码
function downloadQrCode() {
    const a = document.createElement('a')
    a.href = (qrcodeElement.value?.$el as HTMLCanvasElement).toDataURL()
    a.download = nickname.value + '的二维码'
    a.click()
}
const qrcodeElement = ref<undefined | ComponentPublicInstance>(undefined)

const errorNickname = ref(false)
const errorMessageNickname = ref('')
function nicknameValidation(val: string) {
    if (!val.trim().length) {
        errorNickname.value = true
        errorMessageNickname.value = '昵称不能为空'
        return false
    }
    if (val.length > 20) {
        errorNickname.value = true
        errorMessageNickname.value = '昵称须少于 20 个字符'
        return false
    }
    errorNickname.value = false
    errorMessageNickname.value = ''
    return true
}
</script>
