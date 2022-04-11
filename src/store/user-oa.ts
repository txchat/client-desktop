import { defineStore } from 'pinia'
import { oaApi } from '@/api/modules-oa'
import { useProfileStore } from './user-profile'
import { Enterprise } from '@/types/oa'

export const useOaStore = defineStore({
    id: 'user: oa',

    state() {
        return {
            enterprise: null as Enterprise | null,
        }
    },

    actions: {
        async getEnterprise(id?: string): Promise<Enterprise> {
            const profileStore = useProfileStore()
            if (!profileStore.myProfile?.staffInfo) return Promise.reject('getEnterpriseError: 没有我的员工信息')

            const entId = id || profileStore.myProfile.staffInfo.entId

            const res = await oaApi.getEnterprise(entId)
            if (res.status !== 200) return Promise.reject(res.statusText)
            if (![/** 成员不存在 */ 13001, 0].includes(res.data.code)) return Promise.reject(res.data.msg)

            if (!id) this.enterprise = res.data.data

            return res.data.data
        },
    },
})
