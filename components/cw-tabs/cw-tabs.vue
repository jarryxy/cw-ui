<template>
	<view :class="'custom-class ' + $o.utils.bem('tabs', [type])">
		<view :class="$o.utils.bem('tabs__wrap', { scrollable }) + ' ' + (type === 'line' && border ? 'cw-hairline--top-bottom' : '')">
			<slot name="nav-left" />
			<scroll-view
				:scroll-x="scrollable"
				scroll-with-animation
				:scroll-left="scrollLeft"
				:class="[$o.utils.bem('tabs__scroll', [type])]"
				:style="color ? 'border-color: ' + color : ''"
			>
				<view :class="[$o.utils.bem('tabs__nav', [type, { complete: !ellipsis }]), navClass]" :style="navStyle">
					<view v-if="type === 'line'" class="cw-tabs__line" :style="lineStyle" />
					<view
						:data-index="index"
						:class="
							tabClass(index === currentIndex, ellipsis) + ' ' + $o.utils.bem('tab', { active: index === currentIndex, disabled: item.disabled, complete: !ellipsis })
						"
						:style="[
							tabStyle({
								active: index === currentIndex,
								ellipsis,
								color,
								type,
								disabled: item.disabled,
								titleActiveColor,
								titleInactiveColor,
								swipeThreshold,
								scrollable
							})
						]"
						@tap="onTap"
						v-for="(item, index) in tabs"
						:key="index"
					>
						<view :class="ellipsis ? 'cw-ellipsis' : ''" :style="item.titleStyle">
							<view>{{ item.title }}</view>
							<cw-info v-if="item.info !== null || item.dot" :info="item.info" :dot="item.dot" custom-class="cw-tab__title__info" />
						</view>
					</view>
				</view>
			</scroll-view>

			<slot name="nav-right" />
		</view>
		<view class="cw-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
			<view :class="[$o.utils.bem('tabs__track', [{ animated }]), 'cw-tabs__track']" :style="trackStyle"><slot /></view>
		</view>
	</view>
