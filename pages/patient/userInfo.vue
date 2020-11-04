<template>
	<view>
		问诊者详情页面{{contactUser.name}}
	</view>
</template>

<script>
	export default {
		onLoad:function(option){
			console.log(option)
			this.contactUser=option.user
			
		},
		
		data() {
			return {
				contactUser:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
