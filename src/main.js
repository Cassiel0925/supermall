import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import toast from 'components/common/toast'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
    // 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 使用懒加载的插件
Vue.use(VueLazyLoad)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')