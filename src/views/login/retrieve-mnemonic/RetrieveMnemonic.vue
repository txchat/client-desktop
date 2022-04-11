<template>
    <div class="bg-white z-1 absolute inset-0 flex">
        <!-- 左侧插图 -->
        <q-img :src="require('images/login-retrieve-illustration.svg')" width="440px" no-spinner no-transition />

        <div class="p-8 flex-grow flex flex-col items-start">
            <base-btn v-if="!require('themeConfig').entryPage" @click="$emit('dismiss')" flat>首页</base-btn>

            <div class="text-center w-full flex-grow flex flex-col items-center">
                <q-avatar class="mt-16" size="96px" square>
                    <q-img :src="require('theme/icons/logo.svg')" no-spinner></q-img>
                </q-avatar>

                <q-carousel
                    v-model="slide"
                    style="width: 350px"
                    class="mx-auto flex-grow"
                    animated
                    keep-alive
                    keep-alive-exclude="slide2"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                >
                    <!-- step 1: 输入手机号/邮箱和验证码 -->
                    <q-carousel-slide name="slide1">
                        <Step1Vue @success="gotoStep2(true, $event)" @not-exists="gotoStep2(false, $event)" />
                    </q-carousel-slide>

                    <!-- step 2，输入/设置密聊密码 -->
                    <q-carousel-slide name="slide2" class="column no-wrap flex-center">
                        <Step2Vue
                            :step1-result="step1Result!"
                            :step1-payload="step1Payload!"
                            @go-back="slide = 'slide1'"
                        />
                    </q-carousel-slide>
                </q-carousel>

                <div v-if="require('themeConfig').entryPage === 'mobile'" class="flex justify-center items-center">
                    <base-checkbox v-model="licenseAgreed" square size="sm"> 我已阅读并同意 </base-checkbox>
                    <a href="/license" target="_blank" class="text-primary">《谈信用户服务协议》</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Notify } from 'quasar'
import { SafetyInfo } from '@/types/user-safety'

import Step1Vue from './RetrieveMnemonicStep1.vue'
import Step2Vue from './RetrieveMnemonicStep2.vue'

defineEmits<{
    (e: 'dismiss'): void
}>()

const licenseAgreed = ref(true)
const slide = ref('slide1')

const step1Result = ref<null | boolean>(null)
const step1Payload = ref<null | SafetyInfo | { phoneNumber: string; captcha: string }>(null)

function gotoStep2(exists: boolean, payload: SafetyInfo | { phoneNumber: string; captcha: string }) {
    if (!licenseAgreed.value) {
        Notify.create('请先阅读并同意《谈信用户服务协议》')
        return
    }
    step1Result.value = exists
    step1Payload.value = payload
    slide.value = 'slide2'
}
</script>
