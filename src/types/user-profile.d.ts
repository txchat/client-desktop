import { Staff } from './oa'

/** 聊天服务器 */
export interface ChatServer {
    /** 后端编号的服务器 id */
    id: string

    /** 用户设定的服务器名称 */
    name: string

    /** 服务器 url */
    address: string
}

/** 用户的个人资料，包括自己、好友和陌生人 */
export interface UserProfile {
    /** 地址 */
    address: string

    /** 头像 */
    avatar: string

    /** 昵称 */
    nickname: string

    /** 聊天服务器 */
    chatServers: ChatServer[]

    /** 我对目标用户的备注 */
    remark?: string

    /** 绑定的手机，仅当前登录的用户有该值 */
    phone?: string

    /** 绑定的邮箱，仅当前登录的用户有该值 */
    email?: string

    /** 公钥，仅当前登录的用户有该值 */
    pubKey?: string

    /** 该用户作为企业员工的信息 */
    staffInfo?: Staff
}

export interface UserProfiles {
    [userAddress: string]: UserProfile | null
}
