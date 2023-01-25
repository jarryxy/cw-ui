<template>
	<view>
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
	</view>
</template>

<script>
export default {
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

.cw-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
</style>
