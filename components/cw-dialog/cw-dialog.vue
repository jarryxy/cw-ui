<template>
	<view>
		<cw-popup
			:show="tmpOptions.isShow"
			:z-index="tmpOptions.zIndex"
			:overlay="tmpOptions.overlay"
			:name="tmpOptions.transition"
			:custom-class="'cw-dialog cw-dialog--' + tmpOptions.theme + ' ' + tmpOptions.className"
			:custom-style="rootStyle"
			:overlay-style="tmpOptions.overlayStyle"
			:close-on-click-overlay="tmpOptions.closeOnClickOverlay"
			@close="onClickOverlay"
		>
			<view v-if="tmpOptions.title || useTitleSlot" :class="titleClass">
				<slot v-if="useTitleSlot" name="title" />
				<block v-else-if="tmpOptions.title">{{ tmpOptions.title }}</block>
			</view>

			<view v-if="useSlot" :class="messageClass">
				<slot></slot>
			</view>
			<view v-else-if="tmpOptions.message" :class="messageClass">
				<text class="cw-dialog__message-text">{{ tmpOptions.message }}</text>
			</view>

			<view class="cw-hairline--top cw-dialog__footer">
				<cw-button
					v-if="tmpOptions.showCancelButton"
					size="large"
					:loading="loading.cancel"
					class="cw-dialog__button cw-hairline--right"
					custom-class="cw-dialog__cancel"
					:custom-style="'color: ' + cancelButtonColor"
					@click="onCancel"
				>
					{{ tmpOptions.cancelButtonText }}
				</cw-button>
				<cw-button
					v-if="tmpOptions.showConfirmButton"
					size="large"
					class="cw-dialog__button"
					:loading="loading.confirm"
					custom-class="cw-dialog__confirm"
					:custom-style="'color: ' + confirmButtonColor"
					:open-type="tmpOptions.confirmButtonOpenType"
					:lang="lang"
					:business-id="businessId"
					:session-from="sessionFrom"
					:send-message-title="sendMessageTitle"
					:send-message-path="sendMessagePath"
					:send-message-img="sendMessageImg"
					:show-message-card="showMessageCard"
					:app-parameter="appParameter"
					@click="onConfirm"
					@getuserinfo="bindGetUserInfo"
					@contact="bindContact"
					@getphonenumber="bindGetPhoneNumber"
					@error="bindError"
					@launchapp="bindLaunchApp"
					@opensetting="bindOpenSetting"
				>
					{{ tmpOptions.confirmButtonText }}
				</cw-button>
			</view>
		</cw-popup>
	</view>
</template>
<script>
import openType from '../../libs/mixin/open-type.js';
import button from '../../libs/mixin/button.js';
import { GRAY, RED } from '../../libs/function/color.js';
import { toPromise } from '../../libs/function/common.js';

