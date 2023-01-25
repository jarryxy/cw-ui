<template>
	<view :class="'cw-panel cw-hairline--top-bottom ' + customClass">
		<cw-cell
			v-if="title || desc || status"
			:title="title"
			:label="desc"
			:value="status"
			:border="true"
			:custom-class="'cw-panel__header ' + (clickable ? 'cw-panel__clickable' : '') + ' ' + headerClass"
			value-class="cw-panel__header-value"
		/>
		<slot v-else name="header" />

		<view class="cw-panel__content"><slot /></view>

		<view v-if="useFooterSlot" :class="'cw-panel__footer cw-hairline--top ' + footerClass"><slot name="footer" /></view>
	</view>
</template>

<script>
export default {
	props: {
		headerClass: String,
		footerClass: String,
		customClass: String,
		desc: String,
		title: String,
		status: String,
		useFooterSlot: Boolean,
		clickable: Boolean
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-panel {
	background: #fff;
}

.cw-panel__header-value {
	color: #999;
}

.cw-panel__footer {
	padding: 8px 16px;
}

.cw-panel__header:before {
	content: '';
	position: absolute;
	top: 14px;
	left: 0px;
	bottom: 14px;
	width: 4px;
	background: #1989fa;
}

.cw-panel__clickable:before {
	background: #ee0a24;
}
</style>
