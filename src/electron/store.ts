import { BrowserWindow } from 'electron'

/** Electron 主线程的全局变量 */
export const mainProcessStore = {
    hostname: process.env.NODE_ENV === 'production' ? 'localhost' : process.env.WEBPACK_DEV_SERVER_URL!,
    port: 27233,
    /** 主窗口 */
    mainWindow: null as BrowserWindow | null,
}
