<template>
	<view class="questionClass" >
		<view class="question-title">
			<view class="red-tag">*</view>
			<view class="question-type">[多选]</view>{{itemIndex + 1}}. {{itemCheck.subject}}
		</view>
		<view class="answer-list">
			<template v-for="(citem, index) in itemCheck.eyeOptionsList">
				<view  class="aswer-item" :style="{height: radioHeight[index]}">
					<view class="answer-left " :style="{height: radioHeight[index]}">
						<custom-check-box :value="citem.active"></custom-check-box>
					</view>

					<view class="aswer-item-text" ref="answerText">{{citem.option}}</view>
				</view>

				<view style="clear: both;"></view>
			</template>
		</view>

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
				checkValueError: false,
			}
		},

		mounted() {

			const _this = this;
			setTimeout(() => {
				uni.createSelectorQuery().in(_this).selectAll('.aswer-item-text').boundingClientRect(data => {
					for (var i = 0; i < data.length; i++) {
						_this.radioHeight.push(
							data[i].height + 'px'
						)
					}
				}).exec()
			}, 100)
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
			}

			.aswer-item-text {
				float: left;
				width: calc(100% - 40px);
				padding: 5px 5px;
			}
		}

	}
</style>
