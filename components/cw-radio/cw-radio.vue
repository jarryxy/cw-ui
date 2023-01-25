<template>
	<view :class="rootClass" :style="customStyle">
		<view v-if="labelPosition === 'left'" :class="[labelClass + ' ' + $o.utils.bem('radio__label', [labelPosition, { disabled }])]" @tap="onClickLabel"><slot /></view>
		<view class="cw-radio__icon-wrap" :style="['font-size: ' + $o.utils.addUnit(iconSize) + ';']" @tap="onChange">
			<slot v-if="useIconSlot" name="icon" />
			<cw-icon
				v-else
				name="success"
				:class="[$o.utils.bem('radio__icon', [shape, { disabled, checked }])]"
				:style="iconStyle"
				:custom-class="iconClass"
				:custom-style="iconCustomStyle"
			/>
		</view>
		<view v-if="labelPosition === 'right'" :class="[labelClass + ' ' + $o.utils.bem('radio__label', [labelPosition, { disabled }])]" @tap="onClickLabel"><slot /></view>
	</view>
</template>
<script>
import mixin from '../../libs/mixin/mixin.js';

export default {
	mixins: [mixin],
	name: 'cw-radio',
	classes: ['icon-class', 'label-class'],
	props: {
		name: null,
		value: null,
		iconClass: String,
		labelClass: String,
		customClass: String,
		customStyle: [String,Object],
		disabled: Boolean,
		useIconSlot: Boolean,
		checkedColor: String,
		labelPosition: {
			type: String,
			default: 'right'
		},
		labelDisabled: Boolean,
		shape: {
			type: String,
			default: 'round'
		},
		iconSize: {
			type: null,
			default: 20
		}
	},
	data() {
		return {
			checked: false,
			parentData: {
				value: null,
				direction: '',
				disabled: ''
			}
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
			this.updateParentData();
			if (!this.parent) {
				console.error('cw-radio必须搭配cw-radio-group组件使用');
			}
			// 初始化时，设置默认选中的状态
			this.checked = this.name === this.parentData.value;
		},
		updateParentData() {
			this.getParentData('cw-radio-group');
		},
		emitChange(value) {
			// const instance = this.parent || this;
			// instance.$emit('input', value);
			// instance.$emit('change', value);
			if(!this.checked){
				typeof this.parent.unCheckedOther === 'function' && this.parent.unCheckedOther(this);
			}
		},

		onChange() {
			if (!this.disabled) {
				this.emitChange(this.name);
			}
		},

		onClickLabel() {
			const { disabled, labelDisabled, name } = this;

			if (!disabled && !labelDisabled) {
				this.emitChange(name);
			}
		}
	},
	computed: {
		rootClass() {
			const { customClass } = this;
			const {direction} = this.parentData
			return this.$o.utils.bem('radio', [direction]) + ' ' + customClass;
		},
		iconStyle() {
			const { iconSize, checkedColor, disabled, name } = this;
			const {value} = this.parentData
			return (
				'font-size: ' +
				this.$o.utils.addUnit(iconSize) +
				';' +
				(checkedColor && !disabled && value === name ? 'border-color:' + checkedColor + '; background-color:' + checkedColor + ';' : '')
			);
		},
		iconCustomStyle() {
			const { iconSize } = this;
			return 'line-height: ' + this.$o.utils.addUnit(iconSize) + ';font-size: .8em;display: block;';
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-radio {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	overflow: hidden;
	-webkit-user-select: none;
	user-select: none;
}

.cw-radio__icon-wrap {
	-webkit-flex: none;
	flex: none;
}

.cw-radio--horizontal {
	margin-right: 12px;
}

.cw-radio__icon {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	box-sizing: border-box;
	width: 1em;
	height: 1em;
	color: transparent;
	text-align: center;
	transition-property: color, border-color, background-color;
	border: 1px solid #c8c9cc;
	font-size: 20px;
	transition-duration: 0.2s;
}

.cw-radio__icon--round {
	border-radius: 100%;
}

.cw-radio__icon--checked {
	color: #fff;
	background-color: #1989fa;
	border-color: #1989fa;
}

.cw-radio__icon--disabled {
	background-color: #ebedf0;
	border-color: #c8c9cc;
}

.cw-radio__icon--disabled.cw-radio__icon--checked {
	color: #c8c9cc;
}

.cw-radio__label {
	word-wrap: break-word;
	margin-left: 10px;
	color: #323233;
	line-height: 20px;
}

.cw-radio__label--left {
	float: left;
	margin: 0 10px 0 0;
}

.cw-radio__label--disabled {
	color: #c8c9cc;
}

.cw-radio__label:empty {
	margin: 0;
}
</style>
