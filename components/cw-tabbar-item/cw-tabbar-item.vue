<template>
	<view :class="[$o.utils.bem('tabbar-item', { active }),customClass]" :style="'color: ' + (active ? activeColor : inactiveColor)" @tap="onClick">
		<view class="cw-tabbar-item__icon">
			<cw-icon v-if="icon" :name="icon" :class-prefix="iconPrefix" custom-class="cw-tabbar-item__icon__inner" />
			<block v-else>
				<slot v-if="active" name="icon-active" />
				<slot v-else name="icon" />
			</block>
			<cw-info :dot="dot" :info="info" custom-class="cw-tabbar-item__info" />
		</view>
		<view class="cw-tabbar-item__text"><slot /></view>
	</view>
</template>
<script>
import mixin from '../../libs/mixin/mixin.js';
export default {
	name: 'cw-tabbar-item',
	mixins: [mixin],
	props: {
		info: null,
		name: null,
		icon: String,
		dot: Boolean,
		iconPrefix: {
			type: String,
			default: 'cw-icon'
		}
	},
	data() {
		return {
			active: false,
			activeColor: '',
			inactiveColor: '',
			parentData:{
				active:'',
				activeColor:'',
				inactiveColor: '',
			}
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
			this.updateParentData();
			if (!this.parent) {
				console.error('cw-tabbar-itme必须搭配cw-tabbar组件使用');
			}
			// 初始化时，设置默认属性
			this.updateFromParent()
		},
		updateParentData() {
			this.getParentData('cw-tabbar');
		},
		onClick() {
			const { parent } = this;

			if (parent) {
				const index = parent.children.indexOf(this);
				const active = this.name || index;

				if (active !== this.active) {
					parent.$emit('change', active);
				}
			}

			this.$emit('click');
		},

		updateFromParent() {
			// 重新获取父组件数据
			this.getParentData('cw-tabbar');
			const { parent } = this;

			if (!parent) {
				return;
			}

			const index = parent.children.indexOf(this);
			const parentData = this.parentData
			const active = (this.name || index) === parentData.active;

			if (active !== this.active) {
				this.active = active;
			}

			if (parentData.activeColor !== this.activeColor) {
				this.activeColor = parentData.activeColor;
			}

			if (parentData.inactiveColor !== this.inactiveColor) {
				this.inactiveColor = parentData.inactiveColor;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

:host {
	-webkit-flex: 1;
	flex: 1;
}

.cw-tabbar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: #646566;
	font-size: 12px;
	line-height: 1;
}

.cw-tabbar-item__icon {
	position: relative;
	margin-bottom: 4px;
	font-size: 22px;
}

.cw-tabbar-item__icon__inner {
	display: block;
	min-width: 1em;
}

.cw-tabbar-item--active {
	color: #1989fa;
}

.cw-tabbar-item__info {
	margin-top: 2px;
}
</style>
