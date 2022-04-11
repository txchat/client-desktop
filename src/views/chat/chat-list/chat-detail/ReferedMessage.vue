<template>
    <div @click="openFullText" class="py-1.5 px-2.5 rounded-md text-sm bg-gray-4 text-subtle cursor-default">
        <p
            v-if="!message || message.isRecalled || [MsgType.Text, MsgType.File].includes(message.type)"
            :class="{
                'line-clamp-2': message && !message.isRecalled && message?.type === MsgType.Text,
            }"
            class="break-all"
            style="max-width: 396px"
        >
            <span v-if="!message">此消息已删除</span>
            <span v-else-if="message.isRecalled">此消息已撤回</span>
            <span v-else>{{ displayName }}: {{ displayContent }}</span>
        </p>
        <p v-else-if="[MsgType.Image, MsgType.Video].includes(message.type)" class="flex">
            <span class="pr-2">{{ displayName + ': ' }}</span>
            <MessageVideoVue
                v-if="message?.type === MsgType.Video"
                ref="mediaMessageRef"
                @click-image="mediaMessageClickHandler"
                from-myself
                :content="message.content"
                :state="message.state"
                :uuid="message.uuid"
                play-button-size="20px"
                style="max-width: 70px"
            />
            <MessageImageVue
                v-else
                ref="mediaMessageRef"
                @click-image="mediaMessageClickHandler"
                :content="message.content"
                style="max-height: 70px"
                width="40px"
            />
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from 'quasar'
import { GroupId, Message, MsgType, RecalledMessage } from '@/types/user-chat'
import { truncate } from '@/utils/string-truncate'
import { dtalk } from '@/utils/message-codec/protobuf'
import { useUserGroupNickname } from '@/composables/user/useUserGroupNickname'
import { useUserProfile } from '@/composables/user/useUserProfile'
import { useClickMediaMessageAndOpenGallery } from './useClickMediaMessageAndOpenGallery'

import MessageVideoVue from './message-types/MessageVideo.vue'
import MessageImageVue from './message-types/MessageImage.vue'

const props = defineProps<{
    message?: Message | RecalledMessage
}>()

const displayName = computed(() => {
    if (!props.message) return
    if (props.message.isRecalled) return

    const { groupNickname } = useUserGroupNickname(props.message.from, props.message.fromChat.id as GroupId)
    if (groupNickname.value) return groupNickname.value

    const { userProfile } = useUserProfile(props.message.from)
    if (userProfile.value?.nickname) return userProfile.value.nickname

    return truncate(props.message.from)
})

const displayContent = computed(() => {
    if (props.message?.isRecalled) return
    if (props.message?.type === MsgType.Text) {
        return (props.message?.content as dtalk.proto.ITextMsg).content
    } else if (props.message?.type === MsgType.File) {
        return (
            '<i class="iconfont text-xs" style="padding-right: 4px">&#xe62d;</i>' +
            (props.message?.content as dtalk.proto.IFileMsg).name
        )
    }

    return ''
})

function openFullText() {
    !props.message?.isRecalled &&
        props.message?.type === MsgType.Text &&
        Dialog.create({
            title: displayName.value + '的消息',
            message: (props.message?.content as dtalk.proto.ITextMsg).content || '',
            ok: false,
        })
}

const { mediaMessageClickHandler } = useClickMediaMessageAndOpenGallery()
</script>
