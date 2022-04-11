<template>
    <teleport to="body">
        <div
            ref="dialogEl"
            v-show="show"
            class="dialog absolute z-50"
            style="transform: translate(calc(-50%), calc(-100% - 5px))"
            :style="{ top: mentionDialog.top + 'px', left: mentionDialog.left + 'px', width: dialogWidth + 'px' }"
        >
            <div class="scroll py-2.5 bg-white rounded-xl overflow-y-auto" style="max-height: 360px">
                <div
                    v-for="(member, i) in list"
                    @click="clickItemHandler(i)"
                    :ref="(el) => {
                        if (el) mentionItems[i] = el as Element
                    }"
                    :key="member.address"
                    :class="{ 'bg-gray-4': i === activeIndex }"
                    class="py-1.5 px-4 h-full flex"
                >
                    <q-avatar size="30px" rounded>
                        <q-img :src="member.avatar || require('theme/icons/default-avatar.svg')" no-spinner></q-img>
                    </q-avatar>
                    <span class="px-2 flex-grow self-center">
                        {{
                            truncate(
                                member.remark ||
                                    member.groupNickname ||
                                    member.staffName ||
                                    member.nickname ||
                                    member.address
                            )
                        }}
                    </span>
                    <q-badge
                        v-if="[1, 2].includes(member.memberType || 0)"
                        :color="member.memberType === 2 ? 'secondary' : 'orange-light'"
                        :text-color="member.memberType === 2 ? 'primary' : 'orange'"
                        class="self-center"
                    >
                        {{ member.memberType === 2 ? '群主' : '管理员' }}
                    </q-badge>
                </div>
            </div>
            <svg
                :style="{ marginLeft: mentionDialog.notch + 'px' }"
                width="16px"
                height="9px"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path fill="white" d="M0 0 L50 100 L100 0 Z" />
            </svg>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import textareaCaret from 'textarea-caret'
import { useChatStore } from '@/store/user-chat'
import { useEventListener, useMagicKeys, whenever } from '@vueuse/core'
import { GroupId } from '@/types/user-chat'
import { useGroupProfile } from '@/composables/user/useGroupProfile'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { truncate } from '@/utils/string-truncate'
import { useProfileStore } from '@/store/user-profile'
import { getMatchedStr } from '@/utils/string-get-matched'

const props = defineProps<{
    groupId: GroupId
}>()

const emit = defineEmits<{
    (e: 'mentioning', v: boolean): void
}>()

const { editingText: text, editingMention: mentions } = storeToRefs(useChatStore())
const searchText = ref('')

// 界面出现/隐藏
const show = ref(false)
watch(show, () => {
    emit('mentioning', show.value)
})

/** 正在进行的艾特的开始位置 */
const positionOfAt = ref(-1)
const mentionDialog = reactive({ top: 0, left: 0, notch: 50 })

const dialogWidth = 360
const dialogEl = ref<HTMLDivElement | null>(null)
const textareaEl = ref<HTMLTextAreaElement | null>(null)
onMounted(() => (textareaEl.value = document.getElementById('editingArea') as null | HTMLTextAreaElement))

watch(
    text,
    () => {
        if (!textareaEl.value || !dialogEl.value) return
        // 最后输入的字符是 `@`, 则唤出界面
        const end = textareaEl.value.selectionEnd
        const reg = /@([^@\s\u2004]*)$/
        positionOfAt.value = text.value.slice(0, end).search(reg)
        if (positionOfAt.value !== -1) {
            const matched = text.value.match(reg)
            if (matched) {
                searchText.value = matched[1]
            }

            show.value = true
            const { x: textareaX, y: textareaY } = textareaEl.value.getBoundingClientRect()
            const { top: caretTop, left: caretLeft } = textareaCaret(textareaEl.value, end)
            mentionDialog.top = caretTop + textareaY
            mentionDialog.left = caretLeft + textareaX
            mentionDialog.notch = dialogWidth / 2 - 8

            if (caretLeft + textareaX + dialogWidth / 2 > document.body.clientWidth) {
                mentionDialog.left = document.body.clientWidth - dialogWidth / 2 - 5
                mentionDialog.notch = dialogWidth / 1.9
            }
        } else {
            show.value = false
            searchText.value = ''
        }
    },
    { flush: 'post' }
)

onMounted(() => {
    // 监听文本输入框的删除,
    // 删除文本后, 可能取消艾特了某些人, 因此重新计算那些人被艾特了
    useEventListener(document.getElementById('editingArea'), 'input', (e: InputEvent) => {
        const el = e.target as HTMLTextAreaElement

        if (e.inputType?.toLowerCase().indexOf('delete') !== -1) {
            const latestMentions = Array.from(el.value.matchAll(/@([^@\u2004]+)\u2004/g), (m) => m[1])
            mentions.value = mentions.value.filter((m) => {
                return latestMentions.findIndex((m2) => m2 === m.displayName) !== -1
            })
        }
    })

    useEventListener(document.getElementById('app'), 'click', () => {
        show.value = false
        searchText.value = ''
    })
})

