<template>
	<view :class="[customClass, $o.utils.bem('tab__pane', { active, inactive: !active })]" :style="shouldShow ? '' : 'display: none;'"><slot v-if="shouldRender" /></view>
</template>
<script>
import mixin from '../../libs/mixin/mixin.js';

export default {
	name: 'cw-tab',
	mixins: [mixin],
	props: {
		index:{
			type: [String,Number]
		},
		dot: {
			type: Boolean
		},
		info: {
			type: null
		},
		title: {
			type: String
		},
		disabled: {
			type: Boolean
		},
		titleStyle: {
			type: String
		},
		customClass: String,
		name: {
			type: null,
			default: ''
		}
	},
	computed: {
		watchData() {
			return [this.dot, this.info, this.title, this.disabled, this.titleStyle];
		}
	},
	data() {
		return {
			active: true,
			shouldShow: true,
			shouldRender: true,
			parentData: {
				lazyRender: null,
				animated: null
			}
		};
	},
	watch: {
		watchData() {
			if (this.parent) {
				this.parent.updateTabs();
			}
		}
	},
	mounted() {
		this.init()
		if (this.parent) {
			this.parent.updateTabs();
		}
	},
	methods: {
		init() {
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
			this.updateParentData();
			if (!this.parent) {
				console.error('cw-tab必须搭配cw-tabs组件使用');
			}
		},
		updateParentData() {
			this.getParentData('cw-tabs');
		},

		getComputedName() {
			if (this.name !== '') {
				return this.name;
			}

			return this.index;
		},

		updateRender(active, parent) {
			this.inited = this.inited || active;
			this.active = active;
			this.shouldRender = this.inited || !parent.lazyRender;
			this.shouldShow = active || parent.animated;
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

:host {
	-webkit-flex-shrink: 0;
	flex-shrink: 0;
	width: 100%;
}

.cw-tab__pane,
:host {
	box-sizing: border-box;
}

.cw-tab__pane {
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

.cw-tab__pane--active {
	height: auto;
}

.cw-tab__pane--inactive {
	height: 0;
	overflow: visible;
}
</style>
