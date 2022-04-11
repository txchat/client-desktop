<template>
    <q-input
        v-model="enMnemonic"
        @keydown="keydownHandler"
        @paste="pasteHandler"
        ref="input"
        borderless
        autogrow
        class="cn-mnemonic-input w-full"
        input-class="text-xl font-bold"
    />
</template>

<script setup lang="ts">
import { defineEmits, nextTick, onMounted, ref, watch } from 'vue'

const emit = defineEmits<{
    (e: 'update:enMnemonic', value: string): void
}>()

const enMnemonic = ref('')
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
    input.value?.focus()
})

/** 屏蔽回车键 */
function keydownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') event.preventDefault()
}

watch(enMnemonic, () => emit('update:enMnemonic', enMnemonic.value))

/** 粘贴时将换行符替换成空格 */
function pasteHandler(event: ClipboardEvent) {
    if (!event.clipboardData) return
    event.preventDefault()

    const dom = event.target as HTMLInputElement

    const textBeforeSelection = enMnemonic.value.substring(0, dom.selectionStart!)
    const textAfterSelection = enMnemonic.value.substring(dom.selectionEnd!)

    let pasteText = event.clipboardData.getData('text')
    while (pasteText.includes('\n')) pasteText = pasteText.replace('\n', ' ')
    enMnemonic.value = textBeforeSelection + pasteText + textAfterSelection

    nextTick(() => {
        // 光标位置
        dom.setSelectionRange(
            textBeforeSelection.length + pasteText.length,
            textBeforeSelection.length + pasteText.length
        )
    })
}
</script>

<style lang="scss">
.cn-mnemonic-input {
    textarea {
        line-height: 1.25em !important;
    }
}
</style>
