export interface ChatGroupMember {
    /** 用户地址 */
    memberId: string

    /** 群昵称 */
    memberName: string

    /** 用户角色，2=群主，1=管理员，0=群员，10=退群 */
    memberType: 0 | 1 | 2 | 10

    /** 该用户被禁言结束的时间; 9223372036854775807=永久禁言  */
    memberMuteTime: number
}

export interface ChatGroup {
    /**
     * 基本信息
     */

    /** 群所在聊天服务器 (去除前缀) */
    host: string

    /** 群 id */
    id: string

    /** 群短号 */
    markId: string

    /** 私密群名, aes 加密后使用 base64 编码 */
    name: string

    /** 公开群名 */
    publicName: string

    avatar: string

    introduce: string

    createTime: number

    /** 群状态，0=正常 1=封禁 2=解散 */
    status: 0 | 1 | 2

    /** 加好友限制， 0=群内可加好友，1=群内禁止加好友 */
    friendType: 0 | 1

    /**
     * 加群方式，
     * 0=无需审批（默认），
     * 1=禁止加群，群主和管理员邀请加群,
     * 2=普通人邀请需要审批,群主和管理员直接加群
     */
    joinType: 0 | 1 | 2

    /**
     * 成员信息
     */

    /** 群主信息 */
    owner: ChatGroupMember

    /** 我的信息 */
    person: ChatGroupMember

    /**
     * 所有成员
     * @note 部分接口不会返回此字段
     */
    members?: ChatGroupMember[]

    /** 当前成员数量 */
    memberNum: number

    /** 管理员数量 */
    adminNum: number

    /** 群人数上限 */
    maximum: number

    /**
     * 禁言功能
     */

    /** 禁言类型， 0=全员可发言， 1=全员禁言(除群主和管理员) */
    muteType: 0 | 1

    /** 当前被禁言的人数 */
    muteNum: number

    /** 群秘钥, 用于加密/解密群名和群消息 */
    key: string
}

/** 存放群聊列表的服务器列表 */
export interface ChatGroupHosts {
    /** 宿主服务器的地址(去掉协议前缀) */
    [hostId: string]: ChatGroups
}

/** 群聊列表 */
export interface ChatGroups {
    [groupId: string]: ChatGroup
}

/** 后端返回的 */
export interface ChatGroupResponse extends ChatGroup {
    /** 字符串形式的 id */
    idStr: string
}

export interface UpdateGroupNameRequest {
    id: string
    name: string
    publicName: string
}
