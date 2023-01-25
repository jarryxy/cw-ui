<template>
	<view
		:class="customClass + ' ' + $o.utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable, detail: isDetail }])"
		hover-class="cw-cell--hover hover-class"
		hover-stay-time="70"
		:style="customStyle"
		@tap="onClick"
	>
		<cw-icon v-if="icon" :name="icon" class="cw-cell__left-icon-wrap" custom-class="cw-cell__left-icon" />
		<slot v-else name="icon" />

		<view :style="titleStyleHandle" class="cw-cell__title title-class">
			<block v-if="title">{{ title }}</block>
			<slot v-else name="title" />

			<view v-if="label || useLabelSlot" class="cw-cell__label label-class">
				<slot v-if="useLabelSlot" name="label" />
				<block v-else-if="label">{{ label }}</block>
			</view>
		</view>

		<view :class="'cw-cell__value value-class ' + (title ? '' : 'only')">
			<block v-if="value || value === 0">{{ value }}</block>
			<slot v-else />
		</view>

		<cw-icon
			v-if="isLink"
			:name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
			class="cw-cell__right-icon-wrap right-icon-class"
			custom-class="cw-cell__right-icon"
		/>
		<slot v-else name="right-icon" />

		<slot name="extra" />
	</view>
</template>

<script>
import link from '../../libs/mixin/link.js';
import style from '../../libs/function/style.js';
import addUnit from '../../libs/function/add-unit.js';

export default {
	name: 'cw-cell',
	mixins: [link],
	props: {
		title: null,
		value: null,
		icon: String,
		size: String,
		label: String,
		center: Boolean,
		isLink: Boolean,
		isDetail: Boolean,
		required: Boolean,
		clickable: Boolean,
		titleWidth: String,
		customStyle: String,
		customClass: String,
		arrowDirection: String,
		useLabelSlot: Boolean,
		border: {
			type: Boolean,
			default: true
		},
		titleStyle: [String, Object]
	},
	methods: {
		onClick(event) {
			this.$emit('click', event.detail);
			this.jumpLink();
		}
	},
	computed: {
		titleStyleHandle() {
			const { titleWidth, titleStyle } = this
			return style([
				{
					'max-width': addUnit(titleWidth),
					'min-width': addUnit(titleWidth)
				},
				titleStyle
			]);
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-cell {
	position: relative;
	display: -webkit-flex;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 16px;
	font-size: 14px;
	line-height: 24px;
	color: #323233;
	background-color: #fff;
}

.cw-cell:after {
	position: absolute;
	box-sizing: border-box;
	-webkit-transform-origin: center;
	transform-origin: center;
	content: ' ';
	pointer-events: none;
	right: 16px;
	bottom: 0;
	left: 16px;
	border-bottom: 1px solid #ebedf0;
	transform: scaleY(0.5);
}

.cw-cell--borderless:after {
	display: none;
}

.cw-cell-group {
	background-color: #fff;
}

.cw-cell__label {
	margin-top: 3px;
	font-size: 12px;
	line-height: 18px;
	color: #969799;
}

.cw-cell__value {
	overflow: hidden;
	text-align: right;
	vertical-align: middle;
	color: #969799;
	margin-left: 12px;
}

.cw-cell__value.only {
	margin-left: 0;
}

.cw-cell__title {
	flex: auto;
}
.cw-cell__value {
	flex: auto;
}

.cw-cell--detail .cw-cell__title {
	flex: none;
}

.cw-cell--detail .cw-cell__value {
	color: #323233;
}

.cw-cell__title:empty,
.cw-cell__value:empty {
	display: none;
}

.cw-cell__left-icon-wrap,
.cw-cell__right-icon-wrap {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	height: 24px;
	font-size: 16px;
}

.cw-cell__left-icon-wrap {
	margin-right: 4px;
}

.cw-cell__right-icon-wrap {
	margin-left: 4px;
	color: #969799;
}

.cw-cell__left-icon {
	vertical-align: middle;
}

.cw-cell__left-icon,
.cw-cell__right-icon {
	line-height: 24px;
}

.cw-cell--clickable.cw-cell--hover {
	background-color: #f2f3f5;
}

.cw-cell--required {
	overflow: visible;
}

.cw-cell--required:before {
	position: absolute;
	content: '*';
	left: 8px;
	font-size: 14px;
	color: #ee0a24;
}

.cw-cell--center {
	-webkit-align-items: center;
	align-items: center;
}

.cw-cell--large {
	padding-top: 12px;
	padding-bottom: 12px;
}

.cw-cell--large .cw-cell__title {
	font-size: 16px;
}

.cw-cell--large .cw-cell__value {
	font-size: 16px;
}

.cw-cell--large .cw-cell__label {
	font-size: 14px;
}
</style>
