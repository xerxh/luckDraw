import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery' //引入jquery

import luckDraw from './component/luckDraw'
Vue.component('m-luckDraw', luckDraw)

Vue.prototype.$http = axios

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})