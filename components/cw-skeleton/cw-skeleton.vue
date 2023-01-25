<template>
	<view>
		<view v-if="loading" :class="loadingClass">
			<view v-if="avatar" :class="[avatarClass, $o.utils.bem('skeleton__avatar', [avatarShape])]" :style="'width:' + avatarSize + ';height:' + avatarSize" />
			<view :class="contentClass">
				<view v-if="title" :class="titleClass" :style="'width:' + titleWidth" />
				<view
					:class="rowClass"
					:style="'width:' + (isArray ? rowWidth[index] : rowWidth)"
					v-for="(item,index) in rowArray"
					:key="index"
				></view>
			</view>
		</view>
		<view v-else :class="contentClass"><slot /></view>
	</view>
</template>

<script>
	/**
	 * Skeleton 骨架屏
	 * @description 骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。
	 * @tutorial todo...
	 * @property {Boolean}					loading		是否显示骨架占位图，设置为false将会展示子组件内容 (默认 true )
	 * @property {Boolean}					animate		是否开启动画效果 (默认 true )
	 * @property {String | Number}			row		段落占位图行数 (默认 0 )
	 * @property {String | Number | Array}	rowWidth	段落占位图的宽度，可以为百分比，数值，带单位字符串等，可通过数组传入指定每个段落行的宽度 (默认 '100%' )
	 * @property {Boolean}					title		是否展示标题占位图 (默认 true )
	 * @property {String | Number}			titleWidth	标题的宽度 (默认 '50%' )
	 * @property {Boolean}					avatar		是否展示头像占位图 (默认 false )
	 * @property {String | Number}			avatarSize	头像占位图大小 (默认 32 )
	 * @property {String}					avatarShape	头像占位图的形状，circle-圆形，square-方形 (默认 'circle' )
	 * @example <cw-skeleton row="3" title loading ></cw-skeleton
	 */
export default {
	name: 'cw-skeleton',
	data() {
		return {
			isArray: false,
			rowArray: []
		};
	},
	props: {
		row: {
			type: [Number, String],
			default: 0
		},
		title: {
			type: Boolean,
			default: false
		},
		avatar: Boolean,
		loading: {
			type: Boolean,
			default: true
		},
		animate: {
			type: Boolean,
			default: true
		},
		avatarSize: {
			type: String,
			default: '32px'
		},
		avatarShape: {
			type: String,
			default: 'round'
		},
		avatarClass: {
			type: String,
			default: ''
		},
		titleWidth: {
			type: String,
			default: '40%'
		},
		rowWidth: {
			type: [String,Array],
			default: '100%'
		},
		inCell: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		row: {
			handler(value) {
				this.rowArray=[]
				for(let i=0;i<value;i++){
					this.rowArray.push(i)
				}
			},
			immediate: true
		},
		rowWidth: {
			handler(val) {
				this.isArray = val instanceof Array || Array.isArray(val);
			}
		}
	},
	computed: {
		contentClass() {
			return this.$o.utils.bem('skeleton__content');
		},
		loadingClass() {
			const { animate, inCell } = this;
			return 'custom-class ' + this.$o.utils.bem('skeleton', [{ animate, cell: inCell }]);
		},
		avatarStyle() {
			const { avatarShape } = this;
			return 'avatar-class ' + this.$o.utils.bem('skeleton__avatar', [avatarShape]);
		},
		titleClass(){
			return 'title-class ' + this.$o.utils.bem('skeleton__title')
		},
		rowClass(){
			return 'row-class ' + this.$o.utils.bem('skeleton__row')
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-skeleton {
	display: -webkit-flex;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 12px 16px;
}

.cw-skeleton--cell {
	padding: 0;
}

.cw-skeleton__avatar {
	-webkit-flex-shrink: 0;
	flex-shrink: 0;
	margin-right: 16px;
	background-color: #f2f3f5;
}

.cw-skeleton__avatar--round {
	border-radius: 100%;
}

.cw-skeleton__content {
	-webkit-flex: 1;
	flex: 1;
}

.cw-skeleton__avatar + .cw-skeleton__content {
	padding-top: 8px;
}

.cw-skeleton__row,
.cw-skeleton__title {
	height: 16px;
	background-color: #f2f3f5;
}

.cw-skeleton__title {
	margin: 0;
}

.cw-skeleton__row:not(:first-child) {
	margin-top: 12px;
}

.cw-skeleton__title + .cw-skeleton__row {
	margin-top: 20px;
}

.cw-skeleton--animate {
	animation: cw-skeleton-blink 1.2s ease-in-out infinite;
}
@keyframes cw-skeleton-blink {
	50% {
		opacity: 0.6;
	}
}
</style>
