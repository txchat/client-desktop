export function isAllChinese(temp: string): boolean {
    const re = /[^\u4e00-\u9fa5]/
    if (re.test(temp)) return false
    return true
}
