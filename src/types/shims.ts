/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.png' {
    const value: string
    export = value
}

declare module '*.svg' {
    const value: string
    export = value
}

declare module 'vue-highlight-words'

declare module '@33cn/wallet-base'
declare module '@33cn/wallet-base/dist/bipwallet/HDWallet'
declare module 'bip44-constants'
