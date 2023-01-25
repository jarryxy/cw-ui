import style from '../../libs/function/style'

export default {
	computed: {
		popupStyle() {
			const {
				zIndex,
				currentDuration,
				customStyle,
				display
			} = this
			return style([{
					'z-index': zIndex,
					'-webkit-transition-duration': currentDuration + 'ms',
					'transition-duration': currentDuration + 'ms'
				},
				display ? null : 'display: none',
				customStyle
			]);
		},
		popupClass() {
			const {
				customClass,
				classes,
				position,
				round,
				safeAreaInsetBottom,
				safeAreaInsetTop
			} = this
			return customClass + ' ' + classes + ' ' + this.$o.utils.bem('popup', [position, {
				round,
				safe: safeAreaInsetBottom,
				safeTop: safeAreaInsetTop
			}])
		}
	}
}
