<template>
	<view>
		<user_sty :msg='this.activeUser'></user_sty>

		<!-- <uni-card isShadow="true" class="user_card">
			<view>
				<view class="u_title">姓名</view><input class="uni-input" placeholder="请输入真实姓名" :value="userName">
			</view>
			<view>身份证<input type="idcard" class="uni-input" placeholder="提交后不可修改,请慎重填写"></view>
			<view>性别<input class="uni-input" placeholder="请选择"></view>
			<view>年龄<input type="number" class="uni-input" placeholder="请输入年龄"></view>
		</uni-card>

		<uni-card isShadow="true">
			<view>手机号<input type="number" class="uni-input" placeholder="请输入正确的手机号"></view>
			<view>社保卡<input class="uni-input" placeholder="(可选)请输入您的社保卡号"></view>
		</uni-card>

		<uni-card isShadow="true">
			<view>与患者关系<input class="uni-input" placeholder="请输入您与患者的关系"></view>
			<view>门诊号<input class="uni-input" placeholder="(可选)请输入您的门诊号"></view>
		</uni-card> -->

<view>
	{{this.activeUser.name}}
</view>
		<button class="submit" type="primary" @click="addOK">确认修改</button>
	</view>
</template>

<script>
	import userSty from './components/userSty.vue'
	export default {
		 onLoad: function(option) {
			
			const eventChannel=this.getOpenerEventChannel()
			//监听acceptData	FromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('chuansong',function(data){
				console.log(data)
				this.activeUser=data.data
				
				console.log(this.activeUser)
			})
			// this.activeUser = option.user,
			// 	console.log(this.activeUser)
			// this.userId = option.userId
			// this.userName = option.userName

		}, 
		components: {
			user_sty: userSty
		},

		data() {
			return {
				activeUser:{
						id:'',
						name:'',
						sex:'',
						phone:''
				}
			}
		},
		methods: {
			addOK() {
				uni.navigateBack({
					url: "/pages/listContact/listContact"
				})
			}
		}
	}
</script>

<style>
	.user_card {
		/* background-color: #AAAAAA; */
	}

	.u_title {
		font-size: 18rpx;
		color: #808080;
	}

	.uni-input {
		background-color: #FFFFFF;
		font-size: 44rpx;
		height: 30px;
		min-height: 20rpx;
		border: 0;
		border-bottom: 1 solid;
		border: #007AFF;

	}

	.submit {
	margin:10rpx 20rpx ;
	}
</style>
