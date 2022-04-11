<template>
    <div class="drawer">
        <div class="flex-nowrap h-12 m-4">
            <div class="font-bold text-base text-center">导出助记词</div>
        </div>

        <q-carousel
            v-model="slide"
            style="width: 340px"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            control-color="primary"
            class="rounded-borders"
        >
            <q-carousel-slide name="password" class="w-full flex flex-col">
                <password-set-vue v-if="!safetyStore.encryptedMnemonic" @success="slide = 'export'">
                    <p class="text-xs text-subtle mb-3">请先设置密聊密码</p>
                </password-set-vue>
                <div v-else class="flex flex-col">
                    <div class="bg-gray-1 rounded-md">
                        <q-input
                            v-model="password"
                            borderless
                            dense
                            type="password"
                            placeholder="请输入密聊密码"
                            input-class="placeholder-center px-4"
                        >
                        </q-input>
                    </div>
                    <base-btn @click="verify" :disable="!validEditingData" :loading="loading" class="mt-5">
                        确定
                    </base-btn>
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="export" class="flex flex-col">
                <p class="text-xs text-primary mb-4">
                    提示：请妥善保管好助记词！如果有人获取你的助记词将直接获取你的账户信息/资产！
                    请抄写下助记词并存放在安全的地方。
                </p>
                <MnemonicDisplayerVue
                    :mnemonic="mnemonic"
                    :lang="/^[a-z ]+$/.test(mnemonic) ? 'en' : 'cn'"
                    class="p-4"
                />
                <base-btn @click="copyMnemonic" class="mt-8"> 复制 </base-btn>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { whenever } from '@vueuse/shared'
import { useAccountStore } from '@/store/user-account'
import { usePasswordVerify } from '@/composables/user/usePasswordVerify'
import PasswordSetVue from './PasswordSet.vue'
import MnemonicDisplayerVue from '@/components/MnemonicDisplayer.vue'
import { regPassword, useSafetyStore } from '@/store/user-safety'

const quasar = useQuasar()
const accountStore = useAccountStore()

const slide = ref('password')
const { verifyPassword, password, loading } = usePasswordVerify()
const mnemonic = accountStore.localStoredAccount!.mnemonic

const validEditingData = computed(() => {
    return regPassword.test(password.value)
})

async function verify() {
    const correctOldPassword = await verifyPassword()

    if (!correctOldPassword) {
        quasar.notify('密码不正确')
        return
    }

    slide.value = 'export'
}

const safetyStore = useSafetyStore()
whenever(
    () => slide.value === 'export',
    () => {
        safetyStore.saveDoneExportMnemonic()
    }
)

function copyMnemonic() {
    const outputMnemonic = (function () {
        if (/^[a-z ]+$/.test(mnemonic)) {
            // 英文助记词直接导出
            return mnemonic
        }
        const charList = mnemonic.split(' ')
        let output = ''
        charList.forEach((char, i) => {
            if (i && i % 3 === 0) {
                output += ' '
            }
            output += char
        })
        return output
    })()
    navigator.clipboard
        .writeText(outputMnemonic)
        .then(() => quasar.notify('复制成功'))
        .catch(() => {
            quasar.notify('复制失败')
        })
}
</script>
