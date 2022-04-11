import pinyingMatch from 'pinyin-match'
/**
 * 获取匹配的原字符
 * @param str 被匹配的字符 例如 北京欢迎你
 * @param matchWord 匹配规则 例如 bj
 * @returns 匹配结果 例如 北京
 */
export function getMatchedStr(str: string, matchWord: string): string | undefined {
    const matchResult = pinyingMatch.match(str, matchWord)
    if (matchResult && Array.isArray(matchResult)) {
        return str.slice(matchResult[0], matchResult[1] + 1)
    } else {
        return undefined
    }
}
