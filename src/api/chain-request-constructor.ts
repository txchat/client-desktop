/**
 * 由于区块链请求中携带的参数有大量重复内容，以及和主要业务无关的逻辑，
 * 因此将这些内容提取至这里。
 */

import { sign } from '@/utils/sign'
import { arrayToHex, hexToArray } from 'enc-utils'

export interface KeyPair {
    publicKey: string
    privateKey: string
}

/**
 * 抽象类，用于构造 RPC 请求数据
 */
abstract class RpcRequestData<T> {
    readonly jsonrpc: '2.0' = '2.0'
    readonly id = 1
    constructor(readonly method: string, readonly params: Array<T>) {}
}

/**
 * 构造用于查询的请求参数
 */
export class RpcQueryRequestData<T> extends RpcRequestData<RpcQueryRequestParams<T>> {
    constructor(queryConfig: { funcName: string; payload: T; keyPair?: KeyPair; execer?: string }) {
        const { funcName, payload, keyPair } = queryConfig
        const params = [
            {
                execer: queryConfig.execer || ('chat' as const),
                funcName,
                payload: {
                    ...payload,
                    sign: keyPair && {
                        publicKey: keyPair.publicKey,
                        signature: signQueryPayload(payload, keyPair),
                    },
                },
            },
        ]

        super('Chain33.Query', params)
    }
}

/** 查询类请求的通用结构 */
interface RpcQueryRequestParams<T> {
    execer: string
    funcName: string
    payload: T & {
        sign?: {
            publicKey: string
            signature: string
        }
    }
}

/**
 * 构造用于修改的请求参数
 */
export class RpcUpdateRequestData<T> extends RpcRequestData<T> {
    constructor(methodName: string, payload: T) {
        super(methodName, [payload])
    }
}

/**
 * 对查询操作的参数做签名：
 * 1. 将参数按照 key 的字母升序排序
 * 2. 将参数按照 k1=v1&k2=v2.... 的形式组合成字符串（内容为空的也要带上）
 * 3. 将第二步的结果进行 sha256
 * 4. 使用 secp256k1 ECSDA 签名第三步的结果
 */
export function signQueryPayload<T>(payload: T, keyPair: KeyPair): string {
    const keys = Object.keys(payload) as Array<keyof typeof payload>
    const orderedKeys = keys.sort()

    const stringifiedPayload = orderedKeys.reduce((prev, curr, i) => {
        return prev + (i === 0 ? '' : '&') + curr + '=' + payload[curr]
    }, '')

    const signatrue = sign(stringifiedPayload, hexToArray(keyPair.privateKey))
    return arrayToHex(signatrue)
}
