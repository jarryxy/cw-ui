import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	computed: {
		rootStyle() {
			const {
				color,
				background,
				backgroundColor
			} = this
			return style({
				color: color,
				'background-color': backgroundColor,
				background: background
			});
		},
		rootClass() {
			const {
				customClass,
				mode,
				wrapable
			} = this
			return customClass + ' ' + this.$o.utils.bem('notice-bar', {
				withicon: mode,
				wrapable
			})
		}
	}
}
