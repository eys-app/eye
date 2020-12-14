<!-- 医生的个人中心 -->
<template>
	<view class="view-page">
		<!-- 医生的个人中心 -->
		<view class="back-ground" >


			<image class="user-image" :src="loginData.eyeDoctor.photoUrl" ></image>
			<view class="user-message">
				<view style="padding-top: 3px;line-height: 30px;">
					<label class="doc-name" style="font-size: 18px;">{{loginData.eyeDoctor.nickName}}</label>
					<!-- <image class="vip-doc" src="../../static/images/vip-doc.png"></image> -->
				</view>
				<view style="font-size: 14px;">
					{{loginData.eyeDoctor.workAddr}}
				</view>
				<view>
					<label class="doc-type" v-if="loginData.eyeDoctor.eyeDoctorWork != undefined">{{loginData.eyeDoctor.eyeDoctorWork.work}}</label>
					<label class="doc-type" v-if="loginData.eyeDoctor != undefined && loginData.eyeDoctor.qualificationCertification == 1 ">已认证</label>
					
				</view>
			</view>

		</view>
		
		<!-- <view class="msg-back"></view> -->
		
		<view class="item-content" @click="doctorCodePage">
			<view style="width: 100px;float: left;margin-left: 20px;">我的二维码</view>
			<view style="text-align: right;margin-right: 10px;">
				<uni-icons type="arrowright" style="float: right;" color="#d1d1d1"></uni-icons>
			</view>
		</view>

		<view class="item-content">
			<view style="text-align: center;color: #6A85F8;font-weight: 800;" @click="logoutClicked">退出登录</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState(['loginData'])
		},
		methods: {
			...mapMutations(['logoutFunction']),
			logoutClicked() {
				const that = this;
				uni.redirectTo({
					url: "../login/login",
					success: function() {
						that.logoutFunction()
					}
				})
			},
			doctorCodePage() {
				uni.navigateTo({
					url: '/pages/doctor/doctorcodeimage'
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
		background-color: #F0F0F0;
		
		.vip-doctor-backimg{
			background-image: url(../../static/images/close.png);
			background-size: 30%;
		}

		.back-ground {
			width: 100%;
			height: 130px;
			background-color: $backColor;

			.clear-view {
				width: 100%;
				height: 80px;
			}

			// text-align: center;

			.user-image {
				width: 80px;
				height: 80px;
				margin-left: 50px;
				margin-top: 20px;
				border-radius: 10px;
				border: 2px solid #F1F1F1;
				float: left;
			}
			
			

			.user-message {
				float: left;
				width: calc(100% - 150px);
				height: 80px;
				color: #FFFFFF;
				margin-top: 10px;
				line-height: 30px;
				margin-left: 10px;

				.doc-name {
					font-weight: 800;
				}

				.vip-doc {
					width: 40px;
					height: 17px;
					margin-left: 10px;
				}

				.doc-type {
					padding: 3px 10px;
					font-size: 12px;
					background-color: #5dd9be;
					color: #FFFFFF;
					border-radius: 5px;
					margin-right: 10px;
				}

			}
		}

		.item-content {
			margin-top: 10px;
			width: 100%;
			height: 40px;
			line-height: 40px;
			background-color: #FFFFFF;
		}
		
		.msg-back{
			width: 80%;
			height: 100px;
			background-color: #FFFFFF;
			box-shadow: 0 0 10px #959bb3;
			margin-left: 10%;
			margin-top: -50px;
			border-radius: 5px;
		}

	}
</style>
