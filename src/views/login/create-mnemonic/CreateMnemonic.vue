<template>
    <login-with-mnemonic-template title="创建助记词" @dismiss="$emit('dismiss')">
        <div class="space-y-3">
            <div class="flex">
                <base-btn @click="lang = 'cn'" :color="lang === 'cn' ? 'primary' : 'subtle'" class="mr-1" flat>
                    中文
                </base-btn>
                <base-btn @click="lang = 'en'" :color="lang === 'en' ? 'primary' : 'subtle'" no-caps flat>
                    English
                </base-btn>
                <q-space />
                <base-btn @click="switchMnemonicLang" text-color="primary" color="secondary"> 更换助记词 </base-btn>
            </div>

            <MnemonicDisplayerVue :mnemonic="lang === 'cn' ? cnMnemonic : enMnemonic" :lang="lang" class="h-24 px-8" />

            <p class="text-primary text-xs">
                提示：请妥善保管好助记词！如果有人获取你的助记词将直接获取你的账户信息/资产！<br />
                请抄写下助记词并存放在安全的地方，选择开始校验将在下一屏进行验证助记词。
            </p>

            <div class="space-x-4 pt-6">
                <base-btn @click="showVerifyMnemonic = true" class="w-36 h-10" :disable="registing" outline>
                    开始校验
                </base-btn>
                <base-btn @click="skipVerify" :disable="registing" :loading="registing" class="w-36 h-10">
                    跳过校验
                </base-btn>
            </div>
        </div>

        <transition name="slide">
            <VerifyMnemonicVue
                v-if="showVerifyMnemonic"
                @dismiss="showVerifyMnemonic = false"
                :lang="lang"
                :mnemonic="lang === 'cn' ? cnMnemonic : enMnemonic"
            />
        </transition>
    </login-with-mnemonic-template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { seed } from '@33cn/wallet-base'
import { useAccount } from '@/composables/user/useAccount'
import VerifyMnemonicVue from './VerifyMnemonic.vue'
import MnemonicDisplayerVue from '@/components/MnemonicDisplayer.vue'
import LoginWithMnemonicTemplate from '../LoginWithMnemonicTemplate.vue'

defineEmits(['dismiss'])

// mnemonic
const cnMnemonic = ref(seed.newMnemonicInCN())
const enMnemonic = ref(seed.newMnemonic(0, 128))

// switch lang
const lang = ref<'cn' | 'en'>('cn')
function switchMnemonicLang() {
    if (lang.value === 'cn') cnMnemonic.value = seed.newMnemonicInCN()
    else enMnemonic.value = seed.newMnemonic(0, 128)
}

// verify
const showVerifyMnemonic = ref(false)

// register
const accountOps = useAccount()
const { registing } = accountOps
async function skipVerify() {
    const mne = lang.value === 'cn' ? cnMnemonic.value : enMnemonic.value
    await accountOps.register(mne, undefined, true)
}
</script>
