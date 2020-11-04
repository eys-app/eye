<template>
	<div>
		mine {{activePatient}}
		<button type="primary" @click="nextPage">下一页</button>
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
			}
		}
	}
</script>

<style>

</style>
