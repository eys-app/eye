<template>

	<view class="login-back">
		<!-- #ifdef APP-PLUS || H5 -->
		<service-and-yin-com></service-and-yin-com>
		<!-- #endif -->
		
		
		
		<view class="system-title">
			<view class="weclome">欢迎使用</view>
			<view class="system-title-text">智慧干眼系统</view>
		</view>
		
		<view class="login-content">

			<view class="login-title">登录</view>

			<view class="input-view">
				<view class="input-view-item">
					<image src="../../static/images/phone.svg"></image>
					<input class="uni-input input-cus" type="number" placeholder="请输入手机号码" v-model="phoneNum" />
				</view>

				<view class="input-view-item">
					<image src="../../static/images/pwd.svg"></image>
					<input class="uni-input input-cus" type="text" placeholder="请输入密码" password v-model="password" />
				</view>

				<button type="default" class="login-button" @click="loginClicked">登录</button>

				<view class="resite-password" @click="rePasswordClicked">忘记密码?</view>

				<view class="resite-password register" @click="navigateToRegisterPage">注册账户</view>


			</view>



		</view>

	</view>



</template>

<script>
	import ServiceAndYinCom from '../../components/serviceAndYinsi/index.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		login_interface
	} from '../../api/index.js'
	export default {
		data() {
			return {
				phoneNum: '',
				password: ''
			}
		},
		components:{
			ServiceAndYinCom
		},
		methods: {

			...mapMutations(["loginFunction"]),
			//登录接口
			loginClicked() {

				if (!this.checkValue(this.phoneNum)) {
					uni.showToast({
						icon: 'none',
						title: "请输入手机号码"
					})
					return;
				}
				if (!this.checkValue(this.password)) {
					uni.showToast({
						icon: 'none',
						title: "请输入密码"
					})
					return;
				}
				if (!this.isPhoneNumber(this.phoneNum)) {
					uni.showToast({
						icon: 'none',
						title: "请输入正确的手机号码"
					})
					return;
				}

				login_interface({
					loginName: this.phoneNum,
					password: this.password
				}).then(res => {
					if (res.status == 'SUCCESS') {
						this.loginFunction(res.data);
						// 0 - 患者端，  1 -- 医生端
						if (res.data.userType == 0) {
							uni.switchTab({
								url: '/pages/patient/tabbar/home'
							})
						}
						if (res.data.userType == 1) {
							uni.reLaunch({
								url: '/pages/doctor/patientsListCard'
							})
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
						})
					}
				})
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
			navigateToRegisterPage() {
				uni.navigateTo({
					url: "/pages/usernumber/register"
				})
			},
			rePasswordClicked() {
				uni.navigateTo({
					url: "/pages/usernumber/repassword"
				})
			},


			//检查输入是否为空
			checkValue(text) {
				if (text == null || text == undefined || text.length == 0 || text == '') {
					return false;
				} else {
					return true;
				}
			},


			// 手机号校验
			isPhoneNumber(phoneNum) {
				// let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				/*
				  * 移动号码包括的号段：134/135/136/137,138,139；
				*                     147/148(物联卡号)；
				*                     150/151/152/157/158/159；
				*                     165（虚拟运营商）；
				*                     1703/1705/1706（虚拟运营商）、178；
				*                     182/183/184/187/188
				*                     198
						
				* 联通号段包括：130/131
				*               145
				*               155/156
				*               166/167(虚拟运营商)
				*               1704/1707/1708/1709、171
				*               186/186
				*
				* 电信号段包括： 133
				*                153
				*                162(虚拟运营商)
				*                1700/1701/1702(虚拟运营商)
				*                180/181/189
				*                191/199
				* */
				let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
				return reg.test(phoneNum);
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
		flex-direction: column;
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

			.resite-password {
				margin-bottom: 30px;
				color: #007AFF;
				font-size: 12px;
				margin-top: 20px;
				border-bottom: 1px solid #007AFF;
				width: 56px;
				float: left;
			}

			.register {
				float: right;
				width: 48px;
			}
		}
	}
</style>
