<template>
	<view class="questionClass" :class="{unSelected: itemCheck.answerCheck.checkValue == null && itemError == true}">
		<view class="question-title">
			<view class="red-tag">*</view>{{itemIndex + 1}}. {{itemCheck.subject}}
		</view>
		<view class="attention-text">
			注：请拖动滑块，表示您的程度<br>
			{{itemCheck.eyeOptionsList[0].score}} 表示 "{{itemCheck.eyeOptionsList[0].option}}";  {{itemCheck.eyeOptionsList[1].score}} 表示 "{{itemCheck.eyeOptionsList[1].option}}"
		</view>
		<view class="user-selected"><label class="text">当前选择:  </label> {{sliderValue}}</view>
		<view class="answer-list">
			<view class="min-number">{{itemCheck.eyeOptionsList[0].score}}</view>
			<slider class="slider-center" @change="changeValue" @changing="sliderValueChanging"
			:min="itemCheck.eyeOptionsList[0].score" :max="itemCheck.eyeOptionsList[1].score" step="1" block-size="16" ></slider>
			<view class="max-number">{{itemCheck.eyeOptionsList[1].score}}</view>
		</view>
		<view style="clear: both;"></view>
		<view class="un-active-alert" v-show="itemCheck.answerCheck.checkValue == null && itemError == true">请选择选项</view>
		<view style="clear: both;"></view>
	</view>
</template>

<script>
	import customCheckBox from '../../../components/checkbox/index.vue'
	export default {
		components: {
			customCheckBox
		},
		props: {
			item: Object,
			itemIndex: Number,
			showError: Boolean
		},
		data() {
			return {
				itemCheck: this.item,
				radioHeight: [], //答案的radio高度
				answerList: [],
				itemError: this.showError, //是否点击了提交
				sliderValue: 0
			}
		},
		watch: {
			showError: {
				handler(n) {
					this.itemError = n
				}
			},
		},
		mounted() {

			
		},
		methods: {
			//拖拽过程
			sliderValueChanging(e){
				this.itemError = false
				this.sliderValue = e.detail.value
			},

			// 完成一次拖动后触发的事件
			changeValue(e) {
				this.itemError = false
				this.sliderValue = e.detail.value
				this.$emit('sliderChangeValue', {
					index: this.itemIndex,
					answer: e.detail.value,
					id: this.item.id
				})

			}
		}
	}
</script>

<style lang="scss">
	.questionClass {
		margin: 10px 0;
		padding-top: 10px;
		padding-left: 5px;
	}

	.unSelected {
		border: 1px dashed red;
	}

	.un-active-alert {
		height: 40px;
		background-color: #ffe5e0;
		color: red;
		line-height: 40px;
		margin: 15px 15px 15px 10px;
		border-radius: 5px;
		padding-left: 10px;
		font-size: 14px;
	}

	.question-title {
		.red-tag {
			color: red;
			margin-top: 3px;
			float: left;
		}

		font-size: 16px;
		font-weight: 600;
	}
	
	.attention-text{
		color: #027e7e;
		font-size: 12px;
		margin-left: 20px;
		margin-top: 10px;
	}
	
	.user-selected{
		text-align: center;
		font-size: 18px;
		font-weight: 800;
		margin-top: 10px;
		margin-bottom: -10px;
		
		.text{
			font-size: 14px;
			color: gray;
			font-weight: 400;
			padding-right: 20px;
		}
	}


	.answer-list {
		padding: 2px 0 0 0;
		margin: 15px 15px 15px 10px;
		border-radius: 3px;

		.min-number{
			float: left;
			font-size: 14px;
			color: gray;
			width: 10px;
			margin-top: 8px;
		}
		.slider-center{
			float: left;
			width: calc(100% - 60px);
		}
		.max-number{
			float: right;
			font-size: 14px;
			color: gray;
			width: 10px;
			margin-top: 8px;
		}

	}
</style>
