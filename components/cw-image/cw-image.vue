<template>
	<view :style="rootStyle" :class="[customClass,$o.utils.bem('image', { round })]" @tap="onClick">
		<image
			v-if="!error"
			:src="src"
			:mode="mode(fit)"
			:lazy-load="lazyLoad"
			class="image-class cw-image__img"
			:show-menu-by-longpress="showMenuByLongpress"
			@load="onLoadHandle"
			@error="onErrorHandle"
		/>
		<view v-if="loading && showLoading" class="loading-class cw-image__loading">
			<slot v-if="useLoadingSlot" name="loading" />
			<cw-icon v-else name="photo" custom-class="cw-image__loading-icon" />
		</view>
		<view v-if="error && showError" class="error-class cw-image__error">
			<slot v-if="useErrorSlot" name="error" />
			<cw-icon v-else name="photo-fail" custom-class="cw-image__error-icon" />
		</view>
	</view>
</template>
<script>
import style from '../../libs/function/style.js';
import addUnit from '../../libs/function/add-unit.js';
import button from '../../libs/mixin/button';
import openType from '../../libs/mixin/open-type';

export default {
	name: 'cw-image',
	mixins: [button, openType],
	props: {
		src: {
			type: String
		},
		customClass: String,
		round: Boolean,
		width: null,
		height: null,
		radius: null,
		lazyLoad: Boolean,
		useErrorSlot: Boolean,
		useLoadingSlot: Boolean,
		showMenuByLongpress: Boolean,
		fit: {
			type: String,
			default: 'cover'
		},
		showError: {
			type: Boolean,
			default: true
		},
		showLoading: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			error: false,
			loading: true,
			viewStyle: '',
			FIT_MODE_MAP: {
				none: 'center',
				fill: 'scaleToFill',
				cover: 'aspectFill',
				contain: 'aspectFit',
				widthFix: 'widthFix',
				heightFix: 'heightFix'
			}
		};
	},
	methods: {
		onLoadHandle(event) {
			this.loading = false;
			this.$emit('load', event.detail);
		},

		onErrorHandle(event) {
			(this.loading = false), (this.error = true);
			this.$emit('error', event.detail);
		},

		onClick(event) {
			this.$emit('click', event.detail);
		},
		mode(fit) {
			return this.FIT_MODE_MAP[fit];
		}
	},
	computed: {
		rootStyle() {
			const { width, height, radius } = this;
			return style([
				{
					width: addUnit(width),
					height: addUnit(height),
					'border-radius': addUnit(radius)
				},
				radius ? 'overflow: hidden' : null
			]);
		}
	},
	watch: {
		src: {
			handler(val) {
				this.error = false;
				this.loadin = true;
			},
			immediate: true
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';
.cw-image {
	position: relative;
	display: inline-block;
}

.cw-image--round {
	overflow: hidden;
	border-radius: 50%;
}

.cw-image--round .cw-image__img {
	border-radius: inherit;
}

.cw-image__error,
.cw-image__img,
.cw-image__loading {
	display: block;
	width: 100%;
	height: 100%;
	width: 80px;
	height: 80px;
}

.cw-image__error,
.cw-image__loading {
	position: absolute;
	top: 0;
	left: 0;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	color: #969799;
	font-size: 14px;
	background-color: #f7f8fa;
}

.cw-image__loading-icon {
	color: #dcdee0;
	font-size: 32px !important;
}

.cw-image__error-icon {
	color: #dcdee0;
	font-size: 32px !important;
}
</style>
