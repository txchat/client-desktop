import Axios, { AxiosInstance, AxiosResponse } from 'axios'

type ApiResponse<T> = AxiosResponse<{
    data: T
    message: string | null
    result: number
}>

interface FilePart {
    data: Blob
    partNumber: number
    /** 片段上传完成后获得，后端收到的片段的 MD5 值 */
    etag?: string
}

interface UploadTask {
    path: string
    uploadId: string
    file: File
    parts: FilePart[]
    aborted?: boolean
}

export interface Checkpoint {
    etag: string
    path: string
    partNumber: number
    uploadId: string
}

interface Options {
    appId: string
    /** 要上传的服务器的 url */
    requestUrl: string
    /** 鉴权函数 每次上传前将执行这个函数，并将结果放到请求头中*/
    authorization: () => unknown
}

export class OSS {
    private appId: string
    private axios: AxiosInstance
    private uploadTasks: UploadTask[]
    private readonly SLICE_MAX_LEN: number

    constructor({ appId, requestUrl, authorization }: Options) {
        this.appId = appId
        this.axios = Axios.create({
            method: 'post',
            baseURL: requestUrl,
        })
        this.axios.interceptors.request.use(function (config) {
            config.headers = Object.assign(config.headers, authorization())
            return config
        })
        this.uploadTasks = []
        this.SLICE_MAX_LEN = 1024 * 1024 * 5
    }

    public uploadFile(
        file: File,
        path: string,
        onprogress: (percentage: number, checkpoint: Checkpoint) => void
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            // 把文件分块，分到数组里
            const parts: FilePart[] = []
            let iteratedLength = 1
            let slicesize = file.size
            while (slicesize > this.SLICE_MAX_LEN) {
                const blobPart = file.slice(parts.length * this.SLICE_MAX_LEN, (parts.length + 1) * this.SLICE_MAX_LEN)
                parts.push({ data: blobPart, partNumber: iteratedLength })
                iteratedLength++
                slicesize -= this.SLICE_MAX_LEN
            }
            if (slicesize > 0) {
                parts.push({ data: file.slice(parts.length * this.SLICE_MAX_LEN), partNumber: iteratedLength })
            }

            // 初始化上传
            this.axios({
                url: '/init-multipart-upload',
                data: { appId: this.appId, key: path },
            })
                .then((res: ApiResponse<{ key: string; uploadId: string }>) => {
                    if (res.data.result !== 0) {
                        reject(res.data.message)
                        return
                    }

                    const task = {
                        path: res.data.data.key,
                        uploadId: res.data.data.uploadId,
                        file,
                        parts,
                    } as UploadTask
                    this.uploadTasks.push(task)

                    Promise.all(parts.map((p) => this.uploadPart(p, task, onprogress)))
                        .then(() => {
                            if (task.aborted) return Promise.reject('aborted')

                            return this.axios({
                                url: '/complete-multipart-upload',
                                data: {
                                    appId: this.appId,
                                    key: task.path,
                                    uploadId: task.uploadId,
                                    parts: task.parts.map((p) => ({
                                        ETag: p.etag,
                                        partNumber: p.partNumber,
                                    })),
                                },
                            })
                        })
                        .then((res: ApiResponse<{ url: string }>) => {
                            if (res.data.result !== 0) {
                                reject(res.data.message)
                                return
                            }
                            const i = this.uploadTasks.findIndex((t) => t.uploadId === task.uploadId)
                            if (i === -1) throw new Error('完成分片上传时出现错误，uploadTasks 中不存在对应任务')
                            this.uploadTasks.splice(i, 1)
                            resolve(res.data.data.url)
                        })
                        .catch((res) => reject(res))
                })
                .catch((res) => reject(res))
        })
    }

    private uploadPart(
        part: FilePart,
        task: UploadTask,
        onfinish: (percentage: number, checkpoint: Checkpoint) => void
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append('file', part.data)
            formData.append('appId', this.appId)
            formData.append('key', task.path)
            formData.append('partNumber', part.partNumber.toString())
            formData.append('uploadId', task.uploadId)
            this.axios({
                url: '/upload-part',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData,
            })
                .then((res: ApiResponse<{ uploadId: string; key: string; partNumber: number; ETag: string }>) => {
                    if (res.data.result !== 0) {
                        reject(res.data.message)
                        return
                    }
                    const checkpoint: Checkpoint = {
                        path: res.data.data.key,
                        etag: res.data.data.ETag,
                        uploadId: res.data.data.uploadId,
                        partNumber: res.data.data.partNumber,
                    }
                    part.etag = checkpoint.etag
                    const percentage = task.parts.filter((p) => p.etag).length / task.parts.length
                    onfinish(percentage, checkpoint)
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    public abortUploading(path: string): Promise<void> {
        return new Promise((resolve) => {
            const task = this.uploadTasks.find((t) => t.path === path)
            if (!task) return

            task.aborted = true
            this.axios({
                url: '/abort-multipart-upload',
                data: {
                    appId: this.appId,
                    key: path,
                    uploadId: task.uploadId,
                },
            }).then(() => {
                resolve()
            })
        })
    }
}
