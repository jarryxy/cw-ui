<template>
	<view>
		<button
			:id="id"
			:data-detail="dataset"
			:class="rootClass"
			hover-class="cw-button--active hover-class"
			:lang="lang"
			:form-type="formType"
			:style="rootStyle"
			:open-type="disabled ? '' : openType"
			:business-id="businessId"
			:session-from="sessionFrom"
			:send-message-title="sendMessageTitle"
			:send-message-path="sendMessagePath"
			:send-message-img="sendMessageImg"
			:show-message-card="showMessageCard"
			:app-parameter="appParameter"
			:aria-label="ariaLabel"
			@tap="!disabled ? onClick() : noop()"
			@getuserinfo="bindGetUserInfo"
			@contact="bindContact"
			@getphonenumber="bindGetPhoneNumber"
			@error="bindError"
			@launchapp="bindLaunchApp"
			@opensetting="bindOpenSetting"
		>
			<block v-if="loading">
				<cw-loading custom-class="loading-class" :size="loadingSize" :type="loadingType" :color="loadingColor" />
				<view v-if="loadingText" class="cw-button__loading-text">{{ loadingText }}</view>
			</block>
			<block v-else>
				<cw-icon v-if="icon" size="1.2em" :name="icon" :class-prefix="classPrefix" class="cw-button__icon" custom-style="line-height: inherit;" />
				<view class="cw-button__text"><slot /></view>
			</block>
		</button>
	</view>
</template>
<script>
import button from '../../libs/mixin/button';
import openType from '../../libs/mixin/open-type';
import style from '../../libs/function/style';
import { canIUseFormFieldButton } from '../../libs/function/version';
const mixins = [button, openType];

if (canIUseFormFieldButton()) {
	mixins.push('wx://form-field-button');
}

export default {
	name: 'cw-button',
	mixins,
	data() {
		return {
			baseStyle: ''
		};
	},
	props: {
		formType: String,
		icon: String,
		classPrefix: {
			type: String,
			default: 'cw-icon'
		},
		plain: Boolean,
		block: Boolean,
		round: Boolean,
		square: Boolean,
		hairline: Boolean,
		disabled: Boolean,
		loading: Boolean,
		loadingText: {
			type:String,
			default:'加载中'
		},
		loadingType: {
			type: String,
			default: 'circular'
		},
		loadingSize: {
			type: String,
			default: '20px'
		},
		customStyle: String,
		customClass:{
			type: String,
			default:''
		},
		type: {
			type: String,
			default: 'default'
		},
		dataset: null,
		size: {
			type: String,
			default: 'normal'
		},
		color: String
	},
	methods: {
		onClick() {
			if (!this.loading) {
				this.$emit('click');
			}
		},

		noop() {}
	},
	computed: {
		rootStyle() {
			const { plain, color, customStyle } = this;
			if (!color) {
				return customStyle;
			}

			var properties = {
				color: plain ? color : '#fff',
				background: plain ? null : color
			};

			// hide border when color is linear-gradient
			if (color.indexOf('gradient') !== -1) {
				properties.border = 0;
			} else {
				properties['border-color'] = color;
			}

			return style([properties, customStyle]);
		},
		loadingColor() {
			const { type, color, plain } = this;
			if (plain) {
				return color ? color : '#c9c9c9';
			}

			if (type === 'default') {
				return '#c9c9c9';
			}

			return '#fff';
		},
		rootClass() {
			const {customClass,type, size,block, round, plain, square, loading, disabled, hairline}  = this
			return customClass + ' ' +
				this.$o.utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }]) +
				' ' + (hairline ? 'cw-hairline--surround' : '');
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-button {
	position: relative;
	display: -webkit-inline-flex;
	display: inline-flex;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0;
	text-align: center;
	vertical-align: middle;
	-webkit-appearance: none;
	-webkit-text-size-adjust: 100%;
	height: 44px;
	line-height: 20px;
	font-size: 16px;
	transition: opacity 0.2s;
	border-radius: 2px;
}

.cw-button:before {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	height: 100%;
	border: inherit;
	border-radius: inherit;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	opacity: 0;
	content: ' ';
	background-color: #000;
	border-color: #000;
}

.cw-button:after {
	border-width: 0;
}

.cw-button--active:before {
	opacity: 0.15;
}

.cw-button--unclickable:after {
	display: none;
}

.cw-button--default {
	color: #323233;
	background: #fff;
	border: 1px solid #ebedf0;
}

.cw-button--primary {
	color: #fff;
	background: #07c160;
	border: 1px solid #07c160;
}

.cw-button--info {
	color: #fff;
	background: #1989fa;
	border: 1px solid #1989fa;
}

.cw-button--danger {
	color: #fff;
	background: #ee0a24;
	border: 1px solid #ee0a24;
}

.cw-button--warning {
	color: #fff;
	background: #ff976a;
	border: 1px solid #ff976a;
}

.cw-button--plain {
	background: #fff;
}

.cw-button--plain.cw-button--primary {
	color: #07c160;
}

.cw-button--plain.cw-button--info {
	color: #1989fa;
}

.cw-button--plain.cw-button--danger {
	color: #ee0a24;
}

.cw-button--plain.cw-button--warning {
	color: #ff976a;
}

.cw-button--large {
	width: 100%;
	height: 50px;
}

.cw-button--normal {
	padding: 0 15px;
	font-size: 14px;
}

.cw-button--small {
	min-width: 60px;
	height: 30px;
	padding: 0 8px;
	font-size: 12px;
}

.cw-button--mini {
	display: inline-block;
	min-width: 50px;
	height: 22px;
	font-size: 10px;
}

.cw-button--mini + .cw-button--mini {
	margin-left: 5px;
}

.cw-button--block {
	display: -webkit-flex;
	display: flex;
	width: 100%;
}

.cw-button--round {
	border-radius: 999px;
}

.cw-button--square {
	border-radius: 0;
}

.cw-button--disabled {
	opacity: 0.5;
}

.cw-button__text {
	display: inline;
}

.cw-button__icon + .cw-button__text:not(:empty),
.cw-button__loading-text {
	margin-left: 4px;
}

.cw-button__icon {
	min-width: 1em;
	line-height: inherit !important;
	vertical-align: top;
}

.cw-button--hairline {
	padding-top: 1px;
	border-width: 0;
}

.cw-button--hairline:after {
	border-color: inherit;
	border-width: 1px;
	border-radius: 4px;
}

.cw-button--hairline.cw-button--round:after {
	border-radius: 999px;
}

.cw-button--hairline.cw-button--square:after {
	border-radius: 0;
}
</style>
