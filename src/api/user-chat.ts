import Axios from 'axios'
import type { AxiosResponse } from 'axios'
import { Account } from '@/types/user-account'
import { generateToken } from '@/utils/account'
import { isIp } from '@/utils/is-url'
import prependHttp from 'prepend-http'
import { isEnv } from '@/utils/env'

const axios = Axios.create({ method: 'post' })

axios.interceptors.request.use((config) => {
    const https = (function () {
        if (isIp(config.url)) return false
        if (process.env.NODE_ENV === 'development') return true
        if (isEnv.electron) return true
        return window.location.protocol === 'https:'
    })()
    config.url = prependHttp(config.url || '', { https })
    return config
})

type ApiResponse<T> = AxiosResponse<{
    data: T
    message: string
    result: number
}>

export const chatApi = {
    /** 通过 HTTP 请求发送消息 */
    sendMessage(serverAddress: string, msg: Uint8Array, account: Account): Promise<string> {
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('message', new Blob([msg]))

            axios({
                url: serverAddress + '/record/push',
                headers: { 'FZM-SIGNATURE': generateToken(account), 'Content-Type': 'multipart/form-data' },
                data: formData,
                transformResponse(data) {
                    return JSON.parse(data.replace(/"logId":(\d*)/, '"logId":"$1"'))
                },
            })
                .then((res: ApiResponse<{ logId: string }>) => {
                    if (res.data.result === 0) {
                        resolve(String(res.data.data.logId))
                    } else {
                        reject(res.data.message)
                    }
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /** 撤回消息 */
    async recallMessage(serverAddress: string, chatType: 0 | 1, logId: string, account: Account): Promise<void> {
        try {
            // logId 过长, 导致内存溢出, 因此需手动拼接请求 data
            const result = await axios({
                url: serverAddress + '/app/record/revoke',
                headers: { 'FZM-SIGNATURE': generateToken(account), 'content-type': 'application/json;charset=UTF-8' },
                data: `{"type": ${chatType}, "logId": ${logId}}`,
            })
            if (result.status === 200 && result.data.result === 0) return
            else return Promise.reject(result.data.message)
        } catch (error) {
            return Promise.reject(Axios.isAxiosError(error) ? error.message : error)
        }
    },

    async syncMessage(
        serverAddress: string,
        count: number,
        account: Account,
        startLogid?: string
    ): Promise<ApiResponse<{ record_count: number; records: string[] }>> {
        return axios({
            url: serverAddress + '/app/record/sync-record',
            headers: { 'FZM-SIGNATURE': generateToken(account), 'content-type': 'application/json;charset=UTF-8' },
            data: startLogid ? `{"count": ${count}, "start": ${startLogid}}` : `{"count": ${count}}`,
        })
    },
}
