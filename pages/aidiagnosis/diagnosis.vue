<template>
	<view class="ai-diagnosis-class">
		<template v-for="item in list">
			<question-naire></question-naire>
		</template>
		
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
	import questionNaire from './components/question.vue'
	import {getTestRequest} from '../../api/index.js'
	import {mapMutations} from 'vuex'
	export default{
		components:{
			questionNaire
		},
		data(){
			return{
				list:[
					{title:"这是第一题",type: 'R'},
					{title:"这是第二题",type: 'R'},
					{title:"这是第三题",type: 'R'},
					{title:"这是第四题",type: 'R'},
					{title:"这是第五题",type: 'R'}
				]
			}
		},
		mounted() {
			 getTestRequest().then(res => {
				 console.log('data==',res)
			 })
		},
		methods:{
			...mapMutations(["changePatient"]),
			
			changeValue(value){
				this.changePatient(value)
			},
			
		}
	}
</script>

<style>
	.ai-diagnosis-class{
		padding: 10px;
	}
</style>
