import { Ref, ref, toRef, toRefs } from 'vue'
import { cloneDeep } from 'lodash'
import { date, Notify } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { isEqual } from 'lodash'
import { chatApi } from '@/api/user-chat'
import { useAccountStore } from './user-account'
import { useProfileStore } from './user-profile'
import { dtalk } from '@/utils/message-codec/protobuf'
import { hexToArray } from 'enc-utils'
import { urlRemovePrefix } from '@/utils/url-replace'
import encodeChatMessage from '@/utils/message-codec/encodeChatMessage'
import { useConnectionStore } from './user-connection'
import {
    Chat,
    ChatType,
    GroupChat,
    GroupId,
    Message,
    MsgContent,
    MsgType,
    RecalledMessage,
    Reference,
    SendMessagePayload,
    SingleChat,
} from '@/types/user-chat'
import { useChatGroupStore } from './user-chat-group'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { uploadFile } from './uploadFile'

type LocalStoredLastMessage = Pick<Message, 'logid' | 'datetime'>

export const useChatStore = defineStore({
    id: 'user: chat',

    state() {
        return {
            chatList: null as Chat[] | null,
            focusedChat: null as Chat | null,
            /** 用户搜索聊天记录时点击 "定位至聊天" 的消息 */
            locatingMessage: null as Message | null,
            editingText: '',
            editingMention: [] as {
                address: string
                displayName: string
            }[],
            editingRefering: null as null | Message,
            /** 当前的聊天是否处于多选状态 */
            multiSelecting: null as null | Set<string>,
            /** 本次存储的最新一条 Message */
            localStoredLastMessage: null as null | LocalStoredLastMessage,
        }
    },

    getters: {
        pinnedLength() {
            let _length = 0
            this.chatList?.forEach((c) => {
                if (c.pinned) _length++
            })
            return _length
        },

        totalUnreadLength() {
            let _length = 0
            this.chatList?.forEach((c) => {
                if (!c.doNotDisturb) _length += c.unreadLength
            })
            return _length
        },

        singleChatUnreadLength() {
            let _length = 0
            this.chatList?.forEach((c) => {
                if (c.type === 'single' && !c.doNotDisturb) _length += c.unreadLength
            })
            return _length
        },

        groupChatUnreadLength() {
            let _length = 0
            this.chatList?.forEach((c) => {
                if (c.type === 'group' && !c.doNotDisturb) _length += c.unreadLength
            })
            return _length
        },

        /** 私聊列表 */
        singleChats(): Chat[] {
            return this.chatList?.filter((c) => c.type === 'single') || []
        },

        /** 群聊列表 */
        groupChats(): Chat[] {
            return this.chatList?.filter((c) => c.type === 'group') || []
        },
    },

    actions: {
        async load(): Promise<Chat[]> {
            const accountStore = useAccountStore()
            const { account, accountDB } = toRefs(accountStore)
            if (!account.value || !accountDB.value) return Promise.reject()

            const _chatList = [] as Chat[]
            let _pinnedLength = 0

            this.localStoredLastMessage = await accountDB.value.lastMessage.getItem<LocalStoredLastMessage>(
                'lastMessage'
            )

            await accountDB.value.chats.iterate<Chat, void>((chat, key) => {
                _chatList.splice(_pinnedLength, 0, chat)
                if (chat.pinned) _pinnedLength++

                // 最早版本的 chat 只支持单聊, 没有 `type` 字段
                if (!chat.type) (chat as SingleChat).type = 'single'
                // 最早版本的 chat 的唯一识别字段为 `targetAddress`
                if (chat.type === 'single' && !chat.id && chat.targetAddress) chat.id = chat.targetAddress
                // 较早版本的 group chat 在 IndexedDB 中的 key 为 groupId
                // 而不同服务器可能会有重复的 groupId, 因此可能出现问题
                // 因此修改了数据结构
                if (chat.type === 'group' && typeof chat.id === 'string' && chat.host) {
                    chat.id = { hostId: chat.host, groupId: chat.id }
                    delete chat.host
                    // 修改 key
                    accountDB.value?.chats.setItem(`${chat.id.hostId}->${chat.id.groupId}`, chat)
                    accountDB.value?.chats.removeItem(key)
                }

                chat.messages.forEach((m) => {
                    if (!m.isRecalled) {
                        m.state === 'pending' && (m.state = 'failure')
                        delete m.unread
                    }
                    m.fromChat = chat
                })
            })

            _chatList.sort((a, b) => {
                const lastMessageTimeA = a.messages[a.messages.length - 1]?.datetime
                const lastMessageTimeB = b.messages[b.messages.length - 1]?.datetime

                if (!lastMessageTimeA || !lastMessageTimeB) return 0

                if (a.pinned && b.pinned) {
                    return lastMessageTimeB - lastMessageTimeA
                } else if (!a.pinned && !b.pinned) {
                    return lastMessageTimeB - lastMessageTimeA
                } else {
                    return a.pinned ? -1 : 1
                }
            })
            this.chatList = _chatList

            return _chatList
        },

        /** 读取本地缓存的文件 */
        async loadFile(fileUrl: string): Promise<File | null> {
            const { accountDB } = useAccountStore()
            if (!accountDB) throw new Error('saveFileErr: 未登录')
            return await accountDB.files.getItem<File>(fileUrl)
        },

        /**
         * 查找聊天
         * @param type
         * @param id
         * @returns 聊天及其在数组内的索引
         */
        findChat(type: ChatType, id: string | GroupId): { index: number; chat: Chat | undefined } {
            if (!this.chatList) throw new Error('查找聊天失败: chatList 为空')

            let targetChatIndex: number

            if (type === 'single') {
                targetChatIndex = this.chatList.findIndex((c) => c.type === 'single' && c.id === id)
            } else {
                targetChatIndex = this.chatList.findIndex(
                    (c) =>
                        c.type === 'group' &&
                        c.id.hostId === (id as GroupId).hostId &&
                        c.id.groupId === (id as GroupId).groupId
                )
            }

            return {
                index: targetChatIndex,
                chat: this.chatList[targetChatIndex],
            }
        },

        /**
         * 将和目标的聊天移至列表顶部, 如果没有找到和目标的聊天, 则新建并移至顶部.
         * @param type 聊天类型
         * @param id 聊天 id
         * @returns 被移动的聊天
         */
        moveTop(type: ChatType, id: string | GroupId, shouldUpdateProfile?: boolean): Chat {
            if (!this.chatList) throw new Error('moveTopError: chatList 为空')
            if (type === 'group' && typeof id === 'string') throw new Error('群聊 id 格式错误')

            const targetChatIndex = this.findChat(type, id).index
            let targetChat: Ref<Chat>

            if (targetChatIndex === -1) {
                // 没有和目标用户的聊天记录，新建一个空聊天
                targetChat = ref({
                    type,
                    id,
                    messages: [],
                    pinned: false,
                    doNotDisturb: false,
                    unreadLength: 0,
                } as Chat)
                this.chatList.splice(this.pinnedLength, 0, targetChat.value)
            } else {
                // 有和目标用户的历史聊天，移至聊天列表的顶部
                targetChat = toRef(this.chatList, targetChatIndex)

                // 移动位置
                this.chatList.splice(
                    targetChat.value.pinned ? 0 : this.pinnedLength,
                    0,
                    this.chatList.splice(targetChatIndex, 1)[0]
                )

                // 移动位置完成后 targetChat 会响应数组的变化从而跟着变，这不是所预期的，修正指向
                targetChat = toRef(this.chatList, targetChat.value.pinned ? 0 : this.pinnedLength)
            }

            // 拿用户最新资料
            if (shouldUpdateProfile) {
                if (targetChat.value.type === 'single') {
                    useProfileStore().get(targetChat.value.id)
                } else {
                    useChatGroupStore().getChatGroup(targetChat.value.id.hostId, targetChat.value.id.groupId)
                }
            }
            return targetChat.value
        },

        incrementUnread(chatIndex: number) {
            const chat = this.chatList?.[chatIndex]
            if (!chat) throw new Error('incrementUnreadError: 目标聊天不存在')
            chat.unreadLength++
        },

        clearUnread(chatIndex: number) {
            const chat = this.chatList?.[chatIndex]
            if (!chat) throw new Error('clearUnreadError: 目标聊天不存在')
            chat.unreadLength = 0
            this.saveChat(chat)
        },

        focusChat(chat: Chat) {
            if (chat !== this.focusedChat) {
                this.deactivateMultiSelect()
                this.clearEditingText()
                this.focusedChat = chat
            } else {
                this.clearUnread(this.findChat(chat.type, chat.id).index)
            }
        },

        clearEditingText() {
            this.editingText = ''
            this.editingMention = []
            this.editingRefering = null
        },

        /**
         * 删除聊天
         * 签名 1: 传入 chat 对象
         * 签名 2: 传入 (chatType, chatId)
         */
        async deleteChat(chatOrType: Chat | ChatType, chatId?: GroupId | string): Promise<void> {
            let _chatType: ChatType
            let _chatId: string | GroupId

            // 传入 2 个参数 (chatType, chatId)
            if (chatId) {
                _chatType = chatOrType as ChatType
                _chatId = chatId
            }
            // 传入 1 个参数 (chat 对象)
            else {
                const _chat = chatOrType as Chat
                _chatType = _chat.type
                _chatId = _chat.id
            }

            await useAccountStore().accountDB?.chats.removeItem(
                _chatType === 'single'
                    ? (_chatId as string)
                    : `${(_chatId as GroupId).hostId}->${(_chatId as GroupId).groupId}`
            )
            const index = this.findChat(_chatType, _chatId).index
            index !== undefined && this.chatList?.splice(index, 1)
            if (isEqual(this.focusedChat?.id, _chatId)) this.focusedChat = null
        },

        /**
         * 在当前 focus 的 chat 中向对方发送消息
         */
        async sendMessage({ type, content, resendMessageUuid, chat, refering, source }: SendMessagePayload) {
            const accountStore = useAccountStore()

            if (!accountStore.account?.address) throw new Error('消息初始化失败: 账户为空')
            if (!chat && !this.focusedChat)
                throw new Error('初始化消息失败: 必须指定一个 target 或者先 focus 一个 chat')
            if (!this.chatList) throw new Error('初始化消息失败: chatList 不存在')

            const from = accountStore.account.address
            const _chat = (chat || this.focusedChat)!
            const resendingMessage = (
                resendMessageUuid !== undefined
                    ? _chat.messages.find((m) => m.uuid === resendMessageUuid) || null
                    : null
            ) as Message | null
            const _uuid = resendingMessage?.uuid || uuidv4()
            const _target = _chat.type === 'single' ? _chat.id : _chat.id.groupId
            const reference = refering
                ? {
                      topic: refering.reference ? refering.reference.topic : refering.logid!,
                      ref: refering.logid!,
                  }
                : undefined

            this.moveTop(_chat.type, _chat.id)

            // 构造 Message
            let _message: Ref<Message>
            if (resendingMessage) {
                _message = ref(resendingMessage)
                _message.value.state = 'pending'
            } else {
                // 新消息
                _message = ref({
                    content,
                    from,
                    target: _target,
                    uuid: _uuid,
                    state: 'pending' as const,
                    type,
                    datetime: Date.now(),
                    uploadProgress: { percentage: 0 },
                    fromChat: _chat,
                    reference,
                    source,
                })
                this.createMessage(_message.value)
            }

            // MsgContent 上传至 OSS (若需要)
            const ossNeeded = [MsgType.Image, MsgType.Video, MsgType.Audio, MsgType.File]
            const file = content.rawMessage as File | undefined
            if (ossNeeded.includes(type) && file) {
                try {
                    const url = await uploadFile(_chat.type, _chat.id, type, content, _message.value.uploadProgress)
                    if (_message.value.state === 'failure') return
                    ;(content as dtalk.proto.IFileMsg).mediaUrl = url
                    _message.value.content.rawMessage = file
                    await this.saveFile(url, file)
                } catch (err) {
                    console.log(err)
                    _message.value.state = 'failure'
                    return
                }
            }

            send({
                from,
                target: _target,
                msgType: type,
                msg: content,
                uuid: _uuid,
                message: _message,
                toGroup: _chat.type === 'group',
                host: (_chat.id as GroupId).hostId,
                reference,
                source,
            })
        },

        async createMessage(message: Message) {
            Object.defineProperty(message, 'fromChat', { enumerable: false }) // 防止将 fromChat 属性存入数据库
            if ('rawMessage' in message.content) {
                Object.defineProperty(message.content, 'rawMessage', { enumerable: false })
            }

            // 和上条消息发送间隔小于 2 分钟的隐藏显示时间
            let hideDatetime: boolean | undefined
            if (message.fromChat.messages.length) {
                const bottomMsg = message.fromChat.messages[message.fromChat.messages.length - 1]
                hideDatetime = shouldDisplayMessageDate(message.datetime, bottomMsg.datetime)
                message.hideDatetime = hideDatetime
            }

            message.fromChat.messages.push(message)
            await this.saveChat(message.fromChat)
        },

        async recallMessage(message: Message) {
            // 找到目标聊天服务器, 发送撤回请求
            const profileStore = useProfileStore()
            const targetProfile =
                profileStore.userProfiles[message.fromChat.type === 'single' ? message.target : message.from]
            if (!targetProfile) throw new Error('recallMessageError: 对方资料不存在')

            const serverAddress =
                message.fromChat.type === 'single'
                    ? targetProfile.staffInfo
                        ? targetProfile.staffInfo.imServer
                        : targetProfile.chatServers[0].address ||
                          (await profileStore.get(message.from)).chatServers[0].address
                    : useChatGroupStore().hosts[message.fromChat.id.hostId][message.fromChat.id.groupId].host

            if (!serverAddress) return
            try {
                await chatApi.recallMessage(
                    serverAddress,
                    message.fromChat.type === 'single' ? 0 : 1,
                    message.logid!,
                    useAccountStore().account!
                )
                if (!Object.keys(useConnectionStore().connections).includes(urlRemovePrefix(serverAddress))) {
                    // 单聊时, 我可能没连上对方的服务器, 收不到撤回成功通知, 因此手动撤回自己的消息
                    this.convertMessageIntoRecalled(
                        message.fromChat,
                        message.uuid,
                        useAccountStore().account!.address,
                        true
                    )
                    console.log('没连上对方服务器的情况下, 撤回消息成功!')
                }
            } catch (error) {
                Notify.create('撤回消息失败')
            }
        },

        /** 将一条普通消息转换为被撤回的消息 */
        convertMessageIntoRecalled(fromChat: Chat, uuid: string, operator: string, fromSelf: boolean) {
            const i = fromChat.messages.findIndex((m) => !m.isRecalled && m.uuid === uuid)
            if (i === -1) return

            const m = fromChat.messages[i]
            const originalText = !m.isRecalled && m.type === MsgType.Text && (m.content as dtalk.proto.ITextMsg).content
            const operatorName =
                operator === useProfileStore().myProfile?.address ? '你' : useUserProfile(operator).displayName.value
            fromChat.messages.splice(i, 1, {
                isRecalled: true,
                uuid,
                logid: m.logid,
                datetime: m.datetime,
                fromChat,
                hideDatetime: m.hideDatetime,
                notifyText: `${operatorName}撤回了一条${fromSelf ? '' : '群成员'}消息`,
                originalText,
                recallTime: Date.now(),
                from: m.from,
                target: m.target,
                recalledByMyself: fromSelf,
            } as RecalledMessage)
            Object.defineProperty(fromChat.messages[i], 'fromChat', { enumerable: false }) // 防止将 fromChat 属性存入数据库
            this.saveChat(fromChat)
        },

        failMessageUploading(fromChat: Chat, messageId: string) {
            const message = fromChat.messages.find((m) => m.uuid === messageId)
            if (!message) return
            if (message.isRecalled) return
            message.state = 'failure'
            message.uploadProgress = undefined
        },

        /** 从一个聊天中删除一条或多条消息 */
        deleteMessage(chat: Chat, messageIdOrIds: string | string[]) {
            const indices: number[] = []
            for (let i = 0; i < chat.messages.length; i++) {
                const m = chat.messages[i]
                if (typeof messageIdOrIds === 'string' && m.uuid === messageIdOrIds) {
                    indices.push(i)
                    break
                } else if (Array.isArray(messageIdOrIds)) {
                    if (messageIdOrIds.includes(m.uuid)) indices.push(i)
                }
            }

            // 删除多个时, 一定要 index 大的先删, 不然删了前面的, 后面的 index 就变了
            const sorted = indices.sort((a, b) => b - a)
            sorted.forEach((i) => {
                chat.messages.splice(i, 1)
            })
            this.saveChat(chat)
        },

        findMessageByLogId(logId: string) {
            let targetMessage: undefined | Message | RecalledMessage
            this.chatList?.forEach((c) => {
                if (!targetMessage) targetMessage = c.messages.find((m) => m.logid === logId)
            })
            return targetMessage
        },

        activateMultiSelect(messageUuid: string) {
            this.multiSelecting = new Set([messageUuid])
        },

        deactivateMultiSelect() {
            this.multiSelecting = null
        },

        async saveChat(payload: Chat | GroupId | string) {
            const accountStore = useAccountStore()
            if (!accountStore.accountDB) throw new Error('saveChatError: accountDB 不存在')
            if (!this.chatList) throw new Error('saveChatError: chatList 为空')
            let _key: string
            let _value: Chat
            // 传入的是 Chat
            if (typeof payload === 'object' && 'messages' in payload) {
                if (payload.type === 'single') {
                    _key = payload.id
                    _value = cloneDeep(payload)
                } else {
                    _key = `${payload.id.hostId}->${payload.id.groupId}`
                    _value = cloneDeep(payload)
                }
            }
            // 传入的是 string | GroupId
            else {
                if (typeof payload === 'string') {
                    const chat = this.chatList.find((c) => c.type === 'single' && c.id === payload)
                    if (!chat) throw new Error('saveChatError: 无法在 chatList 中找到对应 chat')
                    _key = payload
                    _value = cloneDeep(chat)
                } else {
                    const chat = this.chatList.find(
                        (c) => c.type === 'group' && c.id.hostId === payload.hostId && c.id.groupId === payload.groupId
                    )
                    if (!chat) throw new Error('saveChatError: 无法在 chatList 中找到对应 chat')
                    _key = `${(chat as GroupChat).id.hostId}->${(chat as GroupChat).id.groupId}`
                    _value = cloneDeep(chat)
                }
            }

            const start = Date.now()
            await accountStore.accountDB.chats.setItem(_key, _value)
            console.log(`save finished: ${_value.messages.length} messages in ${Date.now() - start} ms`)

            const lastMessage = _value.messages[_value.messages.length - 1]
            const lastMessageDigest = {
                logid: lastMessage.logid,
                datetime: lastMessage.datetime,
            }
            await accountStore.accountDB.lastMessage.setItem<LocalStoredLastMessage>('lastMessage', lastMessageDigest)
            this.localStoredLastMessage = lastMessageDigest
        },

        async saveFile(url: string, file: File) {
            const { accountDB } = useAccountStore()
            if (!accountDB) throw new Error('saveFileErr: 未登录')
            await accountDB.files.setItem(url, file)
        },

        // TODO: 重构消息显示方式
        markAudioMessageAsListened(message: Message) {
            if (message.type !== MsgType.Audio) return
            const index = message.fromChat.messages.findIndex((m) => m.uuid === message.uuid)
            if (index === -1) return
            const _message = message.fromChat.messages[index]
            if (!_message.isRecalled) _message.listenedAudioMessage = true
            this.saveChat(message.fromChat)
        },
    },
})

