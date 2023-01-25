<template>
	<view>
		<cw-cell
			:size="size"
			:icon="leftIcon"
			:center="center"
			:border="border"
			:is-link="isLink"
			:required="required"
			:clickable="clickable"
			:title-width="titleWidth"
			title-style="margin-right: 12px;"
			:custom-style="customStyle"
			:arrow-direction="arrowDirection"
			custom-class="cw-field"
		>
			<slot name="left-icon" slot="icon" />
			<view v-if="label" :class="'label-class ' + $o.utils.bem('field__label', { disabled })" slot="title">{{ label }}</view>
			<slot v-else name="label" slot="title" />
			<view :class="bodyClass">
				<view :class="controlClass" @tap="onClickInput"><slot name="input" /></view>
				<!-- parse <include v-if="type === 'textarea'" src="textarea.wxml"/> -->
				<textarea
					v-if="type === 'textarea'"
					:class="textareaClass"
					:fixed="fixed"
					:focus="focus"
					:cursor="cursor"
					:value="innerValue"
					:auto-focus="autoFocus"
					:disabled="disabled || readonly"
					:maxlength="maxlength"
					:placeholder="placeholder"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderClassComputed"
					:auto-height="!!autosize"
					:style="inputStyle"
					:cursor-spacing="cursorSpacing"
					:adjust-position="adjustPosition"
					:show-confirm-bar="showConfirmBar"
					:hold-keyboard="holdKeyboard"
					:selection-end="selectionEnd"
					:selection-start="selectionStart"
					:disable-default-padding="disableDefaultPadding"
					@input="onInput"
					@tap="onClickInput"
					@blur="onBlur"
					@focus="onFocus"
					@confirm="onConfirm"
					@linechange="onLineChange"
					@keyboardheightchange="onKeyboardHeightChange"
				/>

				<!-- parse <include v-else src="input.wxml"/> -->
				<input
					 v-else
					:class="controlInputClass"
					:style="{fontSize:'14px'}"
					:type="type"
					:focus="focus"
					:cursor="cursor"
					:value="innerValue"
					:auto-focus="autoFocus"
					:disabled="disabled || readonly"
					:maxlength="maxlength"
					:placeholder="placeholder"
					:placeholder-style="placeholderStyle"
					:placeholder-class="placeholderInputClass"
					:confirm-type="confirmType"
					:confirm-hold="confirmHold"
					:hold-keyboard="holdKeyboard"
					:cursor-spacing="cursorSpacing"
					:adjust-position="adjustPosition"
					:selection-end="selectionEnd"
					:selection-start="selectionStart"
					:password="password || type === 'password'"
					@input="onInput"
					@tap="onClickInput"
					@blur="onBlur"
					@focus="onFocus"
					@confirm="onConfirm"
					@keyboardheightchange="onKeyboardHeightChange"
				/>

				<cw-icon v-if="showClear" name="clear" class="cw-field__clear-root cw-field__icon-root" @touchstart.native.stop.prevent="onClear" />
				<view class="cw-field__icon-container" @tap="onClickIcon">
					<cw-icon v-if="rightIcon || icon" :name="rightIcon || icon" :class="'cw-field__icon-root ' + iconClass" custom-class="right-icon-class" />
					<slot name="right-icon" />
					<slot name="icon" />
				</view>
				<view class="cw-field__button"><slot name="button" /></view>
			</view>
			<view v-if="showWordLimit && maxlength" class="cw-field__word-limit">
				<view :class="wordLimitClass">{{ innerValue.length >= maxlength ? maxlength : innerValue.length }}</view>
				/{{ maxlength }}
			</view>
			<view v-if="errorMessage" :class="errorMessageClass">{{ errorMessage }}</view>
		</cw-cell>
	</view>
</template>
<script>
import { nextTick } from '../../libs/function/common.js';
import { commonProps, inputProps, textareaProps } from './props';
import computed from './index';

