<template>
	<view class="ai-diagnosis-class">
		<template v-for="(item, index) in list">
			<template v-if="item.type == '1'">
				<radio-question :item="item" :itemIndex="index"></radio-question>
			</template>
			<template v-if="item.type == '2' ">
				<check-question :item="item" :showError="submit" :itemIndex="index" @checkboxSelected="checkboxSelectedAnswer"></check-question>
			</template>
			<template v-if="item.type == '3' ">
				<slider-question :item="item" :itemIndex="index"></slider-question>
			</template>
		</template>
	
	</view>
</template>

<script>
	import radioQuestion from './components/radioquestion.vue'
	import checkQuestion from './components/checkquestion.vue'
	import sliderQuestion from './components/sliderquestion.vue'
	import {
		getTestRequest,
		gainDianosisList_interface,
		postDianosisList_interface
	} from '../../api/index.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		components: {
			radioQuestion,
			checkQuestion,
			sliderQuestion
		},
		data() {
			return {
				list: [], //问卷题目
				submit: false,
				checkAnswerList: {}
			}
		},
		onLoad:function(option){
			// console.log('----',JSON.parse(option.detail));
			// #ifdef APP-PLUS || H5
			this.list = JSON.parse(JSON.parse(option.detail))
			// #endif
			// #ifdef MP-WEIXIN
			const that = this;
			uni.getStorage({
				key: 'historyWJ',
				success:function(e){
					console.log('eeeee==',e)
					that.list = JSON.parse(e.data)
				}
			})
			// #endif
		},

		// onLoad() {
		// 	gainDianosisList_interface().then(res => {
		// 		console.log('res===', res)
		// 		if (res.status == 'SUCCESS') {
		// 			this.list = []
		// 			let tempArray = res.data.eyeQuestionsList
		// 			for (let i = 0; i < tempArray.length; i++) {
		// 				let temoObj = tempArray[i]
		// 				temoObj.answerCheck = {}
		// 				this.list.push(temoObj)
		// 			}
		// 		}
		// 	})
		// },
		computed: {
			...mapState(['activePatient', 'loginData'])
		},
		methods: {
			...mapMutations(["changePatient"]),

			changeValue(value) {
				this.changePatient(value)
			},
			//选择答案  ---- radio
			radioAnswerChange(value) {
				this.list[value.index].answerCheck = {
					id: value.value.questionId,
					answer: value.value.id,
					checkValue: true
				}
			},

			//选择答案 ---- CheckBox
			checkboxSelectedAnswer(value) {

				let tempArray = []
				tempArray = this.list[value.index].answerCheck.answerList
				if (tempArray == undefined) {
					tempArray = []
				}
				if (value.type == 'add') {
					this.list[value.index].answerCheck.id = value.questionId
					tempArray.push(value.answerId)
					this.list[value.index].answerCheck.checkValue = true
					// 
				}

				if (value.type == 'remove') {

					console.log('remove')

					Array.prototype.indexOf = function(val) {
						for (var i = 0; i < this.length; i++) {
							if (this[i] == val) return i;
						}
						return -1;
					};

					Array.prototype.remove = function(val) {
						var index = this.indexOf(val);
						if (index > -1) {
							this.splice(index, 1);
						}
					};

					tempArray.remove(value.answerId)

				}
				const that = this;
				if (tempArray.length == 0) {
					delete that.list[value.index].answerCheck.answerList;
					delete that.list[value.index].answerCheck.id
					delete that.list[value.index].answerCheck.checkValue
				} else {
					that.list[value.index].answerCheck.answerList = tempArray
				}




			},
			//改变答案， ----- 滑块
			sliderChangeValue(value) {
				this.list[value.index].answerCheck = {
					id: value.id,
					answer: value.answer,
					checkValue: true
				}
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
				let tempAnswer = []
				// 遍历list
				for (var i = 0; i < this.list.length; i++) {
					//判断是否有未选择的题目
					let tempArray = Object.keys(this.list[i].answerCheck)
					if (tempArray.length == 0) {
						setTimeout(() => {
							// #ifdef APP-PLUS || H5
							uni.createSelectorQuery().in(this).selectAll('.ai-diagnosis-class .questionClass').boundingClientRect(data => {
								uni.pageScrollTo({
									scrollTop: Math.abs(data[0].top) - Math.abs(data[i].top) + 50,
									duration: 500
								})
							}).exec()
							// #endif

							// #ifdef MP-WEIXIN
							uni.createSelectorQuery().in(this).selectAll('.ai-diagnosis-class >>> .questionClass').boundingClientRect(data => {
								uni.pageScrollTo({
									scrollTop: Math.abs(data[0].top) - Math.abs(data[i].top) + 50,
									duration: 500
								})
							}).exec()
							// #endif

						}, 100)
						return;
						break;
					} else {

						let temoObjA = {
							id: this.list[i].answerCheck.id,
							answer: this.list[i].answerCheck.answer
						}
						tempAnswer.push(temoObjA)
					}


				}


				if (tempAnswer.length == this.list.length) {
					console.log('所有的问题都选择了答案:', this.list)
					let answerTotal = []
					for (var i = 0; i < this.list.length; i++) {
						let tempObj = this.list[i];
						if (tempObj.type == '1' || tempObj.type == '3') {
							answerTotal.push({
								id: tempObj.answerCheck.id,
								answer: tempObj.answerCheck.answer
							})
						}
						if (tempObj.type == '2') {
							let strAnswer = "";
							for (var j = 0; j < tempObj.answerCheck.answerList.length; j++) {
								let aObj = tempObj.answerCheck.answerList[j];
								if (j == 0) {
									strAnswer = aObj
								} else {
									strAnswer = aObj + '_' + strAnswer;
								}

							}
							answerTotal.push({
								id: tempObj.answerCheck.id,
								answer: strAnswer
							})

						}
					}

					if (this.activePatient == null) {
						uni.showToast({
							title: "请选择问诊人",
							icon: "none"
						})
						return;
					}


					let postParam = {
						userId: this.loginData.id,
						patientId: this.activePatient.id,
						testPaperId: this.list[0].testPaperId,
						eyeQuestionsList: answerTotal
					}

					console.log('post-param ==', postParam)

					uni.$emit('postWJParam', postParam)

					uni.navigateTo({
						url: "/pages/aidiagnosis/selectdoctor"
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.ai-diagnosis-class {
		padding: 10px;
		background-color: white;

	}
</style>