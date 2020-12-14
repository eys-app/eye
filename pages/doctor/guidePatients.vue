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
				最终得分是:<label style="font-size: 18px;color: #F76260;padding: 0 10px;font-weight: 800;">{{reportDetail.questionSocre}}
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
						<view class="content" style="margin-top: 10px;" v-if="item.proposal != undefined">{{item.proposal}}</view>
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


		<view class="doctor-add-report" @click="showReportPopup">
			+ 填写诊断报告
		</view>

		<uni-popup type="bottom" ref="popup">
			<view class="addReportPopup">
				<view class="title">诊断</view>

				<button class="model-button" type="default" @click="showModelPopup">使用模板</button>

				<view class="model-card selected-card">
					<view class="model-title">{{selectedModel.title}}</view>
					<view class="model-content">{{selectedModel.proposal}}</view>
				</view>
				<template v-if="loginData.eyeDoctor.qualificationCertification == '1'">
					<view class="text-title">请在下方输入框中输入诊断结果</view>
					<textarea auto-height class="text-area" maxlength="-1" v-model="textValue"></textarea>
					<view class="clear-view"></view>
				</template>

				<view class="sumit-report" @click="submitReportParams">提交</view>
			</view>
		</uni-popup>


		<uni-popup type="center" ref="modelPopup">
			<view class="model-popup">
				<view class="popup-title">请选择以下模板</view>
				<view class="content-card">
					<radio-group @change="clickedModelIndex">
						<label v-for="(item, index) in modelList" :key="item.id">
							<view style="float: left;margin-top: 10px;">
								<radio :value="index.toString()" />
							</view>
							<view style="float: left;width: calc(100% - 30px);">
								<view class="model-title">{{item.title}}</view>
								<view class="model-content">{{item.proposal}}</view>
							</view>
							<view v-if="index != modelList.length - 1" style="clear: both;height: 1px;background-color: #d8d8d8;"></view>
							<view v-if="index == modelList.length - 1" style="clear: both;height: 1px;background-color: #fff;"></view>
						</label>

					</radio-group>

				</view>

			</view>
		</uni-popup>

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
		getSubmitQuestion_interface,
		getSchemeTemplateList_interface,
		saveProposal_interface
	} from '../../api/index.js'
	export default {

		data() {
			return {
				sexValue: '',
				aiObject: {},
				reportDetail: {},
				reportPatient: {},
				testPaperId: '',
				dectorRL: [],
				doctorDetail: {},
				historyOption: '',
				modelList: [],
				currentindex: null,
				selectedModel: {},
				textValue: '',
				
			}
		},
		computed: {
			...mapState(['activePatient', "loginData"])
		},
		onLoad: function(option) {
			this.testPaperId = option.paId;

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
					id: this.testPaperId
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


				//#ifdef APP-PLUS || H5
				uni.navigateTo({
					// url: "/historydetail"
					url: '/pages/report/historydetail?detail=' + encodeURIComponent(JSON.stringify(this.historyOption))
				})
				// #endif

				// #ifdef MP-WEIXIN
				uni.setStorage({
					key: 'historyWJ',
					data: this.historyOption
				})
				uni.navigateTo({
					url: '/pages/report/historydetail'
				})
				// #endif

			},

			showReportPopup() {

				this.$refs.popup.open()
			},

			//获取报告模板
			getReportModel() {
				this.modelList = []
				getSchemeTemplateList_interface({
					pageNo: 1,
					pageSize: '10000'
				}).then(res => {
					if (res.status == 'SUCCESS') {
						this.modelList = res.data.list
					}
				})




			},

			showModelPopup() {
				this.$refs.modelPopup.open()
				this.getReportModel()
			},
			clickedModelIndex(e) {
				console.log(e)
				this.selectedModel = this.modelList[parseInt(e.detail.value)];
				this.$refs.modelPopup.close()
			},
			submitReportParams() {

				if (this.loginData.eyeDoctor.qualificationCertification == '1') {
					if (this.textValue.length == 0 || this.selectedModel == {} || this.selectedModel == null) {
						uni.showToast({
							title: "请选择模板或输入诊断结果",
							icon: 'none'
						})
						return;
					}
				}
				
				

				if (this.loginData.eyeDoctor.qualificationCertification == '0') {
					if (this.selectedModel == {} || this.selectedModel == null || Object.keys(this.selectedModel).length == 0) {
						uni.showToast({
							title: "请选择模板",
							icon: 'none'
						})
						return;
					}
				}



				let params = {}
				params.doctorId = this.loginData.eyeDoctor.id;
				if (this.loginData.eyeDoctor.qualificationCertification == '1') {
					params.proposal = this.textValue;
				}
				params.schemeId = this.selectedModel.id;
				params.submitQuestionnaireId = this.testPaperId;

				saveProposal_interface(params).then(res => {
					if (res.status == 'SUCCESS') {
						uni.showToast({
							title: "诊断结果提交成功",
							icon: "none"
						})

						this.$refs.popup.close()

						this.getReportDetailData()
					}
				})
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
						padding: 0 5px;
						float: left;
						// border-right: 1px solid #F1F1F1;
					}

					.top-vip {
						float: left;
						margin-left: 10px;
						image {
							width: 40px;
							height: 17px;
						}
					}

					

				}

				.content-bottom {
					height: 17.5px;
					line-height: 17.5px;
					margin: 0;
					padding-top: 2px;
					
					.doc-type {
						padding: 2px 6px;
						font-size: 12px;
						background-color: #5dd9be;
						color: #FFFFFF;
						margin-right: 15px;
						border-radius: 5px;
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
				margin-top: 10px;
			}

			.content {
				font-size: 14px;
				line-height: 20px;
				margin-top: 5px;
			}
		}
	}


	.addReportPopup {

		// height: 500px;
		width: 100%;
		background-color: #FFFFFF;
		min-height: 400px;

		.model-button {
			width: 50%;
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			margin-top: 20px;
			background-color: #09BB07;
			color: #FFFFFF;
		}

		.title {
			text-align: center;
			font-size: 14px;
			font-weight: 600;
			line-height: 40px;
			height: 40px;
			border-bottom: 1px solid #F2F2F2;
		}

		.sumit-report {
			position: absolute;
			bottom: 10px;
			width: 90%;
			height: 40px;
			background-color: #6A85F8;
			margin-left: 5%;
			line-height: 40px;
			text-align: center;
			color: #FFFFFF;
			font-weight: 700;
			border-radius: 5px;
		}

		.text-title {
			margin: 10px;
			font-size: 12px;
			color: gray;
		}

		.text-area {
			border: 1px solid #d1d1d1;
			margin: 10px 20px;
			width: calc(100% - 50px);
			min-height: 100px;
			border-radius: 5px;
			padding: 5px;
		}

		.clear-view {
			width: 100%;
			height: 70px;
			background-color: #FFFFFF;
		}

	}

	.model-popup {
		width: 80vw;
		height: 70vh;
		// margin-left: 10%;
		background-color: #FFFFFF;
		border-radius: 5px;
		overflow-y: auto;
		// padding: 10px;
	}

	.popup-title {
		position: absolute;
		text-align: center;
		width: 100%;
		height: 30px;
		line-height: 30px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		font-weight: 700;
		background-color: #F0F0F0;
	}

	.content-card {
		padding: 10px;
		margin-top: 20px;
	}

	.model-popup-clicked {
		background-color: #F1F1F1;
	}

	.selected-card {
		margin: 10px 10px 30px 10px;
	}

	.model-title {
		font-size: 14px;
		font-weight: 700;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.model-content {
		font-size: 14px;
		line-height: 20px;
		margin-bottom: 5px;
	}

	.model-card {
		border-bottom: 1px solid #F2F2F2;




	}


	.doctor-add-report {
		width: 80%;
		height: 30px;
		background-color: #6A85F8;
		color: #FFFFFF;
		font-size: 14px;
		font-weight: 600;
		border-radius: 20px;
		margin-bottom: 30px;
		margin-left: 10%;
		text-align: center;
		line-height: 30px;
	}
</style>
