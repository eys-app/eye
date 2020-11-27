<template>
	<view class="doctor-apply">
		<view class="top-back">
			<view class="enpty-class"></view>
			<uni-steps class="step-class" :options="stepsOptions" activeColor="#0fe7ff" :active="activeIndex"></uni-steps>
		</view>


		<view class="content-view">

		</view>
		<button @click="nextSteps">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stepsOptions: [{
						"title": "第1步",
					},
					{
						"title": "第2步",
					},
					{
						"title": "第3步",
					},
					{
						"title": "第4步",
					}
				],
				activeIndex: 0
			}
		},
		methods: {
			nextSteps() {
				if (this.activeIndex != 3) {
					this.activeIndex += 1;
				} else {
					this.activeIndex = 0;
				}


			}
		}
	}
</script>

<style lang="scss">
	.doctor-apply {
		width: 100%;
		height: 100%;

		.top-back {
			width: 100%;
			height: 200px;
			background-color: #6a85f8;

			.enpty-class {
				width: 100%;
				height: 50px;
				background-color: transpent;
			}

		}

		.content-view {
			width: 90%;
			height: 300px;
			background-color: white;
			margin-left: 5%;
			border-radius: 10px;
			box-shadow: 0px 0px 30px #6a85f8;
			margin-top: -30px;
		}

		button {
			margin-top: 40px;
		}


	}
</style>
