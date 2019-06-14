import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import 'normalize.css'
import '@/assets/css/global.scss'
// REM
import '@/assets/rem'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
