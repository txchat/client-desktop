export interface SafetyInfo {
    address?: string
    mnemonic?: string
    area?: string
    phone?: string
    email?: string
}

export interface BindPhonePayload {
    /** 区域码，中国为 '86' */
    regionCode: '86' | string
    phoneNumber: string
    /** 短信验证码 */
    smsCaptcha: string
    encryptedMnemonic: string
}

export interface BindEmailPayload {
    emailAddress: string
    /** 邮箱验证码 */
    emailCaptcha: string
    encryptedMnemonic: string
}
