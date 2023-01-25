import utils from './libs/function/utils.js'
import $notify from './components/cw-notify/notify.js'
/**
 * 全局字段校验器
 * https://github.com/yiminghe/async-validator
 */
import Schema from './libs/lib/async-validator';

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$o.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
function sleep(value = 30) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, value)
	})
}
const $o = {
	sleep,
	utils
}
// $o挂载到uni对象上
uni.$o = $o


const install = (Vue) => {
    // 同时挂载到uni和Vue.prototype中
    // #ifndef APP-NVUE
    // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
    Vue.prototype.$o = $o
	Vue.prototype.$notify = $notify
    // #endif
	
	// 去除警告信息
	Schema.warning = function() {};
	const validator = (rules, fields) => {
		if(Object.keys(rules).length === 0,Object.keys(fields).length === 0){
			console.error(`未设置rules或fields。`);
		}
		return new Promise((resolve, reject) => {
			Vue.nextTick(() => {
				new Schema(rules).validate(fields, (errors, fields) => {
					if (errors) {
						uni.showToast({
							title: String(errors[0].message),
							icon: 'none',
							duration: 2000
						})
						reject(errors)
					}
					resolve(true)
				})
			})
		})
	}
	// 全局方法挂载
	Vue.prototype.$validator = validator
}

export default {
    install
}
