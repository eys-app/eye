<template>
	<view class="filter-wrapper" :style="{ height: height + 'rpx', top: top,'border-top':border?'1rpx solid #f2f2f2':'none' }"
	 @touchmove.stop.prevent="discard">
		<view class="inner-wrapper">
			<view class="mask" :class="showMask ? 'show' : 'hide'" @tap="tapMask"></view>
			<view class="navs">


				<view class="date-wrapper">
					<view class="date c-flex-align" :style="{ height: height + 'rpx' }" @click="onShowDatePicker('rangetime')">
						<view>{{ selDate }}</view>
						<image src="https://i.loli.net/2020/07/15/xjVSvzWcH9NO7al.png" mode="" class="icon-triangle"></image>
					</view>
					<!-- <view @click="onShowDatePicker('rangetime')">{{selDate}}</view> -->
					<!-- <picker mode="date" @change="handleDate">
						<view class="date c-flex-align" :style="{ height: height + 'rpx' }" @click="dateClick">
							<view>{{ selDate }}</view>
							<image src="https://i.loli.net/2020/07/15/xjVSvzWcH9NO7al.png" mode="" class="icon-triangle"></image>
						</view>
					</picker> -->
				</view>

				<view class="c-flex-align" :class="{ 'c-flex-center': index > 0, actNav: index === actNav }" v-for="(item, index) in navData"
				 :key="index" @click="navClick(index)">
					<view v-for="(child, childx) in item" :key="childx" v-if="child.select">{{ child.text }}</view>
					<image src="https://i.loli.net/2020/07/15/QsHxlr1gbSImvWt.png" mode="" class="icon-triangle" v-if="index === actNav"></image>
					<image src="https://i.loli.net/2020/07/15/xjVSvzWcH9NO7al.png" mode="" class="icon-triangle" v-else></image>
				</view>
				<view class="mine" @click="doc_mineClick">
					<image src="../../static/images/mine-ed.png"></image>
				</view>
			</view>

			<scroll-view scroll-y="true" class="popup" :class="popupShow ? 'popupShow' : ''">
				<view class="item-opt c-flex-align" :class="item.select ? 'actOpt' : ''" v-for="(item, index) in navData[actNav]"
				 :key="index" @click="handleOpt(index)">
					{{ item.text }}
				</view>
			</scroll-view>
		</view>


		<mx-date-picker :show="showPicker" type="range" :value="value" :show-tips="true"
		 :begin-text="'开始'" :end-text="'结束'" format="yyyy-mm-dd 00:00:00"
		 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />



	</view>
</template>

