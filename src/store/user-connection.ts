import { toRef } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { until, useTimeout } from '@vueuse/core'
import { useAccountStore } from './user-account'
import { useChatGroupStore } from './user-chat-group'
import { generateToken } from '@/utils/account'
import FzmMessageProtocol from '@/utils/fzm-message-protocol'
import { urlRemovePrefix, urlReplacePrefix } from '@/utils/url-replace'
import { Connections } from '@/types/user-connection'
import { useProfileStore } from './user-profile'
import { encodeLoginInfo } from '@/utils/login-codec'

export const useConnectionStore = defineStore({
    id: 'user: connection',

    state() {
        return {
            connections: {} as Connections,
        }
    },

    getters: {
        connectedLength(): number {
            return Object.values(this.connections).filter((c) => c && !c.error && c.instance).length
        },

        everyServerConnected(): boolean {
            const connectionsArr = Object.values(this.connections)
            if (connectionsArr.length === 0) return false
            else return connectionsArr.every((c) => c && c.status === 'connected')
        },

        anyServersFailed(): boolean {
            return Object.values(this.connections).some((c) => c && c.status === 'failed')
        },
    },

    actions: {
        async connect(serverAddress: string): Promise<void> {
            const hostId: string = urlRemovePrefix(serverAddress)
            const connection = toRef(this.connections, hostId)

            // 不存在或之前失败的连接
            if (!connection.value || connection.value.status === 'failed') {
                console.log(`💬 ${hostId}: 开始连接`)

                const { account, loginType } = storeToRefs(useAccountStore())
                if (!account.value) throw new Error('connectError: 账户未登录')

                const { myProfile } = storeToRefs(useProfileStore())
                await until(myProfile).not.toBeNull()

                const nickname = myProfile.value!.nickname

                if (connection.value) connection.value.status = 'connecting'
                else connection.value = { hostId, status: 'connecting' }

                try {
                    const url = urlReplacePrefix(serverAddress) + '/sub/'
                    connection.value.instance = await new FzmMessageProtocol(url).authorize({
                        appId: 'dtalk',
                        token: generateToken(account.value),
                        ext: encodeLoginInfo(nickname, loginType.value === '本地存储' ? 1 : 0),
                    })
                    connection.value.status = 'connected'
                    delete connection.value.error
                    connection.value.failedTime && (connection.value.failedTime = 0)
                    console.log(`💬 ${hostId}: 已连接`)
                    useChatGroupStore().getChatGroups(hostId)
                } catch (error) {
                    console.error(error)

                    if (error instanceof Error) this.connections[hostId]!.error = error
                    else this.connections[hostId]!.error = new Error(`连接服务器"${serverAddress}"失败`)
                    connection.value.failedTime ? connection.value.failedTime++ : (connection.value.failedTime = 1)
                    connection.value.status = 'failed'

                    const pause =
                        connection.value.failedTime < 3
                            ? 2 * 1000
                            : connection.value.failedTime < 10
                            ? 5 * 1000
                            : 30 * 1000
                    console.log(`💬 ${hostId}: ${pause / 1000} 秒后将再次尝试连接`)

                    await useTimeout(pause)
                    this.connect(serverAddress)
                }
            }

            // 连接中或已连接
            else return Promise.resolve()
        },

        disconnect(serverAddress: string): void {
            const hostId: string = urlRemovePrefix(serverAddress)
            this.connections[hostId]?.instance?.disconnect()
            delete this.connections[hostId]
        },

        reset() {
            Object.values(this.connections).forEach((c) => c?.instance?.disconnect())
            this.$reset()
        },
    },
})
