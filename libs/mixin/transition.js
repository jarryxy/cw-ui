// @ts-nocheck
import {
	requestAnimationFrame
} from '../function/common.js';
import {
	isObj
} from '../function/validator.js';

const getClassNames = name => ({
	enter: `cw-${name}-enter cw-${name}-enter-active enter-class enter-active-class`,
	'enter-to': `cw-${name}-enter-to cw-${name}-enter-active enter-to-class enter-active-class`,
	leave: `cw-${name}-leave cw-${name}-leave-active leave-class leave-active-class`,
	'leave-to': `cw-${name}-leave-to cw-${name}-leave-active leave-to-class leave-active-class`
});

export function transition(showDefaultValue) {
	return {
		data() {
			return {
				type: '',
				inited: false,
				display: false,
				currentDuration: 0,
				classes: '',
				status: '',
				transitionEnded: true,
				tmpConfig: {
					duration: 3000,
					name: ''
				}
			};
		},
		props: {
			customStyle: [String, Object],
			// @ts-ignore
			show: {
				type: Boolean,
				default: showDefaultValue
			},
			// @ts-ignore
			duration: {
				type: Number,
				default: 300
			},
			name: {
				type: String,
				default: 'fade'
			}
		},
		mounted() {
			if (this.show === true) {
				this.observeShow(true, false);
			}
		},
		methods: {
			observeShow(value, old) {
				if (value === old) {
					return;
				}
				value ? this.enter() : this.leave()
			},
			enter() {
				const {
					duration,
					name
				} = this
				const classNames = getClassNames(this.tmpConfig.name ? this.tmpConfig.name : name);
				this.currentDuration = isObj(duration) ? duration.enter : duration;
				this.status = 'enter';
				this.$emit('before-enter');
				requestAnimationFrame(() => {
					if (this.status !== 'enter') {
						return;
					}

					this.$emit('enter');

					this.inited = true
					this.display = true
					this.classes = classNames.enter
					this.$nextTick(async () => {
						// #ifdef H5
						// !!! 请务必注意此行，注释后H5端enter动画将不生效
						await uni.$o.sleep(20)
						// #endif
						requestAnimationFrame(() => {
							if (this.status !== 'enter') {
								return;
							}
							this.transitionEnded = false;
							this.classes = classNames['enter-to']
						}, 2000);
					})
				}, 2000);
			},

			leave() {
				if (!this.display) {
					return;
				}

				const {
					duration,
					name
				} = this
				const classNames = getClassNames(name);
				this.currentDuration = isObj(duration) ? duration.leave : duration;
				this.status = 'leave';
				this.$emit('before-leave');
				requestAnimationFrame(() => {
					if (this.status !== 'leave') {
						return;
					}
					this.$emit('leave')
					this.classes = classNames.leave
					requestAnimationFrame(() => {
						if (this.status !== 'leave') {
							return;
						}

						this.transitionEnded = false;
						setTimeout(() => this.onTransitionEnd(), this.currentDuration);
						this.classes = classNames['leave-to']
					});
				});
			},

			onTransitionEnd() {
				if (this.transitionEnded) {
					return;
				}

				this.transitionEnded = true;
				this.$emit(`after-${this.status}`);
				const {
					show,
					display
				} = this

				if (!show && display) {
					this.display = false
				}
			}

		},
		watch: {
			show: {
				handler(value, old) {
					this.observeShow(value, old)
				},
			},
			duration: {
				handler(value, old) {

				},
				immediate: true
			}
		}
	};
}
