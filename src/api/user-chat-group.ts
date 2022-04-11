import axios, { AxiosResponse } from 'axios'
import { useAccountStore } from '@/store/user-account'
import { generateToken } from '@/utils/account'
import { ChatGroupMember, ChatGroupResponse, UpdateGroupNameRequest } from '@/types/user-chat-group'
import prependHttp from 'prepend-http'
import { isIp } from '@/utils/is-url'
import { isEnv } from '@/utils/env'

const request = axios.create({ method: 'post' })

request.interceptors.request.use((config) => {
    const accountStore = useAccountStore()
    if (accountStore.account) config.headers['FZM-SIGNATURE'] = generateToken(accountStore.account)
    else console.warn(`chatGroupApi: 请求 '${config.url}' 时检测到未登录`)

    const https = (function () {
        if (isIp(config.url)) return false
        if (process.env.NODE_ENV === 'development' || isEnv.electron) return true
        return window.location.protocol === 'https:'
    })()
    config.url = prependHttp(config.url || '', { https })
    return config
})

request.interceptors.response.use((response) => {
    if (response.status !== 200) return Promise.reject(response.statusText)
    if (response.data.result !== 0) return Promise.reject(response.data.message)
    return response
})

type Response<T> = {
    data: T
    msg: string
    result: number
}

export const chatGroupApi = {
    getChatGroupInfo(serverAddress: string, id: string): Promise<AxiosResponse<Response<ChatGroupResponse>>> {
        return request(serverAddress + '/group/app/group-info', { data: { idStr: id } })
    },

    getChatGroups(serverAddress: string): Promise<AxiosResponse<Response<{ groups: ChatGroupResponse[] }>>> {
        return request(serverAddress + '/group/app/group-list')
    },

    getMember(
        serverAddress: string,
        groupId: string,
        memberId: string
    ): Promise<AxiosResponse<Response<ChatGroupMember>>> {
        return request(serverAddress + '/group/app/group-member-info', { data: { idStr: groupId, memberId } })
    },

    getAllMembers(serverAddress: string, id: string): Promise<AxiosResponse<Response<{ members: ChatGroupMember[] }>>> {
        return request(serverAddress + '/group/app/group-member-list', { data: { idStr: id } })
    },

    updateGroupName(serverAddress: string, data: UpdateGroupNameRequest): Promise<AxiosResponse<Response<null>>> {
        return request(serverAddress + '/group/app/name', {
            data: { idStr: data.id, name: data.name, publicName: data.publicName },
        })
    },

    addMembers(serverAddress: string, groupId: string, members: string[]): Promise<AxiosResponse<Response<null>>> {
        return request(serverAddress + '/group/app/invite-group-members', {
            data: { idStr: groupId, newMemberIds: members },
        })
    },

    removeMembers(serverAddress: string, groupId: string, members: string[]): Promise<AxiosResponse<Response<null>>> {
        return request(serverAddress + '/group/app/group-remove', {
            data: { idStr: groupId, memberIds: members },
        })
    },
}
