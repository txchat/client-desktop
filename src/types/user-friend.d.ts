export interface Friend {
    /** 好友地址 */
    address: string

    /**
     * 将该好友分配到指定服务器，
     * 目前业务需求只要分配 1 台即可，
     * 该用户发送的消息只会被本字段指定的服务器接收
     */
    assignedServerIds: string[]
}

export interface Friends {
    [friendAddress: string]: Friend
}

export type AlphabetizedFriendList = {
    /** 按首字母分组的标签 (A-Z#) */
    tag: string

    /** 当前分组下的好友 */
    friends: Friend[]
}[]
