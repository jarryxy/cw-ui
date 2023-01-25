<template>
	<view v-if="inited" :class="['cw-transition', customClass, classes]" :style="rootStyle" @transitionend="onTransitionEnd">
		<slot />
	</view>
</template>
<script>
import {transition} from '../../libs/mixin/transition';
import style from '../../libs/function/style'

export default {
	name: 'cw-transition',
	mixins: [transition(true)],
	props:{
		customClass: {
			type: [String, Object]
		}
	},
	computed:{
		rootStyle(){
			const { currentDuration, display, customStyle } = this
			return style([{
					'-webkit-transition-duration': currentDuration + 'ms',
					'transition-duration': currentDuration + 'ms'
				},
				display ? null : 'display: none',
				customStyle
			]);
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';
$zoom-scale: scale(0.95);

.cw-transition {
	transition-timing-function: ease;
}

.cw-fade-enter-active,
.cw-fade-leave-active {
	transition-property: opacity;
}

.cw-fade-enter,
.cw-fade-leave-to {
	opacity: 0;
}

.cw-fade-down-enter-active,
.cw-fade-down-leave-active,
.cw-fade-left-enter-active,
.cw-fade-left-leave-active,
.cw-fade-right-enter-active,
.cw-fade-right-leave-active,
.cw-fade-up-enter-active,
.cw-fade-up-leave-active {
	transition-property: opacity, -webkit-transform;
	transition-property: opacity, transform;
	transition-property: opacity, transform, -webkit-transform;
}

.cw-fade-up-enter,
.cw-fade-up-leave-to {
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
	opacity: 0;
}

.cw-fade-down-enter,
.cw-fade-down-leave-to {
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
	opacity: 0;
}

.cw-fade-left-enter,
.cw-fade-left-leave-to {
	-webkit-transform: translate3d(-100%, 0, 0);
	transform: translate3d(-100%, 0, 0);
	opacity: 0;
}

.cw-fade-right-enter,
.cw-fade-right-leave-to {
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
	opacity: 0;
}

.cw-slide-down-enter-active,
.cw-slide-down-leave-active,
.cw-slide-left-enter-active,
.cw-slide-left-leave-active,
.cw-slide-right-enter-active,
.cw-slide-right-leave-active,
.cw-slide-up-enter-active,
.cw-slide-up-leave-active {
	transition-property: -webkit-transform;
	transition-property: transform;
	transition-property: transform, -webkit-transform;
}

.cw-slide-up-enter,
.cw-slide-up-leave-to {
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
}

.cw-slide-down-enter,
.cw-slide-down-leave-to {
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}

.cw-slide-left-enter,
.cw-slide-left-leave-to {
	-webkit-transform: translate3d(-100%, 0, 0);
	transform: translate3d(-100%, 0, 0);
}

.cw-slide-right-enter,
.cw-slide-right-leave-to {
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
}

.cw-fade-zoom-enter,
.cw-fade-zoom-leave-to {
	transform: $zoom-scale;
	opacity: 0;
}

.cw-fade-zoom-enter-active,
.cw-fade-zoom-leave-active {
	transition-property: transform, opacity;
}

.cw-zoom-enter-active,
.cw-zoom-leave-active {
	transition-property: transform
}

.cw-zoom-enter,
.cw-zoom-leave-to {
	transform: $zoom-scale
}
</style>