</template>
<script>
import { touch } from '../../libs/mixin/touch';
import { getAllRect, getRect, groupSetData, nextTick, requestAnimationFrame } from '../../libs/function/common.js';
import { isDef } from '../../libs/function/validator';
import index from './index.js';
import style from '../../libs/function/style';
import addUnit from '../../libs/function/add-unit';
export default {
	name: 'cw-tabs',
	mixins: [index, touch],
	classes: ['tab-class', 'tab-active-class', 'line-class'],
	props: {
		border: Boolean,
		swipeable: Boolean,
		titleActiveColor: null,
		titleInactiveColor: String,
		color: String,
		navClass: String,
		animated: {
			type: Boolean
		},
		lineWidth: {
			type: null,
			default: 40
		},
		lineHeight: {
			type: null,
			default: -1
		},
		active: {
			type: null,
			default: 0
		},
		type: {
			type: String,
			default: 'line'
		},
		ellipsis: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 0.3
		},
		zIndex: {
			type: Number,
			default: 1
		},
		swipeThreshold: {
			type: Number,
			default: 5
		},
		lazyRender: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			tabs: [],
			scrollLeft: 0,
			scrollable: false,
			currentIndex: 0,
			container: false,
			skipTransition: true,
			lineOffsetLeft: 0
		};
	},
	created() {
		this.children = [];
	},
	mounted() {
		nextTick(() => {
			this.resize(true);
		});
		requestAnimationFrame(() => {
			this.container = () => this.createSelectorQuery().select('.cw-tabs');
			this.resize(true);
			setTimeout(() => {
				// 需要在getRect uni.createSelectorQuery() 需要在mounted之后调用
				this.scrollIntoView();
			}, 30);
		});
	},

	methods: {
		/** 待修复bug 不生效 去掉[] 微信小程序不兼容
		 * 
						:style="[tabStyle({
								active: index === currentIndex,
								ellipsis,
								color,
								type,
								disabled: item.disabled,
								titleActiveColor,
								titleInactiveColor,
								swipeThreshold,
								scrollable
							})]"
		 */
		tabStyle(data) {
			var titleColor = data.active ? data.titleActiveColor : data.titleInactiveColor;

			var ellipsis = data.scrollable && data.ellipsis;
			// card theme color
			if (data.type === 'card') {
				return style({
					'border-color': data.color,
					'background-color': !data.disabled && data.active ? data.color : null,
					color: titleColor || (!data.disabled && !data.active ? data.color : null),
					'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null
				});
			}
			return style({
				color: titleColor,
				'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null
			});
		},
		tabClass({ active, ellipsis }) {
			var classes = ['tab-class'];

			if (active) {
				classes.push('tab-active-class');
			}

			if (ellipsis) {
				classes.push('cw-ellipsis');
			}

			return classes.join(' ');
		},
		updateTabs() {
			// console.log(this.children[0].$props);
			// const { children = [], swipeThreshold,ellipsis,active } = this;
			// this.tabs = [{ title: '13' }, { title: '121213' }];
			this.tabs = this.children.map(item => item.$props);
			this.scrollable = this.children.length > this.swipeThreshold || !this.ellipsis;
			this.setCurrentIndexByName(this.active || this.getCurrentName());
		},

		trigger(eventName, child) {
			const { currentIndex } = this;
			const currentChild = child || this.children[currentIndex];

			if (!isDef(currentChild)) {
				return;
			}

			this.$emit(eventName, {
				index: currentChild.index,
				name: currentChild.getComputedName(),
				title: currentChild.title
			});
		},

		onTap(event) {
			const { index } = event.currentTarget.dataset;
			const child = this.children[index];

			if (child.disabled) {
				this.trigger('disabled', child);
			} else {
				this.setCurrentIndex(index);
				nextTick(() => {
					this.trigger('click');
				});
			}
		},

		// correct the index of active tab
		setCurrentIndexByName(name) {
			const { children = [] } = this;
			const matched = children.filter(child => child.getComputedName() === name);

			if (matched.length) {
				this.setCurrentIndex(matched[0].index);
			}
		},

		setCurrentIndex(currentIndex) {
			const { children = [] } = this;

			if (!isDef(currentIndex) || currentIndex >= children.length || currentIndex < 0) {
				return;
			}

			// groupSetData(this, () => {
				children.forEach((item, index) => {
					const active = index === currentIndex;

					if (active !== item.active || !item.inited) {
						item.updateRender(active, this);
					}
				});
			// });

			if (currentIndex === this.currentIndex) {
				return;
			}

			const shouldEmitChange = this.currentIndex !== null;
			this.currentIndex = currentIndex;
			nextTick(() => {
				this.resize();
				this.scrollIntoView();
				this.trigger('input');

				if (shouldEmitChange) {
					this.trigger('change');
				}
			});
		},

		getCurrentName() {
			const activeTab = this.children[this.currentIndex];

			if (activeTab) {
				return activeTab.getComputedName();
			}
		},

		resize(skipTransition = false) {
			if (this.type !== 'line') {
				return;
			}
			const { currentIndex, ellipsis } = this;
			Promise.all([getAllRect(this, '.cw-tab'), getRect(this, '.cw-tabs__line')]).then(([rects = [], lineRect]) => {
				const rect = rects[currentIndex];
				if (rect == null) {
					return;
				}

				let lineOffsetLeft = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
				lineOffsetLeft += (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8);
				this.lineOffsetLeft = lineOffsetLeft;
				this.skipTransition = skipTransition;
			});
		},

		// scroll active tab into view
		scrollIntoView() {
			const { currentIndex, scrollable } = this;

			if (!scrollable) {
				return;
			}
			Promise.all([getAllRect(this, '.cw-tab'), getRect(this, '.cw-tabs__nav')]).then(([tabRects, navRect]) => {
				const tabRect = tabRects[currentIndex];
				const offsetLeft = tabRects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
				this.scrollLeft = offsetLeft - (navRect.width - (tabRect ? tabRect.width : 0)) / 2;
			});
		},

		onTouchStart(event) {
			if (!this.swipeable) {
				return;
			}

			this.touchStart(event);
		},

		onTouchMove(event) {
			if (!this.swipeable) {
				return;
			}

			this.touchMove(event);
		},

		// watch swipe touch end
		onTouchEnd() {
			if (!this.swipeable) {
				return;
			}

			const { direction, deltaX, offsetX } = this;
			const minSwipeDistance = 50;

			if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
				const index = this.getAvaiableTab(deltaX);

				if (index !== -1) {
					this.setCurrentIndex(index);
				}
			}
		},

		getAvaiableTab(direction) {
			const { tabs, currentIndex } = this;
			const step = direction > 0 ? -1 : 1;

			for (let i = step; currentIndex + i < tabs.length && currentIndex + i >= 0; i += step) {
				const index = currentIndex + i;

				if (index >= 0 && index < tabs.length && tabs[index] && !tabs[index].disabled) {
					return index;
				}
			}

			return -1;
		}
	},
	watch: {
		swipeThreshold(value) {
			this.scrollable = this.children.length > value || !this.ellipsis;
		},
		active(name) {
			if (name !== this.getCurrentName()) {
				this.setCurrentIndexByName(name);
			}
		},
		animated() {
			this.children.forEach((child, index) => child.updateRender(index === this.currentIndex, this));
		},
		lineWidth() {
			this.resize();
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-tabs {
	position: relative;
	-webkit-tap-highlight-color: transparent;
}

.cw-tabs__wrap {
	display: flex;
	overflow: hidden;
}

.cw-tabs__wrap--scrollable .cw-tab {
	flex: 0 0 22%;
}

.cw-tabs__wrap--scrollable .cw-tab--complete {
	flex: 1 0 auto !important;
	padding: 0 12px;
}

.cw-tabs__wrap--scrollable .cw-tabs__nav--complete {
	padding-right: 8px;
	padding-left: 8px;
}

.cw-tabs__scroll {
	background-color: #fff;
}

.cw-tabs__scroll--line {
	box-sizing: initial;
	height: calc(100% + 15px);
}

.cw-tabs__scroll--card {
	margin: 0 16px;
}

.cw-tabs__scroll::-webkit-scrollbar {
	display: none;
}

.cw-tabs__nav {
	position: relative;
	display: -webkit-flex;
	display: flex;
	-webkit-user-select: none;
	user-select: none;
}

.cw-tabs__nav--card {
	box-sizing: border-box;
	height: 30px;
	border: 1px solid #ee0a24;
	border-radius: 2px;
}

.cw-tabs__nav--card .cw-tab {
	color: #ee0a24;
	line-height: 28px;
	border-right: 1px solid #ee0a24;
}

.cw-tabs__nav--card .cw-tab:last-child {
	border-right: none;
}

.cw-tabs__nav--card .cw-tab.cw-tab--active {
	color: #fff;
	background-color: #ee0a24;
}

.cw-tabs__nav--card .cw-tab--disabled {
	color: #c8c9cc;
}

.cw-tabs__line {
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 1;
	height: 3px;
	border-radius: 3px;
	background-color: #ee0a24;
}

.cw-tabs__track {
	position: relative;
	width: 100%;
	height: 100%;
}

.cw-tabs__track--animated {
	display: -webkit-flex;
	display: flex;
	transition-property: left;
}

.cw-tabs__content {
	overflow: hidden;
}

.cw-tabs--line .cw-tabs__wrap {
	height: 44px;
}

.cw-tabs--card .cw-tabs__wrap {
	height: 30px;
}

.cw-tab {
	position: relative;
	-webkit-flex: 1;
	flex: 1;
	box-sizing: border-box;
	min-width: 0;
	padding: 0 5px;
	text-align: center;
	cursor: pointer;
	color: #646566;
	font-size: 14px;
	line-height: 44px;
}

.cw-tab--active {
	font-weight: 500;
	color: #323233;
}

.cw-tab--disabled {
	color: #c8c9cc;
}

.cw-tab__title__info {
	position: relative !important;
	top: -1px !important;
	// display: inline-block;
	-webkit-transform: translateX(0) !important;
	transform: translateX(0) !important;
}

.cw-ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	display: flex;
	justify-content: center;
	flex-direction: row;
	align-items: center;
}
</style>
