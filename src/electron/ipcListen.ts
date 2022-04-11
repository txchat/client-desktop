import path from 'path'
import { app, clipboard, ipcMain, Notification } from 'electron'
import child_process from 'child_process'
import { mainProcessStore } from './store'

/**
 * 监听渲染进程调用的主进程方法
 * (方法在 ./preload.js 中注册, 然后在这里监听并执行)
 */
export function ipcListen(): void {
    ipcMain.on('showMainWindow', () => {
        mainProcessStore.mainWindow?.show()
    })

    ipcMain.on('notification', () => {
        const n = new Notification({ title: '谈信', body: '收到新消息' })
        n.on('click', () => {
            mainProcessStore.mainWindow?.show()
        })
        n.show()
    })

    ipcMain.on('setDockBadge', (event, text) => {
        app.dock?.setBadge(text)
    })

    ipcMain.on('screenCapture', () => {
        clipboard.clear()

        if (process.platform === 'darwin') {
            child_process.exec(`screencapture -i -c -U`, screenCaptureFinishHandler)
        } else {
            // @ts-expect-error: __static
            const url = path.join(__static, '../extraResources/PrintScr.exe')
            const screen_window = child_process.execFile(url)
            screen_window.on('exit', (code) => {
                if (code) {
                    screenCaptureFinishHandler()
                }
            })
        }
    })

    ipcMain.on('quit', () => {
        app.quit()
    })
}

function screenCaptureFinishHandler() {
    const image = clipboard.readImage()
    if (image && !image.isEmpty()) {
        clipboard.writeImage(image)
        mainProcessStore.mainWindow?.webContents.send('screen-capture-succeed', image.toPNG())
    }
}
