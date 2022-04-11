import { defineStore } from 'pinia'

interface NetworkItem {
    name: string
    address: string
    online?: boolean
    selected?: boolean
    official?: boolean
}

export const useEditingNetworkItemStore = defineStore({
    id: 'url: editing',

    state() {
        return {
            editing: { name: '', address: '' } as NetworkItem,
        }
    },
})
