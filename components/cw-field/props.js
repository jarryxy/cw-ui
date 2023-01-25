export const commonProps = {
	props: {
		value: {
			type: String,
		},
		placeholder: String,
		placeholderStyle: String,
		placeholderClass: String,
		disabled: Boolean,
		maxlength: {
			type: Number,
			default: -1
		},
		cursorSpacing: {
			type: Number,
			default: 50
		},
		autoFocus: Boolean,
		focus: Boolean,
		cursor: {
			type: Number,
			default: -1
		},
		selectionStart: {
			type: Number,
			default: -1
		},
		selectionEnd: {
			type: Number,
			default: -1
		},
		adjustPosition: {
			type: Boolean,
			default: true
		},
		holdKeyboard: Boolean
	},
	watch: {
		value: {
			handler(value) {
				if (value !== this.value) {
					this.innerValue = value
					this.value = value;
				}
			}
		}
	}
};
export const inputProps = {
	props: {
		type: {
			type: String,
			default: 'text'
		},
		password: Boolean,
		confirmType: String,
		confirmHold: Boolean
	}
};
export const textareaProps = {
	props: {
		autoHeight: Boolean,
		fixed: Boolean,
		showConfirmBar: {
			type: Boolean,
			default: true
		},
		disableDefaultPadding: {
			type: Boolean,
			default: true
		}
	}
};
