// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from '@/assets/js/http'

// 引入公共样式
import './assets/css/style.css'

Vue.use(ElementUI)

Vue.use(httpPlugin)
// Vue.config.productionTip = false

Vue.prototype.foo = 'bar'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
