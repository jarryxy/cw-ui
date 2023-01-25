<template>
	<view class="cw-rate custom-class" @touchmove="onTouchMove">
		<view class="cw-rate__item" :style="rateItemStyle" v-for="(item, index) in innerCountArray" :key="index">
			<cw-icon
				:name="index + 1 <= innerValue ? icon : voidIcon"
				class="cw-rate__icon"
				:style="iconStyle"
				custom-class="icon-class"
				:color="disabled ? (index + 1 <= innerValue ? disabledColor : voidColor ): (index + 1 <= innerValue ? color : voidColor)"
				@click="onSelect(index)"
			/>
			<cw-icon
				v-if="allowHalf"
				:name="index + 0.5 <= innerValue ? icon : voidIcon"
				:class="iconClass"
				:style="iconStyle"
				custom-class="icon-class"
				:color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor"
				@click="onSelect(index - 0.5)"
			/>
		</view>
	</view>
</template>
<script>
import { getAllRect } from '../../libs/function/common.js';
import { canIUseModel } from '../../libs/function/version';

export default {
	name: 'cw-rate',
	props: {
		value: {
			type: [Number,String],
			default:1
		},
		readonly: Boolean,
		disabled: Boolean,
		allowHalf: Boolean,
		size: {
			type:[Number,String],
			default: 18
		},
		icon: {
			type: String,
			default: 'star'
		},
		voidIcon: {
			type: String,
			default: 'star'
		},
		color: {
			type: String,
			default: '#ffd21e'
		},
		voidColor: {
			type: String,
			default: '#c7c7c7'
		},
		disabledColor: {
			type: String,
			default: 'rgba(191, 160, 24, 1.0)'
		},
		count: {
			type: [Number,String],
			default: 5,
		},
		gutter: {
			type: [Number,String],
			default: 2,
		},
		touchable: {
			type: Boolean,
			default: true
		}
	},
	data(){
		return {
			innerValue: 0,
			innerCountArray: Array.from({
				length: 5
			})
		}
	},
	methods: {
		onSelect(score) {
			const { disabled,readonly } = this;

			if (!disabled && !readonly) {
					this.innerValue =score + 1

				if (canIUseModel()) {
					this.value=score + 1
				}

				this.$nextTick(() => {
					this.$emit('input', score + 1);
					this.$emit('change', score + 1);
				});
			}
		},

		onTouchMove(event) {
			const { touchable } = this;

			if (!touchable) {
				return;
			}

			const { clientX } = event.touches[0];
			getAllRect(this, '.cw-rate__icon').then(list => {
				const target = list.sort(item => item.right - item.left).find(item => clientX >= item.left && clientX <= item.right);

				if (target != null) {
					this.onSelect(
						Object.assign(Object.assign({}, event), {
							currentTarget: target
						})
					);
				}
			});
		}
	},
	watch:{
		value:{
			handler(val){
				if (val !== this.innerValue) {
					this.innerValue = val
				}
			},
			immediate: true
		},
		count:{
			handler(val){
				this.innerCountArray= Array.from({
					length: val
				})
			},
			immediate: true
		},
	},
	computed:{
		rateItemStyle(){
			const {index,count,gutter} = this
			return 'padding-right: ' + (index !== count - 1 ? this.$o.utils.addUnit(gutter) : '')
		},
		iconStyle(){
			const {size} = this
			return 'font-size: ' + this.$o.utils.addUnit(size)
		},
		iconClass(){
			return this.$o.utils.bem('rate__icon', ['half'])
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../../libs/css/common.scss";

.cw-rate {
	display: -webkit-inline-flex;
	display: inline-flex;
	-webkit-user-select: none;
	user-select: none;
}

.cw-rate__item {
	position: relative;
	padding: 0 2px;
}

.cw-rate__icon {
	display: block;
	height: 1em;
	font-size: 20px;
}

.cw-rate__icon--half {
	position: absolute;
	top: 0;
	width: 0.5em;
	overflow: hidden;
	left: 2px;
}
</style>
