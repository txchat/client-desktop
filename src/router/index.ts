import { defineStore } from 'pinia'

export type Tab = 'chat' | 'friend' | 'settings'

/**
 * 本项目没有使用 Vue Router, 而是使用一个 Pinia store 来管理页面。
 * 当页面切换时，url 就不会携带不必要的路径后缀。
 */
export const useRouter = defineStore({
    id: 'app: router',
    state() {
        return {
            route: 'chat' as Tab,
            /** 前往设置页的同时弹出绑定手机或邮箱的边栏 */
            backupTarget: null as null | 'phone' | 'email',
        }
    },
})
