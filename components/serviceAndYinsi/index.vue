<template>
	<view class="back-view" v-show="showService">
		<view class="content">
			<view class="title">服务条款和隐私政策</view>
			<view class="detail">请你务必审慎阅读、充分理解“服务条款”和“隐私政策”各条框，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br>
			你可阅读<label @click="navagiteToService">《服务条款》</label>和<label @click="navagiteToYinsi">《隐私政策》</label>了解详细信息。如果你同意，请点击下面的按钮开始接受我们的服务。</view>
			
			<view class="button-label">
				<view style="float: left;" @click="refuseAccept">暂不接受</view>
				<view style="float: right;" @click="acceptService">我知道了</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showService: false,
			}
		},
		mounted() {
			try{
				const strShow = uni.getStorageSync('showYS');
				console.log('show111===',strShow)
				if(strShow == undefined || strShow == null || strShow == ""){
					this.showService = true;
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		methods:{
			refuseAccept(){
				plus.runtime.quit()
			},
			acceptService(){
				this.showService = false;
				try {
				    uni.setStorageSync('showYS', 'Y');
				} catch (e) {
				    // error
				}
			},
			navagiteToService(){
				uni.navigateTo({
					url: "/pages/patient/minepage/service"
				})
			},
			navagiteToYinsi(){
				uni.navigateTo({
					url: "/pages/patient/minepage/yinsi"
				})
			},
		}
	}
</script>

<style lang="scss">
	.back-view{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.8);
		z-index: 9;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		.content{
			width: 85%;

			background-color: #FFFFFF;
			border-radius: 10px;
			padding: 10px;
			
			.title{
				text-align: center;
				font-size: 18px;
				font-weight: 800;
			}
			.detail{
				margin-top: 20px;
				
				label{
					color:  #5555ff;
					text-decoration: underline;
				}
			}
			
			.button-label{
				margin-top: 20px;
				color: #6A85F8;
				margin-bottom: 20px;
				padding-bottom: 20px;
			}
		}
	}
</style>