// 艾特界面显示的情况下监听光标移动,
useEventListener(document, 'selectionchange', () => {
    if (!textareaEl.value) return
    if (positionOfAt.value === -1) return
    if (document.activeElement !== textareaEl.value) return
    // 如果光标往左移动, 到了 "@" 的前面, 则取消 "@状态"
    if (textareaEl.value.selectionEnd < positionOfAt.value + 1) {
        show.value = false
        searchText.value = ''
    }
    // 如果光标未移动至超过 "@", 更新搜索文本
    else {
        searchText.value = text.value.slice(positionOfAt.value + 1, textareaEl.value.selectionEnd)
    }
})

// 艾特界面中列出所有可被 @ 的用户
const list = computed(() => {
    if (!show.value) return null

    const { groupProfile } = useGroupProfile(props.groupId)
    if (!groupProfile.value) return null

    const myId = useProfileStore().myProfile?.address
    const _list:
        | {
              groupNickname?: string
              remark?: string
              staffName?: string
              nickname?: string
              address: string
              fullAddress: string
              avatar?: string
              memberType?: number
          }[]
        | undefined = groupProfile.value.members
        ?.filter((m) => {
            if (m.memberId === myId) return false
            const { userProfile } = useUserProfile(m.memberId)
            if (!searchText.value) return true
            else
                return (
                    getMatchedStr(userProfile.value?.remark || '', searchText.value) ||
                    getMatchedStr(m.memberName, searchText.value) ||
                    getMatchedStr(userProfile.value?.staffInfo?.name || '', searchText.value) ||
                    getMatchedStr(userProfile.value?.nickname || '', searchText.value) ||
                    getMatchedStr(m.memberId, searchText.value)
                )
        })
        .map((m) => {
            const { userProfile } = useUserProfile(m.memberId)
            return {
                groupNickname: m.memberName,
                remark: userProfile.value?.remark,
                nickname: userProfile.value?.nickname,
                address: truncate(m.memberId),
                fullAddress: m.memberId,
                staffName: userProfile.value?.staffInfo?.name,
                avatar: userProfile.value?.avatar,
                memberType: m.memberType,
            }
        })
    !searchText.value &&
        _list?.unshift({
            avatar: require('icons/mention-all.png'),
            remark: `所有人（${groupProfile.value.memberNum}）`,
            address: '所有人',
            fullAddress: 'ALL',
        })
    return _list
})
const activeIndex = ref(0)
// recalculate `activeIndex` when the list narrows
watch(list, (n, o) => {
    if (!n) return
    if (!n.length) show.value = false
    if (!o) activeIndex.value = 0
    else if (n[activeIndex.value] !== o[activeIndex.value]) {
        activeIndex.value = 0
    }
})
const mentionItems = ref<Element[]>([])
watch(activeIndex, (index) => {
    if (mentionItems.value.length) {
        const activeItemEl = mentionItems.value[index] as HTMLDivElement
        const parentEl = activeItemEl.parentElement as HTMLDivElement
        if (!parentEl) return

        const scrollTop = parentEl.scrollTop
        const scrollBottom = parentEl.scrollTop + parentEl.offsetHeight
        const itemTop = activeItemEl.offsetTop
        const itemBottom = activeItemEl.offsetTop + activeItemEl.offsetHeight

        if (itemTop < scrollTop) {
            activeItemEl.scrollIntoView()
        } else if (itemBottom > scrollBottom) {
            activeItemEl.scrollIntoView(false)
        }
    }
})

const keys = useMagicKeys()
whenever(keys['escape'], () => {
    show.value = false
    searchText.value = ''
})
whenever(
    () => keys['arrowup'].value || keys['ctrl+p'].value,
    () => (list.value && activeIndex.value < 1 ? (activeIndex.value = list.value.length - 1) : activeIndex.value--)
)
whenever(
    () => keys['arrowdown'].value || keys['ctrl+n'].value,
    () => (list.value && activeIndex.value > list.value.length - 2 ? (activeIndex.value = 0) : activeIndex.value++)
)
whenever(keys['enter'], () => {
    // 输入回车, 补全 `@xxx` 文本
    mention()
})

function clickItemHandler(i: number) {
    if (!textareaEl.value) return
    textareaEl.value.focus()
    activeIndex.value = i
    mention()
}

function mention() {
    if (!show.value) return
    if (!textareaEl.value || !dialogEl.value) return
    if (!list.value) throw new Error('@ 文本补全失败: 候选成员列表为空')
    const caretEndIndex = textareaEl.value.selectionEnd
    const profile = list.value[activeIndex.value]
    const mentionName = profile.groupNickname || profile.nickname || profile.address
    mentions.value.push({
        address: profile.fullAddress,
        displayName: mentionName,
    })
    textareaEl.value.setRangeText(`@${mentionName}\u2004`, positionOfAt.value, caretEndIndex, 'end')
    text.value = textareaEl.value.value
    show.value = false
    searchText.value = ''
}
</script>

<style lang="scss" scoped>
.dialog {
    // tailwind 自带的 drop-shadow 在 Safari 中有兼容问题
    filter: drop-shadow(0 1px 2px lightgray);
}
div.scroll::-webkit-scrollbar-thumb {
    background-color: #c5c6c6;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: padding-box;
}

div.scroll::-webkit-scrollbar {
    width: 16px;
}
</style>
