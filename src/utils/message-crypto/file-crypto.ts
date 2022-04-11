import axios from 'axios'
import aes from 'js-crypto-aes'
import random from 'js-crypto-random'
import { computeSharedKey } from './compute-shared-key'

export async function downloadFile(url: string, name?: string): Promise<File> {
    const response = await axios.get<Blob>(url, {
        responseType: 'blob',
    })
    if (response.status !== 200) return Promise.reject(response.statusText)
    return new File([response.data], name || url.replace(/^.*[\\/]/, ''))
}

/** 解密私聊文件 */
export async function decryptFileInSingleChat(
    file: File,
    privateKey: Uint8Array,
    publicKey: Uint8Array
): Promise<File> {
    let sharedKey: Uint8Array
    try {
        sharedKey = await computeSharedKey(privateKey, publicKey)
    } catch (error) {
        console.error(error)
        return Promise.reject('解密文件失败: 推导公共秘钥失败')
    }

    const content = new Uint8Array(await file.slice(16).arrayBuffer())
    const iv = new Uint8Array(await file.slice(0, 16).arrayBuffer())

    try {
        const decrypted = await aes.decrypt(content, sharedKey, { iv, name: 'AES-CBC' })
        return new File([decrypted], file.name)
    } catch (error) {
        console.warn(`来自私聊的文件 "${file.name}" 解密失败, 可能这个文件本就未被加密`)
        return file
    }
}

/** 解密群聊文件 */
export async function decryptFileInGroupChat(file: File, key: Uint8Array): Promise<File> {
    const content = new Uint8Array(await file.slice(16).arrayBuffer())
    const iv = new Uint8Array(await file.slice(0, 16).arrayBuffer())

    try {
        const decrypted = await aes.decrypt(content, key, { iv, name: 'AES-CBC' })
        return new File([decrypted], file.name)
    } catch (error) {
        console.warn(`来自群聊的文件 "${file.name}" 解密失败, 可能这个文件本就未被加密`)
        return file
    }
}

export async function encryptFileInSingleChat(
    file: File,
    privateKey: Uint8Array,
    publicKey: Uint8Array
): Promise<File> {
    let sharedKey: Uint8Array
    try {
        sharedKey = await computeSharedKey(privateKey, publicKey)
    } catch (error) {
        console.error(error)
        return Promise.reject('解密文件失败: 推导公共秘钥失败')
    }

    const content = new Uint8Array(await file.arrayBuffer())
    const iv = random.getRandomBytes(16)

    const encrypted = await aes.encrypt(content, sharedKey, { iv, name: 'AES-CBC' })
    const output = new Uint8Array(iv.length + encrypted.length)
    output.set(iv)
    output.set(encrypted, iv.length)
    return new File([output], file.name)
}

export async function encryptFileInGroupChat(file: File, key: Uint8Array): Promise<File> {
    const content = new Uint8Array(await file.arrayBuffer())
    const iv = random.getRandomBytes(16)
    const encrypted = await aes.encrypt(content, key, { iv, name: 'AES-CBC' })
    const output = new Uint8Array(iv.length + encrypted.length)
    output.set(iv)
    output.set(encrypted, iv.length)
    return new File([output], file.name)
}
