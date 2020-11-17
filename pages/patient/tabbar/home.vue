<template>
	<view class="home-view-back">
		<view class="home-view">
			<view class="ids" :style="{height: idHeight + 'px'}">
				<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605611081019&di=044e91ee2faa631bbc6f31f0637b15a7&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180828%2Feb9101d0b4a74b009b64ed9030b5afda.jpeg"></image>
			</view>

			<view class="content-grid">
				<view class="cus-grid-item" @click="gridClicked('ai')">
					<image src="../../../static/class-ed.png"></image>
					<label>AI诊断</label>
				</view>
				<view class="cus-grid-item" @click="gridClicked('fuzhu')">
					<image src="../../../static/class-ed.png"></image>
					<label>辅助诊断</label>
				</view>
				<view class="cus-grid-item" @click="gridClicked('report')">
					<image src="../../../static/class-ed.png"></image>
					<label>诊断报告</label>
				</view>
			</view>

			<view class="class-list">
				<view class="class-list-title">
					<view class="title">医生小讲堂</view>
					<view class="sub-title">了解眼睛知识，保护自身健康</view>
				</view>

				<template v-for="item in listData">
					<view class="class-list-content" @click="articleClicked">
						<image :src="item.image"></image>

						<view class="right-content">
							<view class="title">{{item.title}}</view>
							<view class="sub-title">{{item.detail}}</view>
							<view class="time">{{item.time}}</view>
						</view>
					</view>
				</template>


			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idHeight: 0,
				listData: [{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605610299248&di=b9807d14070f6563a2610ae1684ff4ae&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F17%2Fw1080h537%2F20180410%2FPERp-fyzeyqa0605359.jpg',
						title: '近视手术后多久可以用眼？',
						detail: '绿色是自然界常见的颜色之一，是令人伤心悦目的颜色之一，大家都知道绿色可保护眼睛',
						time: '2020-11-17 09:18'
					},
					{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605610299248&di=b9807d14070f6563a2610ae1684ff4ae&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F17%2Fw1080h537%2F20180410%2FPERp-fyzeyqa0605359.jpg',
						title: '高血压患者为什么要定期检查眼底？',
						detail: '我们都知道高血压对血管的影响最大，眼部亦有血管，而高血压会导致动脉硬化。',
						time: '2020-11-14 05:43'
					},
					{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605610299248&di=b9807d14070f6563a2610ae1684ff4ae&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F17%2Fw1080h537%2F20180410%2FPERp-fyzeyqa0605359.jpg',
						title: '眼科检查这一项“没必要”就错了！',
						detail: '绿色是自然界常见的颜色之一，是令人伤心悦目的颜色之一，大家都知道绿色可保护眼睛',
						time: '2020-12-17 09:18'
					},
					{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605610299248&di=b9807d14070f6563a2610ae1684ff4ae&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F17%2Fw1080h537%2F20180410%2FPERp-fyzeyqa0605359.jpg',
						title: '眼科检查这一项“没必要”就错了！',
						detail: '绿色是自然界常见的颜色之一，是令人伤心悦目的颜色之一，大家都知道绿色可保护眼睛',
						time: '2020-12-17 09:18'
					},
					{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605610299248&di=b9807d14070f6563a2610ae1684ff4ae&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F17%2Fw1080h537%2F20180410%2FPERp-fyzeyqa0605359.jpg',
						title: '眼科检查这一项“没必要”就错了！',
						detail: '绿色是自然界常见的颜色之一，是令人伤心悦目的颜色之一，大家都知道绿色可保护眼睛',
						time: '2020-12-17 09:18'
					},
					{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605610299248&di=b9807d14070f6563a2610ae1684ff4ae&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F17%2Fw1080h537%2F20180410%2FPERp-fyzeyqa0605359.jpg',
						title: '眼科检查这一项“没必要”就错了！',
						detail: '绿色是自然界常见的颜色之一，是令人伤心悦目的颜色之一，大家都知道绿色可保护眼睛',
						time: '2020-12-17 09:18'
					}
				]
			}
		},
		mounted() {
			uni.createSelectorQuery().in(this).select('.ids').boundingClientRect(data =>{
				
				this.idHeight = data.width * 0.67;
			}).exec();

		},
		methods: {
			gridClicked(type) {
				console.log(type)
				if (type == 'ai') {
					uni.navigateTo({
						url: "/pages/aidiagnosis/diagnosis"
					})
				}
			},
			articleClicked() {
				uni.navigateTo({
					url: "/pages/patient/home/articledetail"
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
				background-color: #c7eeff;
				border-radius: 10px;
				box-shadow: 2px 5px 5px #a7a7a7;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10px;
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
					height: 95px;
					margin-top: 10px;
					border-bottom: 1px solid #F1F1F1;

					image {
						width: 80px;
						height: 80px;
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
							height: 20px;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
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
							margin-top: 7px;
						}
					}
				}

			}
		}
	}
</style>
