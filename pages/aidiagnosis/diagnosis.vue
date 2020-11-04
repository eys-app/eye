<template>
	<view>
		<template v-for="item in list">
			<text>{{item.title}}</text>
		</template>
	</view>
</template>

<script>
	import {getTestRequest} from '../../api/index.js'
	export default{
		data(){
			return{
				list:[
					{title:"这是第一题",type: 'R'},
					{title:"这是第二题",type: 'R'},
					{title:"这是第三题",type: 'R'},
					{title:"这是第四题",type: 'R'},
					{title:"这是第五题",type: 'R'}
				]
			}
		},
		mounted() {
			 getTestRequest().then(res => {
				 console.log('data==',res)
			 })
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
