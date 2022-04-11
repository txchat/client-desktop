import { date } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
import { hexToArray } from 'enc-utils'
import { dtalk } from '@/utils/message-codec/protobuf'
import { ChatType, GroupId, MsgContent, MsgType, UploadProgress } from '@/types/user-chat'
import { UserProfile } from '@/types/user-profile'
import { useProfileStore } from './user-profile'
import { useAccountStore } from './user-account'
import { encryptFileInGroupChat, encryptFileInSingleChat } from '@/utils/message-crypto/file-crypto'
import { useChatGroupStore } from './user-chat-group'

export async function uploadFile(
    chatType: ChatType,
    target: string | GroupId,
    messageType: MsgType,
    content: MsgContent,
    uploadProgress?: UploadProgress
): Promise<string> {
    // 构造 path
    const regFileExtension = /\.(\w+$)/
    const _extName = content.rawMessage?.name.match(regFileExtension)
    let extName: string | undefined
    if (_extName && _extName.length > 1) extName = _extName[1]
    let typeName: string
    switch (messageType) {
        case MsgType.Audio:
            typeName = `audio`
            if (!extName) extName = 'wav'
            break
        case MsgType.Image:
            typeName = `image`
            if (!extName) extName = 'jpg'
            break
        case MsgType.Video:
            typeName = `video`
            if (!extName) extName = 'mp4'
            break
        default:
            typeName = `file`
            if (!extName) extName = 'mp4'
            break
    }
    const day = date.formatDate(new Date(), 'YYYYMMDD')

    /** example: `chat33pro/audio/20210415/qqq-www-eee-rrr.wav` */
    const path = `chat33pro-browser/${typeName}/${day}/${'$ENC$_' + uuidv4()}.${extName}`
    ;(content as dtalk.proto.IFileMsg).mediaUrl = path // 暂时保存 path, 后续上传成功后替换为完整的

    let encrypted: File | undefined
    // 加密私聊文件
    if (chatType === 'single') {
        const profileStore = useProfileStore()
        let targetProfile: UserProfile
        if (profileStore.userProfiles[target as string]) {
            targetProfile = profileStore.userProfiles[target as string] as UserProfile
        } else {
            targetProfile = await useProfileStore().get(target as string)
        }

        const privateKey = useAccountStore().account!.privateKey
        const publicKey = targetProfile.pubKey!

        encrypted = await encryptFileInSingleChat(content.rawMessage, privateKey, hexToArray(publicKey))
    }
    // 加密群聊文件
    else {
        const key = hexToArray(useChatGroupStore().hosts[(target as GroupId).hostId][(target as GroupId).groupId].key)
        encrypted = await encryptFileInGroupChat(content.rawMessage, key)
    }

    const accountStore = useAccountStore()
    if (!accountStore.oss) throw new Error('上传消息内容至 OSS 失败：OSS 实例不存在')

    return await accountStore.oss.uploadFile(encrypted || content.rawMessage, path, (percentage, checkpoint) => {
        if (uploadProgress) {
            uploadProgress.percentage = percentage
            uploadProgress.checkpoint = checkpoint
        }
    })
}
