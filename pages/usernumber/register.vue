<template>
	<view class="register-view">
		
		<view class="system-title">
			<view class="weclome">欢迎使用</view>
			<view class="system-title-text">智慧干眼系统</view>
		</view>
		
		<view class="register-content">
			<view class="label-title">注册</view>
			<view class="input-view">
				<view class="input-view-item">
					<image src="../../static/images/phone.svg"></image>
					<input placeholder="请输入手机号码" v-model="phoneNumber" type="number" />
				</view>
				<view class="input-view-item" style="width: calc(100% - 110px);float: left;">
					<image src="../../static/images/code.svg"></image>
					<input placeholder="请输入验证码" style="width: calc(100% - 30px);" v-model="codeText" type="number" />
				</view>
				<button type="default" class="code-button" @click="codeButtonClicked" :disabled="codeStatus">{{codeTitle}}</button>

				<view style="clear: both;"></view>

				<view class="input-view-item">
					<image src="../../static/images/pwd.svg"></image>
					<input placeholder="请输入密码" password v-model="passwordText" />
				</view>
				<view class="input-view-item">
					<image src="../../static/images/pwd.svg"></image>
					<input placeholder="请再次输入密码" password v-model="passwordTextRepeat" />
				</view>
			</view>
			<view style="clear: both;"></view>
			<button type="default" class="register-submit" @click="registerSubmitClicked">注册</button>

			<view class="user-information">
				注册即代表您已阅读并同意<label class="user-text">《服务协议》</label>和<label class="user-text">《隐私政策》</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		codeGenerate_interface,
		logon_interface,
		login_interface
	} from '../../api/index.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				codeTitle: '获取验证码', //获取验证码button上的文字
				codeStatus: false, //验证码button是否禁止点击
				phoneNumber: null, //手机号码
				codeText: null, //验证码
				passwordText: null, //密码
				passwordTextRepeat: null, //验证码重复
			}
		},

		methods: {
			
			...mapMutations(['loginFunction']),

			/**
			 * 获取验证码
			 * 1、判断手机号码是否输入正确--格式
			 * 2、判断手机号码是否注册过
			 * 3、多少秒后可重新获取**/

			codeButtonClicked() {

				if (!this.codeStatus) {

					if (this.phoneNumber == null || this.phoneNumber == '' || this.phoneNumber.length == 0) {
						uni.showToast({
							title: "请输入手机号码",
							icon: "none"
						})
						return;
					}

					let bolPhone = this.isPhoneNumber(this.phoneNumber);
					if (bolPhone) {

						codeGenerate_interface({
							mobileNumber: this.phoneNumber
						}).then(res => {
							console.log('获取验证码====', res)
							if (res == 'SUCCESS') {
								uni.showToast({
									title: "一条包含验证码的短信已发送到您的手机，请注意查收！",
									icon: "none"
								})

								this.codeStatus = true
								const that = this
								let timeNumber = 12
								let interval = setInterval(() => {
									if (timeNumber == 0) {
										clearInterval(interval)
										that.codeStatus = false;
										that.codeTitle = "获取验证码"
									} else {
										that.codeTitle = timeNumber + "s后获取";
									}
									timeNumber--;
								}, 1000)
							} else {
								uni.showToast({
									title: res.message,
									icon: "none"
								})
							}
						})


					} else {
						uni.showToast({
							title: "手机号码输入错误，请检查号码",
							icon: "none"
						})
					}


				}

			},


			/**
			 * 注册按钮点击事件
			 * 1、判断是否输入手机号码
			 * 2、判断是否输入验证码
			 * 3、判断密码是否输入
			 * 4、判断两次输入的密码是否一样***/

			registerSubmitClicked() {
				if (!this.checkValue(this.phoneNumber)) {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					})
					return;
				}
				if (!this.checkValue(this.codeText)) {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					})
					return;
				}
				if (!this.checkValue(this.passwordText)) {
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					})
					return;
				}
				if (!this.checkValue(this.passwordTextRepeat)) {
					uni.showToast({
						title: "请再次输入密码",
						icon: "none"
					})
					return;
				}


				if (this.passwordText != this.passwordTextRepeat) {
					uni.showToast({
						title: "两次输入的密码不一样",
						icon: "none"
					})
					return;
				}

				logon_interface({
					loginName: this.phoneNumber,
					password: this.passwordText,
					newPassword: this.passwordTextRepeat,
					code: this.codeText,
				}).then(res => {
					if (res.status == "SUCCESS") {



						uni.showToast({
							title: "注册成功",
							icon: "none"
						})
						const that = this;
						setTimeout(() => {
							that.autoLogin({
								loginName: res.data.loginName,
								password: this.passwordText
							})
						}, 100)

						
						
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})

			},

			autoLogin(params) {
				login_interface(params).then(res => {
					if (res.status == 'SUCCESS') {
						this.loginFunction(res.data);
						
						uni.navigateTo({
							url: "/pages/usernumber/selecttype"
						})
						
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
						})
					}
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
	
	
	
	.register-view {
		width: 100%;
		height: 100vh;
		background-color: $backColor;
		display: flex;
		justify-content: center;
		align-items: center;


		.register-content {
			width: 90%;
			background-color: #FFFFFF;
			border-radius: 10px;

			.label-title {
				font-size: 16px;
				font-weight: 700;
				margin: 20px;
			}

			.input-view {
				width: calc(100% - 40px);
				height: 100px;
				margin-left: 20px;

				.input-view-item {
					height: 30px;
					margin-top: 20px;
					border-bottom: 1px solid #F2F2F2;

					image {
						width: 20px;
						height: 20px;
						float: left;
					}

					input {
						padding-left: 5px;
						float: left;
						font-size: 14px;
					}


				}

				.code-button {
					float: right;
					width: 100px;
					font-size: 14px;
					margin-top: 10px;
					background-color: #b7d6fc;
					color: #007AFF;
					padding: 2px;
				}
			}

		}



		.register-submit {
			width: calc(100% - 40px);
			margin-left: 20px;
			margin-top: 40px;
			height: 35px;
			line-height: 35px;
			font-size: 14px;
			background-color: #007AFF;
			color: #FFFFFF;
			border-radius: 20px;
		}

		.user-information {
			font-size: 12px;
			color: #9a9a9a;
			margin: 20px;

			.user-text {
				color: #007AFF;
			}

		}


	}
</style>
