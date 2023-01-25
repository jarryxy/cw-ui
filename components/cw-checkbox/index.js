import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default{
	computed:{
		iconStyle() {
			const {checkedColor, disabled, name, parentDisabled, iconSize} = this
			const {value} = this.parentData
		    let styles = {
		        'font-size': addUnit(iconSize)
		    };
		
		    if (checkedColor && value?.includes(name) && !disabled && !parentDisabled) {
		        styles['border-color'] = checkedColor;
		        styles['background-color'] = checkedColor;
		    }
		    return style(styles);
		}
	}
}