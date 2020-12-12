<!-- 病人库管理页面的病人信息 card -->
<template>
	<view class="root">

		<view class="title_bar">
			<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='onSelected' @dateChange='dateChange'
			 @doc_mineClick='doc_mineClick'></ren-dropdown-filter>
		</view>

		<view class="card-view">
			<uni-card isShadow="true" v-for="item in patientList"  @click="enterGuide(item)">
				<view class="card">
					<view class="one">

						<view class="patientName">
							{{item.eyePatient.name}}
						</view>

						<view class="patientSex" v-if="item.eyePatient.sex == '1' ">
							男
						</view>
						<view class="patientSex" v-if="item.eyePatient.sex == '2' ">
							女
						</view>

						<view class="patientOld">
							{{item.eyePatient.age}}岁
						</view>

						<view class="guide" v-if="item.stateTag == '0' ">
							<view class="point_noguide"></view>未指导
						</view>
						<view class="guide" v-if="item.stateTag == '1' ">
							<view class="point_guide"></view>已指导
						</view>
						<view class="guide" v-if="item.stateTag == '2' ">
							<view class="point_read"></view>用户已阅
						</view>
					</view>
					
					<view class="ai-report">
						<view class="ai-item">
							<label class="ai-item-top">
								AI 评分:
							</label>
							<label class="ai-item-result">
								{{item.score}}
							</label>
						</view>
						<view class="ai-item">
							<label class="ai-item-top">
								AI 结果:
							</label>
							<label class="ai-item-result" v-if="item.eyeDiagnosisConfig != undefined">
								{{item.eyeDiagnosisConfig.severity}}
							</label>
							<label class="ai-item-result" v-if="item.eyeDiagnosisConfig == undefined">
								--
							</label>
						</view>
					</view>

					<!-- <view class="two" v-for="items in perTagList"> -->
					<!-- 	<view class="two">

						<view class="tag">
							我是标签1
						</view>
						<view class="tag">
							我是标签2
						</view>
						<view class="tag">
							我是标签3
						</view>
						<view class="tag">
							我是标签4
						</view>

						 	<view class="tag">
							{{items}}
						</view> 
					</view> -->

					<view class="three">
						测评时间：{{item.createDate}}
					</view>

				</view>
			</uni-card>

			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>

	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import {mapState} from 'vuex'
	import {
		getPatientsListByDoc
	} from '../../api/index.js'


	export default {
		components: {
			RenDropdownFilter
		},

		data() {
			return {
				DPageNumber: 1, //列表分页-当前页码
				patientList: [], //列表数据
				filterData: [
					[{
						text: '症状程度',
						value: ''
					}, {
						text: '非常严重',
						value: 1
					}, {
						text: '严重',
						value: 2
					}, {
						text: '轻微',
						value: 3
					}],
					[{
						text: '问卷状态',
						value: ''
					}, {
						text: '未指导',
						value: 0
					}, {
						text: '已指导',
						value: 1
					}, {
						text: '用户已阅',
						value: 2
					}]
				],
				defaultIndex: [0, 0],
				selectTime: "",

				perTagList: ['标签1', '标签2', '标签1', '标签2', '标签1', '标签2'], //病人的标签
				showNoResult: false, //显示无结果

				doctorId: '',
				showLoadMore: false,
				loadMoreText: "加载中...",
				stateTag: '', //用户调查问卷的状态（未指导、已指导、已阅读）
				isLoadMore: true

			}

		},
		computed:{
			...mapState(["loginData"])
		},
		mounted() {
			this.getPatientsList()
		},
		methods: {

			//下拉刷新
			onPullDownRefresh() {
				this.DPageNumber = 1;
				this.stateTag = "";
				this.patientList = [];
				this.showLoadMore = false;
				console.log('refresh')
				this.getPatientsList()
			},

			//加载更多
			onReachBottom() {
				if (this.isLoadMore) {
					console.log('loadMore')
					this.DPageNumber += 1;
					this.getPatientsList()
				}
			},

			//选择症状、是否知道
			onSelected(res) {
				this.stateTag = res[1][0].value
				this.DPageNumber = 1;
				this.patientList = [];
				this.getPatientsList()
			},

			//选择测试日期
			dateChange(d) {
				this.selectTime = d + ' 00:00:00'
				this.DPageNumber = 1;
				this.patientList = [];
				this.getPatientsList()
			},

			//点击医生的个人中心
			doc_mineClick() {
				uni.navigateTo({
					url: '/pages/doctor/doctor_mine'
					// url: "/pages/usernumber/apply/demo"
				})
			},

			// 获取医生端的问诊人列表
			getPatientsList() {
				getPatientsListByDoc({
					doctorId: this.loginData.eyeDoctor.id,
					testStartTime: this.selectTime,
					stateTag: this.stateTag,
					pageNo: this.DPageNumber,
					pageSize: '15'

				}).then(res => {
					if (res.status == 'SUCCESS') {
						uni.stopPullDownRefresh()
						let tempArray = this.patientList.concat(res.data.list)
						this.patientList = tempArray

						if (res.data.list.length < 15) {
							this.loadMoreText = "没有更多了"
							this.isLoadMore = false
							this.showLoadMore = true
						}
					}
				})
			},

			//点击病人item 进入医生诊断指导页面

			enterGuide(param){
				console.log('进入点击' , param)
				uni.navigateTo({
					url:'/pages/doctor/guidePatients?paId=' + param.id
				})
			}

			// 	getPatientsListByDoc({
			// 		// loginName: this.phoneNum,
			// 		// password: this.password
			// 		doctorId:'1008611'
			// 	}).then(res => {
			// 		console.log("医生返回结果=="+res)
			// }
		}

	}
