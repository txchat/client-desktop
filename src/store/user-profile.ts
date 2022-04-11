import { defineStore } from 'pinia'
import { blockChainApi } from '@/api/chain-base'
import { useAccountStore } from '@/store/user-account'
import { UserProfile, UserProfiles } from '@/types/user-profile'
import { oaApi } from '@/api/modules-oa'

const ERR_NULL_ACCOUNT = 'accountStore 中没有账户信息'
const ERR_NULL_ACCOUNTDB = 'accountStore 中的 accountDB 为空'

export const useProfileStore = defineStore({
    id: 'user: profile',

    state() {
        return {
            /** 缓存所有查过的用户资料 */
            userProfiles: {} as UserProfiles,
        }
    },

    getters: {
        myProfile(): UserProfile | null {
            const accountStore = useAccountStore()
            if (!accountStore.account) return null
            return this.userProfiles[accountStore.account.address] || null
        },
    },

    actions: {
        /**
         * 从本地数据库拿用户资料
         * @param targetAddress 目标用户的地址
         * @returns 用户的资料 (若有)
         */
        load(target: string): Promise<UserProfile | null> {
            const accountStore = useAccountStore()

            return new Promise((resolve) => {
                if (!accountStore.accountDB) throw new Error('从本地数据库拿用户资料失败' + ERR_NULL_ACCOUNTDB)

                let _userProfile = null as UserProfile | null
                accountStore.accountDB.userProfiles
                    .getItem<UserProfile>(target)
                    .then((p) => {
                        if (!p) {
                            resolve(null)
                            return
                        }

                        _userProfile = p
                        return loadRemark(target)
                    })
                    .then((remark) => {
                        remark && (_userProfile!.remark = remark)
                        this.userProfiles[target] = _userProfile // 挂到全局当缓存
                        resolve(_userProfile)
                    })
            })
        },

        /** 从缓存拿用户资料, 如果找不到, 则从区块链拿 */
        async lazyGet(targetAddress: string): Promise<UserProfile> {
            const _profile: UserProfile | null = this.userProfiles[targetAddress]
            if (_profile) return _profile
            return await useProfileStore().get(targetAddress)
        },

        /** 从区块链拿用户资料 */
        get(targetAddress: string): Promise<UserProfile> {
            return new Promise((resolve, reject) => {
                const accountStore = useAccountStore()
                if (!accountStore.account) throw new Error('从区块链拿用户资料失败: ' + ERR_NULL_ACCOUNT)

                const { address: myAddress, publicKeyHex: publicKey, privateKeyHex: privateKey } = accountStore.account

                const _userProfile = {} as UserProfile

                blockChainApi
                    .getUser(myAddress, targetAddress, { publicKey, privateKey })
                    .then((_rawUserProfile) => {
                        // 将请求到的数据整理为 UserProfile 类型
                        const _fieldsObj = {} as { [fieldName: string]: string | undefined }
                        _rawUserProfile.fields.forEach((field) => {
                            const key = field.name
                            const value = field.value
                            _fieldsObj[key] = value
                        })

                        _userProfile.address = targetAddress
                        _userProfile.nickname = _fieldsObj.nickname || ''
                        _userProfile.avatar = _fieldsObj.avatar || ''
                        _userProfile.chatServers = _rawUserProfile.chatServers
                        _userProfile.pubKey = _fieldsObj.pubKey || ''

                        return oaApi.getStaff(_userProfile.address)
                    })
                    .then((res) => {
                        if ([13001, 0].includes(res.data.code)) {
                            const staffInfo = res.data.data
                            staffInfo && (_userProfile.staffInfo = staffInfo)
                        }
                        return accountStore.accountDB?.userProfiles.setItem<UserProfile>(targetAddress, _userProfile) // 本地持久化存储
                    })
                    .then((profile) => {
                        if (profile) return loadRemark(profile.address)
                        else reject('从区块链拿用户资料过程中断')
                    })
                    .then((remark) => {
                        remark && (_userProfile.remark = remark)
                        this.userProfiles[targetAddress] = _userProfile // 挂到全局当缓存
                        resolve(_userProfile)
                    })
                    .catch((res) => reject(res))
            })
        },
    },
})

/** 从本地数据库拿备注 */
function loadRemark(address: string) {
    const accountStore = useAccountStore()
    if (!accountStore.accountDB) throw new Error('获取备注失败，无法取得 accountDB')
    return accountStore.accountDB.remarks.getItem<string>(address)
}
