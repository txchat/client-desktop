import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import '@/styles/index.scss'
import quasarConfig from './plugins/quasar'
import { createPinia } from 'pinia'

const app = createApp(App)

/**
 * 批量导入全局组件
 * @see https://v3.cn.vuejs.org/cookbook/automatic-global-registration-of-base-components.html
 */
const requireComponent = require.context('./components/base', true, /Base[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach((fileName) => {
    const componentName = fileName
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '')

    const componentConfig = requireComponent(fileName)
    // 获取组件配置
    componentName && app.component(componentName, componentConfig.default || componentConfig)
})

app.use(Quasar, quasarConfig).use(createPinia()).mount('#app')
