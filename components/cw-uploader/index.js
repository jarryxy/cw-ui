import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	computed: {
		sizeStyle() {
			const {
				previewSize
			} = this
			return style({
				width: addUnit(previewSize),
				height: addUnit(previewSize)
			});
		}

	}
}
