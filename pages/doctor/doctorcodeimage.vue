<template>
	<view class="view-page">
		<view class="title">欢迎使用智能干眼系统</view>
		<view class="doc-message">
			<view class="msg-content">
				<image class="user-logo" :src="loginData.eyeDoctor.photoUrl"></image>
				<view class="doc-mes-content">
					<view style="height: 40px;line-height: 40px;">
						<label style="float: left;">{{loginData.eyeDoctor.nickName}}</label>
						<view class="user-type">
							<image src="../../static/images/vip-doc.png"></image>
						</view>
						
					</view>
					<view style="height: 40px;">
						<label class="doc-type">{{loginData.eyeDoctor.eyeDoctorWork.work}}</label>
						<label style="font-size: 12px;">{{loginData.eyeDoctor.workAddr}}</label>
					</view>
				</view>
			</view>

			<view style="clear: both;"></view>
			<view class="code-image-back">
				<view class="code-image">
					<view class="qrcode">
						<canvas style="width: 280px;height: 280px;" canvas-id="couponQrcode"></canvas>
					</view>
				</view>
			</view>


		</view>

	</view>
</template>

<script>
	const qrCode = require('@/commen/weapp-qrcode.js')
	import {
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState(['loginData'])
		},
		onLoad() {

			uni.showModal({
				showCancel: false,
				title: '请截屏保存该页信息'
			})

			setTimeout(() => {
				let codeText = this.loginData.id
				this.couponQrCode(codeText)
			}, 100)
		},
		methods: {
			// 二维码生成工具
			couponQrCode(text) {
				new qrCode('couponQrcode', {
					text: text,
					width: 280,
					height: 280,
					colorDark: "#333333",
					colorLight: "#FFFFFF",
					correctLevel: qrCode.CorrectLevel.H
				})
			}
		}
	}
</script>

<style lang="scss">
	.view-page {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #6A85F8;

		.title {
			text-align: center;
			font-size:24px;
			padding: 20px;
			color: #F0F0F0;
		}

		.doc-message {
			width: 90%;
			height: 80px;
			margin-left: 5%;
			margin-top: 20px;

			display: flex;

			flex-direction: column;

			.msg-content {



				.user-logo {
					width: 80px;
					height: 78px;
					border-radius: 50%;
					border: 1px solid #F0F0F0;
					float: left;
				}

				.doc-mes-content {
					color: #F0F0F0;
					margin-left: 20px;
					float: left;
					font-size: 18px;
					width: calc(100% - 140px);
					height: 100%;

					.doc-type {
						padding: 3px 10px;
						font-size: 12px;
						background-color: #5dd9be;
						color: #FFFFFF;
						margin-right: 15px;
						border-radius: 5px;
					}
					
					
					
					.user-type{
						width: 40px;
						height: 17px;
						margin-top: 3px;
						float: left;
						margin-left: 20px;
						
						image{
							width: 40px;
							height: 17px;
						}
					}

				}
			}





			.code-image-back {

				display: flex;
				justify-content: center;

				.code-image {
					width: 300px;
					border: 5px solid #FFFFFF;
					border-radius: 5px;
					background-color: #FFFFFF;
					height: 300px;
					margin-top: 30px;

					.qrcode {
						width: calc(100% - 20px);
						height: calc(100% - 20px);
						padding: 10px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}


		}

	}
</style>
