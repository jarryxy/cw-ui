import style from '../../libs/function/style'


export default {
	computed: {
		barStyle() {
			const {
				zIndex,
				safeAreaInsetTop,
				statusBarHeight
			} = this
			return style({
				'z-index': zIndex,
				'padding-top': safeAreaInsetTop ? statusBarHeight + 'px' : 0
			});
		},
		barClass() {
			const {
				fixed,
				border,
				customClass
			} = this
			return this.$o.utils.bem('nav-bar', {
				fixed
			}) + ' ' + customClass + ' ' + (border ? 'cw-hairline--bottom' : '')
		}
	}
}
