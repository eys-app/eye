<template>
	<view class="questionClass" :class="{unSelected: itemCheck.answerCheck.checkValue == null && itemError == true}">
		<view class="question-title">
			<view class="red-tag">*</view>{{itemCheck.number}}.{{itemCheck.title}}
		</view>
		<view class="answer-list">
			<template v-for="(citem, index) in itemCheck.answerList">
				<view @click="checkBoxSelected(index,itemCheck.number)" class="aswer-item" :style="{height: radioHeight[index]}">
					<view class="answer-left " :style="{height: radioHeight[index]}">
						<custom-check-box :value="citem.checkValue"></custom-check-box>
					</view>

					<view class="aswer-item-text" ref="answerText">{{citem.value}}</view>
				</view>

				<view style="clear: both;"></view>
			</template>
		</view>
		<view class="un-active-alert" v-show="itemCheck.answerCheck.checkValue == null && itemError == true">请选择选项</view>
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

			uni.createSelectorQuery().in(this).selectAll('.aswer-item-text').boundingClientRect(data => {
				for (var i = 0; i < data.length; i++) {
					this.radioHeight.push(
						data[i].height + 'px'
					)
				}
			}).exec()
		},
		methods: {
			checkBoxSelected(index) {
				this.itemError = false
				this.$set(this.itemCheck.answerList[index], 'checkValue', !this.itemCheck.answerList[index].checkValue)

				this.$emit('checkboxSelected', {
					index: this.itemIndex,
					value: this.itemCheck.answerList
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
