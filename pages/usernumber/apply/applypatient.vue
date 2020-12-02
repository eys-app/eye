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
				<input placeholder="提交后不可修改,请认真填写" v-model="idCard"/>
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
				<input placeholder="请输入年龄" v-model="age" type="number"/>
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
				<input placeholder="(可填) 请输入正确的社保卡号" v-model="socialCard"/>
			</view>
			<view class="input-fa-view">
				<view class="label-left">
					<view class="tag-red">*</view>与患者关系
				</view>
				<input placeholder="请输入您与患者的关系" v-model="relation"/>
			</view>

		</view>

		<button type="primary" class="submit-button" @click="submitClicked">确认提交</button>

		<view class="next-step" @click="navgaitionToHomePage">暂不增加，开始使用</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexList: ["男", "女"],
				sexValue: '请选择', //性别
				name: "",//姓名
				idCard: "",//身份证号码
				age: "",//年龄
				phoneNumber: "",//手机号码
				relation: "",//与患者关系
				socialCard: "",//社保卡号
			}
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
			navgaitionToHomePage(){
				uni.switchTab({
					url: "/pages/patient/tabbar/home"
				})
			},
			
			/**
			 * 提交事件
			 * 1、判断各项是否为空
			 * **/
			submitClicked(){
				if(!this.checkInputValue(this.name)){
					uni.showToast({
						title: "姓名不得为空",
						icon: "none"
					})
					return ;
				}
				if(!this.checkInputValue(this.idCard)){
					uni.showToast({
						title: "身份证号码不得为空",
						icon: "none"
					})
					return ;
				}
				if(!this.checkInputValue(this.sexValue)){
					uni.showToast({
						title: "性别不得为空",
						icon: "none"
					})
					return ;
				}
				if(!this.checkInputValue(this.age)){
					uni.showToast({
						title: "年龄不得为空",
						icon: "none"
					})
					return ;
				}
				if(!this.checkInputValue(this.phoneNumber)){
					uni.showToast({
						title: "手机号码不得为空",
						icon: "none"
					})
					return ;
				}
				if(!this.checkInputValue(this.relation)){
					uni.showToast({
						title: "与患者关系不得为空",
						icon: "none"
					})
					return ;
				}
			},
			
			//检查数据是否为空
			checkInputValue(value){
				
				if(value == undefined || value == null || value == "" || value.length == 0){
					return false;
				}else{
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
