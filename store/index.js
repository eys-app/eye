import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		activePatient: ''
	},
	mutations:{
		 changePatient(state, provider){
			console.log('state=',state)
			console.log('provider', provider)
			
			state.activePatient = provider
		}
	},
})

export default store