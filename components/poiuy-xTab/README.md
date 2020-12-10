

插件安装
	
tab切换组件 将组件放在自己的组件库里导入即可

### 注意

请使用一个宽度为100%容器将组件包裹

开启自适应后 将只会在当前可见域滚动，关闭scroll-x,自动计算间距。（只有固定3-4项的情况下使用）

下划线模式下 下划线总在底部，不管给多少高度。给了下划线position属性后，会自动缩短下划线宽度并且居中于当前栏。
	
#### 导入：  
> import xTab from '@/components/poiuy-xTab/xTab.vue';

-------------------------------------   

#### 属性 attribute

| 属性名            | 类型     | 介绍          | 默认值              |
|----------------|--------|-------------|------------------|
| value         | Array  | 数据列表      | \[\]             |
| actValue | actValue | 当前所在位置（选中）   |                 |
| setField       | Object | 设置对应字段 | {id:'id',name:'name'}                |
| adaptation        | Boolean | 是否自适应显示     | false         |
| actType        | String  |选中方式(triangle[三角形]/underline[下划线])    | triangle |
| config        | Object  | 配置对象 **已经设置默认值**   | {} |

------------------------------------- 

>>config对象参数

| 属性名            | 类型     | 介绍          | 默认值              |
|----------------|--------|-------------|------------------|
| height         | Number  | 组件的高度      | 80 (rpx)           |
| padding | Number | 组件的左右间距   | 30 (rpx)                |
| size       | Number | 文字大小 | 34 (rpx)             |
| color        | String | 文字颜色（直接传颜色）     | #FEC1AB         |
| actColor        | String  | 选中时的颜色    | #FFFFFF |
| spacing        | Number  | 每一项跟右边的间距    | 44 (rpx) |
| position        | Number  | 选中标识的位置    | 0 |
| actWeight        | String  | 选中时文字的字重    | 100 |

------------------------------------- 

#### 方法 method

| 方法名    | 介绍                     |
|--------|------------------------|
| changeTab | 选择之后的返回结果,会返回当前[id/name/index]      |

-------------------------------------

####示范代码

```

<template>
<view class="tab-view">
<xTab adaptation :value="tabList" @changeTab="changeTab" actType="underline" :config="{color:'#666666',actColor:'#FE4603',size:32,actWeight:'Bold',position:0}"></xTab>
</view>
</template>
<script>
	import xTab from '@/components/poiuy-xTab/xTab.vue';
	export default {
		components: {
			xTab
		},
		data() {
			return {
				tabList:[{
					id:1,
					name:'测试列表(7)'
				},{
					id:2,
					name:'测试介绍'
				},{
					id:3,
					name:'测试评论(100)'
				}]
			}
		},
		methods: {
			changeTab(e){
				console.log(e);
			}
}
</script>
<style>
.tab-view{
	width:100%
}
</style>

```

-------------------------------------

###[彩蛋提示]

**配合swiper 使用 [代码可复制使用]**

```

<template>
		<view class="tab-view">
			<xTab adaptation :value="tabList" :actValue="swiperCurrIndex" @changeTab="changeTab" actType="underline" :config="{color:'#666666',actColor:'#FE4603',size:32,actWeight:'Bold',position:0}"></xTab>
			<view>
				<swiper :current="swiperCurrIndex" @change="swiperChange" :style="{height:swiperHegiht}">
					<swiper-item v-for="(item,index) of tabList" :key="index">
					<view :id="'swiper_id_'+index">
					{{item.name}}
					</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
</template>
<script>
	import xTab from '@/components/poiuy-xTab/xTab.vue';
	export default {
		components: {
			xTab
		},
		data() {
			return {
				tabList:[{
					id:1,
					name:'测试列表(7)'
				},{
					id:2,
					name:'测试介绍'
				},{
					id:3,
					name:'测试评论(100)'
				}],
				swiperCurrIndex:0,//swiper当前位置
				swiperHegiht:300, //swiper动态高度
			}
		},
		onLoad:function(){
			this.setSwiperHeight();
		},
		methods: {
			//xTab 组件的切换返回方法
			changeTab(e){
				console.log(e);
				this.swiperCurrIndex = e.index;
				this.setSwiperHeight();
			},

			//swiper组件的切换返回值
			swiperChange(e) {
				this.swiperCurrIndex = e.detail.current;
				this.setSwiperHeight();
			},
			//动态设置swiper高度
			setSwiperHeight() {
				const that = this;
				let obj = uni.createSelectorQuery().in(this).select("#swiper_id_" + (this.swiperCurrIndex));
				obj.boundingClientRect(function(data) { //data - 各种参数
					if (data) {
						//得到px单位的高度，通过px转换rpx的单位换算(加上底部的间距或者存在底部按钮高度合成最后的rpx高度)
						that.swiperHegiht = data.height * 2 + 110; 
					}
				}).exec();
			},
}
}
</script>
<style>
.tab-view{
	width:100%
}
	swiper {
			min-height: 80vh;
		}
</style>

```
 
	



	