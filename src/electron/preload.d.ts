import { Event } from 'electron/renderer'

export declare global {
    interface Window {
        electron?: {
            /** 让主窗口显示 */
            showMainWindow: () => void
            /** 显示系统通知 */
            notification: () => void
            /** Mac App 图标的未读小红点 */
            setDockBadge: (text: string) => void
            /** 启动屏幕截图 */
            screenCapture: () => void
            /** 截图成功回调 */
            onScreenCaptured: (cb: (event: Event, imageDataUrl: Uint8Array) => void) => void
            /** 退出应用 */
            quit: () => void
        }
    }
}
