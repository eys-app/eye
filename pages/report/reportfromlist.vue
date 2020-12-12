<template>
	<view>
		<view class="header-back">
			<view class="patient-name">
				{{reportPatient.name}}
			</view>
			<view class="patient-other">
				<label>{{reportPatient.age}}岁</label><label style="margin-left: 20px;">{{sexValue}}</label>
			</view>
		</view>
		<view class="showHistory" @click="navigateToHistoryPage">查看问卷详情 >></view>
		<view class="report-ai">
			<view class="title">AI诊断报告 <label class="time">{{aiObject.createDate}}</label></view>
			<view class="socre-text">
				您的最终得分是:<label style="font-size: 18px;color: #F76260;padding: 0 10px;font-weight: 800;">{{reportDetail.questionSocre}}
				</label> 分
			</view>
			<view class="socre-text">
				属于<label style="font-size: 18px;color: #55aa7f;padding: 0 10px;font-weight: 800;">{{reportDetail.severity}} </label>
				干眼：
				<label style="font-size: 14px;color: #8d8d8d;padding: 0 10px;font-weight: 800;">{{reportDetail.minScore}} -
					{{reportDetail.maxScore}} </label>分
			</view>
			<view class="socre-text">
				{{reportDetail.proposal}}
			</view>
		</view>

		<view class="report-doctor">
			<view class="report-title">医生诊断报告</view>
			<view class="detail-doctor">
				<image class="doctor-image" :src="doctorDetail.photoUrl"></image>
				<view class="doctor-content">
					<view class="content-top">
						<label class="top-name">{{doctorDetail.nickName}}</label>
						<view class="top-vip" v-if="doctorDetail.qualificationCertification == '1'">
							<image src="../../static/images/vip-doc-color.png"></image>
						</view>
					</view>
					<view class="content-bottom">
						<label class="doc-type" v-if="doctorDetail.eyeDoctorWork != undefined">{{doctorDetail.eyeDoctorWork.work}}</label>
						<label style="font-size: 12px;">{{doctorDetail.workAddr}}</label>
					</view>
				</view>
			</view>
			<view style="clear: both;"></view>


			<template v-for="item in dectorRL">

				<template v-if="item.eyeSchemeTemplate != undefined">
					<view class="report-doctor-detail">
						<view class="time">{{item.createDate}}</view>
						<view class="title">{{item.eyeSchemeTemplate.title}}</view>
						<view class="content">{{item.eyeSchemeTemplate.proposal}}</view>
						<view class="content" v-if="item.proposal != undefined">{{item.proposal}}</view>
					</view>
				</template>
				<template v-if="item.eyeSchemeTemplate == undefined">
					<view class="report-doctor-detail">
						<view class="time">{{item.createDate}}</view>
						<view class="content">{{item.proposal}}</view>
					</view>
				</template>

			</template>


		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		sexnumberToValue
	} from '../../commen/common.js'
	import {
		getSubmitQuestion_interface
	} from '../../api/index.js'
	export default {

		data() {
			return {
				sexValue: '',
				reportDetail: {},
				reportPatient: {},
				testPaperId: '',
				dectorRL: [],
				doctorDetail: {},
				historyOption: '',
				aiObject: {}
			}
		},
		computed: {
			...mapState(['activePatient', "loginData"])
		},
		watch: {
			'activePatient': {
				handler(n) {
					console.log('nnnnnnnnnnnnnn===', n)
				}
			}
		},
		onLoad: function(option) {
			this.testPaperId = option.testPaperId;
			// 	let obj = JSON.parse(decodeURIComponent(option.item))
			// 	this.reportPatient = obj.eyePatient;
			// 	this.sexValue = sexnumberToValue(this.reportPatient.sex)
			// 	this.reportDetail = obj.eyeDiagnosisConfig;



		},

		onUnload() {
			uni.$off('updatePatient')
		},
		mounted() {
			this.getReportDetailData()
		},
		methods: {
			getReportDetailData() {
				getSubmitQuestion_interface({
					id: this.testPaperId,
					userId: this.loginData.id
				}).then(res => {
					if (res.status == 'SUCCESS') {
						this.aiObject = res.data.submitQuestionnaire
						this.reportDetail = res.data.submitQuestionnaire.eyeDiagnosisConfig
						this.reportPatient = res.data.submitQuestionnaire.eyePatient
						this.sexValue = sexnumberToValue(this.reportPatient.sex)

						this.dectorRL = res.data.schemeProposalList
						this.doctorDetail = res.data.submitQuestionnaire.eyeDoctor
						this.historyOption = res.data.submitQuestionnaire.questionnaire
					}
				})
			},
			navigateToHistoryPage() {
				// #ifdef APP-PLUS || H5
				uni.navigateTo({
					url: './historydetail?detail=' + encodeURIComponent(JSON.stringify(this.historyOption))
				})
				// #endif

				// #ifdef MP-WEIXIN
				uni.setStorage({
					key: 'historyWJ',
					data: this.historyOption
				})
				uni.navigateTo({
					url: './historydetail'
				})
				// #endif

			}
		}
	}
