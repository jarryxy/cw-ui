<template>
	<view>
		<view v-if="title" class="cw-cell-group__title">{{ title }}</view>
		<view :class="[customClass,'cw-cell-group', border ? 'cw-hairline--top-bottom' : '']">
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	name: 'cw-cell-group',
	props: {
		title: String,
		customClass:String,
		border: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/common.scss";

.cw-cell-group__title {
	padding: 16px 16px 8px;
	font-size: 14px;
	line-height: 16px;
	color: #969799;
}
</style>
