export interface RedPacket {
    packetId: string
    addr: string
    type: 1 | 2
    assetExec: string
    assetSymbol: string
    amount: number
    size: number
    to: string[]
    remain: number
    /** 1:待领 2:已领完 3:已退回 过期以过期时间为准 */
    status: 1 | 2 | 3
    signPubkey: string
    signPrikey: string
    remark: string
    create_at: number
    updated_at: number
    expiresTime: string
    txIndex: string
}

export interface ReceiveRequestPayload {
    /** 红包 id, 或者也被称为 txHash */
    packetId: string
    /** 接收红包者的地址 */
    receiverAddress: string
    /** 红包私钥 */
    packetPrivateKey: string
    /** 接收红包者的私钥 */
    privateKey: string
}

export interface GetReceiveResultRequest {
    /** 用户地址 */
    address: string
    /** 红包 id, 或者也被称为 txHash */
    packetId: string
}

export interface ReceiveResult {
    addr: string
    packetId: ''
    /** 领取编号, 用于滚动查询 */
    receiveId: ''
    /** 币种所属合约 */
    assetExec: string
    /** 币种名 */
    assetSymbol: string
    /** 金额 */
    amount: string
    /** 领取时间 */
    createTime: number
    /** 领取状态 1：入账成功 2：入账失败 */
    status: 1
    /** 失败信息, 仅当为入账失败状态时才会返回 */
    failMessage: ''
}

export interface WithdrawRequestPayload {
    execName: 'user.p.testproofv2.redpacket'
    execer: 'user.p.testproofv2.token'
    to: '17xAdZCoTemiGw3wpYLrTdPayojYYpxqPt'
    amount: number
    tokenSymbol: string
    isWithdraw: true
    isToken: true
}