export default {
	options: {
		styleIsolation: 'shared' // 解除样式隔离
	},
	mixins: [button, openType],
	props: {
		useSlot: Boolean,
		useTitleSlot: Boolean,
		confirmButtonColor: {
			type: String,
			default: RED
		},
		cancelButtonColor: {
			type: String,
			default: GRAY
		}
	},
	data() {
		return {
			loading: {
				confirm: false,
				cancel: false
			},
			callback: () => {},
			defaultOptions: {
				isShow: false,
				title: '',
				width: null,
				theme: 'default',
				message: '',
				zIndex: 2000,
				overlay: true,
				className: '',
				/**
				 * 当asyncClose配置为true时请配置beforeClose
				 */
				asyncClose: false,
				/**
				 * beforeClose 当传入Promise对象并 resolve(false)可以阻止对话框关闭，
				 * 代码逻辑179行-194行
				 */
				beforeClose: null,
			   /**
				* transition:取值
				* scale
				* fade
				* center
				* bottom
				* top
				* left
				* right
				*/
				transition: 'scale',//默认 scale
				customStyle: '',
				messageAlign: '',
				overlayStyle: '',
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				showConfirmButton: true,
				showCancelButton: false,
				closeOnClickOverlay: false,
				confirmButtonOpenType: ''
			},
			tmpOptions: {}
		};
	},
	methods: {
		// 对外调用方法start
		show(options) {
			return new Promise((resolve, reject) => {
				this.tmpOptions = this.$o.utils.deepMerge(this.defaultOptions, options);
				this.$nextTick(() => {
					this.tmpOptions.isShow = true;
				});
				this.callback = (action, instance) => {
					action === 'confirm' ? resolve(instance) : reject({ message: '取消', instance });
				};
			});
		},
		alert(message) {
			this.show({message});
		},
		confirm(options) {
			options.showCancelButton = true;
			return this.show(options);
		},
		close(action) {
			this.tmpOptions.isShow = false;
			this.$nextTick(() => {
				this.$emit('close', action);
				const { callback } = this;

				if (callback) {
					callback(action, this);
				}
			});
		},

		stopLoading() {
			this.loading = {
				confirm: false,
				cancel: false
			};
		},
		// 对外调用方法end

		onConfirm() {
			this.handleAction('confirm');
		},

		onCancel() {
			this.handleAction('cancel');
		},

		onClickOverlay() {
			this.close('overlay');
		},

		handleAction(action) {
			this.$emit(action, {
				dialog: this
			});
			const { asyncClose, beforeClose } = this.tmpOptions;

			if (!asyncClose && !beforeClose) {
				this.close(action);
				return;
			}

			this.loading[action] = true;
			console.log(this.loading.confirm)
			if (beforeClose) {
				toPromise(beforeClose(action)).then(value => {
					if (value) {
						this.stopLoading();
						this.close(action);
					} else {
						this.stopLoading();
					}
				}).catch(e=>{
					this.stopLoading();
				});
			}
		}
	},
	watch: {
		'tmpOptions.isShow': {
			handler(val) {
				if (!val) {
					this.stopLoading();
				}
			},
			deep: true
		}
	},
	computed: {
		rootStyle() {
			const { width, customStyle } = this.tmpOptions;
			return 'width: ' + this.$o.utils.addUnit(width) + ';' + customStyle;
		},
		titleClass() {
			const { message, useSlot } = this.tmpOptions;
			return this.$o.utils.bem('dialog__header', { isolated: !(message || useSlot) });
		},
		messageClass() {
			const { theme, messageAlign, title } = this.tmpOptions;
			return this.$o.utils.bem('dialog__message', [theme, messageAlign, { hasTitle: title }]);
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

::v-deep .cw-dialog {
	top: 45% !important;
	overflow: hidden;
	width: 320px;
	font-size: 16px;
	border-radius: 16px;
	background-color: #fff;
}

@media (max-width: 321px) {
	::v-deep .cw-dialog {
		width: 90%;
	}
}

::v-deep .cw-dialog__header {
	text-align: center;
	padding-top: 24px;
	font-weight: 500;
	line-height: 24px;
}

::v-deep .cw-dialog__header--isolated {
	padding: 24px 0;
}

::v-deep .cw-dialog__message {
	overflow-y: auto;
	text-align: center;
	-webkit-overflow-scrolling: touch;
	font-size: 14px;
	line-height: 20px;
	max-height: 60vh;
	padding: 24px;
}

.cw-dialog__message-text {
	word-wrap: break-word;
}

.cw-dialog__message--hasTitle {
	padding-top: 8px;
	color: #646566;
}

.cw-dialog__message--round-button {
	padding-bottom: 16px;
	color: #323233;
}

.cw-dialog__message--left {
	text-align: left;
}

.cw-dialog__message--right {
	text-align: right;
}

.cw-dialog__footer {
	display: -webkit-flex;
	display: flex;
}

.cw-dialog__footer--round-button {
	position: relative !important;
	padding: 8px 24px 16px !important;
}

.cw-dialog__button {
	-webkit-flex: 1;
	flex: 1;
}

.cw-dialog__cancel,
.cw-dialog__confirm {
	border: 0 !important;
}

.cw-dialog-bounce-enter {
	transform: translate3d(-50%, -50%, 0) scale(0.7);
	opacity: 0;
}

.cw-dialog-bounce-leave-active {
	transform: translate3d(-50%, -50%, 0) scale(0.9);
	opacity: 0;
}
</style>
