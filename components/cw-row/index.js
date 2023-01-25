import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	computed:{
		rootStyle() {
			const {gutter} = this
		    if (!gutter) {
		        return '';
		    }
		
		    return style({
		        'margin-right': addUnit(-gutter / 2),
		        'margin-left': addUnit(-gutter / 2)
		    });
		}
	}
}
