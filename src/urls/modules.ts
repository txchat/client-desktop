import { defineStore } from 'pinia'
import { modulesApi } from '@/api/modules'
import { Module } from '@/types/module'
import { Notify } from 'quasar'

/** 后端可选模块启用状态 */
export const useModulesStore = defineStore({
    id: 'url: modules',

    state() {
        return {
            finished: false,
            /** 企业架构模块 */
            oa: null as Module | null,
            /** 红包模块 */
            redPacket: null as Module | null,
        }
    },

    getters: {
        oaServer(): string | null {
            if (!this.oa) return null
            if (!this.oa.isEnabled) return null
            if (!this.oa.endPoints.length) return null
            return this.oa.endPoints[0]
        },

        oaEnabled(): boolean {
            if (!this.oa) return false
            return this.oa.isEnabled
        },

        redPacketServer(): string | null {
            if (!this.redPacket) return null
            if (!this.redPacket.isEnabled) return null
            if (!this.redPacket.endPoints.length) return null
            return this.redPacket.endPoints[0]
        },

        redPacketEnabled(): boolean {
            if (!this.redPacket) return false
            return this.redPacket.isEnabled
        },
    },

    actions: {
        /** 获取各个可选模块的启用状态 */
        async get() {
            try {
                const result = await modulesApi.getAllModules()

                const oaModule = result.data.data.find((m) => m.name === 'oa')
                oaModule && (this.oa = oaModule)

                const redPacketModule = result.data.data.find((m) => m.name === 'redPacket')
                redPacketModule && (this.redPacket = redPacketModule)

                this.finished = true
            } catch (error) {
                Notify.create({
                    message: '获取功能模块失败，这可能导致部分功能不可用。',
                    actions: [{ label: '刷新', color: 'white', handler: () => window.location.reload() }],
                })
            }
        },
    },
})
