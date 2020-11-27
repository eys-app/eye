<template>
	<view class="back-view-class">
		<view class="container">
			<template v-for="item in userList">
				<view class="item-list" @click="itemClicked(item)">
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
