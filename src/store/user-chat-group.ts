import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { fromByteArray, toByteArray } from 'base64-js'
import { chatGroupApi } from '@/api/user-chat-group'
import { useAccountStore } from './user-account'
import { urlRemovePrefix } from '@/utils/url-replace'
import { ChatGroup, ChatGroupHosts, ChatGroupMember, ChatGroupResponse, ChatGroups } from '@/types/user-chat-group'
import { decryptGroupMessage, encryptGroupMessage } from '@/utils/message-crypto/content-crypto'
import { arrayToUtf8, hexToArray, utf8ToArray } from 'enc-utils'

export const useChatGroupStore = defineStore({
    id: 'user: chat group',

    state() {
        return {
            hosts: {} as ChatGroupHosts,
            focusedGroup: null as { group: ChatGroup; hostId: string } | null,
        }
    },

    actions: {
        async load() {
            const db = useAccountStore().accountDB?.chatGroups
            if (!db) throw new Error('无法从本地载入服务器列表：无法取得 accountDB')

            const _hosts: ChatGroupHosts = {}
            await db.iterate<ChatGroups, void>((host, key) => {
                if (host) _hosts[key] = host
            })
            this.hosts = _hosts
            return _hosts
        },

        async keyOf(hostId: string, groupId: string): Promise<Uint8Array | null> {
            const host = this.hosts[hostId]
            if (!host) return null
            const group = host[groupId] || (await this.getChatGroup(hostId, groupId))
            return hexToArray(group.key)
        },

        save(hostId: string) {
            const accountStore = useAccountStore()
            if (!accountStore.accountDB) throw new Error('getChatGroupsError: 账户未登录')
            accountStore.accountDB.chatGroups.setItem<ChatGroups>(hostId, toRaw(this.hosts[hostId]))
        },

        /**
         * 获取该服务器中我所在的全部群聊
         * @note 该请求获取的群聊信息不会返回 `members` 字段
         */
        async getChatGroups(serverAddress: string) {
            const result = await chatGroupApi.getChatGroups(serverAddress)

            const hostId = urlRemovePrefix(serverAddress)
            if (!(hostId in this.hosts)) this.hosts[hostId] = {}

            result.data.data.groups.forEach(async (resGroup) => {
                const _group = await fromResponse(resGroup, serverAddress)
                if (!this.hosts[hostId][_group.id]) {
                    this.hosts[hostId][_group.id] = _group
                } else {
                    // `getChatGroups` 接口返回的结果中, 单个群资料没有 `member` 字段
                    // 若本地已有缓存对应的群信息, 需防止覆盖掉本地的 `member` 字段
                    let key: keyof ChatGroup
                    for (key in _group) {
                        ;(this.hosts[hostId][_group.id][key] as unknown) = _group[key]
                    }
                }
            })

            this.save(hostId)
        },

        /** 获取单个群聊信息 */
        async getChatGroup(hostId: string, groupId: string) {
            const result = await chatGroupApi.getChatGroupInfo(hostId, groupId)
            if (result.status !== 200 || result.data.result !== 0) return Promise.reject(result)

            const _group = await fromResponse(result.data.data, hostId)

            const host = this.hosts[hostId]
            if (!host) this.hosts[hostId] = { [groupId]: _group }
            else {
                let group = this.hosts[hostId][groupId]
                if (!group) {
                    this.hosts[hostId][groupId] = _group
                    group = _group
                } else {
                    // 该接口 `members` 字段只返回前 10 人, 如果本地有该群的缓存, 则舍弃接口返回的该字段
                    let key: keyof typeof _group
                    for (key in _group) {
                        if (key !== 'members') (group[key] as unknown) = _group[key]
                    }
                }
                if (group.members?.length !== group.memberNum) await this.getMemberList(hostId, groupId)
            }

            const accountStore = useAccountStore()
            if (!accountStore.accountDB) throw new Error('getChatGroupError: 账户未登录')
            accountStore.accountDB.chatGroups.setItem<ChatGroups>(hostId, toRaw(host))

            return _group
        },

        async getMemberList(hostId: string, groupId: string): Promise<ChatGroupMember[]> {
            const result = await chatGroupApi.getAllMembers(hostId, groupId)
            if (result.status !== 200 || result.data.result !== 0) return Promise.reject(result)

            const chatGroupStore = useChatGroupStore()
            chatGroupStore.hosts[hostId][groupId].members = result.data.data.members
            const accountStore = useAccountStore()
            accountStore.accountDB?.chatGroups.setItem<ChatGroups>(hostId, toRaw(chatGroupStore.hosts[hostId]))

            return result.data.data.members
        },

        async updateGroupName(hostId: string, groupId: string, name: string, publicName: string) {
            const key = await this.keyOf(hostId, groupId)
            if (!key) throw new Error('updateGroupNameError: key 不存在')

            const result = await chatGroupApi.updateGroupName(hostId, {
                id: groupId,
                name: name ? fromByteArray(await encryptGroupMessage(utf8ToArray(name), key)) : '',
                publicName,
            })
            if (result.status !== 200 || result.data.result !== 0) return Promise.reject(result)
            if (name) this.hosts[hostId][groupId].name = name
            this.hosts[hostId][groupId].publicName = publicName
        },

        async addMembers(hostId: string, groupId: string, members: string[]) {
            const result = await chatGroupApi.addMembers(hostId, groupId, members)
            if (result.status !== 200 || result.data.result !== 0) return Promise.reject(result)
        },

        async removeMembers(hostId: string, groupId: string, members: string[]) {
            const result = await chatGroupApi.removeMembers(hostId, groupId, members)
            if (result.status !== 200 || result.data.result !== 0) return Promise.reject(result)
        },
    },
})

/** 处理从后端返回的群资料 */
async function fromResponse(resGroup: ChatGroupResponse, serverAddress: string): Promise<ChatGroup> {
    const _group: ChatGroup = resGroup
    _group.id = resGroup.idStr
    _group.host = urlRemovePrefix(serverAddress)
    try {
        _group.name = arrayToUtf8(await decryptGroupMessage(toByteArray(_group.name), hexToArray(resGroup.key)))
    } catch (error) {
        console.log('群名解密失败, 可能是未加密的群名: ', _group.name)
    }
    return _group
}
