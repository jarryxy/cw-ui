import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	methods:{
		rootStyle(data) {
		    return style({
		        'z-index': data.zIndex,
		        top: addUnit(data.top)
		    });
		},
		notifyStyle(data) {
		    return style({
		        background: data.background,
		        color: data.color
		    });
		}
	}
}