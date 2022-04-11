/** 缩略字符串的中间 n 位，只保留前后各 x 位 */
export function truncate(str: string, breakpoint = 20, remainLeft = 4, remainRight = 4): string {
    if (str.length <= breakpoint) return str
    else {
        return str.substring(0, remainLeft) + '****' + str.substring(str.length - remainRight)
    }
}
