<template>
	<view>
		<cw-panel :title="title" @tap.native="goToDetail" custom-class="list-item" :status="status" :useFooterSlot="useFooterSlot" :clickable="url ? true : false">
			<view class="list-item-inner"><slot /></view>

			<view slot="footer" class="list-item-footer"><slot name="footer" /></view>
		</cw-panel>
	</view>
</template>

<script>
export default {
	props: {
		url: String,
		title: String,
		status: String,
		useFooterSlot: Boolean
	},
	methods: {
		goToDetail() {
			if (this.url) {
				uni.navigateTo({
					url: this.url
				});
			}
		}
	}
}
</script>
<style scoped>
.list-item {
	margin-bottom: 12px;
}

.list-item-inner {
	padding: 12px 18px;
}

.list-item-footer {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
</style>
