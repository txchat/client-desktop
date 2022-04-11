import path from 'path'
import { Menu, nativeImage, Tray } from 'electron'

/** Windows 下创建系统托盘 */
export function createTray(showFn: () => void, quitFn: () => void): Tray | null {
    let tray: Tray | null = null

    if (process.platform === 'win32') {
        // @ts-expect-error: __static 为全局变量 参考: https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#handling-static-assets
        const icon = nativeImage.createFromPath(path.join(__static, 'img/icons/favicon.ico')).resize({
            height: 20,
            width: 20,
        })

        tray = new Tray(icon)
        tray.setToolTip('谈信')
        tray.setContextMenu(
            Menu.buildFromTemplate([
                { label: '打开', type: 'normal', click: showFn },
                { label: '退出', type: 'normal', click: quitFn },
            ])
        )
        tray.on('double-click', showFn)
    }

    return tray
}
