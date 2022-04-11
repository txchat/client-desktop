import base64 from 'base64-js'
import { chatApi } from '@/api/user-chat'
import { useAccountStore } from '@/store/user-account'
import { useChatStore } from '@/store/user-chat'
import { useConnectionStore } from '@/store/user-connection'
import { useReceiveMessage } from '@/views/chat/chat-list/useReceiveMessage'

/** 同步消息, 然后连接服务器 */
export function useServer(): { establish: (serverAddress: string) => void } {
    const accountStore = useAccountStore()

    const chatStore = useChatStore()
    const connectionStore = useConnectionStore()

    return {
        async establish(serverAddress: string) {
            if (!accountStore.account) return

            const { receiveMessage } = useReceiveMessage(serverAddress)

            try {
                const result = await chatApi.syncMessage(
                    serverAddress,
                    20,
                    accountStore.account,
                    chatStore.localStoredLastMessage?.logid
                )
                if (result.data.result !== 0) throw new Error(result.data.message)
                if (result.data.data.record_count > 0) {
                    for await (const m of result.data.data.records) {
                        const mByteArray = base64.toByteArray(m)
                        await receiveMessage(mByteArray)
                    }
                }
            } catch (error) {
                console.log(error)
                throw error
            }

            connectionStore.connect(serverAddress)
        },
    }
}
