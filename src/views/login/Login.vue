<template>
    <div class="login-container h-full flex flex-col" @click="showSelectServerDrawer = false">
        <div class="text-right">
            <base-btn @click.stop="showSelectServerDrawer = true" :icon="'img:' + require('icons/server.svg')" flat>
                <span class="ml-2">选择服务器</span>
            </base-btn>
        </div>

        <div class="text-center pt-2.5 pb-8">
            <q-img :src="require('theme/images/login-illustration.png')" height="250px" fit="contain" no-spinner />
        </div>

        <!-- 创建/导入助记词 -->
        <div class="mnemonic-login-container p-7 text-white flex items-center mb-5">
            <div class="py-1 flex flex-col justify-between">
                <h5 class="text-2xl font-semibold">助记词账户</h5>
                <p class="text-xs">请通过助记词注册账户</p>
            </div>
            <q-space />
            <div class="space-x-4">
                <base-btn @click="enterWithMnemonic('create')" color="white" text-color="dark"> 创建账户 </base-btn>
                <base-btn @click="enterWithMnemonic('import')">导入账户</base-btn>
            </div>
        </div>

        <!-- 使用手机号/邮箱，找回助记词登录 -->
        <div class="retrieve-login-conatiner text-white flex justify-between items-center px-7">
            <h5 class="text-2xl font-semibold">手机号/邮箱</h5>
            <base-btn @click="enterWithMnemonic('retrieve')" class="opacity-80" color="whtie" flat>
                找回助记词登录
                <q-avatar class="ml-3" color="white" size="xs">
                    <q-icon color="primary" name="navigate_next" size="xs" />
                </q-avatar>
            </base-btn>
        </div>

        <q-space />

        <div class="flex justify-center items-center">
            <base-checkbox v-model="licenseAgreed" size="sm" square> 我已阅读并同意 </base-checkbox>
            <a href="/license" target="_blank" class="text-primary">《谈信用户服务协议》</a>
        </div>
    </div>

    <!-- 选择服务器窗口 -->
    <transition name="slide">
        <SelectServerVue v-if="showSelectServerDrawer" @click.stop="() => {}" />
    </transition>

    <!-- 创建助记词账户界面 -->
    <transition name="slide">
        <CreateMnemonicVue v-if="showCreateMnemonic" @dismiss="showCreateMnemonic = false" />
    </transition>

    <!-- 导入助记词账户界面 -->
    <transition name="slide">
        <ImportMnemonicVue v-if="showImportMnemonic" @dismiss="showImportMnemonic = false" />
    </transition>

    <!-- 使用手机号/邮箱，找回助记词登录界面 -->
    <transition name="fade">
        <RetrieveMnemonicVue v-if="showRetrieveMnemonic" @dismiss="showRetrieveMnemonic = false" />
    </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { setTitle } from '@/utils/title'
import { useInitialChatServerUrlStore } from '@/urls/initial-chat-server'
import { useChainNodeUrlStore } from '@/urls/chain-node'

import SelectServerVue from './select-server/SelectServer.vue'
import CreateMnemonicVue from './create-mnemonic/CreateMnemonic.vue'
import ImportMnemonicVue from './import-mnemonic/ImportMnemonic.vue'
import RetrieveMnemonicVue from './retrieve-mnemonic/RetrieveMnemonic.vue'

// 页面标题
setTitle('登录')

/**
 * 控制界面跳转
 */
const showSelectServerDrawer = ref(false)
const showCreateMnemonic = ref(false)
const showImportMnemonic = ref(false)
const isMobilePageHome = require('themeConfig').entryPage === 'mobile' // 读取主题设置, 绑定手机页面是否为首页
const showRetrieveMnemonic = ref(isMobilePageHome || false)

const quasar = useQuasar()
function enterWithMnemonic(page: 'create' | 'import' | 'retrieve') {
    if (!licenseAgreed.value) {
        quasar.notify({
            message: '请先阅读并同意《谈信用户服务协议》',
            actions: [{ icon: 'close', color: 'white', round: true, dense: true }],
            timeout: 5000,
        })
        return
    }

    if (!useInitialChatServerUrlStore().current || !useChainNodeUrlStore().current) {
        quasar.notify({
            message: '未发现官方的聊天服务器和区块链节点，请刷新重试，或自行添加服务或节点',
            actions: [{ icon: 'close', color: 'white', round: true, dense: true }],
            timeout: 5000,
        })

        return
    }

    if (page === 'create') showCreateMnemonic.value = true
    else if (page === 'import') showImportMnemonic.value = true
    else if (page === 'retrieve') showRetrieveMnemonic.value = true
}

/** 同意服务条款 */
const licenseAgreed = ref(true)
</script>

<style scoped lang="scss">
.login-container {
    padding: 45px 150px;

    .mnemonic-login-container {
        background-image: url(~@/assets/images/login-mnemonic.svg);
        height: 120px;
        width: 660px;
    }

    .retrieve-login-conatiner {
        background-image: url(~@/assets/images/login-retrieve.svg);
        height: 70px;
        width: 660px;
    }
}
</style>
