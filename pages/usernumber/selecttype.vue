<template>
	<view class="page-view">

		<view>您的账户已注册成功，请选择您身份</view>
		<view style="padding: 30px;">
			<button type="primary" @click="selectedType('doc')">我是医生</button>
			<button type="primary" @click="selectedType('pat')">我是患者</button>
		</view>

	</view>
</template>

<script>
	export default{
		methods:{
			selectedType(type){
				if(type == 'doc'){
					uni.navigateTo({
						url: '/pages/usernumber/apply/applydoctor'
					})
				}
				if(type == 'pat'){
					uni.navigateTo({
						url: '/pages/usernumber/apply/applypatient'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page-view {
		padding: 10px;
		
		
		button{
			margin-top: 60px;
		}
	}
</style>
