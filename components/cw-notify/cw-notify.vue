<template>
	<view>
		<cw-transition name="slide-down" :show="isShow" custom-class="cw-notify__container" :custom-style="rootStyle" @tap.native="onTap">
			<view v-if="tempConfig.customNavBar" :style="'height: ' + offsetTop + 'px'" />
			<view :class="'cw-notify cw-notify--' + tempConfig.type" :style="notifyStyle">
				<text>{{ tempConfig.message }}</text>
			</view>
		</cw-transition>
	</view>
</template>
<script>
import { WHITE } from '../../libs/function/color.js';
import { getSystemInfoSync } from '../../libs/function/common.js';
import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

const e = uni.getSystemInfoSync();
let statusBar = 0; //状态栏高度
let customBar = 0; // 状态栏高度 + 导航栏高度
let navbar = 0; // 自定义标题与胶囊对齐高度
// #ifdef MP
statusBar = e.statusBarHeight;
customBar = e.statusBarHeight + 45;
if (e.platform === 'android') {
	customBar = e.statusBarHeight + 50;
}
// #endif

// #ifdef MP-WEIXIN
statusBar = e.statusBarHeight;
const custom = wx.getMenuButtonBoundingClientRect();
customBar = custom.bottom + custom.top - e.statusBarHeight;
navbar = (custom.top - e.statusBarHeight) * 2 + custom.height;
// #endif
// #ifdef H5
statusBar = 0;
customBar = e.statusBarHeight + 45;
// #endif

export default {
	name: 'cw-notify',
	props: {
		// message: String,
		// background: String,
		// type: {
		// 	type: String,
		// 	default: 'danger'
		// },
		// color: {
		// 	type: String,
		// 	default: WHITE
		// },
		// duration: {
		// 	type: Number,
		// 	default: 3000
		// },
		// zIndex: {
		// 	type: Number,
		// 	default: 110
		// },
		// customNavBar: {
		// 	type: Boolean,
		// 	// #ifdef MP-WEIXIN
		// 	default: false,
		// 	// #endif
		// 	// #ifdef H5
		// 	default: false,
		// 	// #endif
		// },
		offsetTop: {
			type: Number,
			default: customBar
		},
		// top: null
	},
	data() {
		return {
			isShow: false,
			config : {
			  selector: '#cw-notify',
			  type: 'primary',
			  message: '',
			  background: '',
			  duration: 3000,
			  zIndex: 1100,
			  top: 0,
			  color: WHITE,
			  // #ifdef MP-WEIXIN
			  customNavBar: false,
			  // #endif
			  // #ifdef H5
			  customNavBar: true,
			  // #endif
			  onClick: () => {},
			  onOpened: () => {},
			  onClose: () => {}
			},
			tempConfig:{}
		};
	},
	methods: {
		show(options) {
			this.tempConfig = this.$o.utils.deepMerge(this.config,options)
			const { duration, onOpened } = this.tempConfig;
			clearTimeout(this.timer);
			this.isShow = true
			this.$nextTick(onOpened);

			if (duration > 0 && duration !== Infinity) {
				this.timer = setTimeout(() => {
					this.hide();
				}, duration);
			}
		},

		hide() {
			const { onClose } = this.tempConfig;
			clearTimeout(this.timer);
			this.isShow = false
			this.$nextTick(onClose);
		},

		onTap(event) {
			const { onClick } = this.tempConfig;

			if (onClick) {
				onClick(event.detail);
			}
		}
	},
	computed:{
		rootStyle() {
			const {zIndex,top} = this.tempConfig
		    return style({
		        'z-index': zIndex,
		        top: addUnit(top)
		    });
		},
		notifyStyle() {
			const { background, color} = this.tempConfig
		    return style({
		        background,
		        color
		    });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-notify {
	text-align: center;
	word-wrap: break-word;
	padding: 6px 15px;
	font-size: 14px;
	line-height: 20px;
}

.cw-notify--primary {
	background-color: #1989fa;
}

.cw-notify--success {
	background-color: #07c160;
}

.cw-notify--danger {
	background-color: #ee0a24;
}

.cw-notify--warning {
	background-color: #ff976a;
}
</style>
