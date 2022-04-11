import FzmMessageProtocolConnection from '@/utils/fzm-message-protocol/FzmMessageProtocolConnection'

/** 一个连接, 仅有 `hostId` 表示正在连接 */
interface Connection {
    status: 'connected' | 'failed' | 'connecting'
    hostId: string
    instance?: FzmMessageProtocolConnection
    error?: Error | string
    failedTime?: number
}

export type Connections = {
    /** hostId 为连接目标服务器的 url (去除协议前缀) */
    [hostId: string]: Connection | undefined
}
