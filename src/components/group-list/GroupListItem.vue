<template>
    <div v-if="host && Object.keys(host).length">
        <div class="mx-5 pt-2">
            <div
                class="px-2.5 py-1.5 text-sm"
                :class="[
                    connectionState === 'not-exist'
                        ? ' text-subtle'
                        : connectionState === 'connected'
                        ? 'text-positive'
                        : ' text-negative',

                    connectionState === 'not-exist'
                        ? ' bg-gray-4'
                        : connectionState === 'connected'
                        ? 'bg-positive-light'
                        : ' bg-negative-light',
                ]"
            >
                <p class="mb-1">{{ serverName }}</p>
                <p>{{ hostId }}</p>
            </div>
            <svg class="ml-4" width="16px" height="9px" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path :class="connectionState || 'not-exist'" d="M0 0 L50 100 L100 0 Z" />
            </svg>
        </div>
        <div v-for="set in alphabetized" :key="'alphabetized-set' + set.tag">
            <p class="caption ml-5 h-5 leading-5">
                {{ set.tag }}
            </p>

            <div
                v-for="group in set.groups"
                :key="hostId + '-' + group.id"
                @click="$emit('select-group', hostId, group)"
                :class="{
                    'bg-gray-4': !sameBackgroundColor && selected === group.id,
                    'pl-5': !$slots['default'],
                    ...itemClass,
                }"
                class="pr-5 py-2 flex items-center"
            >
                <slot :hostId="hostId" :groupId="group.id"></slot>
                <q-avatar class="mr-2.5" rounded size="30px">
                    <q-img :src="group.avatar || require('theme/icons/default-avatar-group.svg')" no-spinner></q-img>
                </q-avatar>
                <span class="line-clamp-1"> {{ group.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pinyin } from 'pinyin-pro'
import { urlRemovePrefix } from '@/utils/url-replace'
import { ChatGroup, ChatGroups } from '@/types/user-chat-group'
import { useOaStore } from '@/store/user-oa'
import { useChatServerStore } from '@/store/user-chat-server'
import { useConnectionStore } from '@/store/user-connection'

const props = defineProps<{
    selected?: string
    host: ChatGroups
    hostId: string
    /** 选中的 item 背景颜色不变化 */
    sameBackgroundColor?: boolean
    itemClass?: { [className: string]: boolean }
}>()

defineEmits<{
    (e: 'select-group', hostId: string, group: ChatGroup): void
}>()

const oaStore = useOaStore()
const chatServerStore = useChatServerStore()
const connectionStore = useConnectionStore()

const serverName = computed(() => {
    if (oaStore.enterprise?.imServer && urlRemovePrefix(oaStore.enterprise.imServer)) return '企业聊天服务器'
    return chatServerStore.chatServers?.find((s) => urlRemovePrefix(s.address) === props.hostId)?.name || '[未知服务器]'
})

const connectionState = computed(() => {
    if (props.hostId in connectionStore.connections) {
        const targetConnection = connectionStore.connections[props.hostId]
        if (targetConnection?.instance) return 'connected'
        return 'not-connected'
    }

    return 'not-exist'
})

type AlphabetizedChatGroup = {
    /** 按首字母分组的标签 (A-Z#) */
    tag: string

    /** 当前分组下的好友 */
    groups: ChatGroup[]
}[]

/** 将群按首字母 A-Z 分组并排序 */
const alphabetized = computed(() => {
    /** 每个群的显示名称的首字母，例如「张三」对应的首字母为 ['z', 's'] */
    const initialsMap: { [groupId: string]: string[] } = {}

    // 分组
    const rawSets: AlphabetizedChatGroup = []
    Object.values(props.host).forEach((g) => {
        const initials = pinyin(g.name, {
            pattern: 'first',
            toneType: 'none',
            type: 'array',
        }).map((i) => i.toUpperCase())
        initialsMap[g.id] = initials
        const tag = /[A-Z]/.test(initials[0]) ? initials[0] : '#'

        const i = rawSets.findIndex((g) => g.tag === tag)
        if (i === -1) {
            rawSets.push({ tag, groups: [] })
            rawSets[rawSets.length - 1].groups.push(g)
        } else rawSets[i].groups.push(g)
    })

    // 组间排序
    const orderedSets = rawSets.sort((a, b) => {
        if (a.tag === '#') return 1
        else if (b.tag === '#') return -1
        else if (a.tag < b.tag) return -1
        else if (a.tag > b.tag) return 1
        else return 0
    })

    // 组内排序
    orderedSets.forEach((rawGroup) => {
        rawGroup.groups.sort((a, b) => {
            const initialsA = initialsMap[a.id]
            const initialsB = initialsMap[b.id]
            for (let i = rawGroup.tag === '#' ? 0 : 1; i < initialsA.length; i++) {
                if (!initialsB[i]) return 1
                else if (initialsA[i] < initialsB[i]) return -1
                else if (initialsA[i] > initialsB[i]) return 1
            }
            return -1
        })
    })

    return orderedSets
})
</script>

<style lang="scss" scoped>
path.connected {
    fill: theme('colors.positive-light');
}

path.not-exist {
    fill: theme('colors.gray-4');
}

path.not-connected {
    fill: theme('colors.negative-light');
}
</style>
