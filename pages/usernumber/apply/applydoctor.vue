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
					<view class="tag-red">*</view>手机号码
				</view>
				<input placeholder="请输入手机号码" v-model="phoneNumber" type="number" />
			</view>
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>工作单位
				</view>
				<input placeholder="请输入工作单位" v-model="workPlace" />
			</view>
			<view class="input-fa-view" @click="showActionDoctorType">
				<view class="label-left">
					<view class="tag-red">*</view>医师职称
				</view>
				<view class="input-button">{{doctorTypeValue.work}} ﹥</view>
			</view>


		</view>
		<view class="card-view">

			<view class="image-title-left">
				<label style="color: red;margin-right: 5px;">*</label>
				<label>请上传头像</label>
			</view>

			<view class="upload-image">

				<template v-for="(item, index) in imageUser.path">
					<view class="image-item" :style="{height: imageItemHeight}">
						<view class="remove-image" @click="chooseImageimageuser(index)"></view>
						<image :src="item" :data-src="item" @tap="previewImage"></image>
					</view>
				</template>

				<view class="image-item add-image" v-show="imageUser.path.length == 0" :style="{height: imageItemHeight}" @click="chooseImageUser"></view>
			</view>



			<view class="image-title-left">
				<label style="color: red;margin-right: 5px;">*</label>
				<label>请上传执业医师证书照片或其他证件照片</label>
				<label style="float: right;margin-right: 10px;">{{imageList.length}} / 9</label>
			</view>


			<view class="upload-image">

				<template v-for="(item, index) in imageList.path">
					<view class="image-item" :style="{height: imageItemHeight}">
						<view class="remove-image" @click="removeImageWithIndex(index)"></view>
						<image :src="item" :data-src="item" @tap="previewImage"></image>
					</view>
				</template>

				<view class="image-item add-image" :style="{height: imageItemHeight}" @click="chooseImage"></view>
			</view>

			<imgUpload :imgArr="imgArray" imgCount="9" ref="imgUpload" url="http://192.168.4.195:8980/mobile/doctorCertification"></imgUpload>



		</view>

		<button type="primary" class="submit-button" @click="submitClicked">确认提交</button>


	</view>
</template>

