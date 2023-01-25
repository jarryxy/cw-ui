<template>
	<view class="cw-sticky-class" :id="cw_Id">
		<view :style="{ height: stickyHeight, background: backgroundColor }" v-if="isFixed"></view>
		<view :class="{ 'cw-sticky-fixed': isFixed }" :style="{ top: isFixed ? stickyTop + 'px' : 'auto' }"><slot></slot></view>
	</view>
</template>

<script>
export default {
	name: 'cw-sticky',
	emits: ['sticky', 'change'],
	props: {
		// 需要配合onPageScroll设置 必填
		scrollTop: {
			type: Number,
			required: true
		},
		//吸顶时与顶部的距离，单位px
		stickyTop: {
			type: [Number, String],
			// #ifndef H5
			default: 0,
			// #endif
			// #ifdef H5
			default: 44
			// #endif
		},
		//是否是原生自带header
		isNativeHeader: {
			type: Boolean,
			default: true
		},
		//吸顶容器 高度 rpx
		stickyHeight: {
			type: String,
			default: 'auto'
		},
		//占位容器背景颜色
		backgroundColor: {
			type: String,
			default: 'transparent'
		},
		//是否重新计算[有异步加载时使用,设置大于0的数]
		recalc: {
			type: Number,
			default: 0
		},
		//列表中的索引值
		index: {
			type: [Number, String],
			default: 0
		}
	},
	watch: {
		scrollTop(newValue, oldValue) {
			if (this.initialize != 0) {
				this.updateScrollChange(() => {
					this.updateStickyChange();
					this.initialize = 0;
				});
			} else {
				this.updateStickyChange();
			}
		},
		recalc(newValue, oldValue) {
			this.updateScrollChange(() => {
				this.updateStickyChange();
				this.initialize = 0;
			});
		}
	},
	created() {
		this.initialize = this.recalc;
	},
	mounted() {
		setTimeout(() => {
			this.updateScrollChange();
		}, 50);
	},
	data() {
		const Id = `cw_${Math.ceil(Math.random() * 10e5).toString(36)}`;
		return {
			timer: null,
			top: 0,
			height: 0,
			isFixed: false,
			initialize: 0, //重新初始化
			cw_Id: Id
		};
	},
	methods: {
		updateStickyChange() {
			const top = this.top;
			const height = this.height;
			const scrollTop = this.scrollTop;
			let stickyTop = this.stickyTop;
			// #ifdef H5
			if (this.isNativeHeader) {
				stickyTop = stickyTop - 44;
				stickyTop = stickyTop < 0 ? 0 : stickyTop;
			}
			// #endif
			this.isFixed = scrollTop + stickyTop >= top ? true : false;
			//是否吸顶
			this.$emit('sticky', {
				isFixed: this.isFixed,
				index: this.index
			});
		},
		updateScrollChange(callback) {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				const selectId = `#${this.cw_Id}`;
				uni.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(this)
					// #endif
					.select(selectId)
					.fields(
						{
							size: true,
							rect: true
						},
						res => {
							if (res) {
								this.top = res.top + (this.scrollTop || 0);
								this.height = res.height;
								callback && callback();
								this.$emit('change', {
									index: Number(this.index),
									top: this.top
								});
							}
						}
					)
					.exec();
			}, 0);
		}
	}
};
</script>

<style scoped>
.cw-sticky-fixed {
	width: 100%;
	position: fixed;
	left: 0;
	z-index: 888;
}
</style>
