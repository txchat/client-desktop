import aes from 'js-crypto-aes'
import random from 'js-crypto-random'
import { hexToArray } from 'enc-utils'
import { useAccountStore } from '@/store/user-account'
import { useProfileStore } from '@/store/user-profile'
import { UserProfile } from '@/types/user-profile'
import { computeSharedKey } from './compute-shared-key'

/** 解密私聊消息 */
export async function decryptSingleMessage(msg: Uint8Array, fromAddress: string): Promise<Uint8Array> {
    // 我的私钥
    const privateKey = useAccountStore().account?.privateKey
    if (!privateKey) throw new Error('account 为空')

    // 对方的公钥
    const profileStore = useProfileStore()
    let targetProfile: UserProfile
    if (profileStore.userProfiles[fromAddress] && profileStore.userProfiles[fromAddress]!.pubKey)
        targetProfile = profileStore.userProfiles[fromAddress] as UserProfile
    else targetProfile = await useProfileStore().get(fromAddress)

    if (!targetProfile.pubKey) {
        console.warn('解密私聊消息: 未发现对方的公钥, 未做解密处理')
        return Promise.resolve(msg)
    }

    const sharedKey = await computeSharedKey(privateKey, hexToArray(targetProfile.pubKey))
    const iv = msg.slice(-12)
    return await aes.decrypt(msg.slice(0, -12), sharedKey, { iv, name: 'AES-GCM' })
}

/** 解密群聊消息 */
export async function decryptGroupMessage(undecrypted: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
    const content = new Uint8Array(await undecrypted.slice(16))
    const iv = new Uint8Array(await undecrypted.slice(0, 16))
    return await aes.decrypt(content, key, { iv, name: 'AES-CBC' })
}

/** 加密私聊消息 */
export async function encryptSingleMessage(
    content: Uint8Array,
    publicKey: Uint8Array,
    privateKey: Uint8Array
): Promise<Uint8Array> {
    let sharedKey: Uint8Array
    try {
        sharedKey = await computeSharedKey(privateKey, publicKey)
    } catch (error) {
        console.error(error)
        return content
    }
    const iv = random.getRandomBytes(12)
    const encrypted = await aes.encrypt(content, sharedKey, { name: 'AES-GCM', iv })

    const arr = new Uint8Array(encrypted.length + iv.length)
    arr.set(encrypted)
    arr.set(iv, encrypted.length)
    return arr
}

/** 加密群聊消息 */
export async function encryptGroupMessage(content: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
    const iv = random.getRandomBytes(16)
    const encrypted = await aes.encrypt(content, key, { iv, name: 'AES-CBC' })
    const arr = new Uint8Array(encrypted.length + iv.length)
    arr.set(iv)
    arr.set(encrypted, iv.length)
    return arr
}
