<template>
    <div>
        <q-scroll-area class="px-15 w-full h-full">
            <q-avatar size="260px" rounded class="mt-10 mb-2">
                <q-img
                    :src="focusedGroup?.group.avatar || require('theme/icons/default-avatar-group.svg')"
                    class="rounded"
                    no-spinner
                    no-transition
                />
            </q-avatar>

            <h1 class="mt-5 mb-3 font-bold">
                {{ focusedGroup?.group.name }}
            </h1>

            <p class="text-subtle">群号 {{ focusedGroup?.group.markId }}</p>

            <div
                name="群所在的服务器"
                :no-checkbox="true"
                :online="true"
                class="my-2 w-1/2 h-18 bg-gray-1 px-3 rounded-sm flex flex-col justify-center"
            >
                <div>群所在的服务器</div>
                <div class="pt-1 text-sm leading-normal text-subtle">
                    {{ focusedGroup?.hostId }}
                    <span
                        :class="
                            connectionState === 'connected'
                                ? 'bg-positive'
                                : connectionState === 'not-exist'
                                ? 'bg-subtle'
                                : 'bg-negative'
                        "
                        class="ml-1.5 w-2.5 h-2.5 inline-block rounded-md"
                    ></span>
                </div>
            </div>

            <div class="mt-5">
                <base-btn @click="gotoChat" padding="10px 20px">进入群聊</base-btn>
            </div>
        </q-scroll-area>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from '@/router'
import { useChatStore } from '@/store/user-chat'
import { useChatGroupStore } from '@/store/user-chat-group'
import { useGroupProfile } from '@/composables/user/useGroupProfile'

const chatGroupStore = useChatGroupStore()
const { focusedGroup } = storeToRefs(chatGroupStore)

const { connectionState } = useGroupProfile({
    hostId: focusedGroup.value!.hostId,
    groupId: focusedGroup.value!.group.id,
})

function gotoChat() {
    if (!focusedGroup.value?.hostId) return
    const router = useRouter()
    router.route = 'chat'

    const chatStore = useChatStore()
    const chat = chatStore.moveTop('group', {
        hostId: focusedGroup.value!.hostId,
        groupId: focusedGroup.value!.group.id,
    })
    chatStore.focusChat(chat)
}
</script>
