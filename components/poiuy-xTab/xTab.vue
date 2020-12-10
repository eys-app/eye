<template>
	<view :style="{padding:'0 '+conf.padding+'rpx',height:conf.height+'rpx'}" class="view-scroll">
		<scroll-view class="scroll-view" scroll-with-animation :scroll-x="!adaptation" :scroll-into-view="'sv_'+currAct"
		 :style="{height:(conf.height)+'rpx'}">
			<view :class="adaptation?'adaptation':''">
				<view :id="'sv_'+item[setField.id]" @click="select(i)" v-for="(item,i) of tabList" :key="i" class="view-content"
				 :style="{'font-size':conf.size+'rpx',color:conf.color,'margin-right':adaptation?0:conf.spacing+'rpx',height:conf.height+'rpx','line-height':conf.height+'rpx'}">
					<label :id="'txt_'+item[setField.id]" class="txt" :style="{color:currAct===item.id?(conf.actColor):(conf.color),'font-weight':(currAct===item.id?conf.actWeight:'initial')}">{{item[setField.name]}}</label>
				</view>
				<text v-if="actType =='triangle'" :style="{color:conf.actColor,left:moves+'px',top:((conf.height)-20)+'rpx'}" class="xTab-icon icon_act">&#xe6b5;</text>
				<text v-if="actType =='underline'" :style="{width:lineWidth+'px',background:conf.actColor,left:moves+'px',top:(conf.height-4)+'rpx'}"
				 class="underline"></text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'xTab',
		props: {
			config: {
				type: Object,
				default: () => {
					return {}
				}
			},
			value: {
				type: Array,
				default: () => {
					return []
				}
			},
			actValue: {
				type: Number,
				default: 0
			},
			setField: { //设置字段
				type: Object,
				default: () => {
					return {
						id: 'id',
						name: 'name'
					}
				}
			},
			adaptation: { //是否自适应显示
				type: Boolean,
				default: false
			},
			actType: {
				type: String,
				default: 'triangle' //选中类型： triangle (三角形)| underline (下划线)
			}
		},
		data() {
			return {
				conf: {
					height: 80,
					padding: 30,
					size: 34,
					color: '#FEC1AB',
					actColor: '#FFFFFF',
					spacing: 44,
					position: 0,
					actWeight: '100',
				},
				currAct: null,
				moves: 0,
				lineWidth: 0,
				tabList: [],
				screenWidth: null,
				isClick: null,
			}
		},
		created() {
			const that = this;
			uni.getSystemInfo({
				success: (res) => {
					that.screenWidth = res.screenWidth;
				}
			});
			this.init();
		},
		watch: {
			actValue(n, o) {
				if (this.value.length) {
					this.currAct = this.value[n][this.setField.id];
					if (!this.isClick) {
						this.emit(n);
						this.operate(n);
					}
					this.isClick = false;
				}

			},
			value() {
				this.init();
			}
		},
		methods: {
			init() {
				const that = this;
				//数据初始化
				if (this.value.length) {
					this.tabList = JSON.parse(JSON.stringify(this.value));
					this.conf = Object.assign(this.conf, this.config);
					this.currAct = this.value[this.actValue][this.setField.id];
					this.$nextTick(function() {
						that.setLineWidth();
					})
				}
			},
			select(i) {
				this.emit(i);
				this.operate(i);
				this.isClick = true;
			},
			operate(curr) {
				curr = Number(curr);
				let item = this.tabList[curr];
				if (this.actType === "underline") {
					this.lineWidth = item.width || 0;
					this.lineWidth -= this.conf.position * 2;
				}
				if (curr > 0) {
					this.deal(curr);
				} else {
					//第一个位置
					this.moves = this.conf.position
				}
			},
			deal(index) {
				let leng = 0;
				for (let i = 0; i < index; i++) {
					leng += this.tabList[i].width + (this.conf.spacing / 2);
				}
				this.moves = leng + this.conf.position;
			},

			emit(i) {
				let e = this.value[i];
				this.currAct = e[this.setField.id];
				e.index = i;
				this.$emit("changeTab", e);
			},
			setLineWidth() {
				const that = this;
				let w = null;
				this.tabList.map((item, index) => {
					let obj = uni.createSelectorQuery().in(this).select("#txt_" + item.id);
					obj.boundingClientRect(function(data) { //data - 各种参数
						if (data) {
							item.width = data.width;
							w += data.width;
							if (index == that.tabList.length - 1) {
								if (that.adaptation) {
									if (w >= that.screenWidth) {
										that.conf.spacing = 0;
									} else {
										let space = that.screenWidth - that.conf.padding - w;
										that.conf.spacing = Number(space / index) * 2;
									}
								}
								that.operate(that.actValue);
							}
						}
					}).exec();
				});
			}
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'xTab-icon';
		/* project id 2137302 */
		src: url('//at.alicdn.com/t/font_2137302_tcl4wkbx5.eot');
		src: url('//at.alicdn.com/t/font_2137302_tcl4wkbx5.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_2137302_tcl4wkbx5.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_2137302_tcl4wkbx5.woff') format('woff'),
			url('//at.alicdn.com/t/font_2137302_tcl4wkbx5.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_2137302_tcl4wkbx5.svg#icon') format('svg');
	}

	.xTab-icon {
		font-family: "xTab-icon" !important;
		font-size: 30rpx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	.scroll-view {
		width: 100%;
		white-space: nowrap;
		position: relative;
		transition: all .5s;
	}

	.scroll-view>view {
		width: 100%;
		height: 100%;
	}

	.view-content {
		display: inline-block;
	}

	.txt {
		transition: color .3s;
	}

	.view-content>text {
		position: absolute;
		bottom: -10rpx;
		left: 15%;
		font-size: 28rpx;
		color: white;
	}

	.icon_act {
		position: absolute;
		font-size: 28rpx;
		color: white;
		transition: all .4s;
	}

	.underline {
		position: absolute;
		bottom: 0;
		height: 4rpx;
		transition: all .4s;
	}

	.adaptation {
		display: flex;
		justify-content: space-between;
	}
</style>
