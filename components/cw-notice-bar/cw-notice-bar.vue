<template>
	<view v-if="show" :class="rootClass" :style="rootStyle" @tap="onClick">
		<cw-icon v-if="leftIcon" size="16px" :name="leftIcon" class="cw-notice-bar__left-icon" />
		<slot v-else name="left-icon" />

		<view class="cw-notice-bar__wrap">
			<view :class="'cw-notice-bar__content ' + (!scrollable && !wrapable ? 'cw-ellipsis' : '')" :animation="animationData">
				{{ text }}
				<slot v-if="!text"></slot>
			</view>
		</view>

		<cw-icon v-if="mode === 'closeable'" class="cw-notice-bar__right-icon" name="cross" @tap.native.stop.prevent="onClickIcon" />
		<navigator v-else-if="mode === 'link'" :url="url" :open-type="openType"><cw-icon class="cw-notice-bar__right-icon" name="arrow" /></navigator>
		<slot v-else name="right-icon" />
	</view>
</template>
<script>
import { getRect, requestAnimationFrame } from '../../libs/function/common.js';
import computed from './index.js';

export default {
	name: 'cw-notice-bar',
	mixins: [computed],
	props: {
		customClass: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
			// observer: 'init'
		},
		mode: {
			type: String,
			default: ''
		},
		url: {
			type: String,
			default: ''
		},
		openType: {
			type: String,
			default: 'navigate'
		},
		delay: {
			type: Number,
			default: 1
		},
		speed: {
			type: [Number,String],
			default: 50
			// observer: 'init'
		},
		scrollable: {
			type: Boolean,
			default: true
		},
		leftIcon: {
			type: String,
			default: ''
		},
		color: String,
		backgroundColor: String,
		background: String,
		wrapable: Boolean
	},
	data() {
		return {
			show: true,
			animationData: null
		};
	},
	created() {
		this.resetAnimation = uni.createAnimation({
			duration: 0,
			timingFunction: 'linear'
		});
	},

	destroyed() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	},

	mounted() {
		this.init();
	},

	methods: {
		init() {
			requestAnimationFrame(() => {
				Promise.all([getRect(this, '.cw-notice-bar__content'), getRect(this, '.cw-notice-bar__wrap')]).then(rects => {
					const [contentRect, wrapRect] = rects;

					if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
						return;
					}

					const { speed, scrollable, delay } = this;

					if (scrollable || wrapRect.width < contentRect.width) {
						const duration = (contentRect.width / speed) * 1000;
						this.wrapWidth = wrapRect.width;
						this.contentWidth = contentRect.width;
						this.duration = duration;
						this.animation = uni.createAnimation({
							duration,
							timingFunction: 'linear',
							delay
						});
						this.scroll();
					}
				});
			});
		},

		scroll() {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = null;
			this.animationData = this.resetAnimation
				.translateX(this.wrapWidth)
				.step()
				.export();
			// #ifndef MP-WEIXIN 
			// 在h5端不延迟执行，不会生效，暂未发现问题所在。
			setTimeout(() => {
			// #endif
				requestAnimationFrame(() => {
					this.animationData = this.animation
						.translateX(-this.contentWidth)
						.step()
						.export();
				});
				
				this.timer = setTimeout(() => {
					this.scroll();
				}, this.duration);
			// #ifndef MP-WEIXIN 
			}, 100);
			// #endif
	
		},

		onClickIcon(event) {
			if (this.mode === 'closeable') {
				if (this.timer) {
					clearTimeout(this.timer);
				}

				this.timer = null;
				this.show = false;
				this.$emit('close', event.detail);
			}
		},

		onClick(event) {
			this.$emit('click', event);
		}
	},
	watch: {
		text: {
			handler() {
				this.$nextTick(() => {
					this.init();
				});
			},
			immediate: false
		},
		speed: {
			handler() {
				this.$nextTick(() => {
					this.init();
				});
			},
			immediate: false
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-notice-bar {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	height: 40px;
	padding: 0 16px;
	font-size: 14px;
	color: #ed6a0c;
	line-height: 24px;
	background-color: #fffbe8;
}

.cw-notice-bar--withicon {
	position: relative;
	padding-right: 40px;
}

.cw-notice-bar--wrapable {
	height: auto;
	padding: 8px 16px;
}

.cw-notice-bar--wrapable .cw-notice-bar__wrap {
	height: auto;
}

.cw-notice-bar--wrapable .cw-notice-bar__content {
	position: relative;
	white-space: normal;
}

.cw-notice-bar__left-icon {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	margin-right: 4px;
	vertical-align: middle;
}

.cw-notice-bar__left-icon,
.cw-notice-bar__right-icon {
	font-size: 16px;
	min-width: 22px;
}

.cw-notice-bar__right-icon {
	position: absolute;
	top: 10px;
	right: 15px;
}

.cw-notice-bar__wrap {
	position: relative;
	-webkit-flex: 1;
	flex: 1;
	overflow: hidden;
	height: 24px;
}

.cw-notice-bar__content {
	position: absolute;
	white-space: nowrap;
}

.cw-notice-bar__content.cw-ellipsis {
	max-width: 100%;
}
</style>
