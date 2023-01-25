<template>
	<view :class="[[$o.utils.bem('checkbox-group', [direction])]]"><slot /></view>
</template>

<script>
export default {
	name:'cw-checkbox-group',
	props: {
		max: Number,
		value: {
			type: Array
		},
		disabled: {
			type: Boolean
		},
		direction:String
	},
	computed: {
		parentData() {
			return [this.value, this.disabled];
		}
	},
	created() {
		this.children = [];
	},
	watch: {
		// 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
		parentData() {
			if (this.children.length) {
				this.children.map(child => {
					// 判断子组件(u-checkbox)如果有init方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
					typeof child.init === 'function' && child.init();
				});
			}
		}
	},
	methods: {
		// 将其他的checkbox设置为未选中的状态
		unCheckedOther(childInstance) {
			const values = [];
			this.children.map(child => {
				// 将被选中的checkbox，放到数组中返回
				if (child.isChecked) {
					values.push(child.name);
				}
			});
			// 发出事件
			this.$emit('change', values);
			// 修改通过v-model绑定的值
			this.$emit('input', values);
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-checkbox-group--horizontal {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
}
</style>
