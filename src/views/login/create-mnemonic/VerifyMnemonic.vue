<template>
    <login-with-mnemonic-template title="验证助记词" @dismiss="$emit('dismiss')">
        <div class="space-y-3">
            <div class="text-primary text-xs font-bold">请按顺序点击助记词，以确认你的备份助记词正确！</div>

            <!-- picked words -->
            <div class="min-h-32 p-4 bg-gray-1 rounded-md flex items-start flex-wrap">
                <span
                    v-for="(word, i) in pickedWords"
                    :key="'picked-word-' + i"
                    @click="unpickWord(word, i)"
                    class="px-3 py-2 m-1 rounded-md bg-white text-base flex justify-center items-center cursor-pointer"
                >
                    {{ word }}
                </span>
            </div>

            <!-- word pool -->
            <div class="flex flex-wrap pr-24">
                <span
                    v-for="(word, i) in mnemonicWordObjs"
                    :key="'pool-word-' + i"
                    @click="pickWord(word.word)"
                    class="px-3 py-2 m-1 rounded-md text-base flex justify-center items-center cursor-pointer"
                    :class="word.picked ? activeClasses : inactiveClasses"
                >
                    {{ word.word }}
                </span>
            </div>

            <div class="pt-4">
                <base-btn @click="verify" class="w-72 h-10" :disabled="disabledEnterBtn" :loading="registing">
                    进入账户
                </base-btn>
            </div>
        </div>
    </login-with-mnemonic-template>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue'
import { useQuasar } from 'quasar'
import cloneDeep from 'clone-deep'
import { shuffle } from '@/utils/shuffleArray'
import { useAccount } from '@/composables/user/useAccount'
import LoginWithMnemonicTemplate from '../LoginWithMnemonicTemplate.vue'

const props = defineProps<{
    mnemonic: string
    lang: 'cn' | 'en'
}>()

defineEmits(['dismiss'])

// pick words control
const activeClasses = ['bg-secondary', 'text-primary']
const inactiveClasses = ['bg-gray-1', 'text-dark']

interface MnemonicWordObj {
    word: string
    picked: boolean
}

const correctWords = props.mnemonic.split(' ')
const shuffledWords = shuffle(cloneDeep(correctWords))

const mnemonicWordObjs: Ref<MnemonicWordObj[]> = ref(shuffledWords.map((c) => ({ word: c, picked: false })))
const pickedWords = ref<string[]>([])

function pickWord(word: string) {
    const wordInPool = mnemonicWordObjs.value.find((w) => w.word === word)
    const isPicked = wordInPool?.picked
    if (!isPicked) {
        pickedWords.value.push(word)
        wordInPool && (wordInPool.picked = true)
    } else {
        unpickWord(
            word,
            pickedWords.value.findIndex((w) => w === word)
        )
    }
}

function unpickWord(word: string, i: number) {
    pickedWords.value.splice(i, 1)
    const wordInPool = mnemonicWordObjs.value.find((w) => w.word === word)
    wordInPool && (wordInPool.picked = false)
}

// validate and register
const quasar = useQuasar()
const accountOps = useAccount()
const { registing } = accountOps

function isValid() {
    for (let i = 0; i < pickedWords.value.length; i++) {
        const word = pickedWords.value[i]
        if (word !== correctWords[i]) return false
    }

    return true
}

async function verify() {
    if (!isValid()) {
        quasar.notify({ message: '助记词的顺序不正确，请检查', color: 'negative' })
        pickedWords.value.splice(0, pickedWords.value.length)
        mnemonicWordObjs.value.forEach((w) => (w.picked = false))
        return
    }

    await accountOps.register(props.mnemonic)
}

const disabledEnterBtn = computed(
    () =>
        (props.lang === 'cn' && pickedWords.value.length !== 15) ||
        (props.lang === 'en' && pickedWords.value.length !== 12)
)
</script>
