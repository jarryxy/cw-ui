<template>
	<view v-if="(info !== null && info !== undefined && info !== '') || dot" 
		:class="['cw-info', $o.utils.bem('info', { dot }), customClass]" 
		:style="customStyle">
		{{ dot ? '' : info }}
	</view>
</template>
<script>
/**
 * tabs内部使用
 */
export default {
	name: 'cw-info',
	props: {
		dot: Boolean,
		info: null,
		customStyle: String,
		customClass: String
	}
};
</script>
<style>
@import '../../libs/css/common.scss';

.cw-info {
	position: absolute;
	top: 0;
	right: 0;
	display: -webkit-inline-flex;
	display: inline-flex;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	box-sizing: border-box;
	white-space: nowrap;
	-webkit-transform: translate(50%, -50%);
	transform: translate(50%, -50%);
	-webkit-transform-origin: 100%;
	transform-origin: 100%;
	height: 16px;
	min-width: 16px;
	padding: 0 3px;
	color: #fff;
	font-weight: 500;
	font-size: 12px;
	background-color: #ee0a24;
	border: 1px solid #fff;
	border-radius: 16px;
}

.cw-info--dot {
	min-width: 0;
	border-radius: 100%;
	width: 8px;
	height: 8px;
	background-color: #ee0a24;
}
</style>
