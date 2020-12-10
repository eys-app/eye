<template>
	<view class="view-artical">
		<view class="artical-title">{{aTitle}}{{aTitle}}</view>
		<view class="artical-time">{{aTime}}</view>
		<u-parse :content="dataArticle"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataArticle: '',
				aTitle: '',
				aTime: ''
			}
		},
		onLoad:function(option){
			this.dataArticle = JSON.parse(decodeURIComponent(option.item)).content
			this.aTitle = JSON.parse(decodeURIComponent(option.item)).title
			this.aTime = JSON.parse(decodeURIComponent(option.item)).createDate
		}
	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css");

	.view-artical {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.artical-title{
		margin: 10px;
		font-size: 16px;
		font-weight: 700;
		text-align: center;
	}
	.artical-time{
		margin: 10px;
		font-size: 14px;
		color: gray;
	}
	.wxParse{
		width: calc(100% - 20px);
		padding: 10px;
	}
</style>
