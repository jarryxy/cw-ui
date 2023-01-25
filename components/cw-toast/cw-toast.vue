<template>
	<view>
		<cw-overlay
			v-if="tmpConfig.mask || tmpConfig.forbidClick"
			:show="isShow"
			:z-index="tmpConfig.zIndex"
			:custom-style="tmpConfig.mask ? '' : 'background-color: transparent;'"
		/>
		<cw-transition :show="isShow" :custom-style="'z-index: ' + tmpConfig.zIndex" custom-class="cw-toast__container">
			<view :class="'cw-toast cw-toast--' + (tmpConfig.type === 'text' ? 'text' : 'icon') + ' cw-toast--' + tmpConfig.position" @touchmove.stop.prevent="noop">
				<!-- text only -->
				<text v-if="tmpConfig.type === 'text'">{{ tmpConfig.message }}</text>

				<!-- with icon -->
				<block v-else>
					<cw-loading v-if="tmpConfig.type === 'loading'" color="white" :type="tmpConfig.loadingType" custom-class="cw-toast__loading" />
					<cw-icon v-else class="cw-toast__icon" :name="tmpConfig.type" />
					<text v-if="tmpConfig.message" class="cw-toast__text">{{ tmpConfig.message }}</text>
				</block>

				<slot />
			</view>
		</cw-transition>
	</view>
</template>

<script>

export default {
	props: {},
	data() {
		return {
			isShow: false,
			timer: null, // 定时器
			config: {
				type: 'text',
				mask: false,
				message: '',
				zIndex: 1000,
				duration: 2000,
				position: 'middle',
				forbidClick: false,
				loadingType: 'circular',
				onClose: () => {}
			},
			tmpConfig: {}
		};
	},
	methods: {
		show(options) {
			this.tmpConfig = this.$o.utils.deepMerge(this.config, options);
			const { tmpConfig } = this;
			clearTimeout(this.timer);
			this.isShow = true;
			if (tmpConfig.duration != null && tmpConfig.duration > 0) {
				this.timer = setTimeout(() => {
					this.clear();
				}, tmpConfig.duration);
			}
		},
		loading(options){
			options['type'] = 'loading'
			this.show(options)
		},
		clear() {
			this.isShow = false;
			if(this.timer != null){
				clearTimeout(this.timer);
			}
			const { onClose } = this.tmpConfig;
			if (onClose) {
				onClose();
			}
		},
		// for prevent touchmove
		noop() {}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-toast {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: initial;
	color: #fff;
	font-size: 14px;
	line-height: 20px;
	white-space: pre-wrap;
	word-wrap: break-word;
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 8px;
}

.cw-toast__container {
	position: fixed;
	top: 50%;
	left: 50%;
	width: -webkit-fit-content;
	width: fit-content;
	transform: translate(-50%, -50%);
	max-width: 70%;
}

.cw-toast--text {
	min-width: 96px;
	padding: 8px 12px;
}

.cw-toast--icon {
	width: 88px;
	min-height: 88px;
	padding: 16px;
}

.cw-toast--icon .cw-toast__icon {
	font-size: 36px;
}

.cw-toast--icon .cw-toast__text {
	padding-top: 8px;
}

.cw-toast__loading {
	margin: 10px 0;
}

.cw-toast--top {
	-webkit-transform: translateY(-30vh);
	transform: translateY(-30vh);
}

.cw-toast--bottom {
	-webkit-transform: translateY(30vh);
	transform: translateY(30vh);
}
</style>
