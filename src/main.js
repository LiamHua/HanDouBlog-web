import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/guard'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/common.css'
import '@/assets/font/iconfont'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Login from '@/components/login/index'


import { formatDate } from '@/utils/formatDate'

Vue.config.productionTip = false
Vue.component('login', Login)

Vue.use(ElementUI)
Vue.use(mavonEditor)

// 全局时间戳转换过滤器
Vue.filter('formatDate', formatDate)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
