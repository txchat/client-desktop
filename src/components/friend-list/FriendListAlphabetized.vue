<template>
    <div v-for="set in alphabetized" :key="'alphabetized-set' + set.tag">
        <p class="caption ml-5 h-5 leading-5">
            {{ set.tag }}
        </p>

        <div
            class="flex space-x-2 pr-5"
            :class="{
                'pl-5': !$slots['default'],
                'bg-gray-4': !sameBackgroundColor && currSelected === friend.address,
            }"
            v-for="friend in set.friends"
            :key="friend.address"
        >
            <slot :address="friend.address"></slot>
            <FriendListItemVue
                :user-address="friend.address"
                @click="changeSelectHandler(friend.address)"
                class="flex-grow"
                :class="itemClass"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFriendStore } from '@/store/user-friend'
import { useUserBlackListStore } from '@/store/user-black-list'
import { AlphabetizedFriendList } from '@/types/user-friend'
import { useProfileStore } from '@/store/user-profile'
import { pinyin } from 'pinyin-pro'
import FriendListItemVue from './FriendListItem.vue'

defineProps<{
    selected?: boolean
    /** 选中的 item 背景颜色不变化 */
    sameBackgroundColor?: boolean
    itemClass?: unknown
}>()

const emit = defineEmits<{
    (e: 'select-friend', v: string): void
}>()

const { friends, friendsLength } = storeToRefs(useFriendStore())
const { blackList } = storeToRefs(useUserBlackListStore())
const { userProfiles } = storeToRefs(useProfileStore())

/** 将好友列表按首字母 A-Z 分组并排序 */
const alphabetized = computed(() => {
    if (!friends.value || !friendsLength.value) return []

    /** 每个好友的显示名称的首字母，例如「张三」对应的首字母为 ['z', 's'] */
    const initialsMap: { [friendAddress: string]: string[] } = {}

    // 分组
    const rawSets: AlphabetizedFriendList = []
    Object.values(friends.value).forEach((f) => {
        if (blackList.value.some((addr) => addr === f.address)) return
        const displayName =
            (f.address in userProfiles.value
                ? userProfiles.value[f.address]?.remark ||
                  userProfiles.value[f.address]?.staffInfo?.name ||
                  userProfiles.value[f.address]?.nickname
                : f.address) || f.address
        const initials = pinyin(displayName, {
            pattern: 'first',
            toneType: 'none',
            type: 'array',
        }).map((i) => i.toUpperCase())
        initialsMap[f.address] = initials
        const tag = /[A-Z]/.test(initials[0]) ? initials[0] : '#'

        const i = rawSets.findIndex((g) => g.tag === tag)
        if (i === -1) {
            rawSets.push({ tag, friends: [] })
            rawSets[rawSets.length - 1].friends.push(f)
        } else rawSets[i].friends.push(f)
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
        rawGroup.friends.sort((a, b) => {
            const initialsA = initialsMap[a.address]
            const initialsB = initialsMap[b.address]
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

const currSelected = ref<string | null>(null)
function changeSelectHandler(e: string) {
    currSelected.value = e
    emit('select-friend', e)
}
</script>
