import { Account } from '@/types/user-account'
import base64 from 'base64-js'
import { sign } from '@/utils/sign'

let latestSig = ''
let forAccount = ''
let updateTime = 0

/**
 * 获取一个账号的 token, 一分钟内对于同一个账号不重复生成
 * @param account 账号信息
 * @returns token
 */
export function generateToken(account: Account): string {
    const timeDiff = Date.now() - updateTime
    if (timeDiff < 60 * 1000 && latestSig && forAccount == account.address) return latestSig

    const message = String(Date.now()) + '*'
    const signature = sign(message, account.privateKey)
    const base64Signature = base64.fromByteArray(signature)
    updateTime = Date.now()
    forAccount = account.address
    latestSig = `${base64Signature}#${message}#${account.publicKeyHex}`
    return latestSig
}
