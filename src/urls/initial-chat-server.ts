import { LocalStorageKeys } from '@/store/local-key'
import { urlReplacePrefix } from '@/utils/url-replace'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface InitialChatServer {
    name: string
    address: string
    online?: boolean
    selected?: boolean
    official?: boolean
}

export const useInitialChatServerUrlStore = defineStore({
    id: 'url: initial chat server',

    state() {
        return {
            officials: [] as InitialChatServer[],
            customs: JSON.parse(localStorage.getItem(LocalStorageKeys.CustomServers) || '[]') as InitialChatServer[],
        }
    },

    getters: {
        servers(): InitialChatServer[] {
            return [...this.officials, ...this.customs]
        },

        current(): InitialChatServer | undefined {
            return this.servers.find((s) => s.selected)
        },
    },

    actions: {
        focus(node: InitialChatServer) {
            this.servers.forEach((s) => (s.selected = false))
            node.selected = true
        },

        save() {
            localStorage.setItem(LocalStorageKeys.CustomServers, JSON.stringify(this.customs))
        },

        async ping() {
            const requests = this.servers.map((n) =>
                axios.get<null>(urlReplacePrefix(n.address, 'http') + '/ping', {
                    timeout: 1000 * 15,
                })
            )

            const responses = await Promise.allSettled(requests)
            responses.forEach((r, i) => {
                if (r.status === 'fulfilled') {
                    this.servers[i].online = r.value.status === 200
                }
            })
        },
    },
})
