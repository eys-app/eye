<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<template v-for="(item, index) in newsList">
			<view class="class-list-content" @click="articleClicked(item)">
				<image class="iamge-left" :src="item.imageUrl"></image>

				<view class="right-content">
					<view class="title">{{item.title}}</view>
					<view class="time">{{item.createDate}}</view>
				</view>

			</view>
		</template>
		<view class="load-more-text">{{loadMoreText}}</view>
	</view>
</template>
<script>

	import {
		getForumList_interface,
		getForumTagList_interface
	} from '../../../api/index.js'

	export default {

		data() {
			return {
				newsList: [
					// {
					// 	createDate: "2020-12-08 15:12:13",
					// 	imageUrl: "http://114.115.201.77/group1/M00/00/07/wKgBB1_PJ06AcCZQAAAreash7tM060.jpg",
					// 	title: "韩国总统文在寅首次表态：考虑加入CPTPP",
					// }

				],
				cacheTab: [],
				tabIndex: 0,
				tabBars: [],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
				pageNo: 1,
				loadMoreText: '上拉加载更多...',
				canloadmore: true
			}
		},
		onPullDownRefresh() {
			this.newsList = []
			this.pageNo = 1;
			this.gainDoctorClassList()
		},
		onReachBottom() {
			console.log('more')
			if (this.canloadmore) {
				this.pageNo += 1;
				this.gainDoctorClassList()
			}

		},
		onLoad() {
			this.gainDoctorClassTags()
		},

		methods: {

			//获取小讲堂tag列表
			gainDoctorClassTags() {
				this.tabBars = []
				getForumTagList_interface().then(res => {
					if (res.status == 'SUCCESS') {
						this.tabBars = res.data
						this.gainDoctorClassList()

					}
				})
			},
			//获取医生小讲堂列表数据
			gainDoctorClassList() {

				getForumList_interface({
					forumTagId: this.tabBars[this.tabIndex].id,
					pageNo: this.pageNo,
					pageSize: 15
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.status == 'SUCCESS') {
						let tempArray = res.data.list
						this.newsList = this.newsList.concat(tempArray)

						if (this.newsList.length < res.data.count) {
							this.canloadmore = true;
							this.loadMoreText = '上拉加载更多...'
						}
						if (this.newsList.length == res.data.count) {
							this.canloadmore = false;
							this.loadMoreText = '没有更多了'
						}
					}
				})
			},
			//医生小讲堂点击事件
			articleClicked(item) {
				uni.navigateTo({
					url: "/pages/patient/home/articledetail?item=" + encodeURIComponent(JSON.stringify(item))
				})

			},

			
			ontabtap(e) {
				console.log('ontabtap====',e)
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},

			switchTab(index) {
				console.log('switchTab==', index)


				this.tabIndex = index;
				this.newsList = []
				this.gainDoctorClassList()
			},
			
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.line-h {
		height: 1rpx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		flex: 1;
		flex-direction: row;
	}

	.scroll-v {
		flex: 1;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		width: 750rpx;
	}

	.update-tips {
		position: absolute;
		left: 0;
		top: 41px;
		right: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #FDDD9B;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.update-tips-text {
		font-size: 14px;
		color: #ffffff;
	}

	.refresh {
		width: 750rpx;
		height: 64px;
		justify-content: center;
	}

	.refresh-view {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

	.loading-text {
		margin-left: 2px;
		font-size: 16px;
		color: #999999;
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}

	.loading-more-text {
		font-size: 28rpx;
		color: #999;
	}

	.class-list-content {
		height: 75px;
		margin-top: 10px;
		border-bottom: 1px solid #F1F1F1;
	}

	.iamge-left {
		width: 60px;
		height: 60px;
		margin-top: 5px;
		border-radius: 5px;
		float: left;
		margin-left: 10px;
	}

	.right-content {
		float: left;
		padding-left: 10px;
		height: 75px;
		width: calc(100% - 90px);
	}

	.title {
		font-size: 14px;
		font-weight: 600;
		padding-top: 5px;
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.sub-title {
		color: gray;
		font-size: 12px;
		height: 33px;
		padding-top: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.time {
		font-size: 12px;
		color: #b4b4b4;
		height: 18px;
		line-height: 18px;
		// margin-top: 5px;
	}

	.load-more-text {
		text-align: center;
		font-size: 12px;
		color: gray;
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
