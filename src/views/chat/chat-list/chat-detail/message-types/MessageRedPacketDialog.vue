<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="loading">
        <q-card v-if="!status" class="q-dialog-plugin red-packet-cover p-4" style="width: 290px; height: 450px">
            <q-card-section class="text-right p-0">
                <i @click="onDialogCancel" class="iconfont font-normal text-gold text-sm pt-1 pr-2 cursor-pointer">
                    &#xe626;
                </i>
            </q-card-section>

            <q-card-section class="text-center p-0 mb-12">
                <q-avatar class="mb-2.5" rounded><q-img :src="displayAvatar" no-spinner></q-img></q-avatar>
                <p class="text-gold">{{ truncate(displayName, 16) }} 的红包</p>
            </q-card-section>

            <q-card-section class="text-center p-0 mb-28">
                <p class="text-gold font-semibold text-lg">{{ remark }}</p>
            </q-card-section>

            <q-card-section class="text-center">
                <q-btn
                    @click="openRedPacket"
                    round
                    unelevated
                    :loading="loading"
                    color="gold"
                    text-color="white"
                    :ripple="false"
                >
                    <q-avatar size="90px">
                        <q-img :src="require('@/assets/images/red-packet-open.png')" no-spinner></q-img>
                    </q-avatar>

                    <template v-slot:loading> <q-spinner color="dark" size="1.25em" /> </template>
                </q-btn>
            </q-card-section>
        </q-card>
        <q-card v-else class="q-dialog-plugin" style="width: 290px; height: 450px">
            <q-card-section class="text-right h-60 p-4 bg-negative rounded-none">
                <p>
                    <i @click="onDialogCancel" class="iconfont font-normal text-white text-sm pt-1 pr-2 cursor-pointer">
                        &#xe626;
                    </i>
                </p>

                <div class="text-center">
                    <q-avatar class="mb-2.5" rounded><q-img :src="displayAvatar" no-spinner></q-img></q-avatar>
                    <p class="text-white">{{ truncate(displayName, 16) }} 的红包</p>
                </div>

                <div class="mt-2 text-center text-sm opacity-60">
                    <div class="text-white">{{ remark }}</div>
                </div>

                <div class="text-center mt-6 text-white text-2xl font-semibold">
                    <p v-if="status === 4" class="opacity-50">红包已过期</p>
                    <p v-else-if="status === 3" class="opacity-50">红包已退回</p>
                    <p v-else-if="status === 2" class="opacity-50">红包已领完</p>
                    <div v-else-if="status === 5" class="px-3">
                        <p>{{ (amount && (Number(amount) / 100_000_000).toFixed(0) + assetSymbol) || '红包已领取' }}</p>
                        <p class="opacity-50 text-sm font-normal mt-2">已存入钱包，下载APP查看</p>
                    </div>
                </div>
            </q-card-section>

            <svg class="transform -translate-y-0.5" width="290px" height="34px" viewBox="0 0 290 34">
                <defs>
                    <rect id="path-1" x="0" y="0" width="290" height="32.2222222"></rect>
                </defs>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-628.000000, -1097.000000)">
                        <g transform="translate(628.000000, 1097.833333)">
                            <mask id="mask-2" fill="white">
                                <use xlink:href="#path-1"></use>
                            </mask>
                            <g id="Mask"></g>
                            <circle
                                fill="#DD5F5F"
                                fill-rule="nonzero"
                                mask="url(#mask-2)"
                                cx="145"
                                cy="-319"
                                r="351.222222"
                            ></circle>
                        </g>
                    </g>
                </g>
            </svg>

            <q-card-section class="flex justify-center pt-2 pb-0">
                <div class="bg-gray-1 p-2">
                    <q-img :src="require('theme/icons/qrcode.png')" width="110px" no-spinner></q-img>
                </div>
            </q-card-section>

            <q-card-section class="p-0 text-center">
                <base-btn
                    type="a"
                    href="https://3syxin.com"
                    target="_blank"
                    class="mt-3"
                    color="secondary"
                    text-color="primary"
                    padding="3px 10px"
                >
                    下载谈信 App
                </base-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { date, Notify, useDialogPluginComponent } from 'quasar'
import { useTimeout } from '@vueuse/core'
import { truncate } from '@/utils/string-truncate'
import { redPacketApi } from '@/api/chain-red-packet'
import { useAccountStore } from '@/store/user-account'
import { RedPacketStatus } from '@/types/messages'
import { useUserProfile } from '@/composables/user/useUserProfile'

const props = defineProps<{
    fromAddress: string
    packetId: string
    remark: string
    packetPrivateKey: string
    initialStatus?: RedPacketStatus
    initialAmount?: string
    assetSymbol: string
    changeStatus?: (s?: RedPacketStatus, receivedAmount?: string) => void
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const loading = ref(false)

const status = ref<undefined | RedPacketStatus>(props.initialStatus)
const amount = ref(props.initialAmount)

const { displayAvatar, displayName } = useUserProfile(props.fromAddress)

async function openRedPacket() {
    try {
        // 查询红包信息
        loading.value = true
        const { status: resultStatus, expiresTime } = await redPacketApi.getRedPacketInfo(props.packetId)

        // 如果红包过期  改变状态
        const dateDiff = date.getDateDiff(Number(expiresTime) * 1000, Date.now(), 'seconds')
        if (dateDiff < 0) {
            status.value = 4
            props.changeStatus && props.changeStatus(status.value)
        }

        // 如果红包被领完 改变状态
        else if (resultStatus === 2) {
            status.value = 2
            props.changeStatus && props.changeStatus(status.value)
        }

        // 如果红包未被领完 领取
        else {
            await receiveRedPacket()
            status.value = await pollReception()
            props.changeStatus && props.changeStatus(status.value, amount.value)
        }
    } catch (error) {
        Notify.create(error instanceof Error ? error.message : (error as string))
        console.log(error)
    } finally {
        loading.value = false
    }
}

async function receiveRedPacket() {
    const account = useAccountStore().account!
    await redPacketApi.receive({
        packetId: props.packetId,
        packetPrivateKey: props.packetPrivateKey,
        receiverAddress: account.address,
        privateKey: account.privateKeyHex,
    })
}

/** 轮询抢红包结果 */
async function pollReception(): Promise<RedPacketStatus | undefined> {
    const account = useAccountStore().account!

    await useTimeout(1000 * 3)
    let times = 0
    return await poller()

    async function poller() {
        times++
        if (times > 6) await useTimeout(1000 * 2)

        const result = await redPacketApi.getReceiveResult({
            address: account.address,
            packetId: props.packetId,
        })
        if (result.status !== 1) await poller()
        else {
            amount.value = result.amount
            await redPacketApi.withdraw(
                {
                    execName: 'user.p.testproofv2.redpacket',
                    execer: 'user.p.testproofv2.token',
                    to: '17xAdZCoTemiGw3wpYLrTdPayojYYpxqPt',
                    amount: Number(result.amount),
                    tokenSymbol: result.assetSymbol,
                    isWithdraw: true,
                    isToken: true,
                },
                account.privateKeyHex
            )
            return 5 as RedPacketStatus
        }

        return
    }
}
</script>

<style lang="scss" scoped>
.red-packet-cover {
    background-image: url('~@/assets/images/red-packet-curve.svg');
}
</style>
