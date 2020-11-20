<!-- 医生端的病人库管理 -->
<template>
	<view>
		病人库管理页面
		<view class="topBar">
		<view class="shaixuan"> 筛选</view>
		<view class="shijian" @click="getTime"> 测评时间</view>
		<view class="qingzhong"> 症状轻重</view>
		<view class="zhidao"> 未指导</view>
		</view>
		
		<view class="contain">
			我是内容
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				timeList:['A','B','C']
			}
		},
		methods: {
			getTime(){
				uni.showActionSheet({
					itemList:this.timeList,
					success:function(res){
						console.log('选中了第'+(res.tapIndex+1)+'个按钮');
					}
				})
			}
		}
	}
</script>

<style>
	.topBar{
		display: flex;
		width: 100%;
	}
	.contain{
		background-color: #000;
		color: #FFFFFF;
	}
	.shaixuan{
		background-color: #0A98D5;
		width: 25%;
	}
	.shijian{
		background-color: #09BB07;
		width: 25%;
	}
	.qingzhong{
		background-color:#E6A23C;
		width: 25%;
	}
	.zhidao{
		background-color: #F56C6C;
		width: 25%;
	}

</style>
