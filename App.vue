<script>
	import {mapState} from "vuex";
	export default {
		
		onLaunch: function() {
			console.log("在这判断是否登录==",this.loginData);
			
			// if(this.loginData == null){
			// 	uni.switchTab({
			// 		url: '/pages/patient/tabbar/home'
			// 	});
			// }
			// else{
			// 	uni.navigateTo({
			// 		url: "/pages/doctor/apply"
			// 	});
			// }
			
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		mounted() {
			console.log('aaa');
		},
		computed:{
			...mapState(["loginData"])
		}
	};
</script>

<style>
	
	/* #ifdef APP-PLUS-NVUE*/
	@import './commen/uni.css';
	page {
	    background-color: #F4F5F6;
	    height: 100%;
	    font-size: 28rpx;
	    line-height: 1.8;
	}
	/* #endif*/
	
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	
	

	/* #endif */
</style>
