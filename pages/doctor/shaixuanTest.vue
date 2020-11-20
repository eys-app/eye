<template>
	<view>
		<view class="root">
		    <ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex'
		    @onSelected='onSelected' @dateChange='dateChange'></ren-dropdown-filter>
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	    export default {
	        components:{
	            RenDropdownFilter
	        },
	        data() {
	            return {
	                filterData:[
	                    [{ text: '全部状态', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }],
	                    [{ text: '全部类型', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }]
	                ],
	                defaultIndex:[0,0]
	            }
	        },
	        onLoad() {
	
	        },
	        methods: {
	            onSelected(res){
	                console.log(res)
	            },
	            dateChange(d){
	               uni.showToast({
	                   icon:'none',
	                   title:d
	               })
	            }
	        }
	    
	}
</script>

<style>

</style>
