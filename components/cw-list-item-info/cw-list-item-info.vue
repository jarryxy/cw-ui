<template>
	<view class="list-item-info">
		<view class="list-item-info-label" v-if="label">{{ label }}：</view>
		<view class="list-item-info-content"><slot /></view>
	</view>
</template>

<script>
export default {
	props: {
		label: String
	}
};
</script>
<style scoped>
.list-item-info {
	display: flex;
	flex: row;
	line-height: 20px;
	font-size: 13px;
}

.list-item-info-label {
	flex: none;
	width: 80px;
	color: #444;
}

.list-item-info-content {
	flex: auto;
	overflow: hidden;
	color: #333;
}
</style>