export default {
	name: 'cw-field',
	field: true,
	mixins: [commonProps, inputProps, textareaProps, computed],
	props: {
		size: String,
		icon: String,
		label: String,
		error: Boolean,
		center: Boolean,
		isLink: Boolean,
		leftIcon: String,
		rightIcon: String,
		autosize: null,
		required: Boolean,
		iconClass: String,
		clickable: Boolean,
		inputAlign: String,
		customStyle: String,
		errorMessage: String,
		arrowDirection: String,
		showWordLimit: Boolean,
		errorMessageAlign: String,
		type: String,
		readonly: {
			type: Boolean
		},
		clearable: {
			type: Boolean
		},
		border: {
			type: Boolean,
			default: true
		},
		titleWidth: {
			type: String,
			default: '6.2em'
		}
	},
	data() {
		return {
			focused: false,
			innerValue: '',
			showClear: false
		};
	},
	created() {
		this.innerValue = this.value;
	},

	methods: {
		onInput(event) {
			const { value = '' } = event.detail || {};
			this.innerValue = value;
			this.setShowClear();
			this.emitChange();
		},

		onFocus(event) {
			this.focused = true;
			this.setShowClear();
			this.$emit('focus', event.detail);
		},

		onBlur(event) {
			this.focused = false;
			this.setShowClear();
			this.$emit('blur', event.detail);
		},

		onClickIcon() {
			this.$emit('click-icon');
		},

		onClickInput(event) {
			this.$emit('click-input', event.detail);
		},

		onClear() {
			this.innerValue = '';
			this.value = '';
			this.setShowClear();
			nextTick(() => {
				this.emitChange();
				this.$emit('clear', '');
			});
		},

		onConfirm(event) {
			const { value = '' } = event.detail || {};
			this.value = value;
			this.setShowClear();
			this.$emit('confirm', value);
		},

		setValue(value) {
			this.value = value;
			this.setShowClear();

			if (value === '') {
				innerValue = '';
			}

			this.emitChange();
		},

		onLineChange(event) {
			this.$emit('linechange', event.detail);
		},

		onKeyboardHeightChange(event) {
			this.$emit('keyboardheightchange', event.detail);
		},

		emitChange() {
			nextTick(() => {
				this.$emit('input', this.innerValue);
				this.$emit('change', this.innerValue);
			});
		},

		setShowClear() {
			const { clearable, readonly } = this;
			const { focused, value } = this;
			this.showClear = !!clearable && !!focused && !!value && !readonly;
		},

		noop() {}
	},
	watch: {
		readonly: {
			handler() {
				this.setShowClear();
			},
			immediate: true
		},
		clearable: {
			handler() {
				this.setShowClear();
			},
			immediate: true
		},
		value:{
			handler(val) {
				this.innerValue = val
			},
			immediate: true
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

textarea{
	font-size: 14px;
}

.cw-field__label {
	color: #323233;
}

.cw-field__label--disabled {
	color: #c8c9cc;
}

.cw-field__body {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
}

.cw-field__body--textarea {
	box-sizing: border-box;
	padding: 3.6px 0;
	line-height: 1.2em;
	min-height: 24px;
}

.cw-field__control:empty + .cw-field__control {
	display: block;
}

.cw-field__control {
	position: relative;
	display: none;
	box-sizing: border-box;
	width: 100%;
	margin: 0;
	padding: 0;
	line-height: inherit;
	text-align: left;
	background-color: initial;
	border: 0;
	resize: none;
	color: #323233;
	height: 24px;
	min-height: 24px;
}

.cw-field__control:empty {
	display: none;
}

.cw-field__control--textarea {
	height: 18px;
	min-height: 18px;
}

.cw-field__control--error {
	color: #ee0a24;
}

.cw-field__control--disabled {
	background-color: initial;
	opacity: 1;
	color: #c8c9cc;
}

.cw-field__control--center {
	text-align: center;
}

.cw-field__control--right {
	text-align: right;
}

.cw-field__control--custom {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	min-height: 24px;
}

.cw-field__placeholder {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	pointer-events: none;
	color: #c8c9cc;
}

.cw-field__placeholder--error {
	color: #ee0a24;
}

.cw-field__icon-root {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	min-height: 24px;
}

.cw-field__clear-root,
.cw-field__icon-container {
	line-height: inherit;
	vertical-align: middle;
	padding: 0 8px;
	margin-right: -8px;
}

.cw-field__button,
.cw-field__clear-root,
.cw-field__icon-container {
	-webkit-flex-shrink: 0;
	flex-shrink: 0;
}

.cw-field__clear-root {
	font-size: 16px;
	color: #c8c9cc;
}

.cw-field__icon-container {
	font-size: 16px;
	color: #969799;
}

.cw-field__icon-container:empty {
	display: none;
}

.cw-field__button {
	padding-left: 8px;
}

.cw-field__button:empty {
	display: none;
}

.cw-field__error-message {
	text-align: left;
	font-size: 12px;
	color: #ee0a24;
}

.cw-field__error-message--center {
	text-align: center;
}

.cw-field__error-message--right {
	text-align: right;
}

.cw-field__word-limit {
	text-align: right;
	margin-top: 4px;
	color: #646566;
	font-size: 12px;
	line-height: 16px;
}

.cw-field__word-num {
	display: inline;
}

.cw-field__word-num--full {
	color: #ee0a24;
}
</style>
