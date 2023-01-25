<template>
	<view>
		<view v-if="fixed && placeholder" :style="'height: ' + height + 'px;'" />
		<view :class="barClass" :style="barStyle + '; ' + customStyle">
			<view class="cw-nav-bar__content">
				<view class="cw-nav-bar__left" @tap="onClickLeft">
					<block v-if="leftArrow || leftText">
						<cw-icon v-if="leftArrow" size="16px" name="arrow-left" custom-class="cw-nav-bar__arrow" />
						<view v-if="leftText" class="cw-nav-bar__text" hover-class="cw-nav-bar__text--hover" hover-stay-time="70">{{ leftText }}</view>
					</block>
					<slot v-else name="left" />
				</view>
				<view :class="'cw-nav-bar__title cw-ellipsis '+ titleClass">
					<block v-if="title">{{ title }}</block>
					<slot v-else name="title" />
				</view>
				<view class="cw-nav-bar__right" @tap="onClickRight">
					<view v-if="rightText" class="cw-nav-bar__text" hover-class="cw-nav-bar__text--hover" hover-stay-time="70">{{ rightText }}</view>
					<slot v-else name="right" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { getRect, getSystemInfoSync } from '../../libs/function/common.js';
import computed from './index.js';

export default {
	mixins: [computed],
	props: {
		title: String,
		fixed: {
			type: Boolean,
		},
		placeholder: {
			type: Boolean,
		},
		leftText: String,
		rightText: String,
		customStyle: String,
		customClass: String,
		titleClass:String,
		leftArrow: Boolean,
		border: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: [Number, String],
			default: 1
		},
		safeAreaInsetTop: {
			type: Boolean,
			default: true
		}
	},
	data(){
		return {
			statusBarHeight: 0,
			height: 46
		}
	},

	created() {
		const { statusBarHeight } = getSystemInfoSync();
		this.statusBarHeight = statusBarHeight;
		this.height = 46 + statusBarHeight;
	},
	computed:{
		propWatch(){
			return [this.fixed, this.placeholder]
		}
	},
	watch: {
		propWatch: {
			handler(){
				this.setHeight()
			},
			deep:true
		}
	},
	mounted() {
		this.setHeight();
	},

	methods: {
		onClickLeft() {
			this.$emit('click-left');
		},

		onClickRight() {
			this.$emit('click-right');
		},

		setHeight() {
			if (!this.fixed || !this.placeholder) {
				return;
			}

			this.$nextTick(() => {
				getRect(this, '.cw-nav-bar').then(res => {
					if (res && 'height' in res) {
							this.height = res.height
					}
				});
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-nav-bar {
	position: relative;
	text-align: center;
	-webkit-user-select: none;
	user-select: none;
	height: 46px;
	line-height: 46px;
	background-color: #fff;
}

.cw-nav-bar__content {
	position: relative;
	height: 100%;
}

.cw-nav-bar__text {
	display: inline-block;
	vertical-align: middle;
	margin: 0 -16px;
	padding: 0 16px;
	color: #232323;
}

.cw-nav-bar__text--hover {
	background-color: #f2f3f5;
}

.cw-nav-bar__arrow {
	vertical-align: middle;
	font-size: 16px !important;
	color: #232323 !important;
}

.cw-nav-bar__arrow + .cw-nav-bar__text {
	margin-left: -20px;
	padding-left: 25px;
}

.cw-nav-bar--fixed {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}

.cw-nav-bar__title {
	max-width: 60%;
	margin: 0 auto;
	color: #323233;
	font-weight: 500;
	font-size: 16px;
}

.cw-nav-bar__left,
.cw-nav-bar__right {
	position: absolute;
	top: 0;
	bottom: 0;
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	font-size: 14px;
}

.cw-nav-bar__left {
	left: 16px;
}

.cw-nav-bar__right {
	right: 16px;
}
</style>
