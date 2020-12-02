<template>
	<view class="box" :class="{'box-active': checkValue == true}"></view>
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
		background-image: url(../../static/images/check_box.svg);
		background-repeat: no-repeat;
		background-size: 100%;
		width: 23px;
		height: 23px;
	}
</style>
