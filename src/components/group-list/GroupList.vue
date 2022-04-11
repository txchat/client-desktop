<template>
    <div v-for="(host, hostId) in hosts" :key="(hostId as string)">
        <group-list-item-vue
            :host="host"
            :host-id="(hostId as string)"
            :selected="selected.hostId === hostId ? selected.groupId : undefined"
            @select-group="selectGroupHandler"
            :same-background-color="sameBackgroundColor"
            :item-class="itemClass"
        >
            <template v-if="$slots['default']" v-slot:default="{ groupId }">
                <slot :hostId="hostId" :groupId="groupId"></slot>
            </template>
        </group-list-item-vue>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatGroupStore } from '@/store/user-chat-group'
import GroupListItemVue from './GroupListItem.vue'
import { ChatGroup } from '@/types/user-chat-group'

defineProps<{
    selected: { hostId?: string; groupId?: string }
    /** 选中的 item 背景颜色不变化 */
    sameBackgroundColor?: boolean
    itemClass?: { [className: string]: boolean }
}>()

const emit = defineEmits<{
    (e: 'select-group', hostId: string, group: ChatGroup): void
}>()

const chatGroupStore = useChatGroupStore()
const { hosts } = storeToRefs(chatGroupStore)

function selectGroupHandler(hostId: string, group: ChatGroup) {
    emit('select-group', hostId, group)
}
</script>
