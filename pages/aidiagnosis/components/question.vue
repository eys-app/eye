<template>
	<view class="question-border">
		<p class="question-title">1、您以前是否有干眼并接受过滴眼液或者其他治疗？</p>
		<view class="question-answer">
			<radio-group @change="questionRadioChange" class="radio-group">
				<label class="radio-item"
				v-for="(item, index) in items" :key="item.value">
					<view class="item-radio">
						<radio :value="item.value" :checked="index === current"></radio>
					</view>
					<view class="radio-name">{{item.name}}</view>
					<view style="clear: both;"></view>
				</label>
				
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				items: [{
						value: 'USA',
						name: '海淀区国资中心智能综合管理平台主要包含收文、资金、合同、资产、物品等管理模块，有效的缩短公务处理的周期，加快公文、资金申请审批流转的过程，减少路耗、找人、等待等中间环节，保持公务处理渠道的畅通。'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				],
				current: 0
			}
		},
		methods:{
			questionRadioChange(evt){
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.question-border{
		//border: 1px solid orange;
		margin-bottom: 10px;
		border-radius: 3px;
		padding: 10px;
		
		.question-title{
			color: black;
			font-weight: 700;
		}
		.radio-group{
			margin-top: 20px;
			border-top: 1px solid #dddddd;
			border-left: 1px solid #dddddd;
			border-right: 1px solid #dddddd;
			border-radius: 3px;
		}
		
		.radio-item{
			
			radio{
				float: left;
				padding: 5px;
			}
			.radio-name{
				min-height: 30px;
				border-bottom: 1px solid #dddddd;
				padding-left: 10px;
				padding-top: 6px;
			}
			
			.radio-border{
				
			}
			
			
			
		}
		
	}
</style>
