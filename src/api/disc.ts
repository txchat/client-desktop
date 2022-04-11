import axios, { AxiosResponse } from 'axios'
import { ChainNode } from '@/urls/chain-node'
import { InitialChatServer } from '@/urls/initial-chat-server'

const request = axios.create({
    method: 'post',
})

type Response<T> = AxiosResponse<{
    data: T
    message: string
    result: number
}>

type DiscoveredResult = {
    nodes: ChainNode[]
    servers: InitialChatServer[]
}

export const discApi = {
    disc(): Promise<Response<DiscoveredResult>> {
        return request({ url: '/disc/nodes' })
    },
}
