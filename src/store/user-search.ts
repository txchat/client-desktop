import { defineStore } from 'pinia'
import { useFriendStore } from './user-friend'
import { useProfileStore } from './user-profile'
import { useChatGroupStore } from './user-chat-group'
import { useChatStore } from './user-chat'
import { dtalk } from '@/utils/message-codec/protobuf'
import { getMatchedStr } from '@/utils/string-get-matched'
import { Chat, MsgType } from '@/types/user-chat'
import { tResultOfChatGroupsSearch, tResultOfChatHistorySearch, tResultOfFriendSearch } from '@/types/user-search'

export const useSearchStore = defineStore({
    id: 'user: search',

    state() {
        return {
            searchValueOfAll: '', // 搜索联系人、群聊、聊天记录的值
            resultOfFriendsSearch: [] as tResultOfFriendSearch[], // 联系人结果
            showMoreFriends: false,
            resultOfChatGroupsSearch: [] as tResultOfChatGroupsSearch[], // 群聊结果
            showMoreChatGroups: false,
            resultOfChatsHistorySearch: [] as tResultOfChatHistorySearch[], // 聊天记录结果
            showMoreChatsHistory: false,

            searchValueOfAllChatsHistory: '', //搜索聊天记录的值
            focusedChatHistory: ['', undefined] as [string, string?], // id 和 host（如果有的话）
            resultOfAllChatsHistorySearch: [] as tResultOfChatHistorySearch[], // 所有聊天记录

            searchValueOfOneChatHistory: '', // 和某人或某群聊天记录的搜索值
            resultOfOneChatHistorySearch: undefined as tResultOfChatHistorySearch | undefined, // 某人的聊天记录

            searchValueOfForwardTarget: '', // 搜索转发对象
        }
    },

    actions: {
        clearSearch() {
            this.showMoreFriends = false
            this.showMoreChatGroups = false
            this.showMoreChatsHistory = false
            this.searchValueOfAll = ''
        },
        /**
         * 全局搜索匹配消息
         */
        getMatchedChatsHistoryFromAll(str: string) {
            str = str.trim().toLowerCase()
            if (str === '') return []
            const list = [] as tResultOfChatHistorySearch[]
            const chatStore = useChatStore()
            chatStore.chatList?.filter((chat) => {
                const result = this.getMatchedChatHistoryFromOneChat(str, chat)
                result && result.matchedMessages.length !== 0 && list.push({ ...result })
            })
            return list
        },
        /* 搜索指定聊天对象的消息 */
        getMatchedChatHistoryFromOneChat(str: string, chat: Chat) {
            str = str.trim().toLowerCase()
            if (str === '') return
            const matchedMessages = chat.messages.filter((message) => {
                if (message.isRecalled) return
                if (message.type === MsgType.Text) {
                    return ![-1, undefined].includes(
                        (message.content as dtalk.proto.ITextMsg).content?.toLowerCase().indexOf(str)
                    )
                } else if (message.type === MsgType.File) {
                    return (message.content as dtalk.proto.IFileMsg).name?.toLowerCase().indexOf(str) !== -1
                }
            })

            return {
                matchedMessages,
                id: chat.id,
                type: chat.type,
                matchedStr: str,
            } as tResultOfChatHistorySearch
        },
        /**
         * 获取匹配的联系人
         * @param searchValueOfAll 搜索的值
         * @returns
         */
        getMatchedFriends(searchValueOfAll: string) {
            const str = searchValueOfAll.trim().toLowerCase()
            if (str.trim() === '') {
                return []
            }
            const friendStore = useFriendStore()
            const profileStore = useProfileStore()
            if (!friendStore.friends) return []

            const list = [] as tResultOfFriendSearch[]

            Object.keys(friendStore.friends).filter((friendAddress) => {
                const friendProfile = profileStore.userProfiles[friendAddress]
                if (friendProfile) {
                    const nicknameMatch = getMatchedStr(friendProfile.nickname, str)
                    const remarkMatch = getMatchedStr(friendProfile.remark || '', str)
                    const addressMatch = getMatchedStr(friendProfile.address || '', str)

                    const matched = remarkMatch || nicknameMatch || addressMatch
                    if (matched) {
                        list.push({
                            nickname: friendProfile.nickname,
                            avatar: friendProfile.avatar || require('theme/icons/default-avatar.svg'),
                            remark: friendProfile.remark,
                            address: friendProfile.address,
                            matchedKeyName: remarkMatch ? 'remark' : nicknameMatch ? 'nickname' : 'address',
                            matchedStr: matched,
                        })
                    }
                }
            })
            return list
        },
        /**
         * 获取匹配的群组
         * @param searchValueOfAll 搜索的值
         * @returns
         */
        getMatchedChatGroups(searchValueOfAll: string) {
            const str = searchValueOfAll.trim().toLowerCase()
            if (str === '') return []
            const chatGroupStore = useChatGroupStore()
            const hosts = chatGroupStore.hosts
            const list = [] as tResultOfChatGroupsSearch[]
            Object.keys(hosts).forEach((hostKey) => {
                const host = hosts[hostKey]
                Object.keys(host).filter((groupId) => {
                    const group = host[groupId]
                    group.avatar = group.avatar || require('theme/icons/default-avatar-group.svg')

                    const matched = getMatchedStr(group.name || '', str)

                    if (matched) {
                        list.push({ ...group, matchedStr: matched })
                    }
                })
            })
            return list
        },
        focusChatHistoryInHistoryList(id: string, host?: string) {
            this.focusedChatHistory = [id, host]
        },
        getFocusedChatHistory() {
            return this.getChatHistory(this.focusedChatHistory[0], this.focusedChatHistory[1])
        },
        getChatHistory(id: string, host?: string) {
            return this.resultOfAllChatsHistorySearch.find((history) => {
                if (host) {
                    return history.type === 'group' && history.id.groupId === id && history.id.hostId === host
                } else {
                    return history.type === 'single' && history.id === id
                }
            })
        },
    },
})
