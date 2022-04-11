import eccrypto from 'eccrypto'
import { arrayToBuffer, bufferToArray } from 'enc-utils'
export async function computeSharedKey(privateKeyA: Uint8Array, publicKeyB: Uint8Array): Promise<Uint8Array> {
    const sharedKey = bufferToArray(await eccrypto.derive(arrayToBuffer(privateKeyA), arrayToBuffer(publicKeyB)))
    if (sharedKey.length === 32) {
        return sharedKey
    } else if (sharedKey.length < 32) {
        const _arr = new Uint8Array(32)
        _arr.set(sharedKey, 32 - sharedKey.length)
        return _arr
    } else {
        return Promise.reject('computeSharedKeyError: sharedKey 长度不正确: ' + sharedKey.length)
    }
}
