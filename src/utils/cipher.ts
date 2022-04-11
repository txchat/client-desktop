import aes from 'js-crypto-aes'
import pbkdf from 'js-crypto-pbkdf'
import { crypto } from 'bitcoinjs-lib'
import { arrayToHex, arrayToUtf8, hexToArray, utf8ToArray, utf8ToBuffer } from 'enc-utils'
import { fromByteArray } from 'base64-js'

/** derived key, 推导秘钥 */
async function deriveKey(password: string): Promise<Uint8Array> {
    return await pbkdf.pbkdf2(password, utf8ToArray(password + 'pqb20180625@developmentgroup'), 102400, 32, 'SHA-512')
}

/** 使用对称加密算法 AES-GCM 对助记词进行加密 */
export async function encryptMnemonic(
    mnemonic: string,
    password: string,
    beforeRecalculate?: () => void
): Promise<string> {
    const hashedPassword = fromByteArray(crypto.sha256(utf8ToBuffer(password)))
    const cached = localStorage.getItem(hashedPassword)

    let dk: Uint8Array

    if (cached) {
        dk = hexToArray(cached)
    } else {
        beforeRecalculate?.()
        dk = await deriveKey(password)
        localStorage.setItem(hashedPassword, arrayToHex(dk))
    }

    /** Initialization Vector, 在 Go 标准库中这个参数叫 nonce, 这里取 dk 的前 12 字节 */
    const iv = dk.slice(0, 12)
    const encryptedMnemonic = await aes.encrypt(utf8ToArray(mnemonic), dk, { name: 'AES-GCM', iv })

    return arrayToHex(encryptedMnemonic)
}

/** 解密 */
export async function decryptMnemonic(
    encryptedMnemonicHex: string,
    password: string,
    beforeCalculate?: () => void
): Promise<string> {
    const hashedPassword = fromByteArray(crypto.sha256(utf8ToBuffer(password)))
    const cached = localStorage.getItem(hashedPassword)

    let dk: Uint8Array

    if (cached) {
        dk = hexToArray(cached)
    } else {
        beforeCalculate?.()
        dk = await deriveKey(password)
        localStorage.setItem(hashedPassword, arrayToHex(dk))
    }

    const iv = dk.slice(0, 12)
    const decryptedMnemonic = await aes.decrypt(hexToArray(encryptedMnemonicHex), dk, { name: 'AES-GCM', iv })
    return arrayToUtf8(decryptedMnemonic)
}
