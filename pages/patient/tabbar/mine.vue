<template>
	<div>
		mine {{activePatient}}
		<h3 @click="enterListContact">问诊人</h3>
		<button type="primary" @click="nextPage">下一页</button>
		
		<button type="primary" @click="logoutClicked">退出登录</button>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		computed:{
			...mapState(["activePatient"])
		},
		methods:{
			nextPage(){
				uni.navigateTo({
					url:"/pages/aidiagnosis/diagnosis"
				})
			},
			enterListContact(){
				uni.navigateTo({
					// url:'/pages/patient/patientmanager/listContact'
					url:'/pages/doctor/patientsCard'
				})
			},
			logoutClicked(){
				console.log('logout')
				uni.redirectTo({
					url: "../../login/login"
				})
			}
		}
	}
</script>

<style>

</style>
