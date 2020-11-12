<template>
	<view class="ai-diagnosis-class">
		<template v-for="item in list">
			<template v-if="item.type == 'R'">
				<radio-question :item="item" @answerSelected="selectedAnswer" :showError="submit"></radio-question>
			</template>
		</template>
		
		
		<button type="primary" @click="submitDiagnoslsResult">提交问卷</button>

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
	import {
		getTestRequest
	} from '../../api/index.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			radioQuestion
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
						answerCheck:[]
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
						answerCheck:[{value: 1}]
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
						answerCheck:[{value: 1}]
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
						answerCheck:[{value: 1}]
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
						answerCheck:[{value: 1}]
					}
				],
				checkedList: Array.from(new Array(5)),
				submit: false
			}
		},
		mounted() {
			getTestRequest().then(res => {
				console.log('data==', res)
			})

			const that = this
			this.checkedList.forEach(function(item, index) {
				that.checkedList[index] = index + 1
			})
			
			
			
			



		},
		methods: {
			...mapMutations(["changePatient"]),

			changeValue(value) {
				this.changePatient(value)
			},

			selectedAnswer(value) {
				console.log('value===', value)
			},
			
			submitDiagnoslsResult(){
				this.submit = true
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
