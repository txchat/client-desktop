/**
 * Get User Interfaces
 */
export interface GetUserResult {
    groups: string[]
    chatServers: {
        id: string
        name: string
        address: string
    }[]
    fields: {
        name: string
        value: string
        level: 'public' | 'protect' | 'public'
    }[]
}

/**
 * Update User Interfaces
 */
export interface UpdateUserRequest {
    avatar?: string
    nickname?: string
    phone?: string
    email?: string
    pubkey: string
    privkey: string
}

/**
 * Get Friends Interfaces
 */
export interface ChainFriend {
    mainAddress: string
    friendAddress: string
    createTime: string
    groups: string[]
}

/**
 * Update Friends Interfaces
 */
export interface UpdateFriendsRequest {
    friendAddress: string
    groups?: string[]
    pubkey: string
    privkey: string
}

/**
 * Get Chat Server Interfaces
 */
export interface ChainChatServer {
    id: string
    name: string
    value: string
}

/**
 * Update Chat Server Interfaces
 */
export interface UpdateChatServerPayload {
    id?: string
    /**服务器名称 */
    name?: string
    /** ip 地址 */
    value?: string
    pubkey: string
    privkey: string
}

/**
 * Get Black List Interfaces
 */
export interface BlackList {
    list: {
        mainAddress: string
        targetAddress: string
        createTime: string
    }[]
}

/**
 * Update Black List Interfaces
 */
export interface UpdateBlackListRequest {
    targetAddress: string
    pubkey: string
    privkey: string
}
