<template>
    <div class="h-full">
        <q-scroll-area class="h-full py-7" @click="closeAllDrawers">
            <div class="px-15 py-8 flex flex-col">
                <SettingsHeaderVue />
                <SettingsNetworkVue
                    @manage-server="openSelectServer('Server')"
                    @switch-node="openSelectServer('Node')"
                />
                <SettingsSafetyVue
                    @export-mnemonic="openExportMnemonic"
                    @set-password="openSettingPassword"
                    @bind="openBinding($event)"
                />
            </div>
        </q-scroll-area>

        <!-- 选择聊天服务器/区块链节点 -->
        <transition name="slide">
            <SelectServerVue v-if="showSelectServer" :show-node-page="showSelectServer === 'Node'" />
        </transition>

        <!-- 导出助记词 -->
        <transition name="slide">
            <ExportMnemonicVue v-if="showExportMnemonic" />
        </transition>

        <!-- 设置密聊密码 -->
        <transition name="slide">
            <PasswordVue v-if="showSettingPassword" @success="showSettingPassword = false" />
        </transition>

        <!-- 绑定手机号 -->
        <transition name="slide">
            <Binding v-if="showBinding" @success="onBindSuccess" :binding-item="showBinding" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Binding from './safty-drawer/Binding.vue'
import PasswordVue from './safty-drawer/Password.vue'
import SettingsHeaderVue from './SettingsHeader.vue'
import SettingsSafetyVue from './SettingsSafety.vue'
import SettingsNetworkVue from './SettingsNetwork.vue'
import SelectServerVue from './service-drawer/SelectServer.vue'
import ExportMnemonicVue from './safty-drawer/ExportMnemonic.vue'
import { useSafetyStore } from '@/store/user-safety'

const showSelectServer = ref<'Server' | 'Node' | null>(null)
function openSelectServer(v: 'Server' | 'Node' | null) {
    closeAllDrawers()
    showSelectServer.value = v
}

const showSettingPassword = ref(false)
function openSettingPassword() {
    closeAllDrawers()
    showSettingPassword.value = true
}

const showExportMnemonic = ref(false)
function openExportMnemonic() {
    closeAllDrawers()
    showExportMnemonic.value = true
}

const showBinding = ref<'phone' | 'email' | null>(null)
function openBinding(v: 'phone' | 'email' | null) {
    closeAllDrawers()
    showBinding.value = v
}

function closeAllDrawers() {
    showSelectServer.value = null
    showSettingPassword.value = false
    showExportMnemonic.value = false
    showBinding.value = null
}

const safetyStore = useSafetyStore()
function onBindSuccess() {
    showBinding.value = null
    safetyStore.getBindings()
}
</script>
