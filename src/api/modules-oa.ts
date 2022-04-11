import axios, { AxiosResponse } from 'axios'
import { Enterprise, Staff } from '@/types/oa'
import { useAccountStore } from '@/store/user-account'
import { generateToken } from '@/utils/account'
import { useModulesStore } from '@/urls/modules'

const request = axios.create({ method: 'post' })

request.interceptors.request.use((config) => {
    // token
    const accountStore = useAccountStore()
    if (accountStore.account) config.headers['FZM-SIGNATURE'] = generateToken(accountStore.account)
    else console.warn(`oaApi: 请求 '${config.url}' 时检测到未登录`)

    // baseUrl
    const modulesStore = useModulesStore()
    if (modulesStore.oaServer) config.baseURL = modulesStore.oaServer
    else console.warn(`oaApi: 请求 '${config.url}' 时未发现 oa server`)
    return config
})

type Response<T> = {
    data: T
    msg: string
    code: number
}

export const oaApi = {
    getStaff(address?: string): Promise<AxiosResponse<Response<Staff | null>>> {
        const id = address || useAccountStore().account?.address
        if (!id) throw new Error('getStaff 请求构造失败: 没有请求的目标地址')
        return request({ url: '/v1/staff/get-staff', data: { id } })
    },

    getEnterprise(id: string): Promise<AxiosResponse<Response<Enterprise>>> {
        return request({ url: '/v1/enterprise/info', data: { id } })
    },
}
