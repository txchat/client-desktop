import Axios from 'axios'
import type { AxiosResponse } from 'axios'
import { Account } from '@/types/user-account'
import { generateToken } from '@/utils/account'
import { BindEmailPayload, BindPhonePayload, SafetyInfo } from '@/types/user-safety'

const axios = Axios.create({
    method: 'post',
    timeout: 1000 * 10,
})

type ApiResponse<T> = AxiosResponse<{
    data: T
    message: string
    result: number
}>

export const backupApi = {
    setPassword(encryptedMnemonic: string, account: Account): Promise<void> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/edit-mnemonic',
                headers: { 'FZM-SIGNATURE': generateToken(account) },
                data: { mnemonic: encryptedMnemonic },
            })
                .then((res: ApiResponse<void>) => {
                    if (res.data.result === 0) resolve(res.data.data)
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    getBindings(account: Account): Promise<SafetyInfo> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/address-retrieve',
                headers: { 'FZM-SIGNATURE': generateToken(account) },
            })
                .then((res: ApiResponse<SafetyInfo>) => {
                    if (res.data.result === 0) resolve(res.data.data)
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    getPhoneCaptcha(regionCode: string, phoneNumber: string): Promise<void> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/phone-send',
                data: {
                    area: regionCode,
                    phone: phoneNumber,
                },
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.result === 0) resolve()
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    /**对手机号预检，是否绑定了其他账号 */
    queryPhone(area: string, phone: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/phone-query',
                data: { area, phone },
            })
                .then((res: ApiResponse<{ exists: boolean }>) => {
                    if (res.data.result === 0) resolve(res.data.data.exists)
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    bindPhone(payload: BindPhonePayload, account: Account): Promise<string> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/phone-binding',
                headers: { 'FZM-SIGNATURE': generateToken(account) },
                data: {
                    area: payload.regionCode,
                    phone: payload.phoneNumber,
                    code: payload.smsCaptcha,
                    mnemonic: payload.encryptedMnemonic,
                },
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.result === 0) resolve(res.data.data)
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    retrieveWithPhone(regionCode: string, phoneNumber: string, smsCaptcha: string): Promise<SafetyInfo> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/phone-retrieve',
                data: {
                    area: regionCode,
                    phone: phoneNumber,
                    code: smsCaptcha,
                },
            })
                .then((res: ApiResponse<SafetyInfo>) => {
                    if (res.data.result === 0) resolve(res.data.data)
                    else if (res.data.result === -4007) reject('验证码不正确')
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    getEmailCaptcha(emailAddress: string): Promise<void> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/email-send',
                data: { email: emailAddress },
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.result === 0) resolve()
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    /**对手机号预检，是否绑定了其他账号 */
    queryEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/email-query',
                data: { email },
            })
                .then((res: ApiResponse<{ exists: boolean }>) => {
                    if (res.data.result === 0) resolve(res.data.data.exists)
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    bindEmail(payload: BindEmailPayload, account: Account): Promise<string> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/email-binding',
                headers: { 'FZM-SIGNATURE': generateToken(account) },
                data: {
                    email: payload.emailAddress,
                    code: payload.emailCaptcha,
                    mnemonic: payload.encryptedMnemonic,
                },
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.result === 0) resolve(res.data.data)
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },

    retrieveWithEmail(emailAddress: string, smsCaptcha: string): Promise<SafetyInfo> {
        return new Promise((resolve, reject) => {
            axios({
                url: '/backup/email-retrieve',
                data: {
                    email: emailAddress,
                    code: smsCaptcha,
                },
            })
                .then((res: ApiResponse<SafetyInfo>) => {
                    if (res.data.result === 0) resolve(res.data.data)
                    else if (res.data.result === -4007) reject('验证码不正确')
                    else reject(res.data.message)
                })
                .catch((res) => reject(res))
        })
    },
}
