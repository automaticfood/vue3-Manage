import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/router/permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const dayjs = require('dayjs')

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$dayformate = (val) =>
  dayjs(val * 1000).format('YYYY-MM-DD')

app.use(store).use(router).mount('#app')
