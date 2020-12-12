<template>
	<view class="view-page">
		<!-- 
		<view class="back-ground">
			
			
			
			<view class="clear-view"></view>

		</view>
		<view class="image-view"></view> -->

		<view class="content-view">
			<view class="content-item" @click="enterListContact">
				<!-- <image src="../../../static/images/check_box.svg"></image> -->
				<view class="content-text-view">问诊人管理</view>
				<view class="right-text">›</view>
			</view>
			<view class="content-item" @click="changeActivePatient">
				<!-- <image src="../../../static/images/check_box.svg"></image> -->
				<view class="content-text-view">当前问诊人</view>
				<view class="right-text">›</view>
				<view class="active-patient" v-if="activePatient != null">{{activePatient.name}}</view>
				<view class="active-patient" v-if="activePatient == null">去选择</view>
			</view>
			<view class="content-item" @click="mineClickedToReport">
				<!-- <image src="../../../static/images/check_box.svg"></image> -->
				<view class="content-text-view">诊断报告</view>
				<view class="right-text">›</view>
			</view>
			<view class="content-item" @click="applyDoctor">
				<view class="content-text-view">认证为医生</view>
				<view class="right-text">›</view>
			</view>
			<view class="content-item" style="text-align: center;color: #6A85F8;font-weight: 800;" @click="logoutClicked">
				退出登录
			</view>
		</view>

		<!-- <button type="default" class="logout-button" @click="logoutClicked">退出登录</button> -->
	</view>
</template>

<script>
	import {
		getEyeDoctor_interface
	} from '../../../api/index.js'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				applyAddOrChange: ''
			}
		},
		computed: {
			...mapState(["activePatient", "loginData"])
		},
		mounted() {},
		onLoad() {
			this.gainApplyStatus()
		},
		methods: {
			...mapMutations(['logoutFunction']),
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
				const that = this;
				uni.redirectTo({
					url: "../../login/login",
					success: function() {
						that.logoutFunction()
					}
				})
			},
			mineClickedToReport() {
				uni.navigateTo({
					url: "/pages/report/reportlist"
				})
			},
			changeActivePatient() {
				uni.navigateTo({
					url: "../patientmanager/listContact?type=Y"
				})
			},
			applyDoctor() {
				if (this.applyAddOrChange == 'add') {
					uni.navigateTo({
						url: "/pages/usernumber/apply/applydoctor"
					})
				}
				if (this.applyAddOrChange == 'change') {
					uni.navigateTo({
						url: "../../usernumber/apply/changeapplydoctor"
					})
				}

			},
			gainApplyStatus() {
				getEyeDoctor_interface({
					userId: this.loginData.id
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.status == 'SUCCESS') {
						this.applyAddOrChange = 'change'
					} else {
						this.applyAddOrChange = 'add'
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.view-page {

		position: absolute;
		background-color: #f4f4f4;
		width: 100%;
		height: 100%;



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

		.content-view {
			width: 100%;
			box-shadow: 0 0 10px #e3e3e3;
			border-radius: 5px;

			.content-item {
				width: 100%;
				height: 40px;
				line-height: 40px;
				margin-bottom: 10px;
				background-color: #FFFFFF;
				// border-bottom: 1px solid #efefef;

				image {
					float: left;
					width: 20px;
					height: 20px;
					margin: 10px;
				}

				.content-text-view {
					float: left;
					line-height: 40px;
					margin-left: 10px;
				}

				.right-text {
					float: right;
					font-size: 28px;
					margin-right: 10px;
					color: #cecece;
					margin-top: -2px;
				}

				.active-patient {
					float: right;
					margin-right: 10px;
					font-size: 14px;
					margin-top: 1px;
					color: #6A85F8;
				}

			}
		}

		.logout-button {
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
