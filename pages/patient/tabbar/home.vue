<template>
	<view class="home-view-back">
		<view class="home-view">
			<view class="ids" :style="{height: idHeight + 'px'}">
				<swiper :style="{height: idHeight + 'px'}" indicator-dots indicator-color="#ffffff">
					<template v-for="item in dataAdList">
						<swiper-item @click="adClicked(item)">
							<image :src="item.imageUrl"></image>
						</swiper-item>
					</template>
				</swiper>
				<!-- <image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605611081019&di=044e91ee2faa631bbc6f31f0637b15a7&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180828%2Feb9101d0b4a74b009b64ed9030b5afda.jpeg"></image> -->
			</view>

			<view class="content-grid">
				<view class="cus-grid-item" @click="gridClicked('ai')">
					<image src="../../../static/images/class-ed.png"></image>
					<label>AI诊断</label>
				</view>
				<view class="cus-grid-item" @click="gridClicked('fuzhu')">
					<image src="../../../static/images/class-ed.png"></image>
					<label>辅助诊断</label>
				</view>
				<view class="cus-grid-item" @click="gridClicked('report')">
					<image src="../../../static/images/class-ed.png"></image>
					<label>诊断报告</label>
				</view>
			</view>

			<view class="class-list">
				<view class="class-list-title">
					<view class="title">医生小讲堂</view>
					<view class="sub-title">
						<label>了解眼睛知识，保护自身健康</label>
						<label @click="navigateToClassPage" style="float: right;">查看更多 》</label>
					</view>
				</view>

				<template v-for="item in listData">
					<view class="class-list-content" @click="articleClicked(item)">
						<image :src="item.imageUrl"></image>

						<view class="right-content">
							<view class="title">{{item.title}}</view>
							<!-- <view class="sub-title">{{item.detail}}</view> -->
							<view class="time">{{item.createDate}}</view>
						</view>
					</view>
				</template>


			</view>

		</view>
	</view>
</template>

<script>
	import {
		getForumList_interface,
		getAdvertisementList_interface
	} from '../../../api/index.js'
	export default {
		data() {
			return {
				idHeight: 0,
				listData: [],
				dataAdList: []
			}
		},
		mounted() {
			const _this = this;
			setTimeout(() => {
				uni.createSelectorQuery().in(_this).select('.ids').boundingClientRect(data => {
					_this.idHeight = data.width * 0.67;
				}).exec();
			}, 100)


			this.dataAdList = [];
			this.gainAdList()

			this.gainDoctorClassList()


		},
		methods: {
			gridClicked(type) {
				console.log(type)
				if (type == 'ai') {
					uni.navigateTo({
						url: "/pages/aidiagnosis/diagnosis"
					})
				}
				if (type == 'report') {
					uni.navigateTo({
						url: '/pages/report/reportlist'
					})
				}
				if(type == 'fuzhu'){
					uni.navigateTo({
						url: "/pages/usernumber/apply/applydoctor"
					})
				}
			},
			//医生小讲堂点击事件
			articleClicked(item) {
				uni.navigateTo({
					url: "/pages/patient/home/articledetail?item=" + encodeURIComponent(JSON.stringify(item))
				})

			},
			//获取医生小讲堂列表数据
			gainDoctorClassList() {
				this.listData = []
				getForumList_interface({
					pageNo: 1,
					pageSize: 5
				}).then(res => {
					if (res.status == 'SUCCESS') {
						this.listData = res.data.list
					}
				})
			},
			//查看更多-- 跳转到医生小课堂 tabbar
			navigateToClassPage() {
				uni.switchTab({
					url: "/pages/patient/tabbar/classdoc"
				})
			},

			//获取广告信息
			gainAdList() {
				getAdvertisementList_interface({
					pageNo: 1,
					pageSize: 3
				})
				.then(res => {
					if (res.status == 'SUCCESS') {
						this.dataAdList = res.data.list
					}
				})
			},
			adClicked(item){
				uni.navigateTo({
					url: "/pages/patient/home/articledetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-view-back {

		.home-view {
			margin: 10px;
			height: 100%;
			width: calc(100% - 20px);
			position: absolute;

			.ids {
				width: 100%;
				// border-radius: 10px;
				box-shadow: 2px 5px 5px #a7a7a7;

				image {
					width: 100%;
					height: 100%;
					// border-radius: 10px;
				}
			}

			.content-grid {

				width: 100%;
				height: 100px;
				display: flex;
				justify-content: center;

				.cus-grid-item {
					width: calc(100% / 3);
					height: 100%;
					text-align: center;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;

					image {
						width: 40px;
						height: 40px;
					}

					label {
						font-size: 14px;
						color: gray;
					}

				}

			}

			.class-list {
				width: 100%;

				.class-list-title {

					.title {
						font-size: 16px;
						font-weight: 700;
						color: black;
						padding-left: 10px;
						padding-bottom: 5px;
					}

					.sub-title {
						font-size: 12px;
						color: gray;
					}
				}


				.class-list-content {
					height: 75px;
					margin-top: 10px;
					border-bottom: 1px solid #F1F1F1;

					image {
						width: 60px;
						height: 60px;
						margin-top: 5px;
						border-radius: 5px;
						float: left;
					}

					.right-content {
						float: left;
						width: calc(100% - 85px);
						padding-left: 5px;

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
					}
				}

			}
		}
	}
</style>
