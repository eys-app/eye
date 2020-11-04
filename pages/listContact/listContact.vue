<template>
	<view class="container">
		问诊者列表
		<uni-list>
			<uni-list-item v-for="userItem in userList" :key="userItem.id" @click="enterUserInfo(userItem)">
				<view>{{userItem.name}}</view>
				{{userItem.phone}}
			</uni-list-item>
		</uni-list>
		<button type="warn" @click="addUser">新增问诊者</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				userList:[
					{
						id:'1',
						name:'郭晓蓉',
						sex:'男',
						phone:'15116961228'
					},	{
						id:'2',
						name:'王龙',
						sex:'女',
						phone:'15116961229'
					},	{
						id:'3',
						name:'李小倩',
						sex:'女',
						phone:'15116961233'
					}
				]
			}
		},
		methods: {
			addUser(){
				uni.navigateTo({
					url:"../patient/addUser"
				})
			},
			enterUserInfo(user){
				console.log(user)
				uni.navigateTo({
					url:"../patient/userInfo?user="+user
				})
			}
			
		}
	}
</script>

<style>

.container{
	margin: 10px;
}
</style>
