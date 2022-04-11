<template>
    <div class="app-container w-full h-full flex items-center">
        <main class="main-container relative mx-auto overflow-hidden">
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">
import { isEnv } from '@/utils/env'

const appContainerMargin = isEnv.electron ? 0 : 20
const appContainerMinWidth = 960 + appContainerMargin + 'px'
const appContainerMinHeight = 760 + appContainerMargin + 'px'
</script>

<style scoped lang="scss">
.app-container {
    background-image: linear-gradient(315deg, #d6eef2 0%, #bed9f6 100%);
    min-width: v-bind(appContainerMinWidth);
    min-height: v-bind(appContainerMinHeight);

    .main-container {
        width: 960px;
        height: 760px;
        background-color: #fff;
    }
}
</style>
