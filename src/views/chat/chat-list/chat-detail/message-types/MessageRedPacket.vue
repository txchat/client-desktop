<template>
    <div
        @click="receivePacket"
        class="w-60 h-18 py-3 px-2 rounded bg-negative cursor-pointer flex items-center"
        :class="{ 'opacity-50': ([2, 3, 4, 5] as Array<number | undefined>).includes(content.status) }"
    >
        <q-avatar size="42px">
            <i class="iconfont text-warn">{{ content.status === 5 ? '&#xe630;' : '&#xe62f;' }}</i>
        </q-avatar>
        <div>
            <p class="text-white flex-grow line-clamp-1">{{ content.remark }}</p>
            <p class="text-white flex-grow text-sm">
                {{
                    content.status === 2
                        ? '红包已领取'
                        : content.status === 3
                        ? '红包已退回'
                        : content.status === 4
                        ? '红包已过期'
                        : '查看红包'
                }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar'
import { RedPacketMsgContent, RedPacketStatus } from '@/types/messages'
import MessageRedPacketDialogVue from './MessageRedPacketDialog.vue'

const props = defineProps<{
    fromAddress: string
    fromMyself: boolean
    content: RedPacketMsgContent
    state: 'pending' | 'success' | 'failure' | null
}>()

const emits = defineEmits<{
    (e: 'updateStatus', v: { status: RedPacketStatus; receivedAmount: number }): void
}>()

function receivePacket() {
    Dialog.create({
        component: MessageRedPacketDialogVue,
        componentProps: {
            packetId: props.content.txHash,
            fromAddress: props.fromAddress,
            remark: props.content.remark,
            packetPrivateKey: props.content.privateKey,
            initialStatus: props.content.status,
            initialAmount: props.content.receivedAmount,
            assetSymbol: props.content.coinName,
            changeStatus(status: RedPacketStatus, receivedAmount: number) {
                emits('updateStatus', { status, receivedAmount })
            },
        },
    })
}
</script>
