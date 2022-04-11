/**
 * 检查一串字符串是否为有效的 url
 * Checks if a string is a valid url
 */
const regUrl =
    /^(https?:\/\/)?(([a-z0-9-])+\.){1,4}((net)|(com)|(cn)|(fun)|(online)|(cc)|(xyz)|(me)|(co)|(tv)|(cool)|(io)|(dev)|(org))(\/[a-z0-9-_&%=]*)*$/gim
const regIp = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))/i

export default function (val: string | undefined): boolean {
    if (!val) return false

    return typeof val === 'string' && (regUrl.test(val) || regIp.test(val))
}

export function isIp(val: string | undefined): boolean {
    if (!val) return false
    return typeof val === 'string' && regIp.test(val)
}
