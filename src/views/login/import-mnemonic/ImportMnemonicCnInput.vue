<template>
    <div class="flex flex-nowrap">
        <input
            type="text"
            v-for="n in 5"
            :key="n"
            v-model="inputValues[n - 1]"
            :ref="
                (el) => {
                    if (el) inputGroup[n - 1] = el as Element
                }
            "
            @keydown="keydownHandler($event, n - 1)"
            @compositionend="compositionendHandler($event, n - 1)"
            @paste.prevent="pasteHandler($event, n - 1)"
            :maxlength="3"
            class="w-1/5 mx-2 px-3.5 bg-gray-1 text-xl font-bold outline-none border-b border-subtle"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { watch, defineEmits, onBeforeUpdate } from 'vue'

const emit = defineEmits(['update:cnMnemonic'])

/** 所有 input 的引用模板 */
const inputGroup = ref<Element[]>([])
onBeforeUpdate(() => (inputGroup.value = []))

/** 所有 input 的值 */
const inputValues = ref(['', '', '', '', ''])

const cnMnemonic = ref('')
/** 监听用户在任意 input 中的输入，重新计算并 emit 最新值 */
watch(inputValues.value, (val) => {
    cnMnemonic.value = val.reduce((acc, cur) => acc + cur)
    emit('update:cnMnemonic', cnMnemonic.value)
})

/** 监听删除键，如果当前 input 没有字符时，删除上一个 input 的最后一个字符 */
function keydownHandler(event: KeyboardEvent, i: number) {
    const { key } = event
    const { value } = event.target as HTMLInputElement
    const previousInput = inputGroup.value[i - 1] as HTMLInputElement

    if (value.length === 0 && key === 'Backspace' && i !== 0) previousInput.focus()
}

/** 单个 input 的输入字符达到 3 个时，光标移至下一个 input */
function compositionendHandler(event: CompositionEvent, i: number) {
    const { value } = event.target as HTMLInputElement
    const nextInput = inputGroup.value[i + 1] as HTMLInputElement

    if (value.length === 3) nextInput?.focus()
}

function pasteHandler(event: ClipboardEvent, i: number) {
    if (!event.clipboardData) return
    // 防止有时焦点不在 input 时，也会触发粘贴事件
    if (document.activeElement !== inputGroup.value[i]) return

    const pastedText = event.clipboardData.getData('text').split(/\s/).join('')
    insertText(pastedText, i, event.target as HTMLInputElement)
}

/**
 * 将一个字符串插入 inputGroup 的任一位置
 * @param text 要插入的字符串
 * @param i 指定要插入 inputGroup 的第几个 input
 * @param input 要插入的目标 input 的 DOM 对象
 */
function insertText(text: string, i: number, input: HTMLInputElement) {
    if (input.selectionStart === null || input.selectionEnd === null) return
    const selectionStart = i * 3 + input.selectionStart
    const selectionEnd = i * 3 + input.selectionEnd

    const textBeforeSelection = cnMnemonic.value.substring(0, selectionStart)
    const textAfterSelection = cnMnemonic.value.substring(selectionEnd)

    const newText = textBeforeSelection + text + textAfterSelection
    for (let j = 0; j < 5; j++) {
        inputValues.value[j] = newText.substring(j * 3, j * 3 + 3)
    }
}
</script>
