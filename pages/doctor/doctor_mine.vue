<!-- 医生的个人中心 -->
<template>
	<view class="view-page">
		<!-- 医生的个人中心 -->
		<view class="back-ground">


			<image class="user-image" src="../../static/image-doctor.jpg"></image>
			<view class="user-message">
				<label style="font-size: 18px;">{{loginData.eyeDoctor.nickName}}</label>
				<label v-if="loginData.eyeDoctor.qualificationCertification != undefined && loginData.eyeDoctor.qualificationCertification == 1">
					<image class="vip-doc" src="../../static/images/vip-doc.png"></image>
				</label>
				<label class="doc-type" v-if="loginData.eyeDoctor.eyeDoctorWork != undefined">{{loginData.eyeDoctor.eyeDoctorWork.work}}</label>
				<view>{{loginData.eyeDoctor.workAddr}}</view>

			</view>

		</view>
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
	import {mapMutations, mapState} from 'vuex'
	export default{
		computed:{
			...mapState(['loginData'])
		},
		methods:{
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
			doctorCodePage(){
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

		.back-ground {
			width: 100%;
			height: 220px;
			background-color: $backColor;

			.clear-view {
				width: 100%;
				height: 80px;
			}

			text-align: center;

			.user-image {
				width: 80px;
				height: 80px;
				margin-left: 20px;
				margin-top: 20px;
				border-radius: 50%;
				border: 2px solid #F1F1F1;
			}

			.user-message {
				width: 100%;
				height: 80px;
				text-align: center;
				color: #FFFFFF;
				margin-top: 10px;
				line-height: 30px;

				.doc-name {}
				.vip-doc{
					width: 20px;
					height: 20px;
					margin-left: 10px;
				}
				
				.doc-type{
					padding: 3px 10px;
					font-size: 12px;
					background-color: #5dd9be;
					color: #FFFFFF;
					margin-left: 15px;
					border-radius: 5px;
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

	}
</style>
