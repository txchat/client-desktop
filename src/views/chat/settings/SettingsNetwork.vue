<template>
    <div>
        <h1 class="text-base font-bold mb-2.5">服务器管理</h1>
        <div class="flex mb-7">
            <!-- 聊天服务器设置 -->
            <div class="h-36 w-1/2 rounded bg-gray-2 mr-2.5 p-5 flex flex-col">
                <div class="flex justify-between mb-2.5">
                    <p>当前已连接 {{ connectedLength }} 台聊天服务器</p>
                    <p :class="everyServerConnected ? 'text-positive' : 'text-negative'" class="flex items-center">
                        <q-badge class="mr-2" :color="everyServerConnected ? 'positive' : 'negative'" rounded />
                        {{ everyServerConnected ? '正常' : '异常' }}
                    </p>
                </div>

                <p class="caption">用于接收聊天消息的服务器</p>
                <q-space />
                <div>
                    <base-btn @click.stop="emit('manage-server')" color="secondary" text-color="primary">
                        管理
                    </base-btn>
                </div>
            </div>

            <!-- 区块链节点设置 -->
            <div class="h-36 w-1/2 rounded bg-gray-2 p-5 flex flex-col">
                <div class="flex justify-between mb-2.5">
                    <p>区块链节点</p>
                    <p :class="current?.online ? 'text-positive' : 'text-negative'" class="flex items-center">
                        <q-badge class="mr-2" :color="current?.online ? 'positive' : 'negative'" rounded />
                        {{ current?.online ? '正常' : '异常' }}
                    </p>
                </div>
                <p class="caption">用于上传/获取账户信息的区块链节点</p>
                <q-space />
                <div>
                    <base-btn @click.stop="$emit('switch-node')" color="secondary" text-color="primary">
                        切换
                    </base-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChainNodeUrlStore } from '@/urls/chain-node'
import { useConnectionStore } from '@/store/user-connection'

const emit = defineEmits<{
    (e: 'manage-server'): void
    (e: 'switch-node'): void
}>()

const { current } = storeToRefs(useChainNodeUrlStore())
const { everyServerConnected, connectedLength } = storeToRefs(useConnectionStore())
</script>
