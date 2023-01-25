<template>
	<view :class="'custom-class ' + $o.utils.bem('steps', [direction])">
		<view class="cw-step__wrapper">
			<view
				@tap="onClick"
				:data-index="index"
				:class="$o.utils.bem('step', [direction, status(index, active)]) + ' cw-hairline'"
				:style="status(index, active) === 'inactive' ? 'color: ' + inactiveColor : ''"
				v-for="(item, index) in steps"
				:key="index"
			>
				<view class="cw-step__title" :style="index === active ? 'color: ' + activeColor : ''">
					<view>{{ item.text }}</view>
					<view class="desc-class">{{ item.desc }}</view>
				</view>

				<view class="cw-step__circle-container">
					<block v-if="index !== active">
						<cw-icon
							v-if="item.inactiveIcon || inactiveIcon"
							:color="status(index, active) === 'inactive' ? inactiveColor : activeColor"
							:name="item.inactiveIcon || inactiveIcon"
							custom-class="cw-step__icon"
						/>
						<view  class="cw-step__circle" :style="'background-color: ' + (index < active ? activeColor : inactiveColor)" />
					</block>

					<cw-icon v-else :name="item.activeIcon || activeIcon" :color="activeColor" custom-class="cw-step__icon" />
				</view>

				<view v-if="index !== steps.length - 1" class="cw-step__line" :style="'background-color: ' + (index < active ? activeColor : '#ebedf0')" />
			</view>
		</view>
	</view>
</template>
<script>
import { BLUE, GRAY_DARK } from '../../libs/function/color.js';
export default {
	name:'steps',
	props: {
		icon: String,
		steps: Array,
		active: Number,
		direction: {
			type: String,
			default: 'horizontal'
		},
		activeColor: {
			type: String,
			default: BLUE
		},
		inactiveColor: {
			type: String,
			default: GRAY_DARK
		},
		activeIcon: {
			type: String,
			default: 'success'
		},
		inactiveIcon: String
	},
	methods: {
		onClick(event) {
			// console.log(event)
			const { index } = event.currentTarget.dataset;
			this.$emit('click-step', index);
		},
		status(index, active) {
			if (index < active) {
				return 'finish'
			} else if (index === active) {
				return 'process'
			}
			return 'inactive'
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';
.cw-steps {
    overflow: hidden;
    background-color: #fff;
}

.cw-steps--horizontal {
    padding: 10px;
}

.cw-steps--horizontal .cw-step__wrapper {
    position: relative;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
}

.cw-steps--vertical {
    padding-left: 10px;
}

.cw-steps--vertical .cw-step__wrapper {
    padding: 0 0 0 20px;
}

.cw-step {
    position: relative;
    -webkit-flex: 1;
    flex: 1;
    font-size: 14px;
    color: #969799;
}

.cw-step--finish {
    color: #323233;
}

.cw-step__circle {
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background-color: #969799;
}

.cw-step--horizontal {
    padding-bottom: 14px;
}

.cw-step--horizontal:first-child .cw-step__title {
    -webkit-transform: none;
    transform: none;
}

.cw-step--horizontal:first-child .cw-step__circle-container {
    padding: 0 8px 0 0;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
}

.cw-step--horizontal:last-child {
    position: absolute;
    right: 0;
    width: auto;
}

.cw-step--horizontal:last-child .cw-step__title {
    text-align: right;
    -webkit-transform: none;
    transform: none;
}

.cw-step--horizontal:last-child .cw-step__circle-container {
    right: 0;
    padding: 0 0 0 8px;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
}

.cw-step--horizontal .cw-step__circle-container {
    position: absolute;
    bottom: 6px;
    z-index: 1;
    -webkit-transform: translate3d(-50%, 50%, 0);
    transform: translate3d(-50%, 50%, 0);
    background-color: #fff;
    padding: 0 8px;
}

.cw-step--horizontal .cw-step__title {
    display: inline-block;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    font-size: 12px;
}

.cw-step--horizontal .cw-step__line {
    position: absolute;
    right: 0;
    bottom: 6px;
    left: 0;
    height: 1px;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
    background-color: #ebedf0;
}

.cw-step--horizontal.cw-step--process {
    color: #323233;
}

.cw-step--horizontal.cw-step--process .cw-step__icon {
    display: block;
    line-height: 1;
    font-size: 12px;
}

.cw-step--vertical {
    padding: 10px 10px 10px 0;
    line-height: 18px;
}

.cw-step--vertical:after {
    border-bottom-width: 1px;
}

.cw-step--vertical:last-child:after {
    border-bottom-width: none;
}

.cw-step--vertical:first-child:before {
    position: absolute;
    top: 0;
    left: -15px;
    z-index: 1;
    width: 1px;
    height: 20px;
    content: '';
    background-color: #fff;
}

.cw-step--vertical .cw-step__circle,
.cw-step--vertical .cw-step__icon,
.cw-step--vertical .cw-step__line {
    position: absolute;
    top: 19px;
    left: -14px;
    z-index: 2;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
}

.cw-step--vertical .cw-step__icon {
    line-height: 1;
    font-size: 12px;
}

.cw-step--vertical .cw-step__line {
    z-index: 1;
    width: 1px;
    height: 100%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    background-color: #ebedf0;
}

</style>
