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
						<view class="patientSex">
							{{item.eyePatient.sex}}
						</view>
						<view class="patientOld">
							{{item.eyePatient.age}}岁
						</view>
						<view class="zhidao">
							<view>
								{{item.eyePatient.stateTag}}
							</view>
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
						上次测评时间：{{item.eyePatient.createDate}}
					</view>

				</view>
			</uni-card>

			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>

		<view class="noResult" v-show="showNoResult">没有查询结果</view>

	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
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
						text: '全部症状',
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
						text: '无论指导',
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
				doctorId: '251586078291525632',
				showLoadMore: false,
				loadMoreText: "加载中...",
				stateTag: '',
				isLoadMore:true

			}

		},
		mounted() {
			this.getPatientsList()
		},
		methods: {

			//下拉刷新
			onPullDownRefresh() {
				this.DPageNumber = 1;
				this.patientList = [];
				this.showLoadMore = false;
				console.log('refresh')
				this.getPatientsList()
			},

			//加载更多
			onReachBottom() {
				if(this.isLoadMore){
					console.log('loadMore')
					this.DPageNumber += 1;
					this.getPatientsList()
				}
			},

			//选择症状、是否知道
			onSelected(res) {
				console.log(res)
				console.log(res[0])

			},

			//选择测试日期
			dateChange(d) {
				this.selectTime = d
				console.log('选择日期是==' + this.selectTime)
			},

			//点击医生的个人中心
			doc_mineClick() {
				uni.navigateTo({
					url: '/pages/doctor/doctor_mine'
				})
			},

			// 获取医生端的问诊人列表
			getPatientsList() {
				console.log('頁碼===='+this.DPageNumber)
				getPatientsListByDoc({
					doctorId: this.doctorId,
					// testStartTime:this.selectTime,
					stateTag: this.stateTag,
					pageNo: this.DPageNumber,
					pageSize: '15'

				}).then(res => {
					console.log(res)
					if (res.status == 'SUCCESS') {
						uni.stopPullDownRefresh()
						let tempArray = this.patientList.concat(res.data.list)
						this.patientList = tempArray

						if (this.patientList == undefined || this.patientList.length <= 0) {
							this.showNoResult = true
						}

						if (res.data.list.length < 15) {
							this.loadMoreText = "没有更多了"
							this.isLoadMore=false
							this.showLoadMore=true
						}
						console.log(this.patientList)
					}
				})
			},
			
			//点击病人item 进入医生诊断指导页面
			enterGuide(param){
				console.log('进入点击' , param)
				uni.navigateTo({
					url:'/pages/doctor/guidePatients?paId=' + param.id
				})
			},



			getPatientSex(param) {
				if (param == '1') {
					return '男'
				} else {
					return '女'
				}
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
	.card-view {
		// margin-top: 300rpx;
	}

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
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.patientName {
		font-size: 40rpx;
	}

	.patientSex {
		margin-left: 40rpx;
		color: #6E6E6E;
		font-size: 34rpx;
	}

	.patientOld {
		margin-left: 40rpx;
		color: #6E6E6E;
		font-size: 34rpx;
	}

	.zhidao {
		display: flex;
		justify-content: flex-end;
		flex: 1;
		font-size: 30rpx;
		color: #6E6E6E;
	}

	.noResult {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #8b9aae;
		margin-top: 30rpx;
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
