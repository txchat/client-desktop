/** 需要上传文件到 OSS 的消息 */
export type OssRequiredMsgContent = (
    | dtalk.proto.IAudioMsg
    | dtalk.proto.IImageMsg
    | dtalk.proto.IVideoMsg
    | dtalk.proto.IFileMsg
) & {
    /** 上传至 OSS 的文件 */
    rawMessage?: File
}