interface SendPayload {
    msgType: MsgType
    msg: MsgContent
    from: string
    target: string
    uuid: string
    message: Ref<Message>
    toGroup?: boolean
    host?: string
    reference?: Reference
    source?: dtalk.proto.ISource
}
async function send({ from, target, msgType, msg, uuid, message, toGroup, host, reference, source }: SendPayload) {
    const chatStore = useChatStore()
    const connectionStore = useConnectionStore()
    const accountStore = useAccountStore()
    if (!accountStore.account?.address) throw new Error('发送消息失败：账户为空')

    // 私聊
    if (!toGroup) {
        const profileStore = useProfileStore()
        const targetProfile = profileStore.userProfiles[target] || (await profileStore.get(target))

        // 要发送的消息
        const messageData = await encodeChatMessage({
            from,
            target,
            msgType,
            msg,
            uuid,
            privateKey: accountStore.account.privateKey,
            publicKey: hexToArray(targetProfile?.pubKey || ''),
            toGroup,
            reference,
            source,
        })

        /**
         * 将编码好的消息发送给目标
         * 1. 查询目标把我设定在哪个服务器
         * 2. 查询那个服务器我当前是否已连接
         * 3. 如果已连接，直接走 WebSocket 发送；如果未连接，走 HTTP 发送
         */

        // 如果对方是企业用户，将消息发往对方的企业服务器
        if (targetProfile.staffInfo) {
            const targetConnection = connectionStore.connections[urlRemovePrefix(targetProfile.staffInfo.imServer)]

            // 该用户连接的企业服务器我也连上了, 直接通过 ws 发送
            if (targetConnection) {
                if (!targetConnection.instance) {
                    message.value.state = 'failure'
                    chatStore.saveChat(target)
                    return
                }
                try {
                    const result = await targetConnection.instance.sendMessage({ body: messageData, uuid: uuid })
                    const { logId } = dtalk.proto.CommonMsgAck.toObject(dtalk.proto.CommonMsgAck.decode(result), {
                        longs: String,
                    })
                    message.value.state = 'success'
                    message.value.logid = logId
                } catch (error) {
                    message.value.state = 'failure'
                } finally {
                    chatStore.saveChat(target)
                }
            }

            // 我没连接他的企业服务器, 消息通过 http 请求发送
            else {
                try {
                    const result = await chatApi.sendMessage(
                        targetProfile.staffInfo.imServer,
                        messageData,
                        accountStore.account
                    )
                    message.value.state = 'success'
                    message.value.logid = result
                } catch (error) {
                    message.value.state = 'failure'
                } finally {
                    chatStore.saveChat(target)
                }
            }
        }

        // 非企业用户, 正常发送私聊消息
        else {
            const targetServer = targetProfile.chatServers[0]
            if (!targetServer) throw new Error('发送消息出错：目标用户未注册')

            const targetConnection = connectionStore.connections[urlRemovePrefix(targetServer.address)]
            // 同服聊天
            if (targetConnection) {
                if (!targetConnection.instance) {
                    message.value.state = 'failure'
                    chatStore.saveChat(target)
                    return
                }
                try {
                    const result = await targetConnection.instance.sendMessage({ body: messageData, uuid: uuid })
                    const { logId } = dtalk.proto.CommonMsgAck.toObject(dtalk.proto.CommonMsgAck.decode(result), {
                        longs: String,
                    })
                    message.value.state = 'success'
                    message.value.logid = logId
                } catch (error) {
                    message.value.state = 'failure'
                } finally {
                    chatStore.saveChat(target)
                }
            }

            // 跨服聊天
            else {
                try {
                    const result = await chatApi.sendMessage(targetServer.address, messageData, accountStore.account)
                    message.value.state = 'success'
                    message.value.logid = result
                } catch (error) {
                    message.value.state = 'failure'
                } finally {
                    chatStore.saveChat(target)
                }
            }
        }
    }

    // 群聊
    else {
        if (!host) throw new Error('sendError: 发送群聊消息时未携带群所在的服务器地址')
        const messageData = await encodeChatMessage({
            from,
            target,
            msgType,
            msg,
            uuid,
            privateKey: new Uint8Array(),
            publicKey: new Uint8Array(),
            toGroup,
            host,
            reference,
            source,
        })

        const targetConnection = connectionStore.connections[urlRemovePrefix(host)]
        if (!targetConnection || !targetConnection.instance) {
            console.warn('群聊消息无法发送: 未连接群聊对应的服务器')
            message.value.state = 'failure'
            return
        }

        try {
            const result = await targetConnection.instance.sendMessage({ body: messageData, uuid: uuid })
            const { logId } = dtalk.proto.CommonMsgAck.toObject(dtalk.proto.CommonMsgAck.decode(result), {
                longs: String,
            })
            message.value.state = 'success'
            message.value.logid = logId
        } catch (error) {
            message.value.state = 'failure'
        } finally {
            chatStore.saveChat({ hostId: host, groupId: target })
        }
    }
}

function shouldDisplayMessageDate(latest: number, previous: number): boolean {
    return date.getDateDiff(latest, previous, 'seconds') < 60 * 5
}
