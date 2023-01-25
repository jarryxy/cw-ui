import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

var BLUE = '#1989fa';
var GRAY_DARK = '#969799';
export default {
	computed: {
		rootStyle() {
			const {
				value,
				activeColor,
				inactiveColor,
				size,
				customStyle
			} = this
			var currentColor = value ? activeColor : inactiveColor;

			return style({
				'font-size': addUnit(size),
				'background-color': currentColor,
				...customStyle,
			});
		},
		loadingColor() {
			const {
				value,
				activeColor,
				inactiveColor
			} = this
			return value ? activeColor || BLUE : inactiveColor || GRAY_DARK;
		}

	}

}
