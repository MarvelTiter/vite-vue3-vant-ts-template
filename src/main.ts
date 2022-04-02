import { createApp } from 'vue'
import App from './App.vue'
import store, { key } from '@/store'
import i18n from '@/lang'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from '@/router'
import { configureRouterGuard } from './permission'
import '@/assets/global.css'
import '@/assets/index.scss'

configureRouterGuard(router)

const app = createApp(App)
app.use(store, key)
app.use(i18n)
app.use(router)
app.component('svg-icon', SvgIcon)
app.mount('#app')


export interface AppConfig {
    baseUrl: string
}
declare global {
    interface Window {
        CONFIG: AppConfig
    }
}
export { }
