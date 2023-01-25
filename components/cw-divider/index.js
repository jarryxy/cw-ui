import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	computed: {
		rootStyle() {
			const {
				borderColor,
				textColor,
				fontSize,
				customStyle
			} = this
			return style([{
					'border-color': borderColor,
					color: textColor,
					'font-size': addUnit(fontSize)
				},
				customStyle
			]);
		},
		rootClass() {
			const {
				dashed,
				hairline,
				contentPosition
			} = this
			return 'custom-class ' + (this.$o.utils.bem('divider', [{
				dashed,
				hairline
			}, contentPosition]))
		}
	}
}
