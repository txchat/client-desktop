import { isEqual } from 'lodash'
import { hexToArray } from 'enc-utils'
import { useChatStore } from '@/store/user-chat'
import { useProfileStore } from '@/store/user-profile'
import { useAccountStore } from '@/store/user-account'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useUserBlackListStore } from '@/store/user-black-list'
import { MsgType } from '@/types/user-chat'
import { OssRequiredMsgContent } from '@/types/messages'
import { dtalk } from '@/utils/message-codec/protobuf'
import { urlRemovePrefix } from '@/utils/url-replace'
import decodeChatMessage, {
    decodeCommonContent,
    DecodedMessage,
    DecodedRecallingMessage,
} from '@/utils/message-codec/decodeChatMessage'
import { decodeGroupAlert } from '@/utils/message-codec/decodeGroupAlert'
import { decryptFileInGroupChat, decryptFileInSingleChat, downloadFile } from '@/utils/message-crypto/file-crypto'
import { ForwardMessage } from '@/types/messages/forward'

interface UsableReceiveMessage {
    receiveMessage(msgData: Uint8Array): void
}

/**
 * 记录正在处理中但尚未入数组的消息
 * 确保消息去重时, 也要对这些消息去重
 */
const processingMessages = new Set()

export function useReceiveMessage(serverAddress: string): UsableReceiveMessage {
    async function receiveMessage(msgData: Uint8Array) {
        try {
            const decoded = await decodeChatMessage(msgData, serverAddress)
            if (!decoded) return
            if (decoded.messageType === 'common') await handleCommonMessage(decoded, serverAddress)
            else if (decoded.messageType === 'recall') handleRecallingMessage(decoded)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        receiveMessage,
    }
}

async function handleCommonMessage(decoded: DecodedMessage, serverAddress: string) {
    const chatStore = useChatStore()
    const accountStore = useAccountStore()
    const fromMyself = accountStore.account?.address === decoded.from
    const targetAddress = fromMyself ? decoded.target : decoded.from
    const chat = chatStore.moveTop(
        decoded.fromGroup ? 'group' : 'single',
        decoded.fromGroup
            ? {
                  hostId: urlRemovePrefix(serverAddress),
                  groupId: decoded.target,
              }
            : targetAddress
    )

    // 去重
    if (chat.messages.some((m) => m.uuid === decoded.uuid) || processingMessages.has(decoded.uuid)) return
    processingMessages.add(decoded.uuid)

    // 拦截黑名单用户发来的私聊消息
    if (!decoded.fromGroup && useUserBlackListStore().blackList.some((addr) => addr === decoded.from)) return

    // 文件解密
    const ossRequired = [MsgType.Image, MsgType.Video, MsgType.Audio, MsgType.File]
    if (ossRequired.includes(decoded.type)) {
        const undecrypted = await downloadFile(
            (decoded.content as dtalk.proto.IImageMsg).mediaUrl!,
            (decoded.content as OssRequiredMsgContent).name
        )

        let decrypted: File | undefined

        // 解密群聊中的文件
        if (decoded.fromGroup) {
            const key = hexToArray(useChatGroupStore().hosts[urlRemovePrefix(serverAddress)][decoded.target].key)
            decrypted = await decryptFileInGroupChat(undecrypted, key)
        }
        // 解密私聊中的文件
        else {
            const isFromMyself = accountStore.account?.address === decoded.from
            const myPrivKey = useAccountStore().account?.privateKey
            const targetProfile = await useProfileStore().lazyGet(isFromMyself ? decoded.target : decoded.from)
            const targetPubKey = targetProfile.pubKey
            if (myPrivKey && targetPubKey)
                decrypted = await decryptFileInSingleChat(undecrypted, myPrivKey, hexToArray(targetPubKey || ''))
        }

        if (decrypted) {
            await chatStore.saveFile((decoded.content as dtalk.proto.IImageMsg).mediaUrl!, decrypted)
            decoded.content.rawMessage = decrypted
        }
    }

    // 处理群通知类型的消息
    else if (decoded.type === MsgType.Alert) {
        const { body, type } = decoded.content as dtalk.proto.IAlertMsg
        const groupAlertContent = await decodeGroupAlert(serverAddress, decoded.target, type, body)
        groupAlertContent && (decoded.content = groupAlertContent)
        if (!groupAlertContent?.fullText) return
    }

    // 处理转发类型的消息
    else if (decoded.type === MsgType.Forward) {
        const items = (decoded.content as ForwardMessage).items
        if (items) {
            let i = 0
            for await (const item of items) {
                if (item.msg && item.msgType) {
                    decoded.content.items[i].msg = decodeCommonContent(item.msg, item.msgType)
                    // 文件类型的消息解密
                    if ([MsgType.Image, MsgType.Video, MsgType.File].includes(item.msgType)) {
                        const undecrypted = await downloadFile((item.msg as OssRequiredMsgContent).mediaUrl)

                        let decrypted: File | undefined
                        // 解密群聊中的文件
                        if (decoded.fromGroup) {
                            const key = hexToArray(
                                useChatGroupStore().hosts[urlRemovePrefix(serverAddress)][decoded.target].key
                            )
                            decrypted = await decryptFileInGroupChat(undecrypted, key)
                        }
                        // 解密私聊中的文件
                        else {
                            const myPrivKey = useAccountStore().account?.privateKey
                            const targetProfile = await useProfileStore().lazyGet(decoded.from)
                            const targetPubKey = targetProfile.pubKey
                            if (myPrivKey && targetPubKey)
                                decrypted = await decryptFileInSingleChat(
                                    undecrypted,
                                    myPrivKey,
                                    hexToArray(targetPubKey || '')
                                )
                        }
                        decrypted && (await chatStore.saveFile((item.msg as OssRequiredMsgContent).mediaUrl, decrypted))
                    }
                }

                i++
            }
        }
    }

    if (!fromMyself && (!isEqual(chat.id, chatStore.focusedChat?.id) || !document.hasFocus())) {
        chatStore.incrementUnread(0)
    }

    await chatStore.createMessage({
        content: decoded.content,
        from: decoded.from,
        target: decoded.target,
        uuid: decoded.uuid,
        state: null,
        type: (decoded.type || 0) as MsgType,
        datetime: decoded.datetime,
        logid: decoded.logid,
        fromChat: chat,
        reference: decoded.reference,
        source: decoded.source,
    })
    processingMessages.delete(decoded.uuid)
}

function handleRecallingMessage(decoded: DecodedRecallingMessage) {
    const chatStore = useChatStore()

    const message = chatStore.findMessageByLogId(decoded.logid)
    if (!message || message.isRecalled) return

    chatStore.convertMessageIntoRecalled(message.fromChat, message.uuid, decoded.operator, decoded.self)
}
