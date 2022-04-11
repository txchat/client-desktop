import secp256k1 from 'secp256k1'
import { crypto } from 'bitcoinjs-lib'
import Axios, { AxiosResponse } from 'axios'
import { useModulesStore } from '@/urls/modules'
import { RpcQueryRequestData, RpcUpdateRequestData } from './chain-request-constructor'
import {
    GetReceiveResultRequest,
    ReceiveRequestPayload,
    ReceiveResult,
    RedPacket,
    WithdrawRequestPayload,
} from '@/types/chain-red-packet'
import { arrayToHex, hexToArray, utf8ToBuffer } from 'enc-utils'

// 初始化 axios 实例
const axios = Axios.create({ method: 'post' })
axios.interceptors.request.use((config) => {
    const { redPacketServer } = useModulesStore()
    if (redPacketServer) config.baseURL = redPacketServer
    return config
})

axios.interceptors.response.use(undefined, (err) => {
    if (Axios.isAxiosError(err) && err.response?.status === 404) {
        err.message = '区块链请求 404, 请检查区块链节点是否正确'
    }
    return Promise.reject(err)
})

type ApiResponse<T> = AxiosResponse<{
    error: string | null
    result: T
}>

export const redPacketApi = {
    /** 查询红包信息 */
    getRedPacketInfo(packetId: string): Promise<RedPacket> {
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcQueryRequestData({
                    execer: 'redpacket',
                    funcName: 'GetRedPacketInfo',
                    payload: { packetId },
                }),
            })
                .then((res: ApiResponse<{ redPacket: RedPacket }>) => {
                    if (res.data.error) reject(res.data.error)
                    else resolve(res.data.result.redPacket)
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /** 收红包 */
    async receive(payload: ReceiveRequestPayload): Promise<string> {
        const { receiverAddress, packetPrivateKey, packetId, privateKey } = payload
        // 构造签名
        const hashedMessage = crypto.sha256(utf8ToBuffer(receiverAddress))
        const { signature } = secp256k1.ecdsaSign(
            hashedMessage,
            // 安卓端发送的红包私钥可能为 33 字节, 其中第一个字节为 0 (暂时不知道是干啥的), 这里需要先去除这个空字节
            hexToArray(packetPrivateKey.length === 64 ? packetPrivateKey : packetPrivateKey.slice(2))
        )

        // 发送请求
        const result = await axios({
            data: new RpcUpdateRequestData('redpacket.CreateRawReceiveTx', {
                packetId,
                redpacketSign: { ty: 1, signature: arrayToHex(secp256k1.signatureExport(signature)) },
            }),
        })
        return SendTransaction(result.data.result, privateKey)
    },

    /** 查询红包领取结果 */
    getReceiveResult(payload: GetReceiveResultRequest): Promise<ReceiveResult> {
        return new Promise((resolve, reject) => {
            axios({
                data: new RpcQueryRequestData({
                    execer: 'redpacket',
                    funcName: 'GetReceiveRecord',
                    payload,
                }),
            })
                .then((res: ApiResponse<{ receiveRecords: ReceiveResult[] }>) => {
                    if (res.data.error) reject(res.data.error)
                    else if (res.data.result.receiveRecords.length) resolve(res.data.result.receiveRecords[0])
                    else if (res.data.result.receiveRecords.length === 0) reject('手慢了，红包被领完了')
                    else reject('getReceiveResultError: 请求异常')
                })
                .catch((res) => {
                    reject(res)
                })
        })
    },

    /**将金额从红包钱包转到自己的钱包 */
    async withdraw(payload: WithdrawRequestPayload, privateKey: string): Promise<string> {
        const result = await axios({
            data: new RpcUpdateRequestData('Chain33.CreateRawTransaction', payload),
        })

        return SendTransaction(result.data.result, privateKey)
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
                params: [{ txHex: data, privkey: VUE_APP_NO_BALANCE_PRIVKEY }],
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
