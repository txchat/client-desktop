<template>
    <div v-if="visible" class="w-full mt-2.5 mb-2.5 bg-gray-1 py-1.5 px-5 rounded">
        <h3 class="text-primary font-bold py-2.5">成员信息</h3>
        <div class="infos flex justify-between flex-wrap">
            <div>
                <span class="text-subtle">姓名</span><span>{{ userProfile!.staffInfo!.name }}</span>
            </div>
            <div>
                <span class="text-subtle">手机号</span>
                <span :class="{ 'text-subtle': !userProfile!.staffInfo!.phone }">
                    {{ userProfile!.staffInfo!.phone
                            ? showEntirePhone 
                                ? userProfile!.staffInfo!.phone 
                                : truncate(userProfile!.staffInfo!.phone, 10, 3) 
                            : '不可见' }}
                    <q-icon
                        v-if="userProfile!.staffInfo!.phone && !showEntirePhone"
                        @click="showEntirePhone = true"
                        :name="'img:' + require('icons/eye.png')"
                        size="sm"
                        class="cursor-pointer"
                    ></q-icon>
                </span>
            </div>
            <div>
                <span class="text-subtle">团队</span><span>{{ userProfile!.staffInfo!.entName }}</span>
            </div>
            <div>
                <span class="text-subtle">短号</span>
                <span :class="{ 'text-subtle': !userProfile!.staffInfo!.shortPhone }">
                    {{ userProfile!.staffInfo!.shortPhone || '无' }}
                </span>
            </div>
            <div>
                <span class="text-subtle">部门</span>
                <span :class="{ 'text-subtle': !userProfile!.staffInfo!.depName }">
                    {{ userProfile!.staffInfo!.depName || '无' }}
                </span>
            </div>
            <div>
                <span class="text-subtle">职位</span>
                <span :class="{ 'text-subtle': !userProfile!.staffInfo!.position }">
                    {{ userProfile!.staffInfo!.position || '无' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { truncate } from '@/utils/string-truncate'
import { useProfileStore } from '@/store/user-profile'
import { useUserProfile } from '@/composables/user/useUserProfile'

interface Props {
    targetAddress: string
    cols?: 1 | 2
}

const props = withDefaults(defineProps<Props>(), {
    cols: 2,
})

const { userProfile } = useUserProfile(props.targetAddress)
const showEntirePhone = ref(false)

const visible = computed(() => {
    // 我或 TA 没有加入企业, 无法查看任何人的企业信息
    if (!useProfileStore().myProfile?.staffInfo || !userProfile.value?.staffInfo) return false

    // 该员工的员工信息的查看权限
    if (!userProfile.value.staffInfo.name) return false
    return true
})

const infoWidth = props.cols === 1 ? '100%' : '229px'
</script>

<style lang="scss" scoped>
.infos > div {
    @apply mb-2.5 flex justify-between;
    width: v-bind(infoWidth);
}
</style>
