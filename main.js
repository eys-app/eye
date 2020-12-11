import Vue from 'vue'
import App from './App'

import store from "store/index.js"
import api from "api/index.js"
import common from "commen/common.js"
import RequestTest from './js_sdk/pocky-request/pocky-request v.2.0.4/index.js'



console.log('main')

Vue.prototype.api = api;

Vue.config.productionTip = false

Vue.prototype.axios = RequestTest()


App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
