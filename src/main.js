import { createApp } from 'vue'
import { createPinia } from 'pinia'

import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import 'animate.css'

// 引入虚拟滚动组件
import "vue-virtual-scroller/dist/vue-virtual-scroller.css" 
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller"

const app = createApp(App)

// 注册动态虚拟滚动组件
app.component('DynamicScroller', DynamicScroller)
app.component('DynamicScrollerItem', DynamicScrollerItem)
app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
