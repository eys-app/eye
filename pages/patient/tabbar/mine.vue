<template>
	<view class="view-page">

		<view class="back-ground">
			<view class="clear-view"></view>

		</view>
		<view class="image-view"></view>
		
		<view class="content-view">
			<view class="content-item">
				<image src="../../../static/images/check_box.svg"></image>
				<view class="content-text-view">问诊人管理</view>
				<view class="right-text">›</view>
			</view>
			<view class="content-item">
				<image src="../../../static/images/check_box.svg"></image>
				<view class="content-text-view">诊断记录</view>
				<view class="right-text">›</view>
			</view>
			<view class="content-item">
				<image src="../../../static/images/check_box.svg"></image>
				<view class="content-text-view">诊断报告</view>
				<view class="right-text">›</view>
			</view>
			<view class="content-item" style="border: none;"></view>
		</view>

		<!-- mine {{activePatient}}
		<button type="primary" @click="nextPage">下一页</button>
		<h3 @click="enterListContact">问诊人</h3> -->

		<button type="default" class="logout-button" @click="logoutClicked">退出登录</button>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		computed: {
			...mapState(["activePatient"])
		},
		mounted() {



		},
		methods: {
			nextPage() {
				uni.navigateTo({
					url: "/pages/aidiagnosis/diagnosis"
				})
			},
			enterListContact() {
				uni.navigateTo({
					url: '/pages/patient/patientmanager/listContact'
				})
			},
			logoutClicked() {
				console.log('logout')
				uni.redirectTo({
					url: "../../login/login"
				})
			}
		}
	}
</script>

<style lang="scss">
	.view-page {



		.back-ground {
			width: 100%;
			height: 120px;
			background-color: $backColor;

			.clear-view {
				width: 100%;
				height: 80px;

			}
		}


		.image-view {
			width: 100px;
			height: 100px;
			background-color: #FFFFFF;
			border-radius: 10px;
			margin-top: -50px;
			margin-left: calc((100% - 100px) / 2);
			box-shadow: 0 0 10px #cccccc;
		}
		
		.content-view{
			width: calc(90% - 20px);
			margin-left: 5%;
			box-shadow: 0 0 10px #e3e3e3;
			border-radius: 5px;
			margin-top: 20px;
			padding: 0 10px;
			
			.content-item{
				width: 100%;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #efefef;
				
				image{
					float: left;
					width: 20px;
					height: 20px;
					margin: 10px;
				}
				
				.content-text-view{
					float: left;
					line-height: 40px;
				}
				.right-text{
					float: right;
					font-size: 28px;
					margin-right: 10px;
					color: #cecece;
				}
				
			}
		}
		
		.logout-button{
			width: 70%;
			height: 35px;
			margin-left: calc(15%);
			line-height: 35px;
			background-color: $backColor;
			font-size: 14px;
			margin-top: 30px;
			color: #FFFFFF;
		}


	}
</style>
