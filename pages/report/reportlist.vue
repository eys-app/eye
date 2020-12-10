<template>
	<view class="view-page">
		<patient-model-view></patient-model-view>
		<template v-for="(item, index) in reportList">
			<view class="report-item" @click="nativagtoReportDetail(item)">
				<view>
					<!-- <label class="pa-name">{{item.eyePatient.name}}</label> -->
					<label class="pa-name">{{item.eyePatient.name}}</label>
					<label class="pa-relation">{{item.eyePatient.patientRelation}}</label>
					<template v-if="item.stateTag == 0">
						<label class="pa-status">未指导</label>
					</template>
					<template v-if="item.stateTag == 1">
						<label class="pa-status">已指导</label>
					</template>
					<template v-if="item.stateTag == 2">
						<label class="pa-status">用户已阅</label>
					</template>

				</view>
				<view class="result-text">
					<label>测评结果：</label>
					<label class="result-score">{{item.score}}</label>分
					<template v-if="item.eyeDiagnosisConfig.severity == '轻度'">
						<label class="result-text" style="color: #86bb72;">{{item.eyeDiagnosisConfig.severity}}</label>
					</template>
					<template v-if="item.eyeDiagnosisConfig.severity == '中度'">
						<label class="result-text" style="color: #bbaa4a;">{{item.eyeDiagnosisConfig.severity}}</label>
					</template>
					<template v-if="item.eyeDiagnosisConfig.severity == '重度度'">
						<label class="result-text" style="color: #bb4866;">{{item.eyeDiagnosisConfig.severity}}</label>
					</template>

					<label class="reslut-time">{{item.createDate}}</label>
				</view>
				<!-- <view class="detail-doctor">
					<image src="../../static/image-doctor.jpg"></image>
					<view class="doctor-content">
						<view class="content-top">
							<label class="top-name">李医生</label>
							<label class="top-name">vip</label>
							<label style="padding: 0 5px;">副主任医师</label>
						</view>
						<view class="content-bottom">北京积水潭医院回龙观院区</view>
					</view>
				</view> -->
				<view style="clear: both;"></view>
			</view>

		</template>
		<view class="load-more-text" v-if="showMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import {
		getSubmitQuestionList_interface
	} from '../../api/index.js'
	import {
		mapState
	} from 'vuex'

	import patientModelView from '../../components/patientchange/index.vue'

	export default {
		components: {
			patientModelView
		},
		onBackPress() {
			uni.switchTab({
				url: "/pages/patient/tabbar/home"
			})
			return true;
		},
		data() {
			return {
				pageNo: 1,
				reportList: [], //数据
				loadMoreText: '正在加载数据...',
				bolLoadMore: true,
				showMore: false,
			}
		},

		mounted() {
			this.pageNo = 1;
			this.reportList = []
			this.getListData('refresh')

			const that = this;
			uni.$on('updatePatient', function() {
				console.log('改变问诊人')
				that.pageNo = 1;
				that.reportList = []
				that.getListData('refresh')
			})
		},
		computed: {
			...mapState(["loginData", "activePatient"])
		},
		onPullDownRefresh() {
			console.log('refresh')
			this.pageNo = 1;
			this.reportList = []
			this.bolLoadMore = true;
			this.getListData('refresh')
		},
		onReachBottom() {
			if (this.bolLoadMore) {
				this.pageNo += 1;
				this.getListData('more')
			}
		},
		methods: {
			//获取报告列表数据
			getListData(type) {
				getSubmitQuestionList_interface({
					userId: this.loginData.id,
					patientId: this.activePatient.id,
					pageNo: this.pageNo,
					pageSize: '10'
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.status == "SUCCESS") {
						if (type == 'refresh') {
							this.reportList = res.data.list
						}
						if (type == 'more') {
							this.reportList = this.reportList.concat(res.data.list)
						}
						if (this.reportList.length == 0) {
							this.loadMoreText = '暂无数据'
							this.showMore = true
						} else {
							this.showMore = true
							if (res.data.count > this.reportList.length) {
								this.bolLoadMore = true;
								this.loadMoreText = '正在加载更多...'
							}
							if (res.data.count == this.reportList.length) {
								this.bolLoadMore = false;
								this.loadMoreText = '没有更多了'
							}
						}

					}
				})
			},

			//进入报告详情页面
			nativagtoReportDetail(item) {
				uni.navigateTo({
					url: "/pages/report/reportfromlist?testPaperId=" + item.id
				})

			}

		}
	}
</script>

<style lang="scss">
	.view-page {
		position: absolute;
		width: 100%;
		background-color: #F0F0F0;
		overflow-x: hidden;

		.load-more-text {
			text-align: center;
			font-size: 12px;
			color: gray;
			line-height: 40px;
			background-color: #FFFFFF;
		}

		.report-item {
			width: calc(100% - 20px);

			background-color: #FFFFFF;
			margin-bottom: 1px;
			padding: 10px;

			.pa-name {
				font-size: 18px;
				font-weight: 600;

			}

			.pa-relation {
				padding: 2px 10px;
				font-size: 14px;
				border-left: 1px solid #cdd0d5;
				color: gray;
				// background-color: #ececec;
				// border-radius: 20px;
				margin-left: 10px;
				// color: #55aa7f;
				// border: 1px solid #dddddd;
			}

			.pa-status {
				float: right;
			}

			.result-text {

				margin: 10px 0 0 0;
				color: gray;
				font-size: 12px;

				.result-score {
					font-size: 16px;
					color: #ffaa00;
					font-weight: 800;
					margin-right: 3px;
				}

				.result-text {
					font-size: 16px;
					font-weight: 800;
					margin-left: 10px;
				}
			}

			.reslut-time {
				text-align: right;
				font-size: 12px;
				color: gray;
				float: right;
				margin-top: 5px;
			}

			.detail-doctor {
				margin: 15px;

				image {
					width: 30px;
					height: 30px;
					border: 1px solid #F0AD4E;
					border-radius: 50%;
					float: left;
				}

				.doctor-content {
					float: left;

					height: 35px;
					font-size: 12px;
					margin-left: 10px;
					margin-top: -2px;

					.content-top {
						height: 17.5px;
						line-height: 17.5px;
						margin: 0;
						padding-bottom: 2px;

						.top-name {
							padding: 0 5px;
							border-right: 1px solid #F1F1F1;
						}

					}

					.content-bottom {
						border-top: 1px solid #F0F0F0;
						height: 17.5px;
						line-height: 17.5px;
						margin: 0;
						padding-top: 2px;
					}

				}



			}


		}
	}
</style>
