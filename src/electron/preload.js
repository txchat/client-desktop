import { contextBridge, ipcRenderer } from 'electron'

let screenCaptureHandleLock = false

contextBridge.exposeInMainWorld('electron', {
    showMainWindow: () => {
        ipcRenderer.send('showMainWindow')
    },

    notification: () => {
        ipcRenderer.send('notification')
    },

    setDockBadge: (text) => {
        ipcRenderer.send('setDockBadge', text)
    },

    screenCapture: () => {
        ipcRenderer.send('screenCapture')
    },

    onScreenCaptured: (callback) => {
        if (!screenCaptureHandleLock) {
            ipcRenderer.on('screen-capture-succeed', callback)
            screenCaptureHandleLock = true
        }
    },

    quit: () => {
        ipcRenderer.send('quit')
    },
})
