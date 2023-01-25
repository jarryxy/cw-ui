import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	methods:{
		tabStyle(data) {
			var titleColor = data.active ? data.titleActiveColor : data.titleInactiveColor;
		
			var ellipsis = data.scrollable && data.ellipsis;
		
			// card theme color
			if (data.type === 'card') {
				return style({
					'border-color': data.color,
					'background-color': !data.disabled && data.active ? data.color : null,
					color: titleColor || (!data.disabled && !data.active ? data.color : null),
					'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null
				});
			}
		
			return style({
				color: titleColor,
				'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null
			});
		},
		tabClass({active, ellipsis}) {
			var classes = ['tab-class'];
		
			if (active) {
				classes.push('tab-active-class');
			}
		
			if (ellipsis) {
				classes.push('cw-ellipsis');
			}
		
			return classes.join(' ');
		},
	},
	computed: {
		navStyle() {
			const {color, type} = this
			return style({
				'border-color': type === 'card' && color ? color : null
			});
		},
		trackStyle() {
			const { duration, currentIndex, animated } = this
			if (!animated) {
				return '';
			}
		
			return style({
				left: -100 * currentIndex + '%',
				'transition-duration': duration + 's',
				'-webkit-transition-duration': duration + 's'
			});
		},
		lineStyle() {
			const { color, lineOffsetLeft, lineHeight, skipTransition, duration, lineWidth } = this
			return style({
				width: addUnit(lineWidth),
				transform: 'translateX(' + lineOffsetLeft + 'px)',
				'-webkit-transform': 'translateX(' + lineOffsetLeft + 'px)',
				'background-color': color,
				height: lineHeight !== -1 ? addUnit(lineHeight) : null,
				'border-radius': lineHeight !== -1 ? addUnit(lineHeight) : null,
				'transition-duration': !skipTransition ? duration + 's' : null,
				'-webkit-transition-duration': !skipTransition ? duration + 's' : null
			});
		}
	}
}
