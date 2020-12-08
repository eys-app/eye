<!-- 医生的个人中心 -->
<template>
	<view class="view-page">
		<!-- 医生的个人中心 -->
		<view class="back-ground">
			<view class="clear-view">
			</view>
		</view>
		
			<view class="image-view"></view>
			
			<view class="center-view">
				<view class="content-item">
					<image src="../../static/images/check_box.svg"></image>
					<view class="content-text-view">医生认证</view>
					<view class="right-text">›</view>
				</view>
				
				<view class="content-item">
					<image src="../../static/images/check_box.svg"></image>
					<view class="content-text-view">医生认证</view>
					<view class="right-text">›</view>
				</view>
			</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.view-page{
		.back-ground{
			width: 100%;
			height: 120px;
			background-color: $backColor;
			.clear-view{
				width: 100%;
				height: 80px;
			}
		}
		
		.image-view{
			width: 100px;
			height: 100px;
			background-color: #FFFFFF;
			border-radius: 10px;
			margin-top: -50px;
			margin-left: calc((100% - 100px)/2);
			box-shadow: 0 0 10px #cccccc;
		}
		
		.center-view{
			width: calc(90% - 20px);
			// background-color: #67C23A;
			margin-top: 20px;
			border-radius: 5px;
			margin-left: 5%;
			padding: 0 10px;
			box-shadow: 10px 10px 10px #e3e3e3;
			
			.content-item{
				width: 100%;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #efefef;
				
				image{
					float: left;
					width: 20px;
					height: 20px;
					margin: 10px;
				}
				.content-text-view{
					float: left;
					line-height: 40px;
				}
				.right-text{
					float: right;
					font-size: 28px;
					margin-right: 10px;
					color: #cecece;
				}
			}
		}
	}
</style>
