import { ref, Ref } from 'vue'
import { useModulesStore } from '@/urls/modules'

interface UsableModules {
    /** 获取后端启用的功能模块 */
    getModules: () => Promise<void>
    loading: Ref<boolean>
    error: Ref<null | string | Error>
}

export function useModules(): UsableModules {
    const modulesStore = useModulesStore()

    const loading = ref(false)
    const error = ref<null | string | Error>(null)

    async function getModules() {
        loading.value = true
        error.value = null

        try {
            await modulesStore.get()
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    return {
        getModules,
        loading,
        error,
    }
}
