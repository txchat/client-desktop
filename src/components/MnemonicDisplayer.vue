<template>
    <div class="bg-gray-1 text-dark font-medium text-xl rounded-md flex justify-start items-center">
        <div v-if="lang === 'cn'">
            <span v-for="(group, i) in groupedCnMnemonic" :key="'cn-char-' + i"> {{ group + ' ' }}</span>
        </div>
        <div v-if="lang === 'en'">
            <span v-for="(word, i) in splitedEnMnemonic" :key="'en-char-' + Number(i)">
                {{ word + ' ' }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    lang: 'cn' | 'en'
    mnemonic: string
}>()

const cnMnemonic = computed(() => (props.lang === 'cn' ? props.mnemonic : undefined))
const enMnemonic = computed(() => (props.lang === 'en' ? props.mnemonic : undefined))

/** 处理中文助记词，按三个一组显示 */
const groupedCnMnemonic = computed(() => {
    if (!cnMnemonic.value) return

    const splitedCnMnmonic = cnMnemonic.value?.split(' ')

    const displayArr = []

    for (let i = 0; i < splitedCnMnmonic.length; i++) {
        const currChar = splitedCnMnmonic[i]
        if (i % 3 === 0) {
            displayArr.push(currChar)
        } else {
            displayArr[Math.floor(i / 3)] += currChar
        }
    }

    return displayArr
})

/** 处理英文助记词 */
const splitedEnMnemonic = computed(() => enMnemonic.value?.split(' '))
</script>
