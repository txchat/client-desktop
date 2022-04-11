import { isEnv } from '@/utils/env'
import { useDisc, useModules, useUpdate } from './composables/startup'

/** 用户进入网页后, 无论是否登录, 都需要做的事情 */
export function useStartup(): void {
    if (isEnv.electron) {
        useUpdate() // 检查更新
    }

    useDisc().disc() // 查询官方提供的聊天服务器和区块链节点

    useModules().getModules() // 获取后端启用的功能模块
}
