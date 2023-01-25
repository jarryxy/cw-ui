module.exports = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
        // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
        customStyle: {
            type: [Object, String],
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    onLoad() {

    },
    created() {

    },
    computed: {
        bem() {
            return ''
        }
    },
    methods: {
        getParentData(parentName = '') {
            // 避免在created中去定义parent变量
            if (!this.parent) this.parent = {}
            // 这里的本质原理是，通过获取父组件实例(也即类似cw-col的父组件cw-row的this)
            // 将父组件this中对应的参数，赋值给本组件(cw-col的this)的parentData对象中对应的属性
            // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
            // 此处并不会自动更新子组件的数据，而是依赖父组件cw-row去监听data的变化，手动调用更新子组件的方法去重新获取
            this.parent = uni.$o.utils.$parent.call(this, parentName)
            if (this.parent.children) {
                // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
                this.parent.children.indexOf(this) === -1 && this.parent.children.push(this)
            }
            if (this.parent && this.parentData) {
                // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
                Object.keys(this.parentData).map((key) => {
                    this.parentData[key] = this.parent[key]
                })
            }
        }
    },
	beforeDestroy() {
	    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
	    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
	    if (this.parent && Array.isArray(this.parent.children)) {
	        // 组件销毁时，移除父组件中的children数组中对应的实例
	        const childrenList = this.parent.children
	        childrenList.map((child, index) => {
	            // 如果相等，则移除
	            if (child === this) {
	                childrenList.splice(index, 1)
	            }
	        })
	    }
	}
}
