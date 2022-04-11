<template>
    <div class="server-item w-full h-18 bg-gray-1 flex justify-between items-center px-3 rounded-sm">
        <div class="flex">
            <base-checkbox
                v-if="!noCheckbox"
                :model-value="!!selected"
                @update:model-value="() => emit('update-value', url)"
            >
            </base-checkbox>
            <div
                @click="!noCheckbox && emit('update-value', url)"
                :class="{ 'cursor-pointer': !noCheckbox }"
                class="ml-1"
            >
                <div class="text-dark">
                    {{ name }}
                    <div
                        :class="online ? 'bg-positive' : 'bg-negative'"
                        class="ml-1.5 inline-block rounded-md"
                        style="height: 10px; width: 10px"
                    ></div>
                </div>
                <div class="text-subtle text-sm break-all">{{ url }}</div>
            </div>
        </div>
        <base-btn
            v-if="!noSettingBtn"
            @click="emit('click-edit')"
            color="subtle"
            icon="more_vert"
            size="sm"
            flat
            round
        />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    /** 网络服务器名称 */
    name: string

    /** 网络服务器地址 */
    url: string

    /** 是否被选中 */
    selected?: boolean

    /** 是否显示选择框，如果不显示，则 selected 不起作用 */
    noCheckbox?: boolean

    /** 是否显示设置按钮 */
    noSettingBtn?: boolean

    /** 网络服务器是否在线 */
    online?: boolean
}>()

const emit = defineEmits<{
    (e: 'update-value', value: string): void
    (e: 'click-edit'): void
}>()
</script>

<style lang="scss">
.server-item {
    .q-checkbox__bg {
        border-radius: 16px;
    }
}
</style>
