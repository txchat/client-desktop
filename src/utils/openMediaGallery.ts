import lightGallery from 'lightgallery'
import zoom from 'lightgallery/plugins/zoom'
import rotate from 'lightgallery/plugins/rotate'
import fullscreen from 'lightgallery/plugins/fullscreen'
import video from 'lightgallery/plugins/video'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-rotate.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-video.css'
import type { VideoSource } from 'lightgallery/plugins/video/types'

interface BaseMediaItem {
    /** 下载媒体后的文件名 */
    download: string
    width: string
}

export interface ImageItem extends BaseMediaItem {
    src: string
}

export interface VideoItem extends BaseMediaItem {
    video: VideoSource
    /** 下载链接 */
    downloadUrl: string
}

export type MediaItem = ImageItem | VideoItem

export function openMediaGallery(
    el: HTMLElement,
    mediaItems: MediaItem[],
    openFrom?: number,
    closeHook?: () => void
): void {
    const gallery = lightGallery(el, {
        dynamic: true,
        plugins: [fullscreen, zoom, rotate, video],
        dynamicEl: mediaItems,
        loop: false,
        flipHorizontal: false,
        flipVertical: false,
        gotoNextSlideOnVideoEnd: false,
        autoplayVideoOnSlide: true,
    })

    gallery.openGallery(openFrom)
    el.addEventListener('lgSlideItemLoad', slideHandler)
    el.addEventListener('lgAfterClose', destroyHandler)
    function slideHandler(e: Event) {
        const imgEl = e.target as HTMLImageElement
        imgEl.setAttribute('draggable', 'false')
    }
    function destroyHandler() {
        closeHook?.()
        gallery.destroy()
        el.removeEventListener('lgAfterClose', destroyHandler)
        el.removeEventListener('lgSlideItemLoad', slideHandler)
    }
}
