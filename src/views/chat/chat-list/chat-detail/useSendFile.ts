import { useChatStore } from '@/store/user-chat'
import { MsgType } from '@/types/user-chat'

interface UsableSendFile {
    send(file?: File): void
}

export function useSendFile(): UsableSendFile {
    const chatStore = useChatStore()
    return {
        async send(file: File) {
            if (!file) return

            if (file.size > 1024 * 1024 * 200) {
                window.alert('传输的文件不能大于 200M')
                return
            }

            // 接收图片
            if (file.name.match(/(.jpg$)|(.jpeg$)|(.png$)|(.gif$)/i)) {
                // 利用 Image 获取尺寸
                const img = new Image()
                img.src = URL.createObjectURL(file)

                img.onload = () => {
                    if (!file) return

                    chatStore.sendMessage({
                        type: MsgType.Image,
                        content: {
                            mediaUrl: '',
                            width: img.width,
                            height: img.height,
                            rawMessage: file as File,
                        },
                    })

                    URL.revokeObjectURL(img.src)
                }
            }

            // 接收视频
            else if (file.name.match(/(.mp4$)|(.mov$)/i)) {
                const video = document.createElement('video')
                video.src = URL.createObjectURL(file)
                video.onloadedmetadata = () => {
                    if (!file) return
                    if (file.size > 1024 * 1024 * 200) {
                        alert('视频文件过大，目前仅支持发送 200MB 以内的视频')
                        return
                    }

                    chatStore.sendMessage({
                        type: MsgType.Video,
                        content: {
                            mediaUrl: '',
                            height: video.videoHeight,
                            width: video.videoWidth,
                            time: video.duration,
                            rawMessage: file,
                        },
                    })
                    URL.revokeObjectURL(video.src)
                }
            }

            // 其他文件
            else {
                chatStore.sendMessage({
                    type: MsgType.File,
                    content: {
                        mediaUrl: '',
                        name: file.name,
                        size: file.size,
                        rawMessage: file,
                    },
                })
            }
        },
    }
}
