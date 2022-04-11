import axios, { AxiosResponse } from 'axios'
import { Module } from '@/types/module'
import { Version } from '@/types/version'

const request = axios.create({ method: 'post' })

interface AppResponse<T> {
    data: T
    message: string
    result: number
}

type ModulesResponse = AppResponse<Module[]>

export const modulesApi = {
    getAllModules(): Promise<AxiosResponse<ModulesResponse>> {
        return request('/app/modules/all')
    },

    checkForUpdate(version: string): Promise<AxiosResponse<AppResponse<Version>>> {
        return request('/app/version/check', {
            headers: { 'FZM-DEVICE': 'PC' },
            data: { versionCode: version },
        })
    },
}