<script>
	import {
		doctorCertification_interface,
		getDoctorWorkList_interface
	} from '../../../api/index.js'
	import {
		sexValueToNumber,
		sexnumberToValue
	} from '../../../commen/common.js'
	import {
		mapState
	} from 'vuex'

	import imgUpload from '../../../components/poiuy-uImgUpload/imgUpload.vue';

	import http from '../../../commen/axiosrequest.js'

	export default {
		components: {
			imgUpload
		},

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
				doctorType: ['住院医师', '主治医师', '副主任医师', '主任医师'],
				doctorTypeValue: {
					work: '请选择'
				}, //医师职称
				imageList: {
					path: [],
					files: []
				}, //上传的证件照片
				imageItemHeight: 0,
				workPlace: '', //工作单位
				imageUser: {
					path: [],
					files: []
				},

				imgArray: []



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

			this.gainDoctorType()


		},
		computed: {
			...mapState(['loginData'])
		},
		mounted() {
			const _this = this;
			setTimeout(() => {
				uni.createSelectorQuery().in(_this).select('.image-item').boundingClientRect(data => {
					_this.imageItemHeight = data.width + 'px'

				}).exec()
			}, 100)
		},
		methods: {

			gainDoctorType() {
				this.doctorType = []
				getDoctorWorkList_interface().then(res => {
					console.log('res===', res)
					if (res.status == 'SUCCESS') {
						this.doctorType = res.data
					} else {
						const that = this;
						setTimeout(() => {
							that.gainDoctorType()
						}, 500)
					}
				})
			},


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
				let dataList = []
				for (var i = 0; i < this.doctorType.length; i++) {
					dataList.push(this.doctorType[i].work) 
				}
				uni.showActionSheet({
					itemList: dataList,
					success: function(res) {
						that.doctorTypeValue = that.doctorType[res.tapIndex]
						// console.log(',,,,,,,===',that)
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
				if (!this.checkInputValue(this.phoneNumber)) {
					uni.showToast({
						title: "手机号码不得为空",
						icon: "none"
					})
					return;
				}
				if (!this.checkInputValue(this.workPlace)) {
					uni.showToast({
						title: "工作单位不得为空",
						icon: "none"
					})
					return;
				}
				if (this.doctorTypeValue.id == undefined || this.doctorTypeValue.id == null) {
					uni.showToast({
						title: "医师职称不得为空",
						icon: "none"
					})
					return;
				}
				if (this.imageUser.length == 0) {
					uni.showToast({
						title: "头像不得为空",
						icon: "none"
					})
					return;
				}
				if (this.imageList.length == 0) {
					uni.showToast({
						title: "证件照片不得为空",
						icon: "none"
					})
					return;
				}
				
					/*



				let param = new FormData();

				param.append('userId', this.loginData.id);
				param.append('nickName', this.name);
				param.append('phone', this.phoneNumber);
				param.append('workAddr', this.workPlace)
				param.append('workId', this.doctorTypeValue);
				param.append('photoFile', this.imageUser.files[0]);
				for (var i = 0; i < this.imageList.length; i++) {
					param.append('certificateFile', this.imageList.files[i]);
				}
				
				
				http.post('http://192.168.4.195:8980/mobile/doctorCertification',param).then(res =>{
					console.log('res===',res)
				})
				//*/

				// uni.uploadFile({
				// 	url: 'http://192.168.4.195:8980/mobile/doctorCertification', //仅为示例，非真实的接口地址
				// 	filePath: tempFilePaths[0],
				// 	name: 'file',
				// 	formData: {
				// 		'user': 'test'
				// 	},
				// 	success: (uploadFileRes) => {
				// 		console.log(uploadFileRes.data);
				// 	}
				// });

				// console.log('param====', param.key())


				// doctorCertification_interface(JSON.stringify(param)).then(res => {
				// 	console.log('aaaaaaaaaa======', res)
				// })









			},

			//检查数据是否为空
			checkInputValue(value) {

				if (value == undefined || value == null || value == "" || value.length == 0 || value == '请选择') {
					return false;
				} else {
					return true;
				}

			},

			chooseImage: async function() {
				const that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有

					success: function(res) {
						console.log('ssssss===', res)
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							that.imageList.path.push(res.tempFilePaths[i])
						}
						for (var i = 0; i < res.tempFiles.length; i++) {
							that.imageList.files.push(res.tempFiles[i])
						}

					}
				})


			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList.path
				})
			},

			removeImageWithIndex(index) {
				this.imageList.path.splice(index, 1)
				this.imageList.files.splice(index, 1)
			},

			chooseImageimageuser: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://unidemo.dcloud.net.cn/upload',
							filePath: imageSrc,
							fileType: 'image',
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
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


			chooseImageUser() {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						// for (var i = 0; i < res.tempFilePaths.length; i++) {
						// 	that.imageUser.path.push(res.tempFilePaths[i])
						// }
						// for (var i = 0; i < res.tempFiles.length; i++) {
						// 	that.imageUser.files.push(res.tempFiles[i])
						// }

						console.log('res==', res)


						let files = res.tempFilePaths[0]
						console.log('aaaa==', files)

						uni.uploadFile({
							url: 'http://192.168.4.195:8980/mobile/fileUpload', //仅为示例，非真实的接口地址
							filePath: files,
							name: 'multipartFile',
							formData: {

							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});


						// uni.uploadFile({
						// 	url: 'http://192.168.4.195:8980/mobile/uploadFile',
						// 	filePath: res.tempFilePaths[0],
						// 	name: 'file',
						// 	formData: {
						// 		'user': 'test'
						// 	},
						// 	success: (uploadFileRes) => {
						// 		console.log('图片文件上传结果=====', uploadFileRes)
						// 	}
						// })


					}
				})
			},
			removeImageUserWithIndex(index) {
				this.imageUser.path.splice(index, 1)
				this.imageUser.files.splice(index, 1)
			}






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




			.image-title-left {

				padding: 5px;
				font-size: 12px;
			}

			.upload-image {
				width: calc(100% - 20px);
				padding: 10px;

				display: flex;
				justify-content: flex-start;
				// align-content: space-between;
				flex-wrap: wrap;



				.image-item {
					width: calc((100% - 25px) / 3);
					margin-bottom: 10px;
					border: 1px solid #F2F6FC;
					margin-right: 6px;

					.remove-image {
						position: absolute;
						width: 20px;
						height: 20px;
						margin-left: calc((100% - 25px) / 3 - 28px);
						background-color: #FFFFFF;
						border-radius: 50%;
						z-index: 9;
						background-image: url(../../../static/images/close.png);
						background-repeat: no-repeat;
						background-position: center;
						background-size: 100%;
						margin-top: -5px;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}

				.add-image {
					border: 1px solid #d9d9d9;
					text-align: center;
					background-image: url(../../../static/images/image-sel.png);
					background-repeat: no-repeat;
					background-size: 60%;
					background-position: center;
				}

			}


		}

		.submit-button {
			border-radius: 20px;
			margin-top: 30px;
			margin-bottom: 30px;
		}





	}
</style>
