<template>
	<cw-transition
		:show="show"
		custom-class="cw-overlay"
		:custom-style="'z-index: ' + zIndex + '; ' + customStyle"
		:duration="duration"
		@tap.native="onClick"
		@touchmove.native.stop.prevent="noop"
	>
		<slot></slot>
	</cw-transition>
</template>

<script>
export default {
	options: {
		styleIsolation: 'shared' // 解除样式隔离
	},
	props: {
		show: Boolean,
		customStyle: String,
		duration: {
			type: null,
			default: 300
		},
		zIndex: {
			type: Number,
			default: 1
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		},

		// for prevent touchmove
		noop() {}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

// #ifndef H5
::v-deep .cw-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
// #endif

// #ifdef H5
.cw-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
// #endif

</style>
