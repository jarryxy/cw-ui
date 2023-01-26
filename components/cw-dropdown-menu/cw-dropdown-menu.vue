<template>
	<view class="cw-dropdown-menu cw-dropdown-menu--top-bottom">
		<view :class="$o.utils.bem('dropdown-menu__item', { disabled: item.disabled })" @tap="onTitleTap(index)" v-for="(item, index) in itemListData" :key="index">
			<view
				:class="item.titleClass + ' ' + $o.utils.bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') })"
				:style="item.showPopup ? 'color:' + activeColor : ''"
			>
				<view class="cw-ellipsis">{{ displayTitle(item) }}</view>
			</view>
		</view>
		<slot />
	</view>
</template>
<script>
import { addUnit } from '../../libs/function/utils.js';
import { getRect, getSystemInfoSync } from '../../libs/function/common.js';

let ARRAY = [];
export default {
	name: 'cw-dropdown-menu',
	props: {
		activeColor: {
			type: String
		},
		overlay: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: Number,
			default: 10
		},
		duration: {
			type: Number,
			default: 200
		},
		direction: {
			type: String,
			default: 'down'
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		closeOnClickOutside: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			itemListData: []
		};
	},
	created() {
		this.children = [];
	},
	computed: {},
	watch: {},

	beforeCreate() {
		const { windowHeight } = getSystemInfoSync();
		this.windowHeight = windowHeight;
		ARRAY.push(this);
	},

	destroyed() {
		ARRAY = ARRAY.filter(item => item !== this);
	},

	methods: {
		displayTitle(item) {
			if (item.title) {
				return item.title;
			}

			var match = item.options.filter(function(option) {
				return option.value === item.value;
			});
			var displayTitle = match.length ? match[0].text : '';
			return displayTitle;
		},
		updateItemListData() {
			this.itemListData = this.children.map(child => child);
		},

		toggleItem(active) {
			this.children.forEach((item, index) => {
				const { showPopup } = item;

				if (index === active) {
					item.toggle();
				} else if (showPopup) {
					item.toggle(false, {
						immediate: true
					});
				}
			});
		},

		close() {
			this.children.forEach(child => {
				child.toggle(false, {
					immediate: true
				});
			});
		},

		getChildWrapperStyle() {
			const { zIndex, direction } = this;
			return getRect(this, '.cw-dropdown-menu').then(rect => {
				const { top = 0, bottom = 0 } = rect;
				let offset = direction === 'down' ? bottom : this.windowHeight - top;
				let wrapperStyle = `z-index: ${zIndex};`;

				if (direction === 'down') {
					// #ifdef H5
					offset += 44
					// #endif
					wrapperStyle += `top: ${addUnit(offset)};`;
				} else {
					wrapperStyle += `bottom: ${addUnit(offset)};`;
				}
				return wrapperStyle;
			});
		},

		onTitleTap(index) {
			const child = this.children[index];

			if (!child.disabled) {
				ARRAY.forEach(menuItem => {
					if (menuItem && menuItem.closeOnClickOutside && menuItem !== this) {
						menuItem.close();
					}
				});
				this.toggleItem(index);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-dropdown-menu {
	display: -webkit-flex;
	display: flex;
	box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
	-webkit-user-select: none;
	user-select: none;
	height: 50px;
	background-color: #fff;
}

.cw-dropdown-menu__item {
	display: -webkit-flex;
	display: flex;
	-webkit-flex: 1;
	flex: 1;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	min-width: 0;
}

.cw-dropdown-menu__item:active {
	opacity: 0.7;
}

.cw-dropdown-menu__item--disabled:active {
	opacity: 1;
}

.cw-dropdown-menu__item--disabled .cw-dropdown-menu__title {
	color: #969799;
}

.cw-dropdown-menu__title {
	position: relative;
	box-sizing: border-box;
	max-width: 100%;
	padding: 0 8px;
	color: #323233;
	font-size: 15px;
	line-height: 18px;
}

.cw-dropdown-menu__title:after {
	position: absolute;
	top: 50%;
	right: -4px;
	margin-top: -5px;
	border-color: transparent transparent currentcolor currentcolor;
	border-style: solid;
	border-width: 3px;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	opacity: 0.8;
	content: '';
}

.cw-dropdown-menu__title--active {
	color: #ee0a24;
}

.cw-dropdown-menu__title--down:after {
	margin-top: -1px;
	-webkit-transform: rotate(135deg);
	transform: rotate(135deg);
}
</style>
