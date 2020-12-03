<template>
	<view>
		<uni-card isShadow="true">
			<view>{{msg.data}}</view>
			<view>
				<view class="u_title">姓名</view><input class="uni-input" focus placeholder="请输入真实姓名">
			</view>
			<view>
				<view class="u_title">身份证</view><input type="idcard" class="uni-input" placeholder="提交后不可修改,请慎重填写">
			</view>
			<view>
				<view class="u_title">性别</view><input class="uni-input" placeholder="请选择">
			</view>
			<view>
				<view class="u_title">年龄</view><input type="number" class="uni-input" placeholder="请输入年龄">
			</view>
		</uni-card>

		<uni-card isShadow="true">
			<view>
				<view class="u_title">手机号</view><input type="number" class="uni-input" placeholder="请输入正确的手机号">
			</view>
			<view>
				<view class="u_title">社保卡</view><input class="uni-input" placeholder="(可选)请输入您的社保卡号">
			</view>
		</uni-card>

		<uni-card isShadow="true">
			<view>
				<view class="u_title">与患者关系</view><input class="uni-input" placeholder="请输入您与患者的关系">
			</view>
			<view>
				<view class="u_title">门诊号</view><input class="uni-input" placeholder="(可选)请输入您的门诊号">
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		props:['msg'],
		data() {
			return {
				user:{
						id:'',
						name:'',
						sex:'',
						phone:''
				}
				
			}
		},methods:{
			
		}
	}
</script>

<style>
	.u_title {
		font-size: 30rpx;
		color: #808080;
	}

	.uni-input {
		background-color: #FFFFFF;
		font-size: 34rpx;
		height: 80rpx;
		min-height: 80rpx;
		border: 0;
		border-bottom: 1 solid;
		border: #007AFF;

	}
</style>
