import { createApp } from 'vue'
import './assets/css/style.css'
import '@/assets/fonticons/iconfont.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from "@/vendor/router"
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 2000 })
app.use(router)
app.use(createPinia())
app.mount('#app')
// 注册element plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}