</script>

<style lang="scss">
	.title_bar {
		display: flex;
	}

	.mine {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		// display: flex;
		background-color: #67C23A;
		justify-content: center;
		align-items: center;

		image {
			width: 80rpx;
			height: 80rpx;
		}
	}

	.card {
		padding-top: 20rpx;
		padding-left: 20rpx;
	}

	.one {
		display: flex;
	}
	
	.ai-report{
		width: 80%;
		margin-left: 10%;
		height: 25px;
		margin-top: 10px;
		

		
		.ai-item{
			height: 20px;
			background-color: #afd0f8;
			margin-right: 10px;
			float: left;
			padding: 3px 10px;
			border-radius: 20px;
			
			
			.ai-item-top{
				line-height: 20px;
				font-size: 12px;
				color: #FFFFFF;
			}
			
			.ai-item-result{
				line-height: 20px;
				font-size: 16px;
				color: #FFFFFF;
				margin-left: 5px;
				font-weight: 800;
			}
			
		}
		
		
	}

	.two {
		margin-top: 15rpx;
		display: flex;
		flex-flow: wrap;

		// flex-direction: row;
		.tag {
			// display: flex;
			font-size: 30rpx;
			color: #FFFFFF;
			background-color: #AAD1FF;
			margin-right: 20rpx;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			border-radius: 30rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
		}
	}

	.three {
		display: flex;
		justify-content: flex-end;
		font-size: 12px;
		color: #cccccc;
		margin-top: 20rpx;
	}

	.patientName {
		font-size: 18px;
		font-weight: 700;
	}

	.patientSex {
		margin-left: 40rpx;
		color: #6E6E6E;
		font-size: 14px;
		padding-top: 3px;
	}

	.patientOld {
		margin-left: 40rpx;
		color: #6E6E6E;
		font-size: 14px;
		padding-top: 3px;
	}

	.guide {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex: 1;
		font-size: 30rpx;
		color: #6E6E6E;

		.point_noguide {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: #DD524D;
			margin-right: 5px;
		}

		.point_guide {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: #67C23A;
			margin-right: 5px;
		}

		.point_read {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: #6A85F8;
			margin-right: 5px;
		}
	}

	/* loadmore */
	.uni-loadmore {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		padding-bottom: 30rpx;
		font-size: 12px;
		color: gray;
	}
</style>
