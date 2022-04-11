import { toRaw } from 'vue'
import { Staff } from '@/types/oa'
import { signQueryPayload } from '@/api/chain-request-constructor'
import { useAccountStore } from '@/store/user-account'
import { useProfileStore } from '@/store/user-profile'
import { useModulesStore } from '@/urls/modules'
import { generateToken } from '@/utils/account'
import { useEventListener } from '@vueuse/core'

export type Method =
    | 'reload'
    | 'getAuth'
    | 'getPubKey'
    | 'getSign'
    | 'getUserInfo'
    | 'focusUser'
    | 'selectUser'
    | 'unselectUser'
    | 'getOaServer'
    | 'getOtherUserAvatar'

export interface PostedMessage<T> {
    appId: '3syxin'
    method: Method
    body?: T
}

interface SignPayload {
    [key: string]: string
}

export interface FocusedUser {
    id: string
    name: string
}

interface UserInfo {
    id: string
    avatar?: string
    entId: string
    staffInfo: Staff
}

export function useH5Bridge(windowObj: Window): { postMessage: <T>(method: Method, body: T) => void } {
    function postMessage<T>(method: Method, body: T) {
        if (!windowObj.postMessage) throw new Error('useBridgeError: window 实例没有 postMessage 方法')
        console.log('post: ', body)
        windowObj.postMessage(
            {
                appId: '3syxin',
                method,
                body,
            },
            '*'
        )
    }

    useEventListener(
        'message',
        ({ data }: MessageEvent<PostedMessage<undefined | FocusedUser | SignPayload | string>>) => {
            if (data.appId !== '3syxin') return
            console.log('Request: ', data)

            // 刷新本页面
            if (data.method === 'reload') window.location.reload()
            // 获取最新的鉴权信息
            else if (data.method === 'getAuth') {
                const accountStore = useAccountStore()
                if (!accountStore.account) return

                postMessage('getAuth', generateToken(accountStore.account))
            }

            // 公钥
            else if (data.method === 'getPubKey') {
                const accountStore = useAccountStore()
                if (!accountStore.account) return

                postMessage('getPubKey', accountStore.account.publicKeyHex)
            }

            // 对一个对象签名
            else if (data.method === 'getSign') {
                const accountStore = useAccountStore()
                if (!accountStore.account) return
                if (!data.body) return

                postMessage(
                    'getSign',
                    signQueryPayload<{ [key: string]: string }>(data.body as SignPayload, {
                        publicKey: accountStore.account.publicKeyHex,
                        privateKey: accountStore.account.privateKeyHex,
                    })
                )
            }

            // 获取 企业服务器
            else if (data.method === 'getOaServer') {
                postMessage('getOaServer', useModulesStore().oaServer)
            }

            // 获取用户信息
            else if (data.method === 'getUserInfo') {
                const accountStore = useAccountStore()
                if (!accountStore.account) return
                const profileStore = useProfileStore()
                if (!profileStore.myProfile?.staffInfo) return
                postMessage<UserInfo>('getUserInfo', {
                    id: accountStore.account.address,
                    avatar: profileStore.myProfile.avatar,
                    entId: profileStore.myProfile?.staffInfo?.entId,
                    staffInfo: toRaw(profileStore.myProfile.staffInfo),
                })
            }

            // 获取其他用户信息
            else if (data.method === 'getOtherUserAvatar') {
                const profileStore = useProfileStore()
                const id = data.body as string
                const memoeryProfile = profileStore.userProfiles[id]
                if (memoeryProfile) {
                    postMessage<string>('getOtherUserAvatar', memoeryProfile.avatar)
                } else {
                    profileStore
                        .load(id)
                        .then((localProfile) => {
                            if (localProfile) postMessage<string>('getOtherUserAvatar', localProfile.avatar)
                            else return profileStore.get(id)
                        })
                        .then((chainProfile) => {
                            postMessage<string>('getOtherUserAvatar', chainProfile?.avatar || '')
                        })
                }
            }

            // 其他情况
            else console.log(`bridge method: ${data.method} \n`, data)
        }
    )

    return { postMessage }
}
