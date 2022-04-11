import { urlRemovePrefix } from './url-replace'

const [, uri] = window.location.href.split('?')
const pairs = uri && uri.split('&')
const query: { [queryParams: string]: string } = {}
pairs &&
    pairs.forEach((p) => {
        const [key, value] = p.split('=')
        query[key] = value
    })

/**
 * 判断是否是通过扫描二维码的方式进入
 * (用户扫描二维码的方式进入 /group-code 页面后跳转进来的情况下, url 会带参数)
 */
export function fromQr(): boolean {
    return !!query['from-qr']
}

/**
 * 展示扫描二维码加入的群聊的结果
 * (用户扫描二维码的方式进入 /group-code 页面后会加入一个群)
 * @param server 群聊所在的服务器地址
 * @param gid 群聊的 id
 */
export function getJoinedGroup(): null | { hostId: string; gid: string } {
    if (!query.server || !query.gid) return null
    return {
        hostId: urlRemovePrefix(decodeURIComponent(query.server)),
        gid: query.gid,
    }
}
