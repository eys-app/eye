<!-- 病人库管理页面的病人信息 card -->
<template>
	 <view class="root"> 
		<view class="title_bar"> 
		
				<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex'
						    @onSelected='onSelected' @dateChange='dateChange' @doc_mineClick='doc_mineClick'></ren-dropdown-filter> 
			
						
					 	<!-- view class="mine">
							 <image src="../../static/images/mine-ed.png" ></image> 
						</view> -->
		</view>
			
 	 	<view class="card-view">
			<uni-card isShadow="true" v-for="item in patientList" :key="item.id">
				<view class="card">
					<view class="one">
						<view class="patientName">
							{{item.name}}
						</view>
						<view class="patientSex">
							{{item.sex}}
						</view>
						<view class="patientOld">
							{{item.old}}岁
						</view>
						<view class="zhidao">
							<view>
								未指导
							</view>
						</view>
					</view>
			
					 <!-- <view class="two" v-for="items in perTagList"> -->
						<view class="two">
			
						<view class="tag">
							我是标签1
						</view>
						<view class="tag">
							我是标签2
						</view>
						<view class="tag">
							我是标签3
						</view>
						<view class="tag">
							我是标签4
						</view>
						
					 <!-- 	<view class="tag">
							{{items}}
						</view> --> 
					</view>
			
					<view class="three">
						上次测评时间：{{item.time}}
					</view>
			
				</view>
			</uni-card>
		</view>	 
		
	</view>
</template>

<script>
	
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import {getPatientsListByDoc} from '../../api/index.js'
	export default {
		components:{RenDropdownFilter},
		data() {
			return {
				patientList:[{
					id:1,
					name:'小龙女',
					sex:'女',
					old:'18',
					zhidao:true,
					tagList:['标签1','标签2','标签1','标签2','标签1','标签2'],
					time:'2020-09-20'
				},{
					id:2,
					name:'杨过',
					sex:'男',
					old:'20',
					zhidao:true,
					tagList:['标签1','标签2','标签3'],
					time:'2020-11-26'
				},{
					id:3,
					name:'黄蓉',
					sex:'女',
					old:'20',
					zhidao:true,
					tagList:['标签1','标签2','标签3'],
					time:'2020-11-26'
				},{
					id:4,
					name:'郭靖',
					sex:'男',
					old:'22',
					zhidao:true,
					tagList:['标签1','标签2','标签3'],
					time:'2020-11-26'
				},{
					id:5,
					name:'李小龙',
					sex:'男',
					old:'25',
					zhidao:true,
					tagList:['标签1','标签2','标签3'],
					time:'2020-11-29'
				},{
					id:5,
					name:'孙悟空',
					sex:'男',
					old:'28',
					zhidao:true,
					tagList:['标签1','标签2','标签3'],
					time:'2020-11-21'
				}],
				filterData:[
				    [{ text: '全部症状', value: '' }, { text: '非常严重', value: 1 }, { text: '严重', value: 2 }, { text: '轻微', value: 3 }],
				    [{ text: '无论指导', value: '' }, { text: '指导', value: 1 }, { text: '未指导', value: 2 }]
				],
				defaultIndex:[0,0],
				selectTime:"11",
				
				perTagList:['标签1','标签2','标签1','标签2','标签1','标签2']
			}
		},
		methods: {
			
			    onSelected(res){
			        console.log(res+'选择时间'+this.selectTime)
					
			    },
			    dateChange(d){
			       // uni.showToast({
			       //     icon:'none',
			       //     title:d
			       // })
				  
				   this.selectTime=d
				   
				    console.log('选择日期是=='+this.selectTime)
			    },
				doc_mineClick(){
					console.log('点击了===医生个人中心=')
					uni.navigateTo({
						url:'/pages/doctor/doctor_mine'
					})
				},
				getPatientsList(){
					
				}
				
		}
	}
</script>

<style lang="scss">
	
	.card-view{
		// margin-top: 300rpx;
	}
	
	.title_bar{
		display: flex;
	}

.mine{
	width: 100rpx;
	height: 100rpx;
	margin-right: 20rpx;
	// display: flex;
	background-color: #67C23A;
	justify-content: center;
	align-items: center;
	image{
		width: 80rpx;
		height: 80rpx;
	}
}

	.card {
		padding-top: 20rpx;
		padding-left: 20rpx;
	}

	.one {
		display: flex;
	}	

	.two {
		margin-top: 15rpx;
		display: flex;
		flex-flow: wrap;
		// flex-direction: row;
		.tag {
			// display: flex;
			font-size: 30rpx;
			color: #FFFFFF;
			background-color: #AAD1FF;
			margin-right: 20rpx;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			border-radius: 30rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
		}
	}
	
	.three{
		display: flex;
		justify-content: flex-end;
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.patientName {
		font-size: 40rpx;
	}

	.patientSex {
		margin-left: 40rpx;
		color: #6E6E6E;
		font-size: 34rpx;
	}

	.patientOld {
		margin-left: 40rpx;
		color: #6E6E6E;
		font-size: 34rpx;
	}

	.zhidao {
		display: flex;
		justify-content: flex-end;
		flex: 1;
		font-size: 30rpx;
		color: #6E6E6E;
	}
</style>
