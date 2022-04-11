import path from 'path'
import { BrowserWindow, session, shell } from 'electron'
import { ipcListen } from './ipcListen'
import { createExpressApp } from './createExpressApp'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { mainProcessStore } from './store'
import prependHttp from 'prepend-http'

export async function createWindow(): Promise<BrowserWindow> {
    // 新建空白主窗口
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 760,
        useContentSize: true,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nativeWindowOpen: true, // 保证和打开的子窗口之间 postMessage 正常
            webSecurity: false,
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    // 生产环境自己搭个服务器来代理静态网页
    if (process.env.NODE_ENV === 'production') {
        // 静态网页中的 iconfont 图标请求的协议修改
        session.defaultSession.webRequest.onBeforeRequest(
            { urls: ['app://at.alicdn.com/*/*'] },
            (details, callback) => {
                callback({ cancel: false, redirectURL: details.url.replace('app://', 'http://') })
            }
        )
        await createExpressApp()
        createProtocol('app')
    }

    const url = mainProcessStore.hostname + (process.env.NODE_ENV === 'development' ? '' : `:${mainProcessStore.port}`)
    // 主窗口加载内容
    await mainWindow.loadURL(prependHttp(url, { https: false }))

    // 打开控制台
    if (process.env.NODE_ENV === 'development' && !process.env.IS_TEST) mainWindow.webContents.openDevTools()

    // 子窗口配置
    mainWindow.webContents.setWindowOpenHandler(({ frameName, url }) => {
        if (frameName === 'download') {
            shell.openExternal(url)
            return { action: 'deny' }
        }
        return {
            action: 'allow',
            overrideBrowserWindowOptions: {
                width: 1280,
                height: 800,
                resizable: true,
            },
        }
    })

    // 渲染进程(窗口)事件监听
    ipcListen()

    return mainWindow
}
