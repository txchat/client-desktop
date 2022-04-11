<template>
    <login-with-mnemonic-template-vue title="导入助记词">
        <div class="space-y-3">
            <div class="flex items-center">
                <base-btn @click="lang = 'cn'" :color="lang === 'cn' ? 'primary' : 'subtle'" class="mr-1" flat>
                    中文
                </base-btn>
                <base-btn @click="lang = 'en'" :color="lang === 'en' ? 'primary' : 'subtle'" no-caps flat>
                    English
                </base-btn>
                <q-space />
                <p class="text-xs text-subtle">
                    {{
                        lang === 'cn' ? '请输入中文助记词，以 3 个字为一组' : '请输入英文助记词，每个单词之间用空格隔开'
                    }}
                </p>
            </div>

            <div class="bg-gray-1 text-dark h-24 px-8 rounded-md flex flex-col justify-center">
                <div v-if="lang === 'cn'" class="w-full">
                    <CnMnemonicInputVue @update:cnMnemonic="(val) => (cnMnemonic = val)" />
                </div>
                <div v-else>
                    <EnMnemonicInputVue @update:enMnemonic="(val) => (enMnemonic = val)" />
                </div>
            </div>

            <p class="text-primary text-xs">支持导入所有遵循BIP标准生成的助记词</p>

            <div>
                <base-btn @click="startImporting" :disable="disableImportBtn" :loading="loading" class="w-72 h-10 mt-5">
                    开始导入
                </base-btn>
            </div>
        </div>
    </login-with-mnemonic-template-vue>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { seed } from '@33cn/wallet-base'
import { isAllChinese } from '@/utils/is-all-chinese'
import { useAccountStore } from '@/store/user-account'
import { getFromChain } from '@/store/user-chat-server'
import { useAccount } from '@/composables/user/useAccount'
import { generateAccount } from '@/utils/account/generateAccount'
import CnMnemonicInputVue from './ImportMnemonicCnInput.vue'
import EnMnemonicInputVue from './ImportMnemonicEnInput.vue'
import LoginWithMnemonicTemplateVue from '../LoginWithMnemonicTemplate.vue'

// lang
const lang = ref<'cn' | 'en'>('cn')

// mnemonic
const enMnemonic = ref('')
const cnMnemonic = ref('')
/** 中文助记词的每个汉字的中间加上空格 */
const spacedCnMnemonic = computed(() => {
    // 先确保没有任何空格
    let _str = ''
    for (let i = 0; i < cnMnemonic.value.length; i++) if (cnMnemonic.value[i] !== ' ') _str += cnMnemonic.value[i]

    // 再每隔一个汉字加一个空格
    let output = ''
    for (let i = 0; i < _str.length; i++) output += `${_str[i]} `

    return output.trim()
})

// btn control
const disableImportBtn = computed(() => {
    if (lang.value === 'cn') {
        if (cnMnemonic.value.length === 15 && isAllChinese(cnMnemonic.value)) return false
    } else {
        const words = enMnemonic.value.split(' ')
        if (words.length === 12 && words.every((w) => w)) return false
    }
    return true
})

// register or login
const quasar = useQuasar()
const accountOps = useAccount()
const accountStore = useAccountStore()
const loading = ref(false)
async function startImporting() {
    if (!validMne()) return
    loading.value = true

    const mne = lang.value === 'cn' ? spacedCnMnemonic.value : enMnemonic.value
    const account = generateAccount(mne)

    // 查询有无对应的服务器分组，若有，说明是之前注册过的用户
    getFromChain(account)
        .then((servers) => {
            if (!servers.length) return accountOps.register(mne)
            else accountStore.login(account, '导入助记词')
        })
        .finally(() => (loading.value = false))
}

function validMne(): boolean {
    const validCnMne = lang.value === 'cn' && seed.validateMnemonicInCN(spacedCnMnemonic.value)
    const validEnMne = lang.value === 'en' && seed.validateMnemonicInEN(enMnemonic.value)

    if (lang.value === 'cn') {
        if (validCnMne) return true
    } else {
        if (validEnMne) return true
    }

    quasar.notify('无效的助记词')
    return false
}
</script>
