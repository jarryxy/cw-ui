import style from '../../libs/function/style.js'
import addUnit from '../../libs/function/add-unit.js'

export default {
	computed: {
		rootStyle() {
			const {
				strokeWidth,
				trackColor
			} = this
			return style({
				height: strokeWidth ? addUnit(strokeWidth) : '',
				background: trackColor
			});
		},
		portionStyle() {
			const {
				inactive,
				color,
				percentage
			} = this
			return style({
				background: inactive ? '#cacaca' : color,
				width: percentage ? percentage + '%' : ''
			});
		},
		pivotStyle() {
			const {
				textColor,
				right,
				pivotColor,
				inactive,
				color
			} = this
			return style({
				color: textColor,
				right: right + 'px',
				background: pivotColor ? pivotColor : inactive ? '#cacaca' : color
			});
		}



	}
}
