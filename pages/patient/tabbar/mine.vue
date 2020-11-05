<template>
	<div>
		mine {{activePatient}}
		<button type="primary" @click="nextPage">下一页</button>
		<h3 @click="enterListContact">问诊人</h3>
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
					url:'/pages/patient/patientmanager/listContact'
				})
			}
		}
	}
</script>

<style>

</style>
