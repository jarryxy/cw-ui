<template>
	<view>
		<cw-overlay v-if="overlay" :show="show" :z-index="zIndex" :custom-style="overlayStyle" :duration="tmpConfig.duration" @click="onClickOverlay" />
		<view v-if="inited" :class="popupClass" :style="popupStyle" @transitionend="onTransitionEnd">
			<slot />
			<cw-icon
				v-if="closeable"
				:name="closeIcon"
				:class="'close-icon-class cw-popup__close-icon cw-popup__close-icon--' + closeIconPosition"
				@tap.native="onClickCloseIcon"
			/>
		</view>
	</view>
</template>
<script>
import { transition } from '../../libs/mixin/transition';
import computed from './index.js';

export default{
	classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class', 'close-icon-class'],
	mixins: [computed, transition(false)],
	props: {
		round: Boolean,
		closeable: Boolean,
		customStyle: String,
		customClass: String,
		overlayStyle: String,
		/**
		 * transition取值：
		 * scale
		 * fade
		 * center
		 * bottom
		 * top
		 * left
		 * right
		 */
		transition: {
			type: String
		},
		zIndex: {
			type: Number,
			default: 100
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeIcon: {
			type: String,
			default: 'cross'
		},
		closeIconPosition: {
			type: String,
			default: 'top-right'
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		position: {
			type: String,
			default: 'center'
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		},
		safeAreaInsetTop: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			tmpConfig:{
				duration:3000,
				name:'fade'
			}
		}
	},
	created() {
		this.observeClass();
	},
	methods: {
		onClickCloseIcon() {
			this.$emit('close');
		},

		onClickOverlay() {
			this.$emit('click-overlay');

			if (this.closeOnClickOverlay) {
				this.$emit('close');
			}
		},

		observeClass() {
			const { transition, position, duration } = this;
			const updateData = {
				name: transition || position
			};

			if (transition === 'none') {
				updateData.duration = 0;
				this.originDuration = duration;
			} else if (this.originDuration != null) {
				updateData.duration = this.originDuration;
			}

			this.tmpConfig.name = updateData.name
			this.tmpConfig.duration = updateData.duration
		}
	},
	watch:{
		position(){
			this.observeClass()
		},
		transition:{
			handler(){
				this.observeClass()
			},
			// immediate: true
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-popup {
	position: fixed;
	box-sizing: border-box;
	max-height: 100%;
	overflow-y: auto;
	transition-timing-function: ease;
	-webkit-animation: ease both;
	animation: ease both;
	-webkit-overflow-scrolling: touch;
	background-color: #fff;
}

.cw-popup--center {
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
}

.cw-popup--center.cw-popup--round {
	border-radius: 16px;
}

.cw-popup--top {
	top: 0;
	left: 0;
	width: 100%;
}

.cw-popup--top.cw-popup--round {
	border-radius: 0 0 16px 16px;
}

.cw-popup--right {
	top: 50%;
	right: 0;
	-webkit-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
}

.cw-popup--right.cw-popup--round {
	border-radius: 16px 0 0 16px;
}

.cw-popup--bottom {
	bottom: 0;
	left: 0;
	width: 100%;
}

.cw-popup--bottom.cw-popup--round {
	border-radius: 16px 16px 0 0;
}

.cw-popup--left {
	top: 50%;
	left: 0;
	-webkit-transform: translate3d(0, -50%, 0);
	transform: translate3d(0, -50%, 0);
}

.cw-popup--left.cw-popup--round {
	border-radius: 0 16px 16px 0;
}

.cw-popup--bottom.cw-popup--safe {
	padding-bottom: env(safe-area-inset-bottom);
}

.cw-popup--safeTop {
	padding-top: env(safe-area-inset-top);
}

.cw-popup__close-icon {
	position: absolute;
	z-index: 1;
	color: #969799;
	font-size: 18px;
}

.cw-popup__close-icon--top-left {
	top: 16px;
	left: 16px;
}

.cw-popup__close-icon--top-right {
	top: 16px;
	right: 16px;
}

.cw-popup__close-icon--bottom-left {
	bottom: 16px;
	left: 16px;
}

.cw-popup__close-icon--bottom-right {
	right: 16px;
	bottom: 16px;
}

.cw-popup__close-icon:active {
	opacity: 0.6;
}

.cw-scale-enter-active,
.cw-scale-leave-active {
	transition-property: opacity, transform;
}

.cw-scale-enter,
.cw-scale-leave-to {
	transform: translate3d(-50%, -50%, 0) scale(0.7);
	opacity: 0;
}

.cw-fade-enter-active,
.cw-fade-leave-active {
	transition-property: opacity;
}

.cw-fade-enter,
.cw-fade-leave-to {
	opacity: 0;
}

.cw-center-enter-active,
.cw-center-leave-active {
	transition-property: opacity;
}

.cw-center-enter,
.cw-center-leave-to {
	opacity: 0;
}

.cw-bottom-enter-active,
.cw-bottom-leave-active,
.cw-left-enter-active,
.cw-left-leave-active,
.cw-right-enter-active,
.cw-right-leave-active,
.cw-top-enter-active,
.cw-top-leave-active {
	transition-property: transform;
}

.cw-bottom-enter,
.cw-bottom-leave-to {
	transform: translate3d(0, 100%, 0);
}

.cw-top-enter,
.cw-top-leave-to {
	transform: translate3d(0, -100%, 0);
}

.cw-left-enter,
.cw-left-leave-to {
	transform: translate3d(-100%, -50%, 0);
}

.cw-right-enter,
.cw-right-leave-to {
	transform: translate3d(100%, -50%, 0);
}
</style>
