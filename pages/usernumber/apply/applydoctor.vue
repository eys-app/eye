<template>
	<view class="view-page">
		
		<view class="apply-result">
			<label>您的申请已提交，当前状态为:</label>
			<label>已通过</label>
		</view>
		
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

				<template v-for="(item, index) in imageUser">
					<view class="image-item" :style="{height: imageItemHeight}">
						<view class="remove-image" @click="removeImageUserWithIndex(index)"></view>
						<image :src="item" :data-src="item" @tap="previewImage"></image>
					</view>
				</template>

				<view class="image-item add-image" v-show="imageUser.length == 0" :style="{height: imageItemHeight}" @click="chooseImageUser"></view>
			</view>



			<view class="image-title-left">
				<label style="color: red;margin-right: 5px;">*</label>
				<label>请上传执业医师证书照片或其他证件照片</label>
				<label style="float: right;margin-right: 10px;">{{imageList.length}} / 9</label>
			</view>


			<view class="upload-image">

				<template v-for="(item, index) in imageList">
					<view class="image-item" :style="{height: imageItemHeight}">
						<view class="remove-image" @click="removeImageWithIndex(index)"></view>
						<image :src="item" :data-src="item" @tap="previewImage"></image>
					</view>
				</template>

				<view class="image-item add-image" :style="{height: imageItemHeight}" @click="chooseImage"></view>
			</view>

		</view>

		<button type="primary" class="submit-button" @click="submitClicked">确认提交</button>


	</view>
</template>

<script>
	import {
		doctorCertification_interface,
		getDoctorWorkList_interface,
		BaseUrl
	} from '../../../api/index.js'
	import {
		sexValueToNumber,
		sexnumberToValue
	} from '../../../commen/common.js'
	import {
		mapState
	} from 'vuex'


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
				doctorType: ['住院医师', '主治医师', '副主任医师', '主任医师'],
				doctorTypeValue: {
					work: '请选择'
				}, //医师职称
				imageList: [], //上传的证件照片
				imageItemHeight: 0,
				workPlace: '', //工作单位
				imageUser: [],



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
				
				let strCerFile = '';
				for (var i = 0; i < this.imageList.length; i++) {
					if(i == 0){
						strCerFile = this.imageList[i]
					}
					else{
						strCerFile = strCerFile + ',' + this.imageList[i] 
					}
					
				}

				let param = {
					userId: this.loginData.id,
					nickName: this.name,
					phone: this.phoneNumber,
					workAddr: this.workPlace,
					workId: this.doctorTypeValue.id,
					photoUrl: this.imageUser[0],
					certificateUrl: strCerFile
				}
				
				
				doctorCertification_interface(param).then(res => {
					if(res.status == 'SUCCESS'){
						uni.showToast({
							title: "您的认证申请已提交，正在等待审核...",
							icon: 'none'
						})
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/patient/tabbar/home'
							})
						},500)
					}
				})

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
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							var imageSrc = res.tempFilePaths[i]
							uni.uploadFile({
								url: BaseUrl + 'mobile/fileUpload',
								filePath: imageSrc,
								name: 'multipartFile',
								success: (res) => {
									that.imageList.push(JSON.parse(res.data).data)
								},
								fail: (err) => {
									console.log('uploadImage fail', err);
									uni.showModal({
										content: err.errMsg,
										showCancel: false
									});
								}
							});
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
				this.imageList.splice(index, 1)
			},



			chooseImageUser() {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {

						let files = res.tempFilePaths[0]
						uni.uploadFile({
							url: BaseUrl + 'mobile/fileUpload',
							filePath: files,
							name: 'multipartFile',
							success: (uploadFileRes) => {
								that.imageUser.push(JSON.parse(uploadFileRes.data).data)
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: '图片上传失败:' + err.errMsg,
									showCancel: false
								});
							}
						});

					}
				})
			},
			removeImageUserWithIndex(index) {
				this.imageUser.splice(index, 1)
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
