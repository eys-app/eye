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
				doctorType: ['住院医师', '主治医师', '副主任医师', '主任医师'],
				doctorTypeValue: '请选择',
				imageList: [],
				imageItemHeight: 0,

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
		mounted() {
			const _this = this;
			setTimeout(() => {
				uni.createSelectorQuery().in(_this).select('.image-item').boundingClientRect(data => {
					console.log('data======', data)
					_this.imageItemHeight = data.width + 'px'

				}).exec()
			}, 100)
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
					console.log("====", obj)

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
				const that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					
					success: function(res) {
						console.log('ssssss===',that.imageList)
						console.log(JSON.stringify(res.tempFilePaths));
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							that.imageList.push(res.tempFilePaths[i])
						}
						
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
			
			removeImageWithIndex(index){
				console.log('index====',index)
				this.imageList.splice(index,1)
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
					
					.remove-image{
						position: absolute;
						width: 20px;
						height: 20px;
						margin-left: calc((100% - 25px) / 3 - 33px);
						background-color: #FF0000;
						z-index: 9;
					}
					
					image{
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
		}





	}
</style>
