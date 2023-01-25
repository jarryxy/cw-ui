<template>
	<view>
		<cw-popup
			:show="show"
			position="bottom"
			:round="round"
			:z-index="zIndex"
			:overlay="overlay"
			custom-class="cw-action-sheet"
			:safe-area-inset-bottom="safeAreaInsetBottom"
			:close-on-click-overlay="closeOnClickOverlay"
			@close="onClickOverlay"
		>
			<view v-if="title" class="cw-action-sheet__header">
				{{ title }}
				<cw-icon name="cross" custom-class="cw-action-sheet__close" @click="onClose" />
			</view>
			<view v-if="description" class="cw-action-sheet__description cw-hairline--bottom">{{ description }}</view>
			<view v-if="actions && actions.length">
				<!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
				<button
					:open-type="item.openType"
					:style="item.color ? 'color: ' + item.color : ''"
					:class="[btnClass(item)]"
					hover-class="cw-action-sheet__item--hover"
					:data-index="index"
					@tap="onSelect"
					@getuserinfo="bindGetUserInfo"
					@contact="bindContact"
					@getphonenumber="bindGetPhoneNumber"
					@error="bindError"
					@launchapp="bindLaunchApp"
					@opensetting="bindOpenSetting"
					:lang="lang"
					:session-from="sessionFrom"
					:send-message-title="sendMessageTitle"
					:send-message-path="sendMessagePath"
					:send-message-img="sendMessageImg"
					:show-message-card="showMessageCard"
					:app-parameter="appParameter"
					v-for="(item, index) in actions"
					:key="index"
				>
					<block v-if="!item.loading">
						{{ item.name }}
						<view v-if="item.subname" class="cw-action-sheet__subname">{{ item.subname }}</view>
					</block>

					<cw-loading v-else custom-class="cw-action-sheet__loading" size="22px" />
				</button>
			</view>
			<slot />
			<block v-if="cancelText">
				<view class="cw-action-sheet__gap" />
				<view class="cw-action-sheet__cancel" hover-class="cw-action-sheet__cancel--hover" hover-stay-time="70" @tap="onCancel">{{ cancelText }}</view>
			</block>
		</cw-popup>
	</view>
</template>
<script>
import button from '../../libs/mixin/button';
import openType from '../../libs/mixin/open-type';

export default {
	mixins: [button, openType],
	props: {
		show: Boolean,
		title: String,
		cancelText: String,
		description: String,
		round: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: Number,
			default: 100
		},
		actions: {
			type: Array,
			default: ()=>{
				return []
			}
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		closeOnClickAction: {
			type: Boolean,
			default: true
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		onSelect(event) {
			const { index } = event.currentTarget.dataset;
			const item = this.actions[index];

			if (item && !item.disabled && !item.loading) {
				this.$emit('select', item);

				if (this.closeOnClickAction) {
					this.onClose();
				}
			}
		},

		onCancel() {
			this.$emit('cancel');
		},

		onClose() {
			this.$emit('close');
		},

		onClickOverlay() {
			this.$emit('click-overlay');
			this.onClose();
		},
		btnClass(item) {
			return uni.$o.utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) + ' ' + (item.className || '');
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-action-sheet {
	max-height: 90% !important;
	color: #323233;
}

.cw-action-sheet__cancel,
.cw-action-sheet__item {
	padding: 14px 16px;
	text-align: center;
	font-size: 16px;
	line-height: 22px;
	background-color: #fff;
}

.cw-action-sheet__cancel--hover,
.cw-action-sheet__item--hover {
	background-color: #f2f3f5;
}

.cw-action-sheet__cancel:after,
.cw-action-sheet__item:after {
	border-width: 0;
}

.cw-action-sheet__cancel {
	color: #646566;
}

.cw-action-sheet__gap {
	display: block;
	height: 8px;
	background-color: #f7f8fa;
}

.cw-action-sheet__item--disabled {
	color: #c8c9cc;
}

.cw-action-sheet__item--disabled.cw-action-sheet__item--hover {
	background-color: #fff;
}

.cw-action-sheet__subname {
	margin-top: 8px;
	font-size: 12px;
	color: #969799;
	line-height: 20px;
}

.cw-action-sheet__header {
	text-align: center;
	font-weight: 500;
	font-size: 16px;
	line-height: 48px;
}

.cw-action-sheet__description {
	text-align: center;
	padding: 20px 16px;
	color: #969799;
	font-size: 14px;
	line-height: 20px;
}

.cw-action-sheet__close {
	position: absolute !important;
	top: 0;
	right: 0;
	line-height: inherit !important;
	padding: 0 16px;
	font-size: 22px !important;
	color: #c8c9cc;
}

.cw-action-sheet__loading {
	display: -webkit-flex !important;
	display: flex !important;
}
</style>
