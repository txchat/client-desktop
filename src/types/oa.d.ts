export interface Staff {
    /** 团队信息可视范围 - 0：仅同团队组织可见；1：所有人不可见；2：所有人可见 */
    cardViewable: 0 | 1 | 2

    /** 员工 ID */
    id: string

    /** 员工姓名 */
    name: string

    /** 员工职位 */
    position?: string

    /** 员工类型 */
    role: 0 | 1 | 2 | 3

    /** 是否为管理员 */
    isAdmin: boolean

    /** 工作地点 */
    workplace?: string

    /** 是否激活 */
    isActivated: boolean

    /** 加入时间 */
    joinTime: number

    /** 员工直属领导 ID */
    leaderId?: string

    /** 手机号可视范围 - 0：仅同团队组织可见；1：所有人不可见；2：所有人可见 */
    phoneViewable: 0 | 1 | 2

    /** 手机号 */
    phone: string

    /** 短号 */
    shortPhone: string

    /** 邮箱 */
    email: string

    /** 企业 ID */
    entId: string

    /** 企业名称 */
    entName?: string

    /** 部门 ID */
    depId: string

    /** 部门名称 */
    depName?: string

    /** 对应企业的聊天服务器 */
    imServer: string
}

export interface Enterprise {
    id: string
    oaServer: string
    imServer: string
    nodeServer: string
    avatar: string
    description: string
    name: string
}
