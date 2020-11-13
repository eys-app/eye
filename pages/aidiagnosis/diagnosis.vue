<template>
	<view class="ai-diagnosis-class">
		<template v-for="(item, index) in list">
			<template v-if="item.type == 'R'">
				<radio-question :item="item" :itemIndex="index" @answerSelected="selectedAnswer"  ref="radioItem"
				 :showError="submit"></radio-question>
			</template>
			<template v-if="item.type == 'C' ">
				<check-question :item="item" :showError="submit" :itemIndex="index"
				@checkboxSelected="checkboxSelectedAnswer"
				></check-question>
			</template>
			<template v-if="item.type == 'S' ">
				<slider-question :item="item" :showError="submit" :itemIndex="index"
				></slider-question>
			</template>
		</template>


		<button type="primary" @click="submitDiagnoslsResult" id="submit" class="submit">下一步</button>

		<button @click="changeValue('问诊人1')">问诊人1</button>
		<button @click="changeValue('问诊人2')">问诊人2</button>
		<button @click="changeValue('问诊人3')">问诊人3</button>
		<button @click="changeValue('问诊人4')">问诊人4</button>
		<button @click="changeValue('问诊人5')">问诊人5</button>
		<button @click="changeValue('问诊人6')">问诊人6</button>
		<button @click="changeValue('问诊人7')">问诊人7</button>

	</view>
</template>

<script>
	import radioQuestion from './components/radioquestion.vue'
	import checkQuestion from './components/checkquestion.vue'
	import sliderQuestion from './components/sliderquestion.vue'
	import {
		getTestRequest
	} from '../../api/index.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			radioQuestion,
			checkQuestion, sliderQuestion
		},
		data() {
			return {
				list: [{
						title: "这是第一题",
						number: 1,
						type: 'R',
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第二题",
						type: 'R',
						number: 2,
						answerList: [{
								value: "在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，就会更加难以处理。"
							},
							{
								value: "你可以像绑定普通 property 一样在模板中绑定计算属性."
							},
							{
								value: "你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果："
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第三题",
						type: 'C',
						number: 3,
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第四题",
						type: 'S',
						number: 4,
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第五题",
						type: 'C',
						number: 5,
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第二题",
						type: 'R',
						number: 2,
						answerList: [{
								value: "在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，就会更加难以处理。"
							},
							{
								value: "你可以像绑定普通 property 一样在模板中绑定计算属性."
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果："
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第三题",
						type: 'R',
						number: 3,
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第四题",
						type: 'R',
						number: 4,
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					},
					{
						title: "这是第五题",
						type: 'R',
						number: 5,
						answerList: [{
								value: "这是第一题第1个答案"
							},
							{
								value: "这是第一题第2个答案"
							},
							{
								value: "这是第一题第3个答案"
							},
							{
								value: "这是第一题第4个答案"
							}
						],
						answerCheck: {}
					}

				],
				submit: false
			}
		},
		mounted() {
			getTestRequest().then(res => {
				//console.log('data==', res)
			})
		},
		methods: {
			...mapMutations(["changePatient"]),

			changeValue(value) {
				this.changePatient(value)
			},

			//选择答案  ---- radio
			selectedAnswer(value) {
				this.list[value.index].answerCheck.checkValue = value.value
			},
			//选择答案 ---- CheckBox
			checkboxSelectedAnswer(value){
				this.list[value.index].answerCheck = value.value
			},


			/**
			 * 提交问卷结果
			 * 1、判断是否有未选择的题目
			 * 2、如果有未选择的题目，(1)滚动到该题目位置,(2)未选择的题目增加红色的框和提示
			 * 
			 * */
			submitDiagnoslsResult() {
				//提交选择 ---- 为了改变未选择题目的提示
				this.submit = true

                // 遍历list
				for (var i = 0; i < this.list.length; i++) {
					//判断是否有未选择的题目
					let tempArray = Object.keys(this.list[i].answerCheck)
					if (tempArray.length == 0) {
						setTimeout(() => {
							
							console.log('----')
							
							// #ifdef APP-PLUS || H5
							uni.createSelectorQuery().in(this).selectAll('.ai-diagnosis-class .questionClass').boundingClientRect(data => {
								uni.pageScrollTo({
									scrollTop: Math.abs(data[0].top) - Math.abs(data[i].top) + 10,
									duration: 500
								})
							}).exec()
							// #endif

							// #ifdef MP-WEIXIN
							uni.createSelectorQuery().in(this).selectAll('.ai-diagnosis-class >>> .questionClass').boundingClientRect(data => {
								uni.pageScrollTo({
									scrollTop: Math.abs(data[0].top) - Math.abs(data[i].top) + 10,
									duration: 500
								})
							}).exec()
							// #endif

						}, 100)
						break;
					}
				}

			}

		}
	}
</script>

<style>
	.ai-diagnosis-class {
		padding: 10px;
		background-color: white;
	}
</style>
