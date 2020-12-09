<template>
	<view class="view-page">
		<template v-for="(item, index) in reportList">
			<view class="report-item">
				<view>
					<!-- <label class="pa-name">{{item.eyePatient.name}}</label> -->
					<label class="pa-name">张三</label>
					<label class="pa-relation">本人</label>
				</view>
				<view class="result-text">
					<label>测评结果：</label>
					<label class="result-score">{{item.score}}</label>分
					<label class="result-title">轻度</label>
				</view>
				<view class="detail-doctor">
					<image src="../../static/image-doctor.jpg"></image>
					<view class="doctor-content">
						<view class="content-top">
							<label>李医生</label>
							<label>vip</label>
							<label>副主任医师</label>
						</view>
						<view class="content-bottom">北京积水潭医院回龙观院区</view>
					</view>
				</view>


			</view>

		</template>
	</view>
</template>

<script>
	import {
		getSubmitQuestionList_interface
	} from '../../api/index.js'
	import {
		mapState
	} from 'vuex'
	export default {
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
			}
		},
		mounted() {
			this.pageNo = 1;
			this.reportList = []
			this.getListData()
		},
		computed: {
			...mapState(["loginData", "activePatient"])
		},
		onPullDownRefresh() {
			console.log('refresh')
			this.pageNo = 1;
			this.reportList = []
			this.getListData()
		},
		methods: {
			getListData() {
				getSubmitQuestionList_interface({
					userId: this.loginData.id,
					patientId: this.activePatient.id,
					pageNo: '1',
					pageSize: '15'
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.status == "SUCCESS") {
						this.reportList = res.data.list
					} else {

					}
					console.log()
				})
			},

		}
	}
</script>

<style lang="scss">
	.view-page {
		position: absolute;
		width: 100%;
		background-color: #F0F0F0;
		overflow-x: hidden;

		.report-item {
			width: calc(100% - 20px);
			height: 100px;
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
				background-color: #ececec;
				border-radius: 20px;
				margin-left: 20px;
				color: #55aa7f;
				border: 1px solid #dddddd;
			}

			.result-text {

				margin: 10px;
				color: gray;
				font-size: 14px;

				.result-score {
					font-size: 16px;
					color: #FF3333;
					font-weight: 800;
				}
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
				
				.doctor-content{
					float: left;
					
					height: 35px;
					font-size: 12px;
					margin-left: 10px;
					
					.content-top{
						height: 17.5px;
						line-height: 17.5px;
						margin: 0;
						
					}
					.content-bottom{
						border-top: 1px solid #F0F0F0;
						height: 17.5px;
						line-height: 17.5px;
						margin: 0;
					}
					
				}
				
				

			}


		}
	}
</style>
