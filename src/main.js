// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入一个全局组件
import footer from './components/footer'
import head from './components/head'
import nav from './components/nav'
import axios from 'axios'
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

import Vuex from 'vuex'
import store from './vuex'

Vue.use(Vuex)
Vue.prototype.$http = axios

Vue.config.productionTip = false
// app-xxx的为注册的全局组件
Vue.component('app-footer',footer);
Vue.component('app-head',head);
Vue.component('app-nav',nav);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
