import { storeToRefs } from 'pinia'
import Axios, { AxiosResponse } from 'axios'
import { KeyPair, RpcQueryRequestData, RpcUpdateRequestData } from './chain-request-constructor'
import type {
    GetUserResult,
    ChainFriend,
    ChainChatServer,
    UpdateChatServerPayload,
    UpdateUserRequest,
    UpdateFriendsRequest,
    BlackList,
    UpdateBlackListRequest,
} from '@/types/chain'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import { urlPrependHttp } from '@/utils/url-replace'

// 初始化 axios 实例
const axios = Axios.create({ method: 'post' })
axios.interceptors.request.use((config) => {
    const { current } = storeToRefs(useChainNodeUrlStore())
    config.baseURL = urlPrependHttp(current.value?.address || '')
    return config
})

axios.interceptors.response.use(undefined, (err) => {
    if (Axios.isAxiosError(err) && !err.response) err.message = '区块链请求失败, 请检查网络连接和区块链节点填写是否正确'
    return Promise.reject(err)
})

type ApiResponse<T> = AxiosResponse<{
    error: string | null
    result: T
}>

/**
 * 聊天应用中涉及区块链的基础功能, 包括用户个人信息, 好友等
 */
export const blockChainApi = {
    /**
     * 用户信息
     */

    /** 获取用户信息 */
    getUser(address: string, targetAddress: string, keyPair: KeyPair): Promise<GetUserResult> {
        const payload = {
            mainAddress: address,
            targetAddress,
            count: 20,
            index: '',
            time: Date.now(),
        }

        return new Promise((resolve, reject) => {
            axios({
                data: new RpcQueryRequestData({
                    funcName: 'GetUser',
                    payload,
                    keyPair,
                }),
            })
                .then((res: ApiResponse<GetUserResult>) => {
                    if (res.data.error) reject(res.data.error)
                    else resolve(res.data.result)
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /** 更新用户信息，删除用户信息不用这个方法，用下面的 unbind */
    updateUser(payload: UpdateUserRequest): Promise<string> {
        return new Promise((resolve, reject) => {
            const { avatar, nickname, phone, email, pubkey, privkey } = payload
            const changeablePayload = { avatar, nickname, phone, email }

            const fields = [{ name: 'pubKey', value: pubkey, type: 1, level: 'public' }]

            let key: keyof typeof changeablePayload
            for (key in changeablePayload) {
                if (changeablePayload[key]) {
                    fields.push({ name: key, value: changeablePayload[key]!, type: 1, level: 'public' })
                }
            }

            axios({ data: new RpcUpdateRequestData('chat.CreateRawUpdateUserTx', { fields }) })
                .then((res: ApiResponse<string>) => {
                    const rawTxData = res.data.result
                    return SendTransaction(rawTxData, privkey)
                })
                .then((hashVal) => {
                    resolve(hashVal)
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /**
     * 好友列表
     */

    /** 获取我的好友列表 */
    getFriends(address: string, keyPair: KeyPair): Promise<ChainFriend[]> {
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcQueryRequestData({
                    funcName: 'GetFriends',
                    payload: { mainAddress: address, count: 5000, index: '', time: Date.now() },
                    keyPair,
                }),
            })
                .then((res: ApiResponse<{ friends: ChainFriend[] }>) => {
                    if (res.data.error) reject(res.data.error)
                    else resolve(res.data.result.friends)
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /**
     * 更新好友列表
     * @param type - 1 为添加， 2 为删除
     */
    UpdateFriends(payload: UpdateFriendsRequest, type: number): Promise<string> {
        const { friendAddress, privkey, groups } = payload
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcUpdateRequestData('chat.CreateRawUpdateFriendTx', {
                    friends: [{ friendAddress, type, groups }],
                }),
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.error) reject(res.data.error)
                    else return SendTransaction(res.data.result, privkey)
                })
                .then((hashVal) => {
                    if (!hashVal) reject('发送签名后的交易不成功')
                    else resolve(hashVal)
                })
        })
    },

    /**
     * 服务器分组
     */

    /** 查询服务器信息 */
    getChatServers(mainAddress: string, keyPair: KeyPair): Promise<ChainChatServer[]> {
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcQueryRequestData({
                    funcName: 'GetServerGroup',
                    payload: { mainAddress, count: 20, index: '', time: Date.now() },
                    keyPair,
                }),
            })
                .then((res: ApiResponse<{ groups: ChainChatServer[] }>) => {
                    if (res.data.error) reject(res.data.error)
                    else resolve(res.data.result.groups)
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /**
     * 更新好友分组 (服务器) 信息
     *  @param type 1->新增；2->删除；3->修改
     */
    updateChatServer(payload: UpdateChatServerPayload, type: number): Promise<string> {
        const { name, value, privkey, id } = payload
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcUpdateRequestData('chat.CreateRawUpdateServerGroupTx', {
                    groups: [{ name, value, type, id }],
                }),
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.error) reject(res.data.error)
                    else return SendTransaction(res.data.result, privkey)
                })
                .then((hashVal) => {
                    if (!hashVal) reject('发送签名后的交易不成功')
                    else resolve(hashVal)
                })
        })
    },

    getBlackList(mainAddress: string, keyPair: KeyPair): Promise<string[]> {
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcQueryRequestData({
                    funcName: 'GetBlackList',
                    payload: { mainAddress, count: 5000, index: '', time: Date.now() },
                    keyPair,
                }),
            })
                .then((res: ApiResponse<BlackList>) => {
                    if (res.data.error) reject(res.data.error)
                    else resolve(res.data.result.list.map((b) => b.targetAddress))
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /**
     * 更新黑名单
     * @param type 1 为添加, 2 为删除
     */
    updateBlackList(payload: UpdateBlackListRequest, type: 1 | 2): Promise<string> {
        const { targetAddress, privkey } = payload
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcUpdateRequestData('chat.CreateRawUpdateBlackTx', {
                    list: [{ targetAddress, type }],
                }),
            })
                .then((res: ApiResponse<string>) => {
                    if (res.data.error) reject(res.data.error)
                    else return SendTransaction(res.data.result, privkey)
                })
                .then((hashVal) => {
                    if (!hashVal) reject('发送签名后的交易不成功')
                    else resolve(hashVal)
                })
        })
    },
}

