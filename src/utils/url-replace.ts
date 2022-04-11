import { isIp } from './is-url'
import prependHttp from 'prepend-http'
import { isEnv } from './env'

/**
 * 替换传入的 url 前缀为 WebSocket 前缀或 HTTP 前缀
 * @param url 如果传入的 url 不带协议前缀，则默认返回 http 或 ws，如果想返回 https 或 wss，需传入带协议头的 url
 * @param protocol 想要得到的前缀，默认为 ws
 */
export function urlReplacePrefix(url: string, protocol?: 'http' | 'websocket'): string {
    const requireHttp = protocol === 'http'
    const requireSsl = /^(wss:\/\/)|(https:\/\/)/.test(url)

    const prefix = requireHttp ? (requireSsl ? 'https://' : 'http://') : requireSsl ? 'wss://' : 'ws://'

    const prefixRegExp = /^(wss?:\/\/)|(https?:\/\/)/
    const hasProtocolPrefix = prefixRegExp.test(url)

    if (hasProtocolPrefix) return url.replace(prefixRegExp, prefix)
    else return prefix + url
}

/** 为 url 添加 'http' 或 'https' 前缀 */
export function urlPrependHttp(url: string): string {
    if (isEnv.electron) return prependHttp(url, { https: false })
    if (isIp(url)) return prependHttp(url, { https: false })
    if (window.location.protocol === 'http:') return prependHttp(url, { https: false })
    else return prependHttp(url)
}

export function urlRemovePrefix(url: string): string {
    const prefixRegExp = /^(wss?:\/\/)|(https?:\/\/)/
    return url.replace(prefixRegExp, '')
}
