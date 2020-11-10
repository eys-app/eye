import Vue from 'vue'
import App from './App'

import store from "store/index.js"
import api from "api/index.js"

console.log('main')

Vue.prototype.api = api;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