<script>
	// import { getCurDateTime } from '@/libs/utils.js';
	 import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		 components: {
		            MxDatePicker
		        },
		props: {
			height: {
				type: Number,
				default: 108
			},
			top: {
				type: String,
				default: 'calc(var(--window-statsu-bar) + 44px)'
			},
			border: {
				type: Boolean,
				default: false
			},
			filterData: {
				//必填
				type: Array,
				default: () => {
					return [];
				}
				// default: () => {
				//     return [
				//         [{ text: '全部状态', value: '' }, { text: '状态1', value: 1 }, { text: '状态2', value: 2 }, { text: '状态3', value: 3 }],
				//         [{ text: '全部类型', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }]
				//     ];
				// }
			},
			defaultIndex: {
				//默认选中条件索引,超出一类时必填
				type: Array,
				default: () => {
					return [0];
				}
			}
		},
		data() {
			return {
				navData: [],
				popupShow: false,
				showMask: false,
				actNav: null,
				selDate: '测评时间',
				selIndex: [], //选中条件索引

				showPicker: false,
				value: ''
			};
		},
		created() {
			this.navData = this.filterData;
			this.selIndex = this.defaultIndex;
			this.keepStatus();
		},
		mounted() {
			// this.selDate = getCurDateTime().formatDate;
		},
		methods: {

			onShowDatePicker(type) {
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					let tempValue = e.value;
					this.$emit('dateChange', tempValue);

				}
			},

			keepStatus() {
				this.navData.forEach(itemnavData => {
					itemnavData.map(child => {
						child.select = false;
					});
					return itemnavData;
				});
				for (let i = 0; i < this.selIndex.length; i++) {
					let selindex = this.selIndex[i];
					this.navData[i][selindex].select = true;
				}
			},
			navClick(index) {
				if (index === this.actNav) {
					this.tapMask();
					return;
				}
				this.popupShow = true;
				this.showMask = true;
				this.actNav = index;
			},
			handleOpt(index) {
				this.selIndex[this.actNav] = index;
				this.keepStatus();
				setTimeout(() => {
					this.tapMask();
				}, 100);
				let data = [];
				let res = this.navData.forEach(item => {
					let sel = item.filter(child => child.select);
					data.push(sel);
				});
				// console.log(data);
				this.$emit('onSelected', data);
			},
			dateClick() {
				this.tapMask();
			},
			tapMask() {
				this.showMask = false;
				this.popupShow = false;
				this.actNav = null;
			},
			handleDate(e) {
				let d = e.detail.value;
				this.selDate = d;
				this.$emit('dateChange', d);
			},
			discard() {},
			doc_mineClick() {
				this.$emit('doc_mineClick', '');
			}

		}
	};
</script>

<style lang="scss" scoped>
	page {
		font-size: 28rpx;
	}

	.mine {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px !important;
		margin-right: 10px;
		background-color: #FFFFFF;

		image {
			width: 100%;
			height: 100%;
		}
	}


	.c-flex-align {
		display: flex;
		align-items: center;
		justify-content: center;
		// background-color: #8A6DE9;
		color: #8b9aae;
		flex: 1;
	}

	.c-flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #8b9aae;
		// margin-right: 30rpx;
		// background-color: #DD524D;
		// flex: 1;
	}

	.filter-wrapper {
		// position: fixed;
		left: 0;
		width: 750rpx;
		z-index: 999;

		.inner-wrapper {

			// position: relative;
			.navs {
				position: relative;
				// height: 110rpx;
				// padding: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #fff;
				border-bottom: 2rpx solid #f5f6f9;
				// color: #8b9aae;
				z-index: 999;
				box-sizing: border-box;

				&>view {
					// flex: 1;
					height: 100%;
					flex-direction: row;
					z-index: 999;
				}

				.date {
					// background-color: #F0AD4E;
					// flex: 1;
					padding-left: 35rpx;
					padding-right: 35rpx;
					// justify-content: flex-end;
				}

				.actNav {
					color: #4d7df9;
					font-weight: bold;
					// background-color: #576B95;
				}
			}

			.mask {
				z-index: 666;
				position: fixed;
				top: calc(var(--status-bar-height) + 44px);
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0);
				transition: background-color 0.15s linear;

				&.show {
					background-color: rgba(0, 0, 0, 0.4);
				}

				&.hide {
					display: none;
				}
			}

			.popup {
				position: relative;
				max-height: 500rpx;
				background-color: #fff;
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				overflow: scroll;
				z-index: 999;
				transition: all 1s linear;
				opacity: 0;
				display: none;

				.item-opt {
					height: 100rpx;
					padding: 0 40rpx;
					color: #8b9aae;
					border-bottom: 2rpx solid #f5f6f9;
				}

				.actOpt {
					color: #4d7df9;
					font-weight: bold;
					position: relative;

					&::after {
						content: '✓';
						font-weight: bold;
						font-size: 36rpx;
						position: absolute;
						right: 40rpx;
					}
				}
			}

			.popupShow {
				display: block;
				opacity: 1;
			}
		}

		.icon-triangle {
			width: 16rpx;
			height: 16rpx;
			margin-left: 10rpx;
		}
	}
</style>
