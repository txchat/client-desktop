import { modulesApi } from '@/api/modules'
import { Version } from '@/types/version'
import { defineStore } from 'pinia'

export const useUpdateStore = defineStore({
    id: 'update',
    state() {
        return {
            newVersion: null as Version | null,
        }
    },

    actions: {
        async check(): Promise<Version | null> {
            const result = await modulesApi.checkForUpdate(VERSION_CODE)

            if (result.status === 200 && result.data.result === 0) {
                // 本地存储结果
                const remoteVersionCode = result.data.data.versionCode
                const localVersionCode = Number(VERSION_CODE)
                if (remoteVersionCode > localVersionCode) {
                    this.newVersion = result.data.data
                    return result.data.data
                } else {
                    this.newVersion = null
                    return null
                }
            } else throw new Error('检查更新失败')
        },
    },
})
