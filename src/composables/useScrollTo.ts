import { ref, Ref } from 'vue'
import { QScrollArea, scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

export default (): {
    scrollArea: Ref<QScrollArea | null>
    scrollToBottom: (duration?: number) => void
    scrollToElement: (el: HTMLElement | null, duration?: number) => void
} => {
    /** QScrollArea 组件 */
    const scrollArea = ref<QScrollArea | null>(null)

    /** 滚动至 scrollArea 的最底部 */
    const scrollToBottom = (duration?: number) => {
        if (scrollArea.value) {
            // 滚动至最底部
            const scrollTarget = scrollArea.value.getScrollTarget()
            scrollArea.value.setScrollPosition('vertical', scrollTarget.scrollHeight, duration)
        }
    }

    // takes an element object
    const scrollToElement = (el: HTMLElement | null, duration?: number) => {
        if (!el) return
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        setVerticalScrollPosition(target, offset, duration)
    }

    return { scrollArea, scrollToBottom, scrollToElement }
}
