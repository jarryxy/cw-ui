<template>
	<view :class="['cw-progress',customClass]" :style="rootStyle">
		<view class="cw-progress__portion" :style="portionStyle">
			<view v-if="showPivot && (pivotText || percentage + '%')" :style="pivotStyle" class="cw-progress__pivot">
				{{ pivotText || percentage + '%' }}
			</view>
		</view>
	</view>
</template>
<script>
import { BLUE } from '../../libs/function/color.js';
import { getRect } from '../../libs/function/common.js';
import computed from './index.js';

export default {
	mixins: [computed],
	props: {
		inactive: Boolean,
		percentage: {
			type: Number
		},
		customClass:String,
		pivotText: String,
		pivotColor: String,
		trackColor: String,
		showPivot: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: BLUE
		},
		textColor: {
			type: String,
			default: '#fff'
		},
		strokeWidth: {
			type: [Number,String],
			default: 4
		}
	},
	data() {
		return {
			right: 0
		};
	},
	mounted() {
		this.setLeft();
	},
	methods: {
		setLeft() {
			Promise.all([getRect(this, '.cw-progress'), getRect(this, '.cw-progress__pivot')]).then(([portion, pivot]) => {
				if (portion && pivot) {
					this.right = (pivot.width * (this.percentage - 100)) / 100;
				}
			});
		}
	},
	watch:{
		percentage(){
			this.setLeft();
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-progress {
	position: relative;
	height: 4px;
	border-radius: 4px;
	background: #ebedf0;
}

.cw-progress__portion {
	position: absolute;
	left: 0;
	height: 100%;
	border-radius: inherit;
	background: #1989fa;
}

.cw-progress__pivot {
	position: absolute;
	top: 50%;
	box-sizing: border-box;
	min-width: 3.6em;
	text-align: center;
	word-break: keep-all;
	border-radius: 1em;
	transform: translateY(-50%);
	color: #fff;
	padding: 0 5px;
	font-size: 10px;
	line-height: 1.6;
	background-color: #1989fa;
}
</style>
