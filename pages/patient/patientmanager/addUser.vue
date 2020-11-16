<template>
	<view>
		<user_sty :msg='activeUser'></user_sty>
		
		<!-- <uni-card isShadow="true">
			<view>姓名<input class="uni-input" focus placeholder="请输入真实姓名"></view>
			<view>身份证<input type="idcard" class="uni-input" placeholder="提交后不可修改,请慎重填写"></view>
			<view>性别<input class="uni-input" placeholder="请选择"></view>
			<view>年龄<input type="number" class="uni-input" placeholder="请输入年龄"></view>
		</uni-card>
		
		<uni-card isShadow="true">
			<view>手机号<input type="number" class="uni-input" placeholder="请输入正确的手机号"></view>
			<view>社保卡<input class="uni-input" placeholder="(可选)请输入您的社保卡号"></view>
		</uni-card>
		
		<uni-card isShadow="true">
			<view>与患者关系<input class="uni-input" placeholder="请输入您与患者的关系"></view>
			<view>门诊号<input class="uni-input" placeholder="(可选)请输入您的门诊号"></view>
		</uni-card> -->
		
		<button class="submit" type="primary" @click="addOK">确认提交</button>
	</view>
</template>

<script>
	import userSty from './components/userSty.vue'
	export default {
		data() {
			return {
					activeUser:{
							id:'',
							name:'',
							sex:'',
							phone:''
				}
			}
		},components:{
		user_sty:userSty	
		},
		methods: {
			addOK(){
				uni.navigateBack({
					url:"/pages/listContact/listContact"
				})
			}
		}
	}
</script>

<style>

.submit{
	margin:10px 20px ;
}
</style>
