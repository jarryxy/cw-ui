<template>
	<view
		:class="customClass +' ' + classPrefix + ' ' + (isImageName ? 'cw-icon--image' : classPrefix + '-' + name)"
		:style="'color: ' + color + ';font-size: ' + $o.utils.addUnit(size) + ';' + customStyle"
		@tap="onClick"
	>
		<cw-info v-if="(info !== null && info !== undefined) || dot" :dot="dot" :info="info" custom-class="cw-icon__info" />
		<image v-if="isImageName" :src="name" mode="aspectFit" class="cw-icon__image" />
	</view>
</template>
<script>
export default {
	name: 'cw-icon',
	props: {
		dot: Boolean,
		info: null,
		size: null,
		color: String,
		customStyle: String,
		classPrefix: {
			type: String,
			default: 'cw-icon'
		},
		// 图标name | https:// 图标地址
		name: {
			type: String,
			default: ''
		},
		customClass: String
	},
	data(){
		return {
			isImageName:''
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		}
	},
	watch: {
		name: {
			handler(val) {
				this.isImageName = (val.indexOf('/') !== -1);
			}
			// immediate: true
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

@font-face {
    font-family: 'cw-iconfont';
    src: url('//at.alicdn.com/t/font_1993622_tjz04duqjho.woff2?t=1632747488318') format('woff2'),
        url('//at.alicdn.com/t/font_1993622_tjz04duqjho.woff?t=1632747488318') format('woff'),
        url('//at.alicdn.com/t/font_1993622_tjz04duqjho.ttf?t=1632747488318') format('truetype');
}

.cw-icon {
    position: relative;
    display: inline-block;
    font-family: 'cw-iconfont';
    line-height: 1;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
}

.cw-icon-service:before {
    content: '\e83d';
}

.cw-icon-zone:before {
    content: '\e83c';
}

.cw-icon-mission:before {
    content: '\e82f';
}

.cw-icon-logo:before {
    content: '\e82d';
}

.cw-icon-access:before {
    content: '\e82a';
}

.cw-icon-vistor:before {
    content: '\e829';
}

.cw-icon-question:before {
    content: '\e828';
}

.cw-icon-convenient:before {
    content: '\e827';
}

.cw-icon-local:before {
    content: '\e826';
}

.cw-icon-star:before {
    content: '\e825';
}

.cw-icon-photograph:before {
    content: '\e824';
}

.cw-icon-scan:before {
    content: '\e823';
}

.cw-icon-use-nfc:before {
    content: '\e822';
}

.cw-icon-not-support:before {
    content: '\e81e';
}

.cw-icon-nfc:before {
    content: '\e81f';
}

.cw-icon-qrcode:before {
    content: '\e820';
}

.cw-icon-pet:before {
    content: '\e81b';
}

.cw-icon-phone:before {
    content: '\e81d';
}

.cw-icon-home:before {
    content: '\e819';
}

.cw-icon-prohibit:before {
    content: '\e818';
}

.cw-icon-keyboard-hide:before {
    content: '\e816';
}

.cw-icon-backspace:before {
    content: '\e815';
}

.cw-icon-family-relation:before {
    content: '\e813';
}

.cw-icon-identity:before {
    content: '\e811';
}

.cw-icon-search:before {
    content: '\e80e';
}

.cw-icon-clear:before {
    content: '\e80f';
}

.cw-icon-empty:before {
    content: '\e805';
}

.cw-icon-video:before {
    content: '\e803';
}

.cw-icon-voice:before {
    content: '\e802';
}

.cw-icon-article:before {
    content: '\e7ef';
}

.cw-icon-neighbor:before {
    content: '\e7ee';
}

.cw-icon-chowa:before {
    content: '\e7ec';
}

.cw-icon-errgeneral:before {
    content: '\e7eb';
}

.cw-icon-arrow-left:before {
    content: '\e7e2';
}

.cw-icon-arrow:before {
    content: '\e7e3';
}

.cw-icon-arrow-down:before {
    content: '\e7e4';
}

.cw-icon-arrow-up:before {
    content: '\e7e5';
}

.cw-icon-cross:before {
    content: '\e7e6';
}

.cw-icon-plus:before {
    content: '\e7e7';
}

.cw-icon-success:before {
    content: '\e7e8';
}

.cw-icon-fail:before {
    content: '\e7e9';
}

.cw-icon-neterror:before {
    content: '\e7ea';
}

.cw-icon-fitment:before {
    content: '\e7d8';
}

.cw-icon-park:before {
    content: '\e7db';
}

.cw-icon-maintain:before {
    content: '\e7d7';
}

.cw-icon-community:before {
    content: '\e7d9';
}

.cw-icon-footprint:before {
    content: '\e7da';
}

.cw-icon-report:before {
    content: '\e7dc';
}

.cw-icon-movecar:before {
    content: '\e7dd';
}

.cw-icon-pay:before {
    content: '\e7de';
}

.cw-icon-approve:before {
    content: '\e7ce';
}

.cw-icon-menu:before {
    content: '\e7d2';
}

.cw-icon-notice:before {
    content: '\e7d3';
}

.cw-icon-setting:before {
    content: '\e7d4';
}

</style>
