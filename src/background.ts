'use strict'
import { app, protocol, Tray } from 'electron'
import electronLog from 'electron-log'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { createWindow } from './electron/createWindow'
import { createTray } from './electron/createTray'
import { mainProcessStore } from './electron/store'

electronLog.catchErrors()
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

let tray: Tray | null = null
let shouldActuallyQuit = false // 点关闭按钮不是真正的退出, 而是隐藏

/** 防止打开两个 App 实例 */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    // 第二个实例会退出
    app.quit()
} else {
    // 第一个实例会走这里
    app.on('second-instance', () => {
        if (mainProcessStore.mainWindow) {
            if (mainProcessStore.mainWindow.isMinimized()) mainProcessStore.mainWindow.restore()
            else mainProcessStore.mainWindow.focus()
        }
    })

    app.on('activate', () => {
        mainProcessStore.mainWindow?.show()
    })

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', async () => {
        if (isDevelopment && !process.env.IS_TEST) {
            // Install Vue Devtools
            try {
                await installExtension(VUEJS3_DEVTOOLS)
            } catch (e) {
                console.error('Vue Devtools failed to install:', (e as Error).toString())
            }
        }

        mainProcessStore.mainWindow = await createWindow()
        mainProcessStore.mainWindow.on('close', (e) => {
            if (!shouldActuallyQuit) {
                e.preventDefault()
                mainProcessStore.mainWindow?.hide()
            }
        })

        tray = createTray(
            () => mainProcessStore.mainWindow?.show(),
            () => app.quit()
        )
        if (process.platform === 'win32') console.log(tray)

        // Windows 要发出通知需要这段 @see https://stackoverflow.com/a/53510850
        if (process.platform === 'win32') {
            app.setAppUserModelId('com.3syxin')
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    // 执行 app.quit() 后, Electron 自动关闭所有窗口前 emit
    app.on('before-quit', () => {
        shouldActuallyQuit = true
    })
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
