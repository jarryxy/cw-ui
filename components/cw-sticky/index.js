import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	computed:{
		wrapStyle() {
			const { fixed, offsetTop, transform, zIndex } = this
		    return style({
		        transform: transform ? 'translate3d(0, ' + transform + 'px, 0)' : '',
		        top: fixed ? addUnit(offsetTop) : '',
		        'z-index': zIndex
		    });
		},
		containerStyle() {
			const { fixed, height, zIndex } = this
		    return style({
		        height: fixed ? addUnit(height) : '',
		        'z-index': zIndex
		    });
		}
		
	}
}