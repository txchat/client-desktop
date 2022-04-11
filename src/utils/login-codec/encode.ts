import { imparse } from './loginInfo'
import { Platform } from 'quasar'
import { isEnv } from '../env'
import { v4 as uuidv4 } from 'uuid'

function getDevice(): imparse.auth.Device {
    const isElectron = isEnv.electron
    const isWindows = Platform.is.win

    const Device = imparse.auth.Device
    return isElectron ? (isWindows ? Device.Windows : Device.MacOS) : Device.Web
}

function getDeviceUuid() {
    const localStoredKey = 'tanxin-device-uuid'
    const _uuid = localStorage.getItem(localStoredKey)

    if (!_uuid) {
        const uuid = uuidv4()
        localStorage.setItem(localStoredKey, uuid)
        return uuid
    } else return _uuid
}

/**
 * 编码登录信息
 * @param nickname 区块链上的用户昵称
 * @param connType 手动登录填 0，自动登录填 1
 */
export function encodeLoginInfo(nickname: string, connType: imparse.auth.Login.ConnType): Uint8Array {
    const device = getDevice()
    const uuid = getDeviceUuid()

    return imparse.auth.Login.encode({
        device,
        username: nickname,
        connType,
        uuid,
        deviceName: uuid,
    }).finish()
}
