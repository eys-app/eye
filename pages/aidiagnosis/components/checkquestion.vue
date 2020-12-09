<template>
	<view class="questionClass" :class="{unSelected: checkValueError == true && itemError == true}">
		<view class="question-title">
			<view class="red-tag">*</view>
			<view class="question-type">[多选]</view>{{itemIndex + 1}}. {{itemCheck.subject}}
		</view>
		<view class="answer-list">
			<template v-for="(citem, index) in itemCheck.eyeOptionsList">
				<view @click="checkBoxSelected(index,citem)" class="aswer-item" :style="{height: radioHeight[index]}">
					<view class="answer-left " :style="{height: radioHeight[index]}">
						<custom-check-box :value="citem.checkValue"></custom-check-box>
					</view>

					<view class="aswer-item-text" ref="answerText">{{citem.option}}</view>
				</view>

				<view style="clear: both;"></view>
			</template>
		</view>
		<view class="un-active-alert" v-show="checkValueError == true && itemError == true ">请选择选项</view>



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
				itemError: this.showError, //是否点击了提交
			}
		},

		watch: {
			showError: {
				handler(n) {
					if (this.itemCheck.answerCheck.checkValue != null) {
						this.checkValueError = false
					}
					this.itemError = n
				},
				deep: true
			},
			item: {
				handler(n, old) {
					// #ifdef APP-PLUS || H5
					if (n.answerCheck.checkValue == null || n.answerCheck.checkValue == undefined) {
						this.checkValueError = true
						this.itemError = true
					}
					this.itemCheck = n;
					// #endif
					
					// #ifdef MP-WEIXIN
					this.itemError = false
					// #endif
					
					

				},
				deep: true,
				// immediate: true
			},
		},
		mounted() {

			if (this.itemCheck.answerCheck.checkValue == null || this.itemCheck.answerCheck.checkValue == undefined) {
				this.checkValueError = true
			}

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


		},
		methods: {
			checkBoxSelected(index, answer) {


				this.itemError = false
				this.$set(this.itemCheck.eyeOptionsList[index], 'checkValue', !this.itemCheck.eyeOptionsList[index].checkValue)

				if (this.itemCheck.eyeOptionsList[index].checkValue == true) {
					this.$emit('checkboxSelected', {
						index: this.itemIndex,
						questionId: answer.questionId,
						answerId: answer.id,
						type: 'add'
					})
				} else {
					this.$emit('checkboxSelected', {
						index: this.itemIndex,
						questionId: answer.questionId,
						answerId: answer.id,
						type: 'remove'
					})
				}

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
