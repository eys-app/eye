<script>
	
	export default {

		onLaunch: function() {
			

			try {
				let loginData = uni.getStorageSync('loginData');
				console.log("在这判断是否登录==", loginData);
				if (loginData == null || loginData == '' || loginData == undefined) {
					uni.redirectTo({
						url: '/pages/login/login'
					});
				} else {
					uni.switchTab({
						url: "/pages/patient/tabbar/home"
					});
				}
			} catch (e) {
				//TODO handle the exception
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}



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
