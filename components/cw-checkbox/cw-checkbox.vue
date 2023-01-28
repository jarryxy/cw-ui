<template>
	<view :class="['cw-checkbox',customClass,$o.utils.bem('checkbox', [parentData.direction])]"
			:style="customStyle">
		<view
			v-if="labelPosition === 'left'"
			:class="[labelClass + ' ' + $o.utils.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])]"
			@tap="onClickLabel"
		>
			<slot />
		</view>
		<view class="cw-checkbox__icon-wrap" @tap="toggle">
			<slot v-if="useIconSlot" name="icon" />
			<cw-icon
				v-else
				name="success"
				size="0.8em"
				:class="[$o.utils.bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: isChecked }])]"
				:style="iconStyle"
				:custom-class="iconClass"
				custom-style="line-height: 1.25em;"
			/>
		</view>
		<view
			v-if="labelPosition === 'right'"
			:class="[labelClass + ' ' + $o.utils.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])]"
			@tap="onClickLabel"
		>
			<slot />
		</view>
	</view>
</template>
<script>
import computed from './index.js';
import mixin from '../../libs/mixin/mixin.js';

export default {
	name: 'cw-checkbox',
	mixins: [computed, mixin],
	props: {
		name: [String,Number,Boolean],
		value: [String,Number,Boolean],
		disabled: Boolean,
		customClass: String,
		customStyle: [String,Object],
		useIconSlot: Boolean,
		checkedColor: String,
		labelClass: String,
		iconClass: String,
		labelPosition: {
			type: String,
			default: 'right'
		},
		labelDisabled: Boolean,
		// round可选
		shape: {
			type: String,
			default: 'square'
		},
		iconSize: {
			type: [String,Number],
			default: 20
		}
	},
	data() {
		return {
			isChecked: false,
			parentDisabled: false,
			parentData: {
				value: null,
				disabled: null,
				direction:''
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
				console.error('cw-checkbox必须搭配cw-checkbox-group组件使用');
			}
			// 设置初始化时，是否默认选中的状态，父组件u-checkbox-group的value可能是array，所以额外判断
			if (this.checked) {
				this.isChecked = true;
			} else if (Array.isArray(this.parentData.value)) {
				// 查找数组是是否存在this.name元素值
				this.isChecked = this.parentData.value.some(item => {
					return item === this.name;
				});
			}
		},
		updateParentData() {
			this.getParentData('cw-checkbox-group');
		},

		emitChange(value) {
			// 将本组件标记为与原来相反的状态
			this.isChecked = !this.isChecked
			this.$emit('change', this.isChecked);
			typeof this.parent.unCheckedOther === 'function' && this.parent.unCheckedOther(this);
		},

		toggle() {
			const { parentDisabled, disabled, isChecked } = this;
			if (!disabled && !parentDisabled) {
				this.emitChange(!isChecked);
			}
		},

		onClickLabel() {
			const { labelDisabled, parentDisabled, disabled, isChecked } = this;

			if (!disabled && !labelDisabled && !parentDisabled) {
				this.emitChange(!isChecked);
			}
		},
	},
	watch: {
		checked() {
			this.isChecked = this.checked;
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-checkbox {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	overflow: hidden;
	-webkit-user-select: none;
	user-select: none;
}

.cw-checkbox__icon-wrap,
.cw-checkbox__label {
	line-height: 20px;
}

.cw-checkbox__icon-wrap {
	-webkit-flex: none;
	flex: none;
}

.cw-checkbox__icon {
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
	font-size: 20px;
	border: 1px solid #c8c9cc;
	transition-duration: 0.2s;
}

.cw-checkbox__icon--round {
	border-radius: 100%;
}

.cw-checkbox__icon--square{
	border-radius: 0;
}

.cw-checkbox__icon--checked {
	color: #fff;
	background-color: #1989fa;
	border-color: #1989fa;
}

.cw-checkbox__icon--disabled {
	background-color: #ebedf0;
	border-color: #c8c9cc;
}

.cw-checkbox__icon--disabled.cw-checkbox__icon--checked {
	color: #c8c9cc;
}

.cw-checkbox__label {
	word-wrap: break-word;
	margin-left: 10px;
	color: #323233;
}

.cw-checkbox__label--left {
	float: left;
	margin: 0 10px 0 0;
}

.cw-checkbox__label--disabled {
	color: #c8c9cc;
}

.cw-checkbox__label:empty {
	margin: 0;
}

.cw-checkbox--horizontal {
	margin-right: 12px;
}
</style>
