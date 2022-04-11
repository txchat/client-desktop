<template>
    <div class="cursor-pointer">
        <span v-if="!remark" class="text-sm text-gray-500">添加备注名</span>
        <span v-else class="break-all">{{ remark }}</span>

        <q-popup-edit :model-value="remark" @save="changeRemark" :validate="remarkValidation" buttons v-slot="scope">
            <h4 class="py-4 font-medium">修改备注</h4>
            <q-input
                v-model="scope.value"
                outlined
                autofocus
                dense
                @keyup.enter="scope.set"
                :error="errorRemark"
                :error-message="errorMessageRemark"
            />
        </q-popup-edit>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAccountStore } from '@/store/user-account'
import { useProfileStore } from '@/store/user-profile'

const props = defineProps<{
    address: string
}>()

const quasar = useQuasar()
const { accountDB } = useAccountStore()
const { userProfiles } = useProfileStore()

const remark = computed(() => {
    return userProfiles[props.address]?.remark || ''
})

function changeRemark(value: string) {
    const targetProfile = userProfiles[props.address]
    if (targetProfile) targetProfile.remark = value
    accountDB?.remarks.setItem(props.address, value).then(() => quasar.notify('修改备注成功'))
}

const errorRemark = ref(false)
const errorMessageRemark = ref('')
function remarkValidation(val: string) {
    // 不能为纯空格
    if (/^\s+$/.test(val)) {
        errorRemark.value = true
        errorMessageRemark.value = '无效的备注名'
        return false
    }

    if (val.length > 20) {
        errorRemark.value = true
        errorMessageRemark.value = '备注须少于 20 个字符'
        return false
    }
    errorRemark.value = false
    errorMessageRemark.value = ''
    return true
}
</script>
