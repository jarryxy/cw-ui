<template>
	<view :class="['cw-row',customClass]" :style="rootStyle"><slot/></view>
</template>
<script>
import computed from './index.js'
import mixin from '../../libs/mixin/mixin.js'

export default {
	name:'cw-row',
	mixins: [computed],
	props: {
		gutter: {
			type: [Number,String],
			default:0
		},
		customClass:{
			type:String,
			default:''
		}
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-row:after {
	display: table;
	clear: both;
	content: '';
}
</style>
