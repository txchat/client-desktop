import { Dialog } from 'quasar'
import { useUpdateStore } from '@/store/update'
import UpdateDialogVue from '@/components/UpdateDialog.vue'

/**
 * 检查更新
 * @param forceCheck 是否强制检查更新
 */
export async function useUpdate(): Promise<boolean> {
    const updateStore = useUpdateStore()
    const newVersion = await updateStore.check()

    const downloadUrl =
        process.env.NODE_ENV === 'development' ? 'https://test-chat33pro.xzd.me' : process.env.VUE_APP_BASE_URL

    if (newVersion) {
        if (newVersion.force) {
            Dialog.create({
                component: UpdateDialogVue,
                componentProps: {
                    version: updateStore.newVersion,
                    persistent: true,
                },
            }).onOk(() => {
                window.open(downloadUrl, 'download')
                window.electron?.quit()
            })
        } else {
            Dialog.create({
                component: UpdateDialogVue,
                componentProps: {
                    version: updateStore.newVersion,
                },
            }).onOk(() => {
                window.open(downloadUrl, 'download')
            })
        }
        return true
    } else return false
}
