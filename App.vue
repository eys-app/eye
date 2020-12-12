<script>
	import {mapMutations} from 'vuex'
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
					if (loginData.userType == null || loginData.userType == '' || loginData.userType == undefined) {
						uni.switchTab({
							url: "/pages/patient/tabbar/home"
						});
					} else {
						
						if(loginData.userType == '0'){//患者
						
							uni.switchTab({
								url: "/pages/patient/tabbar/home"
							});
						}
						if(loginData.userType == '1'){//医生
							uni.redirectTo({
								url: "/pages/doctor/patientsListCard"
							});
						}
					}

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
			console.log('mounted');
			
			try {
				let loginData = uni.getStorageSync('loginData');
				if(loginData != ""){
					this.loginFunction(loginData)	
				}
						
			} catch (e) {
			
			}
			
			try {
				let acp = uni.getStorageSync('activePatient');
				if(acp != ""){
					this.changePatient(acp)			
				}
				
			} catch (e) {
			
			}
		},
		methods:{
			...mapMutations(['loginFunction',"changePatient"])
		}

	};
</script>

<style lang="scss">
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
