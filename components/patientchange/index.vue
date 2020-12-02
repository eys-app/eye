<template>
	<view>
		<view @click="showPopup" class="selected-patient">
			<template v-if="activeP != null">
				<view class="pa-text-title">当前问诊人:</view>
				<view class="pa-text-name">{{activeP.name}}</view>
			</template>
			<template v-else>
				请选择问诊人
			</template>
			<uni-icons class="pa-compose" type="compose" size="20" color="#a5a5a5"></uni-icons>
		</view>

		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="back-model-view">
				<view class="content-model-view">
					<view class="title">选择问诊人</view>
					<view class="text-view">请先选择问诊人，系统将以该问诊人作为患者进行诊断、查询等操作</view>
					<view class="sub-title">当前问诊人:</view>
					<view class="patient-name">
						<template v-if="activeP != null">
							{{activeP.name}}
						</template>

						<uni-icons class="compose-class" type="compose" size="20" color="#a5a5a5" @click="changePatient"></uni-icons>
					</view>
					<button class="submit-button" :type="submitDisabled ? 'default' : 'primary'" :disabled="submitDisabled" @click="submitClicked">确定</button>
				</view>
			</view>
		</uni-popup>

	</view>



</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				submitDisabled: false, //判断确定按钮是否禁止点击，false可点击，true不可点击
				activeP: null, //当前问诊人信息
			}
		},
		onShow() {
			console.log('选择问诊人页面-show')
		},
		computed: {
			...mapState(["activePatient"])
		},
		mounted() {
			this.activeP = this.activePatient
			if (this.activeP == null) {
				this.submitDisabled = true
			} else {
				this.submitDisabled = false
			}
		},
		watch: {
			activePatient: {
				handler(n, o) {
					this.activeP = this.activePatient
					if (this.activeP == null) {
						this.submitDisabled = true
					} else {
						this.submitDisabled = false
					}
				},
				deep: true
			}
		},

		methods: {
			//选择问诊人
			changePatient() {
				uni.navigateTo({
					url: '/pages/patient/patientmanager/listContact'
				})
			},
			//确定
			submitClicked() {
				this.$refs.popup.close()
			},

			showPopup() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss">
	.selected-patient {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #FFFFFF;
		border-bottom: 1px solid #F1F1F1;
		box-shadow: 5px 5px 10px #acf2d9;
		color: gray;
		padding-left: 10px;
		font-size: 14px;

		.pa-text-title {
			float: left;
			font-size: 14px;
			color: gray;
			margin-left: 10px;
			width: 90px;
		}

		.pa-text-name {
			color: $backColor;
			font-size: 18px;
			font-weight: 700;
			float: left;
		}

		.pa-compose {
			float: right;
			margin-right: 20px;
		}


	}

	.back-model-view {
		display: flex;
		justify-content: center;
		align-items: center;

		.content-model-view {
			width: 80%;
			height: 40%;
			background-color: #FFFFFF;
			border-radius: 5px;

			.text-view {
				font-size: 12px;
				color: #FFFFFF;
				padding: 5px;
			}

			.title {
				text-align: center;
				padding: 10px 0;
				font-size: 14px;
				font-weight: 600;
				border-bottom: 1px solid #eaeef3;
			}

			.sub-title {
				text-align: left;
				padding: 5px 0 5px 20px;
				font-size: 14px;
				color: gray;
				margin-top: -20px;
			}

			.patient-name {
				text-align: center;
				padding: 5px 0;
				font-size: 22px;
				color: $backColor;
				font-weight: 800;
			}

			.compose-class {
				margin-left: 20px;
				color: #CCCCCC;
			}

			.submit-button {
				width: 80%;
				margin-top: 20px;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				margin-bottom: 20px;
				border: none;
			}

		}

	}
</style>