</script>

<style lang="scss">
	.header-back {
		width: 100%;
		height: 150px;
		background-color: #6a85f8;
		color: #FFFFFF;

		.patient-name {
			text-align: center;
			padding-top: 40px;
			font-size: 18px;
			font-weight: 700;
		}

		.patient-other {
			text-align: center;
			font-size: 14px;
			font-weight: 600;
			margin-top: 20px;
		}

	}

	.showHistory {
		width: 60%;
		height: 40px;
		background-color: #FFFFFF;
		box-shadow: 3px 3px 3px #dddddd;
		margin-left: 20%;
		margin-top: -20px;
		border-radius: 20px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		font-weight: 700;
	}

	.report-ai {
		padding: 20px;

		.title {
			font-size: 16px;
			font-weight: 700;

			.time {
				font-size: 12px;
				color: gray;
				font-weight: 400;
				margin-left: 20px;
			}
		}

		.socre-text {
			margin: 10px 0;
			font-size: 14px;
		}
	}

	.report-doctor {
		padding: 20px;

		.report-title {
			font-size: 16px;
			font-weight: 700;

		}

		.detail-doctor {
			margin: 15px;

			.doctor-image {
				width: 50px;
				height: 50px;
				border: 1px solid #F0AD4E;
				border-radius: 50%;
				float: left;
			}

			.doctor-content {
				float: left;

				height: 35px;
				font-size: 16px;
				margin-left: 10px;
				margin-top: 4px;

				.content-top {
					height: 17.5px;
					line-height: 17.5px;
					margin: 0;
					padding-bottom: 2px;

					.top-name {
						float: left;
						padding: 0 5px;
						// border-right: 1px solid #F1F1F1;
					}

					.top-vip {
						float: left;
						margin-top: 2px;
						margin-left: 10px;
						image {
							width: 40px;
							height: 17px;
						}
					}

					

				}

				.content-bottom {
					// border-top: 1px solid #F0F0F0;
					height: 17.5px;
					line-height: 17.5px;
					margin: 0;
					padding-top: 2px;
					
					.doc-type {
						padding: 2px 6px;
						font-size: 12px;
						background-color: #5dd9be;
						color: #FFFFFF;
						border-radius: 5px;
						margin-right: 10px;
					}
				}

			}
		}



		.report-doctor-detail {
			margin-top: 20px;
			margin-bottom: 10px;
			border-radius: 5px;
			border: 1px solid #F0F0F0;
			padding: 10px;

			.time {
				font-size: 12px;
				color: gray;
				line-height: 20px;
			}

			.title {
				font-size: 14px;
				line-height: 20px;
				font-weight: 800;
				margin-top: 5px;
			}

			.content {
				font-size: 14px;
				line-height: 20px;
				margin-bottom: 5px;
				margin-top: 5px;
			}
		}
	}
</style>
