import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		activePatient: '',//当前问诊人信息
		loginData: {},//当前登录用户
	},
	mutations:{
		//改变问诊人
		 changePatient(state, provider){
			console.log('state=',state)
			console.log('provider', provider)
			
			state.activePatient = provider
		},
		// ---- 
		/**
		 * 退出登录
		 * 1、清除登录用户信息 
		 * 2、清除当前问诊人信息
		 * **/
		logoutFunction(state){
			state.loginData = null
		}
	},
})

export default store