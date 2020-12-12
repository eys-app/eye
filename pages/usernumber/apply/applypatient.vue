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
					<view class="tag-red">*</view>手机号
				</view>
				<input placeholder="请输入正确的手机号码" v-model="phoneNumber" type="number" />
			</view>

			<view class="input-fa-view">
				<view class="label-left">社保卡</view>
				<input placeholder="(可填) 请输入正确的社保卡号" v-model="socialCard" />
			</view>
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>与患者关系
				</view>
				<input placeholder="请输入您与患者的关系" v-model="relation" />
			</view>

		</view>

		<button type="primary" class="submit-button" @click="submitClicked">确认提交</button>

		<view v-show="showType" class="next-step" @click="navgaitionToHomePage">暂不增加，开始使用</view>

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
				changeId: ""
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
				this.changeId = item.id
				this.name = item.name;
				this.idCard = item.idCard;
				this.sexValue = sexnumberToValue(item.sex);
				this.age = item.age;
				this.phoneNumber = item.phone;
				this.relation = item.patientRelation;
				this.socialCard = item.socialSecurityCard;
			}
			if (option.type == undefined) {
				this.showType = true;

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


				console.log('mmmmm===', this.addOrChange)

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
				
				if (this.addOrChange == 'C') {
				  obj.id = this.changeId
				}
				console.log('change====',this.addOrChange)
				console.log("====", obj)
				
				addPatient(obj).then(res => {
					if (res.status == 'SUCCESS') {
						uni.$emit('updateParientList')
						if (this.addOrChange != undefined) {
							uni.navigateBack({})
						}
						if (this.addOrChange == undefined) {
							uni.switchTab({
								url: "../../patient/tabbar/home"
							})
						}

					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})





			},

			//检查数据是否为空
			checkInputValue(value) {

				if (value == undefined || value == null || value == "" || value.length == 0) {
					return false;
				} else {
					return true;
				}

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
					color: grey;
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

		.next-step {
			text-align: center;
			margin-top: 30px;
			color: #b3b3b3;
			font-size: 14px;
		}



	}
</style>
