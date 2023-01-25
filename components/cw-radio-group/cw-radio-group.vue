<template>
	<view :class="[$o.utils.bem('radio-group', [direction])]"><slot></slot></view>
</template>
<script>
export default {
	name: 'cw-radio-group',
	props: {
		value: {
			type: [String,Number]
		},
		// direction取值horizontal 
		direction: String,
		disabled: {
			type: Boolean
		}
	},
	created() {
		this.children = [];
	},
	computed: {
		parentData() {
			return [this.value, this.direction, this.disabled];
		}
	},
	watch: {
		parentData() {
			if (this.children.length) {
				this.children.map(child => {
					// 判断子组件(cw-radio)如果有init方法的话，就执行(执行的结果是子组件重新从父组件拉取了最新的值)
					typeof child.init === 'function' && child.init();
				});
			}
		}
	},
	methods: {
		// 将其他的radio设置为未选中的状态
		unCheckedOther(childInstance) {
			this.children.map(child => {
				// 所有子radio中，被操作组件实例的checked的值无需修改
				if (childInstance !== child) {
					child.checked = false;
				}
			});
			const { name } = childInstance;
			// 通过emit事件，设置父组件通过v-model双向绑定的值
			this.$emit('input', name);
			// 发出事件
			this.$emit('change', name);
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-radio-group--horizontal {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
}
</style>
