<template>
	<view class="box" :class="{'box-active': checkValue == true}">
		<uni-icons type="checkmarkempty" 
		v-show="checkValue == true" color="#ffffff"
		size="18"></uni-icons>
	</view>
</template>

<script>
	export default{
		props:{
			value: Boolean
		},
		data(){
			return{
				checkValue: this.value
			}
		},
		watch:{
			value:{
				handler(n){
					this.checkValue = n;
				}
			}
		}
	}
</script>

<style>
	.box{
		width: 15px;
		height: 15px;
		border: 1px solid #d4d4d4;
		border-radius: 2px;
	}
	.box-active{
		border: none;
		background-color: #007AFF;
		width: 18px;
		height: 18px;
	}
	
	.box-check{
		margin-top: -5px;
	}
</style>
