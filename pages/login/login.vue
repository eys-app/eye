<template>

	<view class="login-class">
		<view style="margin-top: 100px;">
			<button type="primary" @click="enterDocPage" size="mini">进入医生页面</button>
			<button type="warn" @click="enterPriPage" size="mini">进入患者页面</button>
		</view>
	</view>



</template>

<script>
	export default {
		methods: {
			enterDocPage() {
				uni.navigateTo({
					url: "/pages/doctor/apply"
				})
			},
			enterPriPage() {
				uni.switchTab({
					url: "/pages/patient/docclass"
				})
			}
		}
	}
</script>

<style>
	.login-class {
		background-color: #0A98D5;
		position: fixed;
		width: 100vw;
		height: 100vh;
	}
</style>
