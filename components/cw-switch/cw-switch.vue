<template>
	<view :class="switchClass" :style="rootStyle" @tap="onClick">
		<view class="cw-switch__node node-class">
			<cw-loading v-if="loading" :color="loadingColor" custom-class="cw-switch__loading" />
		</view>
	</view>
</template>
<script>
import computed from './index.js';
	/**
	 * switch 开关选择器
	 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
	 * @tutorial https://cw.yuencode.cn/cwui-docs
	 * @property {Boolean}						loading			是否处于加载中（默认 false ）
	 * @property {Boolean}						disabled		是否禁用（默认 false ）
	 * @property {String | Number}				size			开关尺寸，单位px （默认 24 ）
	 * @property {String}						activeColor		打开时的背景色 （默认 '#1989fa' ）
	 * @property {String} 						inactiveColor	关闭时的背景色 （默认 '#ffffff' ）
	 * @property {Boolean | String | Number}	value			通过v-model双向绑定的值 （默认 false ）
	 * @property {Boolean | String | Number}	activeValue		打开选择器时通过change事件发出的值 （默认 true ）
	 * @property {Boolean | String | Number}	inactiveValue	关闭选择器时通过change事件发出的值 （默认 false ）
	 * @property {Boolean}						asyncChange		是否开启异步变更，开启后需要手动控制输入值 （默认 false ）
	 * @property {Object}						customStyle		定义需要用到的外部样式
	 * @property {String}						customClass		定义需要用到的外部class
	 *
	 * @event {Function} change 在switch打开或关闭时触发
	 * @example <cw-switch v-model="checked"</cw-switch>
	 */
export default {
	mixins: [computed],
	props: {
		value: {
			type: [String,Number,Boolean]
		},
		loading: Boolean,
		disabled: Boolean,
		activeColor: String,
		inactiveColor: String,
		size: {
			type: String,
			value: '24'
		},
		activeValue: {
			type: [String,Number,Boolean],
			default: true
		},
		inactiveValue: {
			type: [String,Number,Boolean],
			default: false
		},
		asyncChange:{
			type: Boolean,
			default: false
		},
		customStyle:{
			type: Object,
			default: ()=>{
				return {}
			}
		},
		customClass:{
			type: String,
			default: ''
		}
	},
	methods: {
		onClick() {
			const { activeValue, inactiveValue, disabled, loading } = this

			if (disabled || loading) {
				return;
			}
			const checked = this.value === activeValue;
			const value = checked ? inactiveValue : activeValue;
			if(!this.asyncChange) {
				this.$emit('input', value)
			}
			// 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
			this.$nextTick(() => {
				this.$emit('change', value)
			})
		}
	},
	computed: {
		switchClass() {
			const { value, activeValue, disabled, customClass } = this;
			return [customClass, this.$o.utils.bem('switch', { on: value === activeValue, disabled })];
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-switch {
	position: relative;
	display: inline-block;
	box-sizing: initial;
	width: 2em;
	height: 1em;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 1em;
	transition: background-color 0.3s;
}

.cw-switch__node {
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 100%;
	z-index: 1;
	width: 1em;
	height: 1em;
	background-color: #fff;
	box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
	transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
}

.cw-switch__loading {
	position: absolute !important;
	top: 25%;
	left: 25%;
	width: 50%;
	height: 50%;
}

.cw-switch--on {
	background-color: #1989fa;
}

.cw-switch--on .cw-switch__node {
	transform: translateX(1em);
}

.cw-switch--disabled {
	opacity: 0.4;
}
</style>
