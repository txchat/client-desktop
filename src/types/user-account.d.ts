/**
 * 根据本地本地存储的账户信息算出的更多信息
 * 处理业务时主要使用这个数据结构，而不是本地存储的
 */
export interface Account {
    mnemonic: string
    address: string
    privateKey: Uint8Array
    privateKeyHex: string
    publicKey: Uint8Array
    publicKeyHex: string
}

export type LoginType = '创建助记词, 跳过校验' | '创建助记词, 已校验' | '导入助记词' | '找回助记词' | '本地存储'

/**
 * 账户的本地存储形态，不保存私钥
 */
export interface LocalStoredAccount {
    address: string
    publicKey: string
    mnemonic: string
}

export interface AccountDB {
    /** 保存我的好友 */
    friends: LocalForage
    /** 保存所有访问过的用户的个人资料，包括自己、好友和陌生人 */
    userProfiles: LocalForage
    /** 用户备注信息 */
    remarks: LocalForage
    /** 保存我的聊天记录 */
    chats: LocalForage
    /** 群聊 */
    chatGroups: LocalForage
    /** 文件 */
    files: LocalForage
    /** 杂项 */
    misc: LocalForage
}
