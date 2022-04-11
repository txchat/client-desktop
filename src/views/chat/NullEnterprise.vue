<template>
    <div class="w-full h-full p-11">
        <p class="text-base font-bold">
            加入或创建团队 <base-btn @click="logout" flat class="float-right">退出登录</base-btn>
        </p>
        <div class="flex justify-center mt-12">
            <q-img :src="require('images/enterprise-null.png')" width="427px"></q-img>
        </div>

        <div class="flex justify-center mt-14">
            <div @click="openJoinDialog" class="shadow w-72 mr-4 px-4 py-5 cursor-pointer flex items-center">
                <div>
                    <h2 class="font-semibold"><span style="color: #f7b500">加入</span>团队</h2>
                    <div class="flex mt-8 mb-7">
                        <p class="text-sm">
                            你的团队已经在使用谈信，可通过扫描团队二维码进入团队，与成员一起沟通协作，高效作业。
                        </p>
                    </div>
                </div>

                <q-icon name="more_vert" color="subtle" size="22px"></q-icon>
            </div>
            <div @click="openCreateDialog" class="shadow w-72 mr-4 px-4 py-5 cursor-pointer flex items-center">
                <div>
                    <h2 class="font-semibold"><span style="color: #eb8282">创建</span>团队</h2>
                    <div class="flex mt-8 mb-7">
                        <p class="text-sm">
                            通过创建团队，你将直接成为团队或企业负责人，可添加成员，让整个团队一起享受高效的沟通协作吧。
                        </p>
                    </div>
                </div>

                <q-icon name="more_vert" color="subtle" size="22px"></q-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccount } from '@/composables/user/useAccount'
import { Dialog } from 'quasar'

import CreateDialogVue from './enterprise/CreateDialog.vue'
import JoinDialogVue from './enterprise/JoinDialog.vue'

const { logout } = useAccount()

function openCreateDialog() {
    Dialog.create({ component: CreateDialogVue })
}

function openJoinDialog() {
    Dialog.create({ component: JoinDialogVue })
}
</script>
<style lang="scss" scoped>
.shadow {
    box-shadow: 0px 0px 20px rgba(206, 206, 206, 0.35);
}
</style>
