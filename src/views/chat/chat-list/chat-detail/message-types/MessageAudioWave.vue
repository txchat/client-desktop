<template>
    <div class="box transform translate-x-2">
        <div
            class="wifi-symbol"
            :style="{
                transform: fromMyself ? 'rotate(315deg)' : 'rotate(135deg)',
            }"
        >
            <div class="wifi-circle first"></div>
            <div :style="animationStyle" class="wifi-circle second"></div>
            <div :style="animationStyle" class="wifi-circle third"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'

const props = defineProps<{ fromMyself: boolean; isPlaying: boolean }>()
const animationStyle = computed(
    () => ({ 'animation-iteration-count': props.isPlaying ? 'infinite' : '0' } as CSSProperties)
)
</script>

<style scoped>
.box {
    box-sizing: border-box;
    position: relative;
}

.wifi-symbol {
    width: 25px;
    height: 25px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    /* https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b */
    -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.wifi-circle {
    border: 2.5px solid #999999;
    border-radius: 50%;
    position: absolute;
}

.first {
    width: 2.5px;
    height: 2.5px;
    background: #cccccc;
    top: 22.5px;
    left: 22.5px;
}

.second {
    width: 12.5px;
    height: 12.5px;
    top: 17.5px;
    left: 17.5px;
    animation-name: fadeInOut;
    animation-duration: 1s;
    animation-delay: 0.2s;
}

.third {
    width: 20px;
    height: 20px;
    top: 12.5px;
    left: 12.5px;
    animation-name: fadeInOut;
    animation-duration: 1s;
    animation-delay: 0.4s;
}

@keyframes fadeInOut {
    0% {
        opacity: 0; /*初始状态 透明度为0*/
    }
    100% {
        opacity: 1; /*结尾状态 透明度为1*/
    }
}
</style>
