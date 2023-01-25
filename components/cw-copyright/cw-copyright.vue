<template>
	<view :class="'cw-copyright ' + (fixed ? 'fixed' : '') + ' ' + (dark ? 'dark' : '') + ' ' + (inTabPage ? 'in-tab-page' : '')">
		<slot name="icon"><cw-icon v-for="(item, index) in icons" :key="index" :name="item" custom-class="icon" /></slot>
		<view class="cw-content">
			<slot name="content">
				<text>{{ name }} 版权所有 保留所有权利</text>
			</slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		fixed: Boolean,
		dark: Boolean,
		inTabPage: Boolean,
		name: String,
		icons: {
			type: Array,
			default: ()=>{
				return []
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.cw-copyright {
	padding: 34px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 5;
	color: #d4d5d6;
}

.cw-copyright.dark {
	color: #999;
}

.cw-copyright.fixed {
	position: fixed;
	left: 0;
	right: 0;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
}

.cw-copyright.in-tab-page {
	position: absolute;
}

.cw-copyright .icon {
	font-size: 42px;
	flex: none;
}

.cw-copyright .chowa {
	margin-right: 8px;
}

.cw-copyright .cw-content {
	margin-left: 16px;
	flex: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	line-height: 20px;
}
</style>
