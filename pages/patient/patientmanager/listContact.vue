<template>
	<!-- <view class="container"> -->
		<!-- <uni-list>
			<uni-list-item v-for="userItem in userList" :key="userItem.id" @click="enterUserInfo(userItem)"  >
				<view :userMsg="userItem">
					<view class="userNameSty">{{userItem.name}}</view>
					<view class="userPhoneSty">{{userItem.phone}}</view>
				</view>
				
			</uni-list-item>
		</uni-list>
		<button type="warn" @click="addUser">新增问诊者</button> -->
	<view class="back-view-class">
		<view class="container">
			<template v-for="item in userList">
				<!-- <view class="item-list" @click="itemClicked(item)"> -->
					<view class="item-list" @click="enterUserInfo(item)">
					<view class="user-name">{{item.name}}</view>
					<view class="user-phone">{{item.phone}}</view>
					<uni-icons class="user-compose" type="compose" 
					size='14' color="gray" @click.stop=enterUserInfo(item)></uni-icons>
				</view>
			</template>
			
		</view>
		<button class="add-button" type="warn" @click="addUser">
			<uni-icons type="plusempty" color="#ffffff" size="14"></uni-icons>新增问诊人
		</button>
<!-- >>>>>>> de287255acf8684bbfb62d39b7bf3ae708e43f00 -->
	</view>

</template>

<script>
	import {mapMutations, mapState} from "vuex"
	export default {
		data() {
			return {

				userList: [{
					id: '1',
					name: '郭晓蓉',
					sex: '男',
					phone: '15116961228'
				}, {
					id: '2',
					name: '王龙',
					sex: '女',
					phone: '15116961229'
				}, {
					id: '3',
					name: '李小倩',
					sex: '女',
					phone: '15116961233'
				},
				{
					id: '1',
					name: '郭晓蓉',
					sex: '男',
					phone: '15116961228'
				}, {
					id: '2',
					name: '王龙',
					sex: '女',
					phone: '15116961229'
				}, {
					id: '3',
					name: '李小倩',
					sex: '女',
					phone: '15116961233'
				},
				{
					id: '1',
					name: '郭晓蓉',
					sex: '男',
					phone: '15116961228'
				}, {
					id: '2',
					name: '王龙',
					sex: '女',
					phone: '15116961229'
				}, {
					id: '3',
					name: '李小倩',
					sex: '女',
					phone: '15116961233'
				},
				{
					id: '1',
					name: '郭晓蓉',
					sex: '男',
					phone: '15116961228'
				}, {
					id: '2',
					name: '王龙',
					sex: '女',
					phone: '15116961229'
				}, {
					id: '3',
					name: '李小倩',
					sex: '女',
					phone: '15116961233'
				},
				{
					id: '1',
					name: '郭晓蓉',
					sex: '男',
					phone: '15116961228'
				}, {
					id: '2',
					name: '王龙',
					sex: '女',
					phone: '15116961229'
				}, {
					id: '3',
					name: '李小倩',
					sex: '女',
					phone: '15116961233'
				},
				{
					id: '1',
					name: '郭晓蓉',
					sex: '男',
					phone: '15116961228'
				}, {
					id: '2',
					name: '王龙',
					sex: '女',
					phone: '15116961229'
				}, {
					id: '3',
					name: '李小倩',
					sex: '女',
					phone: '15116961233'
				}]
			}
		},
		
		methods: {
			...mapMutations(['changePatient']),
			
			addUser() {
				uni.navigateTo({
					url: "/pages/patient/patientmanager/addUser"
				})
			},
			// enterUserInfo(user){
			// 	uni.navigateTo({
			// 		url:"/pages/patient/patientmanager/userInfo",
			// 		success:function(res){
			// 			//通过eventChannel向被打开的页面传送数据
			// 			// res.eventChannel.emit('chuansong',{data:'test'})
			// 			res.eventChannel.emit('chuansong',{data:user})
			// 		}
			enterUserInfo(user) {
				console.log(user)
				uni.$emit('itemPatient',user)
				uni.navigateTo({
					url: "/pages/patient/patientmanager/userInfo"
				})
			},
			itemClicked(value){
				this.changePatient(value);
				uni.navigateBack({
					delta: 1
				})
			},
			
			

		}
	}
</script>

<style lang="scss">

// .container{
// 	margin: 10rpx;
// 	.userNameSty{
// 		font-size: 36rpx;
// 	}
// 	.userPhoneSty{
// 		margin-top: 6rpx;
// 		font-size: 30rpx;
// 		color: #6E6E6E;
// 	}
// 	.warn{
// 		margin-top: 10rpx;
// 	}
// }

	.back-view-class {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		position: absolute;
		
		
		.container {
			margin-bottom: 50px;

			.item-list {
				width: 100%;
				height: 40px;
				margin-top: 10px;
				border-bottom: 1px solid #F1F1F1;
				background-color: #FFFFFF;
				line-height: 40px;
				
				.user-name{
					float: left;
					margin-left: 10px;
					width: 100px;
					color: #55aa7f;
					font-weight: 600;
				}
				.user-phone{
					float: left;
					margin-left: 10px;
					color: #888888;
					font-size: 14px;
				}
				.user-compose{
					float: right;
					margin-right: 20px;
				}
				
			}

		}

		.add-button {
			position: fixed;
			bottom: 10px;
			width: calc(100% - 20px);
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			border-radius: 20px;
			margin-left: 10px;
		}
	}
</style>
