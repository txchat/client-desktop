import { computed, nextTick, onMounted, ref, Ref, toRefs, watch } from 'vue'
import { useDebounceFn, whenever } from '@vueuse/core'
import { inRange, isEqual } from 'lodash'
import useScrollTo from '@/composables/useScrollTo'
import { QScrollEvent } from '@/types/quasar'
import { useChatStore } from '@/store/user-chat'
import { Chat, Message, MsgType, RecalledMessage } from '@/types/user-chat'
import { useProfileStore } from '@/store/user-profile'

type DisplayMessage = Message | RecalledMessage

interface UsableMessageListDisplay {
    /**
     * 当前挂载的消息. 由于消息数量可能很多, 因此仅挂载一部分(默认情况下为最后 N 条), 当滚动到顶部/底部时获取更多
     */
    displayMessages: Ref<DisplayMessage[]>

    /**
     * 监听滚动, 加载消息
     */
    loadMore: (e: QScrollEvent) => void

    /** 当前滚动视图内, 可视范围之上的未读消息数量 */
    unreadLengthAbove: Ref<number>

    /** 滚动至上方第一条未读消息 */
    scrollToUnreadMessageAbove: () => void

    /** 下方的未读消息数量 */
    unreadLengthBelow: Ref<number>

    /** 滚动至下方第一条未读消息 */
    scrollToUnreadMessageBelow: () => void
}

