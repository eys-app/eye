import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		activePatient: null, //当前问诊人信息
		loginData: null, //当前登录用户
	},
	mutations: {
		//改变问诊人
		changePatient(state, provider) {
			if(provider == ""){
				state.activePatient = null;
			}
			state.activePatient = provider
			uni.setStorage({
				key: "activePatient",
				data: provider
			})
			uni.$emit('updatePatient')
			
			
		},
		// ---- 
		/**
		 * 退出登录
		 * 1、清除登录用户信息 
		 * 2、清除当前问诊人信息
		 * **/
		logoutFunction(state) {
			state.loginData = null;
			state.activePatient = null;
			uni.removeStorage('loginData');
			uni.removeStorage('activePatient');
		},

		loginFunction(state, provider) {
			if(provider == ""){
				state.loginData = null;
			}
			state.loginData = provider;
			uni.setStorage({
				key: 'loginData',
				data: provider
			})
		},
		
		
		
		
	},
})

export default store
