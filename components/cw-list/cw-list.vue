<template>
	<view :class="'cw-list ' + (withFilter ? 'with-filter' : '') + ' ' + (inTabPage ? 'in-tab-page' : '')">
		<slot />

		<view class="cw-list-loading-item" v-if="fetching && current === 1" v-for="(item, index) in size" :key="item.num">
			<view class="cw-list-loading-item-header"><cw-skeleton :row="1" solt="title" row-width="40%" /></view>

			<cw-skeleton :row="3" title />
		</view>

		<cw-divider v-if="current >= total && !fetching && list.length > 0" contentPosition="center">只有这些数据了</cw-divider>

		<!-- 加载状态 -->
		<view v-if="fetching && current > 1" class="cw-list-load-more"><cw-loading>加载中...</cw-loading></view>

		<cw-empty :fixed="fixed" :description="empty" :icon="icon" with-copyright v-if="!fetching && list.length === 0">
			<view v-if="useEmptySlot"><slot name="empty" /></view>
		</cw-empty>

		<!-- <cw-copyright v-if="!fetching && list.length === 0" :inTabPage="inTabPage" :fixed="fixed" /> -->
	</view>
</template>

<script>
export default {
	props: {
		fetching: Boolean,
		current: Number,
		size: {
			type: Number,
			default: 5
		},
		total: Number,
		list: {
			type: Array,
			default(){
				return []
			}
		},
		empty: String,
		icon: {
			type: String,
			value: 'empty'
		},
		fixed: {
			type: Boolean,
			value: true
		},
		inTabPage: {
			type: Boolean,
			value: false
		},
		useEmptySlot: Boolean,
		withFilter: Boolean
	}
};
</script>
<style scoped>
.cw-list {
	position: relative;
	min-height: calc(100vh - constant(safe-area-inset-bottom));
	min-height: calc(100vh - env(safe-area-inset-bottom));
}

.cw-list.with-filter {
	margin-top: 10px;
	min-height: calc(100vh - constant(safe-area-inset-bottom) - 54px);
	min-height: calc(100vh - env(safe-area-inset-bottom) - 54px);
}

.cw-list.in-tab-page {
	margin-top: 10px;
	min-height: calc(100vh - constant(safe-area-inset-bottom) - 50px);
	min-height: calc(100vh - env(safe-area-inset-bottom) - 50px);
}

.cw-list.with-filter.in-tab-page {
	margin-top: 10px;
	min-height: calc(100vh - constant(safe-area-inset-bottom) - 104px);
	min-height: calc(100vh - env(safe-area-inset-bottom) - 104px);
}

.cw-list-loading-item {
	margin-bottom: 12px;
	background-color: #fff;
}

.cw-list-loading-item-header {
	position: relative;
	border-bottom: 1px solid #ebedf0;
}

.cw-list-loading-item-header:before {
	content: '';
	position: absolute;
	top: 14px;
	left: 0px;
	bottom: 14px;
	width: 4px;
	background: #eee;
}

.cw-list-load-more {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 0;
}
</style>
