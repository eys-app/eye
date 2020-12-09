<template>
	<view class="view-page">
		<view class="card-view" style="margin-top: 0;">
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>姓名
				</view>
				<input placeholder="请输入真实姓名" v-model="name" />
			</view>

			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>身份证
				</view>
				<input placeholder="提交后不可修改,请认真填写" v-model="idCard" />
			</view>

			<view class="input-fa-view" @click="showActionSex">
				<view class="label-left">
					<view class="tag-red">*</view>性别
				</view>
				<view class="input-button">{{sexValue}} ﹥</view>
				
			</view>

			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>年龄
				</view>
				<input placeholder="请输入年龄" v-model="age" type="number" />
			</view>


		</view>
		<view class="card-view">
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>工作单位
				</view>
				<input placeholder="请输入工作单位" v-model="phoneNumber" type="number" />
			</view>
			<view class="input-fa-view" @click="showActionDoctorType">
				<view class="label-left">
					<view class="tag-red">*</view>职称
				</view>
				<view class="input-button">{{doctorTypeValue}} ﹥</view>
			</view>

			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">点击可预览选好的图片</view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
									</view>
								</block>
								<view class="uni-uploader__input-box">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<button type="primary" class="submit-button" @click="submitClicked">确认提交</button>


	</view>
</template>

<script>
	import {
		addPatient
	} from '../../../api/index.js'
	import {
		sexValueToNumber
	} from '../../../commen/common.js'
	import {
		mapState
	} from 'vuex'
	import {
		sexnumberToValue
	} from '../../../commen/common.js'
	export default {

		data() {
			return {
				sexList: ["男", "女"],
				sexValue: '请选择', //性别
				name: "", //姓名
				idCard: "", //身份证号码
				age: "", //年龄
				phoneNumber: "", //手机号码
				relation: "", //与患者关系
				socialCard: "", //社保卡号
				showType: true,
				addOrChange: '', //判断是新增还是修改
				doctorType:['住院医师','主治医师','副主任医师','主任医师'],
				doctorTypeValue: '请选择',
				imageList: [],
			}
		},
		onLoad: function(option) {
			this.addOrChange = option.type;
			if (option.type == 'A') {
				this.showType = false
			}
			if (option.type == 'C') {
				this.showType = false

				let item = JSON.parse(decodeURIComponent(option.item))
				this.name = item.name;
				this.idCard = item.idCard;
				this.sexValue = sexnumberToValue(item.sex);
				this.age = item.age;
				this.phoneNumber = item.phone;
				this.relation = item.patientRelation;
				this.socialCard = item.socialSecurityCard;
			}



		},
		computed: {
			...mapState(['loginData'])
		},
		methods: {


			//选择性别
			showActionSex() {
				const that = this;
				uni.showActionSheet({
					itemList: ["男", "女"],
					success: function(res) {
						that.sexValue = that.sexList[res.tapIndex]
					},
					fail: function() {
							
					}
				})
				
			},
			//选择医师类型
			showActionDoctorType() {
				const that = this;
				uni.showActionSheet({
					itemList: this.doctorType,
					success: function(res) {
						that.doctorTypeValue = that.doctorType[res.tapIndex]
					}
				})
			},

			//跳转到首页
			navgaitionToHomePage() {
				uni.switchTab({
					url: "/pages/patient/tabbar/home"
				})
			},

			/**
			 * 提交事件
			 * 1、判断各项是否为空
			 * **/
			submitClicked() {

				if (!this.checkInputValue(this.name)) {
					uni.showToast({
						title: "姓名不得为空",
						icon: "none"
					})
					return;
				}
				if (!this.checkInputValue(this.idCard)) {
					uni.showToast({
						title: "身份证号码不得为空",
						icon: "none"
					})
					return;
				}
				if (!this.checkInputValue(this.sexValue)) {
					uni.showToast({
						title: "性别不得为空",
						icon: "none"
					})
					return;
				}
				if (!this.checkInputValue(this.age)) {
					uni.showToast({
						title: "年龄不得为空",
						icon: "none"
					})
					return;
				}
				if (!this.checkInputValue(this.phoneNumber)) {
					uni.showToast({
						title: "手机号码不得为空",
						icon: "none"
					})
					return;
				}
				if (!this.checkInputValue(this.relation)) {
					uni.showToast({
						title: "与患者关系不得为空",
						icon: "none"
					})
					return;
				}


				let numberSex = sexValueToNumber(this.sexValue)

				if (this.addOrChange) {
					let obj = {
						userId: this.loginData.id,
						name: this.name,
						sex: numberSex,
						age: this.age,
						phone: this.phoneNumber,
						idCard: this.idCard,
						patientRelation: this.relation,
						socialSecurityCard: this.socialCard
					}
					console.log("====",obj)
					
					addPatient({
						userId: this.loginData.id,
						name: this.name,
						sex: numberSex,
						age: this.age,
						phone: this.phoneNumber,
						idCard: this.idCard,
						patientRelation: this.relation,
						socialSecurityCard: this.socialCard
					}).then(res => {
						console.log(res)
						if (res.status == 'SUCCESS') {
							uni.$emit('updateParientList')
							uni.navigateBack({})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					})
				}





			},

			//检查数据是否为空
			checkInputValue(value) {

				if (value == undefined || value == null || value == "" || value.length == 0) {
					return false;
				} else {
					return true;
				}

			},
			
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
			
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		
		
		
		
		
		
		}
	}
</script>

<style lang="scss">
	.view-page {
		padding: 10px;
		background-color: #F0F0F0;
		height: 100%;
		width: calc(100% - 20px);
		position: absolute;

		.card-view {
			margin-top: 10px;
			width: 100%;
			background-color: #FFFFFF;

			.input-fa-view {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #f4f5f6;

				.label-left {
					float: left;
					width: 100px;
					height: 100%;
					line-height: 40px;
					margin-left: 10px;
					font-size: 14px;

					.tag-red {
						float: left;
						color: red;
					}
				}

				input {
					float: right;
					height: 40px;
					text-align: right;
					margin-right: 10px;
					font-size: 14px;
					width: calc(100% - 120px);
				}

				.input-button {
					float: right;
					height: 40px;
					line-height: 40px;
					color: black;
					text-align: right;
					margin-right: 10px;
					font-size: 14px;
					width: calc(100% - 120px);
				}
			}
		}

		.submit-button {
			border-radius: 20px;
			margin-top: 30px;
		}





	}
</style>
