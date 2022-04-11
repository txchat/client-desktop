<template>
    <div class="bg-white py-12 z-1 px-28 absolute inset-0 flex flex-col text-left">
        <!-- nav bar -->
        <q-avatar class="mb-3 transform -translate-x-1/3">
            <base-btn color="dark" icon="arrow_back_ios_new" @click="$emit('dismiss')" size="12px" round flat />
        </q-avatar>
        <h3 class="text-2xl font-bold">{{ props.title }}</h3>

        <!-- main area -->
        <div class="main-area mt-4">
            <slot></slot>
        </div>

        <q-space />

        <!-- footer -->
        <div class="font-bold text-primary text-xs">
            <q-icon :name="'img:' + require('theme/icons/logo.svg')" size="md" />
        </div>

        <!-- background image -->
        <q-img
            :src="require('@/assets/images/login-mnemonic-create-bg.svg')"
            width="550px"
            class="absolute right-0 bottom-0 -z-1"
            no-spinner
            no-transition
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true },
})

defineEmits(['dismiss'])
</script>

<style scoped lang="scss">
.main-area {
    width: 600px;
}
</style>