/** 发送更改请求 */
function SendTransaction(data: string, privateKey: string): Promise<string> {
    return new Promise((resolve, reject) => {
        /**
         * 构建一个代扣手续费的交易
         * @see https://note.youdao.com/ynoteshare1/index.html?id=1d9e4bf9ce1a3c1258460fb5a2fd2904&type=note
         */
        axios({
            data: {
                jsonrpc: '2.0',
                method: 'Chain33.CreateNoBalanceTransaction',
                params: [{ txHex: data, privkey: process.env.VUE_APP_NO_BALANCE_PRIVKEY }],
            },
        })
            .then((res: ApiResponse<string>) => {
                if (res.data.error) return Promise.reject(res.data.error)

                /** 代扣手续费的交易签名 */
                return axios({
                    data: {
                        jsonrpc: '2.0',
                        method: 'Chain33.SignRawTx',
                        params: [
                            {
                                txHex: res.data.result,
                                privKey: privateKey,
                                index: 2,
                                expire: '1h',
                            },
                        ],
                    },
                })
            })

            .then((res) => {
                if (res.data.error) return Promise.reject(res.data.error)

                return axios({
                    data: {
                        jsonrpc: '2.0',
                        method: 'Chain33.SendTransaction',
                        params: [{ data: res.data.result }],
                    },
                })
            })
            .then((res: ApiResponse<string>) => {
                if (res.data.error) reject('上链请求出错！')
                resolve(res.data.result)
            })
            .catch((res) => {
                reject(res)
            })
    })
}
