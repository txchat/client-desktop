import { getCurrentInstance } from 'vue'
import { Message, MsgType } from '@/types/user-chat'
import { dtalk } from '@/utils/message-codec/protobuf'
import { openMediaGallery } from '@/utils/openMediaGallery'
import { getFileName } from '@/utils/fileName'

/**
 * 在一个聊天中, 点击一条图片或视频消息, 打开相册, 并定位到当前图片或视频
 */
export function useClickMediaMessageAndOpenGallery(): {
    /** 点击图片或视频触发后需要执行的操作 */
    mediaMessageClickHandler: (el: HTMLElement | null) => void
} {
    const { props } = getCurrentInstance()!

    function mediaMessageClickHandler(el: HTMLElement | null) {
        if (!el) return
        gallery(el, props.message as Message)
    }
    return {
        mediaMessageClickHandler,
    }
}

function gallery(el: HTMLElement, message: Message) {
    let index
    const mediaItems = message.fromChat.messages
        .filter((m) => !m.isRecalled && m.content?.mediaUrl && [MsgType.Image, MsgType.Video].includes(m.type))
        .map((_m, i) => {
            const m = _m as Message
            if (m.uuid === message.uuid) index = i
            if (m.type === MsgType.Image) {
                const content = m.content as dtalk.proto.IImageMsg & {
                    rawMessage?: File
                }

                return {
                    src: content.rawMessage ? URL.createObjectURL(content.rawMessage) : content.mediaUrl || '',
                    download: content.rawMessage?.name || getFileName(content.mediaUrl) || 'unknown_file.jpg',
                    width: String(content.width),
                }
            } else {
                const content = m.content as dtalk.proto.IVideoMsg & {
                    rawMessage?: File
                }
                const src = content.rawMessage ? URL.createObjectURL(content.rawMessage) : content.mediaUrl || ''

                return {
                    video: {
                        source: [{ src, type: 'video/mp4' }],
                        tracks: [],
                        attributes: {
                            preload: 'none',
                            controls: 'controls',
                        } as unknown as HTMLVideoElement,
                    },
                    download: getFileName(content.mediaUrl) || 'unknown_file.mp4',
                    downloadUrl: src,
                    width: String(content.width),
                }
            }
        })
    openMediaGallery(el, mediaItems, index)
}
