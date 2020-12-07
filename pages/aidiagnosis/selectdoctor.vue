<template>
	<view class="container-view">
		<view class="bottom-bar">
			<view class="scan-button" @click="scanDoctorImage">
				<uni-icons type="scan" color="#ffffff"></uni-icons>
				&nbsp;扫描医生二维码
			</view>
			<button class="submit-button" type="default" @click="submitclicked">提交</button>
		</view>

		<view class="back-view-class">

			<view v-for="(item, index) in doctorList" class="doctor-item" @click="selectedDoctorItem(index)" :class="{'selected-doctor': index == currenindex}">
				<image class="doctor-image"></image>
				<view class="detail-content">
					<view class="doctor-name">{{item.nickName}}</view>
					<template v-if="item.qualificationCertification == '1'">
						<image class="vip-doctor" src="../../static/images/vip-doctor.svg"></image>
					</template>
					<!-- <template v-if="item.title == '1'"></template> -->
					<uni-tag class="doctor-title" text="主任医师" size="small" type="success" circle="true"></uni-tag>

					<view style="clear: both;"></view>
					<view class="doctor-hospital">北京积水潭医院回龙观院区</view>
				</view>

			</view>


			<label class="doctor-null" v-show="showNull">没有查询到医生信息，请下拉刷新或点击下方的扫描医生二维码</label>

		</view>

	</view>

</template>

<script>
	import {
		gainDoctorList_interface,
		gainDoctorListWithScan_interface,
		submitQuestionnaire_interface
	} from '../../api/index.js'
	export default {

		data() {
			return {
				doctorList: [], //医生列表
				pageNo: 1,
				currenindex: null,
				showNull: true,
				postParams: null
			}
		},
		onLoad() {

			uni.$on('postWJParam', this.gainParams)


		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.doctorList = []
			this.gainList()
		},
		beforeMount() {
			this.gainList()
		},
		methods: {
			gainParams(e) {
				console.log(e)
				this.postParams = e
				uni.setStorage({
					key: "params",
					data: e
				})
			},
			//获取医生列表
			gainList() {
				gainDoctorList_interface({
					pageNo: this.pageNo,
					pageSize: 15
				}).then(res => {
					console.log(res)
					uni.stopPullDownRefresh()
					if (res.status == 'SUCCESS') {
						if (res.data.list.length > 0) {
							this.showNull = false
						}
						this.doctorList = res.data.list
					}
				})
			},
			//选中医生
			selectedDoctorItem(index) {
				this.currenindex = index;
			},
			//扫码
			scanDoctorImage() {
				const that = this
				that.gainDoctorDetailWithScanCode('25158607829')
				// that.gainDoctorDetailWithScanCode('251586078291525632')
				// uni.scanCode({
				// 	success: function(res) {
				// 		console.log('扫码结果: ', JSON.stringify(res));
				// 		that.gainDoctorDetailWithScanCode(res.result)
				// 	}
				// })
			},
			//根据扫码结果查询医生信息
			gainDoctorDetailWithScanCode(code) {
				this.doctorList = []
				this.currenindex = null;
				gainDoctorListWithScan_interface({
					id: code,
				}).then(res => {
					if (res.status == 'SUCCESS') {
						if (res.data == undefined) {
							uni.showToast({
								title: '没有搜索到该医生，请重新扫描',
								icon: "none"
							})
							this.showNull = true

						} else {
							this.doctorList.push(res.data)
							if (this.doctorList.length > 0) {
								this.showNull = false
							}
						}

					}
				})
			},

			//提交
			submitclicked() {
				let param = null
				uni.getStorage({
					key: "params",
					success: function(res) {
						param = res.data
					}
				})

				if (this.currenindex == null) {
					uni.showToast({
						title: '请选择医生',
						icon: "none"
					})
					//return;
				}
				// eval('param.doctorId' + )
				

				param['doctorId'] = this.doctorList[this.currenindex].id;
				console.log('param',param)
				console.log(param)
				submitQuestionnaire_interface(param).then(res => {
					console.log('res ==', res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.back-view-class {
		position: absolute;
		width: calc(100% - 20px);
		height: 100%;
		background-color: #F1F1F1;
		padding: 10px;
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 45px;
		background-color: #FFFFFF;
		z-index: 99;

		.scan-button {

			float: left;
			width: 45%;
			background-color: #4cd964;
			height: 36px;
			margin-left: 5px;
			margin-top: 5px;
			text-align: center;
			line-height: 36px;
			border-radius: 5px;
			color: #FFFFFF;

			.uni-icons {
				margin-right: 5px;
			}

		}

		.submit-button {
			float: right;
			width: 45%;
			height: 36px;
			margin-right: 5px;
			margin-top: 5px;
			line-height: 36px;
			background-color: #007AFF;
			color: #FFFFFF;
		}

	}



	.selected-doctor {
		border: 2px solid #55aa7f;
	}

	.doctor-null {
		font-size: 14px;
		color: #80828a;
	}

	.doctor-item {
		width: 100%;
		height: 80px;
		border-radius: 2px;
		background-color: #FFFFFF;
		margin-bottom: 10px;

		.doctor-image {
			width: 60px;
			height: 60px;
			margin: 10px;
			float: left;
			background-color: #F0AD4E;
		}

		.detail-content {

			float: left;
			width: calc(100% - 110px);
			height: 80px;

			.doctor-name {
				padding: 10px;
				font-size: 16px;
				font-weight: 600;
				float: left;
			}

			.vip-doctor {
				float: left;
				width: 20px;
				height: 20px;
				margin-top: 10px;
				margin-left: -8px;
			}

			.doctor-title {
				float: left;
				margin-top: 10px;
				margin-left: 15px;
			}

			.doctor-hospital {
				color: gray;
				font-size: 14px;
				margin-left: 10px;
				margin-top: 5px;
			}

		}



	}
</style>
