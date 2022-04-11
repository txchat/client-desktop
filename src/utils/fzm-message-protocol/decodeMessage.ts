import { arrayToNumber } from 'enc-utils'
import { header } from './FzmMessageProtocolHeader'

interface Header {
    [headerProp: string]: number
}

const decode = (data: Uint8Array): { header: Header; body: Uint8Array } => {
    // 先解析 header
    let key: keyof typeof header

    // 计算 header 中所有字段的开始位置
    const startIndexesMap: number[] = []
    Object.values(header).reduce((prev, curr, currIndex, arr) => {
        let currValue: number
        if (currIndex === 0) {
            currValue = 0
        } else {
            currValue = arr[currIndex - 1]
        }
        startIndexesMap.push(prev + currValue)
        return prev + currValue
    }, 0)

    // 计算 header 中所有字段的字段名、开始位置、结束位置
    const headerPropsPointer: { propName: string; startIndex: number; endIndex: number }[] = []
    let i = 0
    for (key in header) {
        const length = header[key]
        headerPropsPointer.push({
            propName: key,
            startIndex: startIndexesMap[i],
            endIndex: startIndexesMap[i] + length,
        })
        i++
    }

    // 计算 header 中所有字段的值
    const headerObj: { [headerProp: string]: number } = {}
    headerPropsPointer.forEach((prop) => {
        Object.defineProperty(headerObj, prop.propName, {
            value: arrayToNumber(data.slice(prop.startIndex, prop.endIndex)),
            configurable: true,
            enumerable: true,
            writable: true,
        })
    })

    // 拿到 body 部分
    const bodyData = data.slice(headerObj.headerLength)
    let body: Uint8Array
    if (bodyData.length) {
        body = bodyData
    } else {
        body = new Uint8Array()
    }

    return {
        header: headerObj,
        body,
    }
}

export default (rawMsg: Blob): Promise<{ header: Header; body: Uint8Array }> => {
    return new Promise((resolve) => {
        rawMsg.arrayBuffer().then((bufferMsg: ArrayBuffer) => {
            const msg = decode(new Uint8Array(bufferMsg))
            resolve(msg)
        })
    })
}

// 兼容部分安卓无法调用 Blob.prototype.arrayBuffer
// https://gist.github.com/hanayashiki/8dac237671343e7f0b15de617b0051bd
;(function () {
    File.prototype.arrayBuffer = File.prototype.arrayBuffer || myArrayBuffer
    Blob.prototype.arrayBuffer = Blob.prototype.arrayBuffer || myArrayBuffer

    function myArrayBuffer(this: Blob) {
        // this: File or Blob
        return new Promise((resolve) => {
            const fr = new FileReader()
            fr.onload = () => {
                resolve(fr.result)
            }
            fr.readAsArrayBuffer(this)
        })
    }
})()
