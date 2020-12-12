<template>
	<view class="back-view-class">
		<view class="container">
			<template v-for="item in userList">
				<view class="item-list" @click="itemClicked(item)">
					<view class="user-name">
						<label>{{item.name}}</label>
						<label class="relation-label">{{item.patientRelation}}</label>
					</view>
					<view class="user-phone">{{item.phone}}</view>
				</view>
				<view class="item-list-icon">
					<uni-icons class="user-compose" type="compose" size='18' color="gray" @click="enterUserInfo(item)"></uni-icons>
				</view>
			</template>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>



		</view>
		<button class="add-button" type="warn" @click="addUser">
			<uni-icons type="plusempty" color="#ffffff" size="14"></uni-icons>新增问诊人
		</button>
	</view>

</template>

<script>
	import {
		mapMutations,
		mapState
	} from "vuex"

	import {
		gainPatientList_interface
	} from '../../../api/index.js'
	export default {

		data() {
			return {
				DPageNumber: 0, //列表分页-当前页码
				userList: [], //列表数据
				loadMoreText: "加载中...",
				showLoadMore: true,
				bolBackTo: false,
			}
		},
		onUnload() {
			uni.$off('updateParientList')
		},
		mounted() {
			this.gainPatientListDataWithPagenumber()
			const that = this;
			uni.$on('updateParientList', function(e) {
				console.log('refresh')
				that.DPageNumber = 1;
				that.userList = [];
				that.showLoadMore = false;
				that.gainPatientListDataWithPagenumber()
			})
		},
		computed: {
			...mapState(['loginData'])
		},
		//下拉刷新
		onPullDownRefresh() {
			this.DPageNumber = 1;
			this.userList = [];
			this.showLoadMore = false;
			console.log('refresh')
			this.gainPatientListDataWithPagenumber()
		},
		onReachBottom() {
			console.log('loadMore')
			this.DPageNumber += 1;
			this.gainPatientListDataWithPagenumber()
		},
		onLoad: function(option) {
			console.log('option===',option)
			if (option.type == 'Y') {
				this.bolBackTo = true;
			}

		},

		methods: {
			...mapMutations(['changePatient']),
			//新增问诊人点击事件
			addUser() {
				uni.navigateTo({
					url: "/pages/usernumber/apply/applypatient?type=A"
				})
			},
			//编辑问诊人
			enterUserInfo(user) {
				console.log(user)
				//uni.$emit('itemPatient', user)
				//type -  A:增加  C:修改  F:第一次进来的时候增加
				uni.navigateTo({
					url: "/pages/usernumber/apply/applypatient?type=C&item=" + encodeURIComponent(JSON.stringify(user))
				})
			},
			//选中问诊人
			itemClicked(value) {
				console.log('back or no ----',this.bolBackTo)
				if (this.bolBackTo == true) {
					this.changePatient(value);
					uni.navigateBack({
						delta: 1
					})
				}

			},



			//获取问诊人列表
			gainPatientListDataWithPagenumber() {
				gainPatientList_interface({
					userId: this.loginData.id,
					pageNo: this.DPageNumber,
					pageSize: '15'
				}).then(res => {
					if (res.status == 'SUCCESS') {
						uni.stopPullDownRefresh()
						let tempArray = this.userList.concat(res.data.list)
						this.userList = tempArray;

						if (res.data.list.length < 15) {
							this.loadMoreText = "没有更多了"
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.back-view-class {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		position: absolute;


		.container {
			margin-bottom: 50px;

			.item-list {
				width: 90%;
				height: 40px;
				margin-top: 10px;
				background-color: #FFFFFF;
				line-height: 40px;
				float: left;

				.user-name {
					float: left;
					margin-left: 10px;
					width: 200px;
					color: #55aa7f;
					font-weight: 600;
					
					.relation-label{
						padding: 3px 5px;
						border-radius: 5px;
						font-size: 12px;
						background-color: #09BB07;
						margin-left: 10px;
						color: #FFFFFF;
					}
					
				}

				.user-phone {
					float: left;
					margin-left: 10px;
					color: #888888;
					font-size: 14px;
				}

				.user-compose {
					float: right;
					margin-right: 20px;
				}

			}

			.item-list-icon {
				width: 10%;
				float: right;
				height: 40px;
				background-color: #FFFFFF;
				margin-top: 10px;
				line-height: 40px;
			}

		}

		.add-button {
			position: fixed;
			bottom: 10px;
			width: calc(100% - 20px);
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			border-radius: 20px;
			margin-left: 10px;
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
