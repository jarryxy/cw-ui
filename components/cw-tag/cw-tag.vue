<template>
	<view :class="rootClass" :style="rootStyle" @click="rootClick">
		<slot />
		<cw-icon v-if="closeable" name="cross" custom-class="cw-tag__close" @click="onClose" />
	</view>
</template>
<script>
import computed from './index.js';

export default {
	mixins: [computed],
	props: {
		customClass: String,
		size: String,
		mark: Boolean,
		color: String,
		plain: Boolean,
		round: Boolean,
		textColor: String,
		type: {
			type: String,
			default: 'default'
		},
		closeable: Boolean
	},
	methods: {
		onClose() {
			this.$emit('close');
		},
		rootClick(){
			this.$emit('click');
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-tag {
	position: relative;
	display: inline-flex;
	align-items: center;
	padding: 0 4px;
	color: #fff;
	font-size: 12px;
	line-height: 16px;
	border-radius: 2px;
}

.cw-tag--default {
	background-color: #969799;
}

.cw-tag--default.cw-tag--plain {
	color: #969799;
}

.cw-tag--danger {
	background-color: #ee0a24;
}

.cw-tag--danger.cw-tag--plain {
	color: #ee0a24;
}

.cw-tag--primary {
	background-color: #1989fa;
}

.cw-tag--primary.cw-tag--plain {
	color: #1989fa;
}

.cw-tag--success {
	background-color: #07c160;
}

.cw-tag--success.cw-tag--plain {
	color: #07c160;
}

.cw-tag--warning {
	background-color: #ff976a;
}

.cw-tag--warning.cw-tag--plain {
	color: #ff976a;
}

.cw-tag--plain {
	background-color: #fff;
}

.cw-tag--plain:before {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border: 1px solid;
	border-radius: inherit;
	content: '';
	pointer-events: none;
}

.cw-tag--medium {
	padding: 2px 6px;
}

.cw-tag--large {
	padding: 4px 8px;
	font-size: 14px;
	border-radius: 4px;
}

.cw-tag--mark {
	border-radius: 0 999px 999px 0;
}

.cw-tag--mark:after {
	display: block;
	width: 2px;
	content: '';
}

.cw-tag--round {
	border-radius: 999px;
}

.cw-tag__close {
	min-width: 1em;
	margin-left: 2px;
}
</style>
