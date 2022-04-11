import secp256k1 from 'secp256k1'
import { crypto } from 'bitcoinjs-lib'
import { utf8ToBuffer } from 'enc-utils'

/**
 * 对消息进行签名
 * 结果必须为 65 字节长度，不然后端验证不成功；
 * 最后一个字节的数据为 `recover id`
 */
export function sign(message: string, privateKey: Uint8Array): Uint8Array {
    const hashedMessage = crypto.sha256(utf8ToBuffer(message))

    /** 签名本身为 64 字节长 */
    const { signature, recid } = secp256k1.ecdsaSign(hashedMessage, privateKey)

    const outputSignature = new Uint8Array(65)
    outputSignature.set(signature)
    outputSignature.set([recid], 64)

    return outputSignature
}
