<!-- 病人库管理页面的病人信息 card -->
<template>
	<view>
		
		<uni-card isShadow="true">

			<view class="card">
				<view class="one">
					<view class="patientName">
						杨洋
					</view>
					<view class="patientSex">
						男
					</view>
					<view class="patientOld">
						32岁
					</view>
					<view class="zhidao">
						<view>
							未指导
						</view>
					</view>
				</view>

				<view class="two">

					<view class="tag">
						标签标签
					</view>
					
					<view class="tag">
						标签标签
					</view>
					<view class="tag">
						标签标签
					</view>
					<view class="tag">
						标签标签
					</view>
					<view class="tag">
						标签标签
					</view>
					<view class="tag">
						标签标签
					</view>
					<view class="tag">
						标签标签
					</view>

				</view>

				<view class="three">
					上次测评时间：2020-09-20
				</view>

			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	

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
		.tag {
			background-color: #8A6DE9;
			margin-right: 20rpx;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
		}
	}
	
	.three{
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
</style>
