<template>
	<view class="questionClass " :class="{unSelected: itemCheck.answerCheck.checkValue == null && itemError == true}">
		<view class="question-title">
			<view class="red-tag">*</view>
			<view class="question-type">[单选]</view>{{itemIndex + 1}}. {{item.subject}}
		</view>
		<view class="answer-list">
			<template v-for="(aitem, index) in item.eyeOptionsList">
				<view @click="selectedRadio(index,aitem)" class="aswer-item" :style="{height: radioHeight[index]}">
					<view class="answer-left " :style="{height: radioHeight[index]}">
						<view class="radio-left" :class="{'radio-left-active': index == current}"></view>
					</view>

					<view class="aswer-item-text" ref="answerText">{{aitem.option}}</view>
				</view>

				<view style="clear: both;"></view>
			</template>

		</view>

		<view class="un-active-alert" v-show="itemCheck.answerCheck.checkValue == null && itemError == true">请选择选项</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			itemIndex: Number,
			showError: Boolean
		},
		data() {
			return {
				current: null, //选中的index
				radioHeight: [], //答案的radio高度
				itemError: this.showError,//是否点击了提交
				itemCheck: this.item
			}
		},
		methods: {
			// 选中答案
			selectedRadio(index, item) {
				this.current = index
				this.itemError = false
				this.$emit('answerSelected', {
					value: item,
					index: this.itemIndex
				})
			},
			
		},
		watch: {
			showError: {
				handler(n) {
					this.itemError = n
				}
			},
			item:{
				handler(n){
					this.itemCheck = n
				}
			}
		},
		mounted() {

			setTimeout(()=>{
				/**
				 * 设置每个radio的高度，让radio水平-垂直居中
				 */
				uni.createSelectorQuery().in(this).selectAll('.aswer-item-text').boundingClientRect(data => {
					for (var i = 0; i < data.length; i++) {
						this.radioHeight.push(
							data[i].height + 'px'
						)
					}
				}).exec()
			},100)

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
		.question-type {
			font-weight: 400;
			color: #027e7e;
			float: left;
			padding: 0 5px;
		}

		font-size: 16px;
		font-weight: 600;
	}

	.answer-list {
		padding: 2px 0 0 0;
		border-left: 1px solid #d4d4d4;
		border-top: 1px solid #d4d4d4;
		border-right: 1px solid #d4d4d4;
		margin: 15px 15px 15px 10px;
		border-radius: 3px;


		.aswer-item {
			border-bottom: 1px solid #d4d4d4;

			.answer-left {
				float: left;
				width: 30px;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.radio-left {
					width: 15px;
					height: 15px;
					border: 1px solid #bab9b9;
					border-radius: 50%;
				}

				.radio-left-active {
					width: 10px;
					height: 10px;
					border: 5px solid #1ea0fa;
					background-color: #FFFFFF;
					margin-left: -1px;
				}
			}

			.aswer-item-text {
				float: left;
				width: calc(100% - 40px);
				padding: 5px 5px;
			}
		}

	}
</style>
