<template>
	<view :class="customClass + ' cw-empty ' + (fixed ? 'fixed' : '') + ' ' + (withCopyright ? 'with-copyright' : '')">
		<view class="cw-empty__icon"><cw-icon :name="icon" /></view>

		<view class="cw-empty__description">{{ description }}</view>
		<view class="cw-empty__bottom"><slot></slot></view>
	</view>
</template>
<script>
export default {
	props: {
		customClass: String,
		description: {
			type: String,
			default: '暂无内容'
		},
		icon: {
			type: String,
			default: 'empty'
		},
		fixed: {
			type: Boolean,
			default: true
		},
		withCopyright: {
			type: Boolean,
			default: false
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 26px 0;
}

.cw-empty.fixed {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
}

.cw-empty.with-copyright {
	padding-bottom: 122px;
}

.cw-empty__icon {
	font-size: 154px;
	color: #d8d8d8;
	line-height: 1;
}

.cw-empty__description {
	margin-top: 16px;
	padding: 0 60px;
	color: #989899;
	font-size: 14px;
	line-height: 20px;
}

.cw-empty__bottom {
	margin-top: 24px;
}
</style>
