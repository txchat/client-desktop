import { numberToArray, concatArrays } from 'enc-utils'
import { AuthMsg } from '.'
import FzmMessageProtocolHeader from './FzmMessageProtocolHeader'
import { FzmMessageTypes } from './FzmMessageTypes'
import { chat33 } from './protobuf'

/**
 * 将一个数字转换为一定长度的二进制数据
 * @param num 想转换的数字
 * @param byteLength 转换后的二进制数据长度（单位为字节）。
 * `byteLength` 不能小于 `num` 的字节长度。
 * 例如输入的 num 为 256，而 256 用二进制表示为 `00000001 00000000`，因此 `num` 的字节长度为 2，即至少需要 2 个字节来表示。
 * 因此 `byteLength` 不能为 1，只能等于或大于 2。
 * @returns 长度为 `byteLength` 的二进制的 `num`
 */
const encodeNumberWithFixedLength = (num: number, byteLength: number): Uint8Array => {
    const uint8arr = numberToArray(num)
    if (uint8arr.length > byteLength) throw '输入的数字过大！'
    if (uint8arr.length == byteLength) return uint8arr

    const arr = Array.from(uint8arr)
    while (arr.length < byteLength) {
        arr.splice(0, 0, 0) // 在数组的最前面插入一个 0
    }

    return Uint8Array.from(arr)
}

export type MessageEncoderPayload = AuthMsg | Uint8Array | null
/** 对消息进行编码 */
export default (payload: MessageEncoderPayload, messageType: FzmMessageTypes, seq = 0, ack?: number): Uint8Array => {
    // 1. 构造 body
    let bodyData: Uint8Array

    // 判断 `messageType`：
    // 如果是初次连接鉴权, 则内部解析成二进制流;
    // 如果是正常发送消息, 则直接接收二进制流。
    if (payload && messageType === FzmMessageTypes.Auth) {
        bodyData = chat33.comet.AuthMsg.encode(payload as AuthMsg).finish()
    } else if (payload && messageType !== FzmMessageTypes.Auth) {
        bodyData = payload as Uint8Array
    } else {
        bodyData = new Uint8Array()
    }

    // 2. 基于 body 构造对应的 header
    const header = new FzmMessageProtocolHeader(messageType, seq, ack || 0)
    header.updatePackageLength(bodyData)

    // 3. 对 header 编码
    const headerData = Object.values(header.header).reduce((prev, curr) => {
        return concatArrays(prev, encodeNumberWithFixedLength(curr.value, curr.length))
    }, new Uint8Array())

    // 4. 拼接 header 和 body
    const data = concatArrays(headerData, bodyData)

    return data
}
