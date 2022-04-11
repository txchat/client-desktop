// header 长度，用于解码
export const header = {
    packageLength: 4,
    headerLength: 2,
    ver: 2,
    operation: 4,
    seq: 4,
    ack: 4,
}

// 用于编码
export default class FzmMessageProtocolHeader {
    header: { [headerProp: string]: { value: number; length: number } }

    constructor(messageType: number, seq: number, ack: number) {
        this.header = {
            packageLength: { value: 0, length: 4 },
            headerLength: { value: 0, length: 2 },
            ver: { value: 1, length: 2 },
            operation: { value: messageType, length: 4 },
            seq: { value: seq, length: 4 },
            ack: { value: ack, length: 4 },
        }
        // 重新计算 headerLength
        this.header.headerLength.value = Object.values(this.header).reduce((prev, curr) => {
            return prev + curr.length
        }, 0)
    }

    /** 生成 body 后一定要拿着 body 调用一次该方法，否则包长度无法获得！ */
    updatePackageLength(bodyData: Uint8Array): void {
        this.header.packageLength.value = this.header.headerLength.value + bodyData.length
    }
}
