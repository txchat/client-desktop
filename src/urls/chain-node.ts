import { LocalStorageKeys } from '@/store/local-key'
import { urlPrependHttp } from '@/utils/url-replace'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface ChainNode {
    name: string
    address: string
    online?: boolean
    selected?: boolean
    official?: boolean
}

export const useChainNodeUrlStore = defineStore({
    id: 'url: chain node',

    state() {
        return {
            officials: [] as ChainNode[],
            customs: JSON.parse(localStorage.getItem(LocalStorageKeys.CustomNodes) || '[]') as ChainNode[],
        }
    },

    getters: {
        nodes(): ChainNode[] {
            return [...this.officials, ...this.customs]
        },

        current(): ChainNode | undefined {
            const _curr =
                this.nodes.find((n) => n.selected) ||
                JSON.parse(localStorage.getItem(LocalStorageKeys.SelectedNode) || '{}')

            return _curr
        },
    },

    actions: {
        focus(node: ChainNode) {
            this.nodes.forEach((n) => (n.selected = false))
            node.selected = true
        },

        save() {
            localStorage.setItem(LocalStorageKeys.CustomNodes, JSON.stringify(this.customs))
            localStorage.setItem(LocalStorageKeys.SelectedNode, JSON.stringify(this.current))
        },

        async ping() {
            const requests = this.nodes.map((n) =>
                axios.get<null>(urlPrependHttp(n.address) + '/ping', {
                    timeout: 1000 * 15,
                })
            )

            const responses = await Promise.allSettled(requests)
            responses.forEach((r, i) => {
                if (r.status === 'fulfilled') {
                    this.nodes[i].online = r.value.status === 200
                }
            })
        },
    },
})
