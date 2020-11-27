<template>

	<view class="login-back">
		<view class="login-content">

			<view class="login-title">登录</view>

			<view class="input-view">
				<view class="input-view-item">
					<image src="../../static/images/phone.svg"></image>
					<input class="uni-input input-cus" type="number" placeholder="请输入手机号码" />
				</view>

				<view class="input-view-item">
					<image src="../../static/images/pwd.svg"></image>
					<input class="uni-input input-cus" type="text" placeholder="请输入密码" password />
				</view>

				<button type="default" class="login-button" @click="loginClicked">登录</button>
				
				<view class="resite-password">忘记密码?</view>
				
				<view class="resite-password register" @click="navigateToRegisterPage">注册账户</view>


			</view>



		</view>

	</view>



</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {}
		},
		methods: {
			
			...mapMutations(["loginFunction"]),
			
			loginClicked(){
				
				this.loginFunction({
					username: 'zhangsan'
				})
				
				this.enterPriPage()
			},
			
			enterDocPage() {
				uni.navigateTo({
					url: "/pages/doctor/apply"
				})
			},
			enterPriPage() {
				console.log('进入患者页面')
				uni.switchTab({
					url: "/pages/patient/tabbar/home"
				})
			},
			navigateToRegisterPage(){
				uni.navigateTo({
					url: "/pages/usernumber/register"
				})
			}
		}
	}
</script>

<style lang="scss">
	
	
	
	
	.login-back {
		background-color: $backColor;
		position: fixed;
		width: 100vw;
		height: 100vh;

		display: flex;
		justify-content: center;
		align-items: center;

		.login-content {
			width: 90%;
			background-color: white;
			border-radius: 5px;


			.login-title {
				font-size: 16px;
				color: black;
				font-weight: 700;
				margin-left: 30px;
				padding-top: 30px;
			}

			.input-view {
				width: calc(100% - 60px);
				margin-left: 30px;
				margin-top: 30px;

				.input-view-item {
					border-bottom: 1px solid #e1d9d8;
					height: 30px;
					margin-top: 30px;

					image {
						width: 20px;
						height: 20px;
						float: left;
					}

					.input-cus {
						padding-left: 10px;
					}
				}


			}

			.login-button {
				margin-top: 30px;
				height: 40px;
				background-color: #007AFF;
				line-height: 40px;
				color: #FFFFFF;
				border-radius: 20px;
				
				
			}
			
			.resite-password{
				margin-bottom: 30px;
				color: #007AFF;
				font-size: 12px;
				margin-top: 20px;
				border-bottom: 1px solid #007AFF;
				width: 56px;
				float: left;
			}
			.register{
				float: right;
				width: 48px;
			}
		}
	}
</style>
