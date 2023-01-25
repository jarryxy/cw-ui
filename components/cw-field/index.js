import style from '../../libs/function/style'
import addUnit from '../../libs/function/add-unit'

export default {
	computed: {
		inputStyle() {
			const {
				autosize
			} = this
			if (autosize && autosize.constructor === 'Object') {
				return style({
					'min-height': addUnit(autosize.minHeight),
					'max-height': addUnit(autosize.maxHeight)
				});
			}

			return '';
		},
		bodyClass() {
			const {
				type
			} = this
			return this.$o.utils.bem('field__body', [type])
		},
		controlClass() {
			const {
				inputAlign
			} = this
			return this.$o.utils.bem('field__control', [inputAlign, 'custom'])
		},
		textareaClass() {
			const {
				inputAlign,
				type,
				disabled,
				error
			} = this
			return this.$o.utils.bem('field__control', [inputAlign, type, {
				disabled,
				error
			}]) + ' input-class'
		},
		placeholderClassComputed() {
			const {
				error,
				disabled
			} = this
			return this.$o.utils.bem('field__placeholder', {
				error,
				disabled
			})
		},
		controlInputClass() {
			const {
				inputAlign,
				disabled,
				error
			} = this
			return this.$o.utils.bem('field__control', [inputAlign, {
				disabled,
				error
			}]) + ' input-class'
		},
		placeholderInputClass() {
			const {
				error
			} = this
			return this.$o.utils.bem('field__placeholder', {
				error
			})
		},
		wordLimitClass() {
			const {
				value,
				maxlength
			} = this
			return this.$o.utils.bem('field__word-num', {
				full: value.length >= maxlength
			})
		},
		errorMessageClass() {
			const {
				errorMessageAlign,
				disabled,
				error
			} = this
			return this.$o.utils.bem('field__error-message', [errorMessageAlign, {
				disabled,
				error
			}])
		}
	}
}
