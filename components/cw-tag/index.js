import style from '../../libs/function/style'

export default {
	computed: {
		rootStyle() {
			const {
				plain,
				color,
				textColor
			} = this
			return style({
				'background-color': plain ? '' : color,
				color: textColor || plain ? textColor || color : ''
			});
		},
		rootClass() {
			const {
				customClass,
				type,
				size,
				mark,
				plain,
				round
			} = this
			return customClass + ' ' + (this.$o.utils.bem('tag', [type, size, {
				mark,
				plain,
				round
			}]))
		}
	}
}
