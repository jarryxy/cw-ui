<template>
	<view v-if="showWrapper" :class="$o.utils.bem('dropdown-item', parentData.direction)" :style="wrapperStyle">
		<cw-popup
			:show="showPopup"
			:custom-style="'position: absolute;' + popupStyle"
			overlay-style="position: absolute;"
			:overlay="parentData.overlay"
			:position="parentData.direction === 'down' ? 'top' : 'bottom'"
			:duration="transition ? parentData.duration : 0"
			:close-on-click-overlay="parentData.closeOnClickOverlay"
			@enter="onOpen"
			@leave="onClose"
			@close="toggle"
			@after-enter="onOpened"
			@after-leave="onClosed"
		>
			<cw-cell
				:class="$o.utils.bem('dropdown-item__option', { active: item.value === value })"
				clickable
				:icon="item.icon"
				@tap.native="onOptionTap({ option: item })"
				v-for="(item, index) in options"
				:key="item.value"
			>
				<view slot="title" class="cw-dropdown-item__title" :style="item.value === value ? 'color:' + parentData.activeColor : ''">{{ item.text }}</view>

				<cw-icon v-if="item.value === value" name="success" class="cw-dropdown-item__icon" :color="parentData.activeColor" />
			</cw-cell>

			<slot />
		</cw-popup>
	</view>
</template>
<script>
/**
 * +----------------------------------------------------------------------
 * | 「e家宜业」 —— 助力物业服务升级，用心服务万千业主
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020-2022 https://www.chowa.cn All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉「e家宜业」和「卓瓦科技」相关版权
 * +----------------------------------------------------------------------
 * | Author: contact@chowa.cn
 * +----------------------------------------------------------------------
 */
import mixin from '../../libs/mixin/mixin.js';
export default {
	name: 'cw-dropdown-item',
	mixins: [mixin],
	props: {
		value: {
			type: null
		},
		title: {
			type: String
		},
		disabled: {
			type: Boolean,
			default: false
		},
		titleClass: {
			type: String
		},
		options: {
			type: Array,
			default: () => {
				return [];
			}
		},
		popupStyle: String
	},
	data() {
		return {
			transition: true,
			showPopup: false,
			showWrapper: false,
			displayTitle: '',
			wrapperStyle: '',
			parentData: {
				overlay: '',
				duration: 0,
				activeColor: '',
				closeOnClickOverlay: '',
				direction: ''
			}
		};
	},
	computed: {
		watchProps() {
			const { value, title, titleClass, options } = this;
			return [value, title, titleClass, options];
		}
	},
	watch: {
		watchProps: {
			handler() {
				this.rerender();
			},
			immediate: true
		}
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
			this.updateParentData();
			if (!this.parent) {
				console.error('cw-dropdown-item必须搭配cw-dropdown-menu组件使用');
			}
		},
		updateParentData() {
			this.getParentData('cw-dropdown-menu');
		},
		rerender() {
			this.$nextTick(() => {
				if (this.parent) {
					this.parent.updateItemListData();
				}
			});
		},

		onOpen() {
			this.$emit('open');
		},

		onOpened() {
			this.$emit('opened');
		},

		onClose() {
			this.$emit('close');
		},

		onClosed() {
			this.$emit('closed');
			this.showWrapper = false;
		},

		onOptionTap({ option }) {
			const { value } = option;
			const shouldEmitChange = this.value !== value;
			this.showPopup = false;
			this.$emit('input', value);
			this.$emit('close');
			this.rerender();

			if (shouldEmitChange) {
				this.$emit('change', value);
			}
		},

		toggle(show, options = {}) {
			var _a;

			const { showPopup } = this;

			if (typeof show !== 'boolean') {
				show = !showPopup;
			}

			if (show === showPopup) {
				return;
			}

			this.transition = !options.immediate;
			this.showPopup = show;

			if (show) {
				this.parent &&
					this.parent.getChildWrapperStyle().then(wrapperStyle => {
						this.wrapperStyle = wrapperStyle;
						this.showWrapper = true;
						this.rerender();
					});
			} else {
				this.rerender();
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-dropdown-item {
	position: fixed;
	right: 0;
	left: 0;
	overflow: hidden;
}

.cw-dropdown-item__option {
	text-align: left;
}

.cw-dropdown-item__option--active .cw-dropdown-item__icon,
.cw-dropdown-item__option--active .cw-dropdown-item__title {
	color: #ee0a24;
}

.cw-dropdown-item--up {
	top: 0;
}

.cw-dropdown-item--down {
	bottom: 0;
}

.cw-dropdown-item__icon {
	display: block;
	line-height: inherit;
}
</style>
