import Compressor from 'compressorjs'

const defaultOptions = {
    maxWidth: 1920,
    maxHeight: 1920,
    quality: 1,
    convertSize: 500000,
}

Compressor.setDefaults(defaultOptions)

/**
 * 简单封装了 compressorjs，来压缩用户试图上传的图片。
 * @param file 图片文件
 * @param options 配置参数
 * @param callback 成功回调函数
 * @param errorCallback 失败回调函数
 * 参考 https://github.com/fengyuanchen/compressorjs/blob/master/README.md
 */
export default function (file: Blob | File): Promise<File | Blob> {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            success: (result) => {
                if (file instanceof File) resolve(new File([result], file.name))
                else resolve(result)
            },
            error: (result) => {
                reject(result)
            },
        })
    })
}