export function useMessageListDisplay(
    chat: Ref<Chat>,
    usableScrollTo: ReturnType<typeof useScrollTo>
): UsableMessageListDisplay {
    const chatStore = useChatStore()
    const { scrollToBottom, scrollToElement, scrollArea } = usableScrollTo

    /** 每次加载的消息数量 */
    const N = 10
    /** 指针允许的最大值 */
    const M = computed(() => chat.value.messages.length - 1)

    // 由于消息数量可能很多, 初始仅展示最后 N 条, 展示的消息由两个指针控制
    const topPointer = ref(M.value > N ? M.value - N : 0)
    const bottomPointer = ref(M.value)

    const displayMessages = computed(() => chat.value.messages.slice(topPointer.value, bottomPointer.value + 1))

    // 要定位的消息
    const { locatingMessage } = toRefs(chatStore)

    // 加载消息中的文件
    async function loadFile(message: DisplayMessage) {
        if (!message.isRecalled && [MsgType.Video, MsgType.Audio, MsgType.Image, MsgType.File].includes(message.type)) {
            if (!message.content.rawMessage) {
                message.content.rawMessage = await chatStore.loadFile(message.content.mediaUrl)
                Object.defineProperty(message.content, 'rawMessage', { enumerable: false })
            }
        }
    }

    // 确定初始位置
    onMounted(async () => {
        if (!chat.value.messages.length) return
        !locatingMessage.value && scrollToBottom()
        displayMessages.value.forEach(loadFile)
    })

    const unreadLengthBelow = ref(0)
    const unreadLengthAbove = ref(chat.value.unreadLength - N > 0 ? chat.value.unreadLength - N : 0)
    chatStore.clearUnread(chatStore.findChat(chat.value.type, chat.value.id).index)

    // 滚动至最上方 / 最下方时触发
    const loadMore = useDebounceFn(async (e: QScrollEvent) => {
        // 滚动至最上方, 加载更早的消息
        if (e.verticalPercentage === 0 && topPointer.value > 0) {
            const currTopElemUuid = uuidOf(topPointer.value)
            const loadMoreLength = topPointer.value > N ? N : topPointer.value
            topPointer.value -= loadMoreLength
            nextTick(() => {
                scrollTo(currTopElemUuid)
                chat.value.messages.slice(topPointer.value, topPointer.value + loadMoreLength).forEach(loadFile)
                // "n条新消息" 标识存在状态刷新
                if (unreadLengthAbove.value) {
                    unreadLengthAbove.value = protectedSubtract(unreadLengthAbove.value, N)
                }
            })
        }

        // 滚动至最下方, 加载更晚的消息
        else if (e.verticalPercentage > 0.95) {
            if (bottomPointer.value < chat.value.messages.length - 1) {
                M.value - bottomPointer.value < N ? (bottomPointer.value = M.value) : (bottomPointer.value += N)
            } else {
                unreadLengthBelow.value = 0
            }
        }
    }, 400)

    // 由搜索聊天记录时的 "定位至聊天" 按钮触发
    whenever(
        () => locatingMessage.value && isEqual(chat.value?.id, locatingMessage.value.fromChat.id),
        () => {
            const orientedPointer = chat.value.messages.findIndex((m) => m.uuid === locatingMessage.value?.uuid)

            if (orientedPointer > -1) {
                const atLastN = orientedPointer + N > M.value
                topPointer.value = atLastN ? protectedSubtract(M.value, N) : orientedPointer
                bottomPointer.value = atLastN ? M.value : orientedPointer + N

                nextTick(() => {
                    locatingMessage.value = null
                    const targetMessageUuid = uuidOf(orientedPointer)
                    scrollTo(targetMessageUuid)
                    const el = document.getElementById(targetMessageUuid)
                    el && (el.style.backgroundColor = '#eaeaea')
                    setTimeout(() => {
                        el && (el.style.backgroundColor = 'transparent')
                    }, 1000)
                })
            }
        },
        { immediate: true }
    )

    // 有新消息时, 处理滚动
    watch(
        () => chat.value.messages.length,
        (n, o) => {
            if (n < o) {
                bottomPointer.value = M.value
                return
            }
            if (!scrollArea.value) return

            // 底部无更多需要加载的消息时, 底部出现新消息
            if (bottomPointer.value + 1 === M.value) bottomPointer.value = M.value

            const verticalPercentage = scrollArea.value.getScrollPercentage().top
            if (verticalPercentage === undefined) return

            const latestMessage = chat.value.messages[n - 1]
            // 本来就在底部的情况下收到新消息, 显示最新消息
            if (
                verticalPercentage > 0.95 ||
                latestMessage.isRecalled ||
                latestMessage.from === useProfileStore().myProfile?.address
            ) {
                nextTick(() => scrollToBottom(300))
            } else {
                unreadLengthBelow.value++
            }
        },
        { flush: 'post' }
    )

    function scrollToUnreadMessageAbove() {
        const firstUnreadMessageIndex = chat.value.messages.length - (unreadLengthAbove.value + N)
        if (firstUnreadMessageIndex < topPointer.value) topPointer.value = firstUnreadMessageIndex
        nextTick(() => {
            scrollTo(uuidOf(firstUnreadMessageIndex), 300)
            unreadLengthAbove.value = 0
        })
    }

    function scrollToUnreadMessageBelow() {
        const indexOfFirstUnreadMessageBelow = chat.value.messages.length - unreadLengthBelow.value
        if (indexOfFirstUnreadMessageBelow === -1) {
            console.warn('预料之外的情况: 下方应该有新消息, 但是没找到')
            return
        }

        if (!inRange(indexOfFirstUnreadMessageBelow, topPointer.value, bottomPointer.value + 1)) {
            topPointer.value =
                indexOfFirstUnreadMessageBelow + N > M.value ? M.value - N : indexOfFirstUnreadMessageBelow
            bottomPointer.value =
                indexOfFirstUnreadMessageBelow + N > M.value ? M.value : indexOfFirstUnreadMessageBelow + N
        }

        unreadLengthBelow.value = 0
        nextTick(() => scrollTo(uuidOf(indexOfFirstUnreadMessageBelow), 300))
    }

    /** 获取指针所指向的消息的 uuid */
    function uuidOf(pointer: number) {
        return chat.value.messages[pointer].uuid
    }

    /** 滚动到目标消息所在位置 */
    function scrollTo(uuid: string, duration?: number) {
        scrollToElement(document.getElementById(uuid), duration)
    }

    return {
        displayMessages,
        loadMore,
        scrollToUnreadMessageAbove,
        unreadLengthAbove,
        unreadLengthBelow,
        scrollToUnreadMessageBelow,
    }
}

/** 减法, 所得结果小于 0 的话, 取 0 */
function protectedSubtract(minuend: number, subtrahend: number): number {
    const difference = minuend - subtrahend
    if (difference < 0) return 0
    return difference
}
