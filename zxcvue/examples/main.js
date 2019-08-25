import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ZxcVue from '../packages/index'
Vue.use(ZxcVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
