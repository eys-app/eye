<template>
	<view>
		<view class="header-back">
			<view class="patient-name">
				{{activePatient.name}}
			</view>
			<view class="patient-other">
				<label>{{activePatient.age}}岁</label><label style="margin-left: 20px;">{{sexValue}}</label>	
			</view>
		</view>
		<view class="report-ai">
			<view class="title">AI诊断报告</view>
			<view class="socre-text">
				您的最终得分是:<label style="font-size: 18px;color: #F76260;padding: 0 10px;font-weight: 800;">{{reportDetail.questionSocre}} </label> 分
			</view>
			<view class="socre-text">
				属于<label style="font-size: 18px;color: #55aa7f;padding: 0 10px;font-weight: 800;">{{reportDetail.severity}} </label> 干眼： 
				<label style="font-size: 14px;color: #8d8d8d;padding: 0 10px;font-weight: 800;">{{reportDetail.minScore}} - {{reportDetail.maxScore}} </label>分
			</view>
			<view class="socre-text">
				{{reportDetail.proposal}}
			</view>
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
	export default {
		onBackPress() {
			uni.navigateTo({
				url: "/pages/report/reportlist"
			})
			return true;
		},
		data() {
			return {
				sexValue: '',
				reportDetail: {}
			}
		},
		computed: {
			...mapState(['activePatient'])
		},
		onUnload() {
			uni.$off('patientReport')
		},
		onLoad:function(option){

			this.reportDetail = JSON.parse(option.option)

			this.sexValue = sexnumberToValue(this.activePatient.sex)
			
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

	.report-ai {
		padding: 20px;
		
		.title{
			font-size: 16px;
			font-weight: 700;
		}
		
		.socre-text{
			margin: 10px 0;
			font-size: 14px;
		}
	}
</style>
