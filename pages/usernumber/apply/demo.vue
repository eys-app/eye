<template>
	<view class="view-page">
		
		<view class="apply-result" v-if="applyStatus != ''">
			<label>您的申请已提交，当前状态为:</label>
			<label class="state" style="color: #159dbb;" v-if="applyStatus == '0'">待审核</label>
			<label class="state" style="color: #09BB07;" v-if="applyStatus == '1'">已通过</label>
			<label class="state" style="color: #f40e29;" v-if="applyStatus == '2'">未通过</label>
			<!-- <view class="reserve-reision">
				未通过原因：
			</view> -->
		</view>
		
		<view class="card-view" style="margin-top: 0;">
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>姓名
				</view>
				<input disabled placeholder="请输入真实姓名" v-model="name" />
			</view>


			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>手机号码
				</view>
				<input disabled placeholder="请输入手机号码" v-model="phoneNumber" type="number" />
			</view>
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>工作单位
				</view>
				<input disabled placeholder="请输入工作单位" v-model="workPlace" />
			</view>
			<view class="input-fa-view" disabled>
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
						<!-- <view class="remove-image" @click="removeImageUserWithIndex(index)"></view> -->
						<image :src="item" :data-src="item" @tap="previewImage"></image>
					</view>
				</template>

				<!-- <view class="image-item add-image" v-show="imageUser.length == 0" :style="{height: imageItemHeight}" @click="chooseImageUser"></view> -->
			</view>



			<view class="image-title-left">
				<label style="color: red;margin-right: 5px;">*</label>
				<label>请上传执业医师证书照片或其他证件照片</label>
				<label style="float: right;margin-right: 10px;">{{imageList.length}} / 9</label>
			</view>


			<view class="upload-image">

				<template v-for="(item, index) in imageList">
					<view class="image-item" :style="{height: imageItemHeight}">
						<!-- <view class="remove-image" @click="removeImageWithIndex(index)"></view> -->
						<image :src="item" :data-src="item" @tap="previewImage"></image>
					</view>
				</template>

				<!-- <view class="image-item add-image" :style="{height: imageItemHeight}" @click="chooseImage"></view> -->
			</view>

		</view>

		<!-- <button type="primary" class="submit-button" @click="submitClicked">确认提交</button> -->


	</view>
</template>

<script>
	import {
		doctorCertification_interface,
		getDoctorWorkList_interface,
		BaseUrl,
		getEyeDoctor_interface
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
				name: "", //姓名
				phoneNumber: "", //手机号码
				doctorType: [],
				doctorTypeValue: {
					work: '请选择'
				}, //医师职称
				imageList: [], //上传的证件照片
				imageItemHeight: 0,
				workPlace: '', //工作单位
				imageUser: [],
				applyStatus: ''
			}
		},
		onLoad: function(option) {

			this.gainApplyStatus();

			this.gainDoctorType()


		},
		computed: {
			...mapState(['loginData'])
		},
		mounted() {
			const _this = this;
			setTimeout(() => {
				uni.createSelectorQuery().in(_this).select('.image-item').boundingClientRect(data => {
					console.log('mmmm===',data)
					_this.imageItemHeight = data.width + 'px'

				}).exec()
			}, 1000)
		},
		onPullDownRefresh() {
			this.applyStatus = '';
			this.name = "";
			this.phoneNumber = "";
			this.workPlace = "";
			this.doctorTypeValue =  {
					work: '请选择'
				};
			this.imageUser = [];
			this.imageList = [];
			this.gainApplyStatus()
		},
		methods: {
			
			
			gainApplyStatus(){
				getEyeDoctor_interface({
					userId: this.loginData.id
				}).then(res => {
					uni.stopPullDownRefresh()
					if(res.status == 'SUCCESS'){
						console.log('dddd')
						let docMsg = res.data;
						this.applyStatus = docMsg.state;
						this.name = docMsg.nickName;
						this.phoneNumber = docMsg.phone;
						this.workPlace = docMsg.workAddr;
						this.doctorTypeValue = docMsg.eyeDoctorWork;
						this.imageUser.push(docMsg.photoUrl);
						let arrImgList = docMsg.certificateUrl.split(',')
						for (var i = 0; i < arrImgList.length; i++) {
							this.imageList.push(arrImgList[i])
						}
					}else{
						
					}
				})
			},

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
		
		.apply-result{
			width: calc(100% - 20px);
			background-color: #FFFFFF;
			margin-bottom: 10px;
			padding: 10px;
			font-size: 14px;
			
			.state{
				font-size: 18px;
				margin-left: 10px;
				font-weight: 800;
			}
			
			.reserve-reision{
				font-size: 12px;
				color: #f63a53;
			}
			
		}
		

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
