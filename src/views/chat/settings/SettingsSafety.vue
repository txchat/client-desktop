<template>
    <div>
        <h1 class="text-base font-bold mb-2.5">安全管理</h1>
        <div class="flex">
            <!-- 助记词备份 -->
            <div class="w-1/3 h-52 p-5 mr-2.5 rounded bg-gray-2 flex flex-col">
                <p class="mb-2.5 flex items-start">
                    <span>备份助记词</span>
                    <span
                        v-if="unprotected"
                        style="width: 6px; height: 6px"
                        class="bg-negative inline-block rounded-full ml-1 mt-0.5"
                    ></span>
                </p>
                <p class="caption leading-4">
                    助记词用于加密聊天消息以及聊天文件，更换设备登录时需导入同一助记词才可查看历史加密消息。
                    请及时导出助记词保存至安全的地方！
                </p>
                <q-space />
                <div>
                    <base-btn @click.stop="$emit('export-mnemonic')" color="secondary" text-color="primary">
                        导出助记词
                    </base-btn>
                </div>
            </div>
            <!-- 设置密码 -->
            <div class="w-1/3 h-52 p-5 mr-2.5 rounded bg-gray-2 flex flex-col">
                <p class="mb-2.5">密聊密码</p>
                <p class="caption leading-4">
                    助记词可通过手机/邮箱和密聊密码加密上传至官方服务器，提供助记词找回服务。
                </p>
                <q-space />
                <div>
                    <base-btn @click.stop="$emit('set-password')" color="secondary" text-color="primary">
                        {{ encryptedMnemonic ? '更改密码' : '设置密码' }}
                    </base-btn>
                </div>
            </div>
            <div class="w-1/3 mr-2.5 space-y-2.5">
                <div class="w-full h-15 p-5 bg-gray-2 flex justify-between items-center">
                    <span>手机号</span>
                    <base-btn v-if="!phone" @click.stop="$emit('bind', 'phone')" color="secondary" text-color="primary">
                        绑定
                    </base-btn>
                    <p v-else class="text-subtle">{{ phone }}</p>
                </div>
                <div class="w-full h-15 p-5 bg-gray-2 flex justify-between items-center">
                    <span class="mr-4 whitespace-nowrap">邮箱</span>
                    <base-btn v-if="!email" @click.stop="$emit('bind', 'email')" color="secondary" text-color="primary">
                        绑定
                    </base-btn>
                    <p v-else class="text-subtle break-all text-right">{{ email }}</p>
                </div>

                <div v-if="isEnv.electron" class="w-full h-15 p-5 bg-gray-2 flex justify-between items-center">
                    <div class="flex items-start">
                        <span class="whitespace-nowrap">版本号</span>
                        <span
                            v-if="updateStore.newVersion"
                            style="width: 6px; height: 6px"
                            class="bg-negative inline-block rounded-full ml-1 mt-0.5"
                        ></span>
                    </div>

                    <div class="flex justify-end items-center space-x-2">
                        <base-btn @click="checkUpdate" padding="4px 10px" color="secondary" text-color="primary">
                            检测更新
                        </base-btn>
                        <p class="text-subtle break-all text-right">{{ version }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from '@/router'
import { isEnv } from '@/utils/env'
import { useUpdateStore } from '@/store/update'
import { Notify } from 'quasar'
import { useSafetyStore } from '@/store/user-safety'
import { useUpdate } from '@/composables/startup'

const emit = defineEmits<{
    (e: 'set-password'): void
    (e: 'export-mnemonic'): void
    (e: 'bind', value: 'phone' | 'email'): void
}>()

const router = useRouter()
const safetyStore = useSafetyStore()
const updateStore = useUpdateStore()

const { phone, email, unprotected, encryptedMnemonic } = storeToRefs(safetyStore)

// 跳转到本页面时判断是否需要弹出某个侧边栏
watchEffect(() => {
    if (router.route === 'settings' && router.backupTarget !== null) {
        emit('bind', router.backupTarget)
        router.backupTarget = null
    }
})

/* global VERSION */
const version = VERSION // vue.confing.js 中由 webpack.DefinePlugin 注入

async function checkUpdate() {
    const res = await useUpdate()
    if (!res) Notify.create('当前已经是最新版本')
}
</script>
