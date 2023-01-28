<template>
	<view>
		<view
			:class="[border ? 'cw-hairline--top-bottom' : '', $o.utils.bem('tabbar', { fixed, safe: safeAreaInsetBottom }), customClass]"
			:style="zIndex ? 'z-index: ' + zIndex : ''"
		>
			<slot />
		</view>

		<view v-if="fixed && placeholder" :style="'height: ' + height + 'px;'"></view>
	</view>
</template>
<script>
import { watch } from 'vue';
import { getRect } from '../../libs/function/common.js';
export default {
	name: 'cw-tabbar',
	props: {
		active: {
			type: null
		},
		activeColor: {
			type: String
		},
		inactiveColor: {
			type: String,
			observer: ''
		},
		fixed: {
			type: Boolean,
			default: true
		},
		placeholder: {
			type: Boolean
		},
		border: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: Number,
			default: 1
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		},
		customClass: {
			type: String,
			default: ''
		}
	},
	created() {
		this.children = [];
	},
	data() {
		return {
			height: 50
		};
	},
	computed: {
		watchPros1() {
			return [this.active, this.activeColor, this.inactiveColor];
		},
		watchPros2() {
			return [this.fixed, this.placeholder];
		}
	},
	watch: {
		watchPros1: {
			immediate: true,
			deep: true,
			handler() {
				this.updateChildren();
			}
		},
		watchPros2: {
			immediate: true,
			deep: true,
			handler() {
				this.setHeight();
			}
		}
	},
	methods: {
		updateChildren() {
			const { children } = this;

			if (!Array.isArray(children) || !children.length) {
				return;
			}

			children.forEach(child => child.updateFromParent());
		},

		setHeight() {
			if (!this.fixed || !this.placeholder) {
				return;
			}

			this.$nextTick(() => {
				getRect(this, '.cw-tabbar').then(res => {
					this.height = res.height;
				});
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-tabbar {
	display: flex;
	box-sizing: initial;
	width: 100%;
	height: 50px;
	background-color: #fff;

	justify-content: space-around;
}

.cw-tabbar--fixed {
	position: fixed;
	bottom: 0;
	left: 0;
}

.cw-tabbar--safe {
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
