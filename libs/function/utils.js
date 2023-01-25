var bem = require('./bem.js');
var memoize = require('./memoize.js');
var addUnit = require('./add-unit.js');
import test from './test.js'

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj) {
	// 对常见的“非”值，直接返回原来值
	if ([null, undefined, NaN, false].includes(obj)) return obj
	if (typeof obj !== 'object' && typeof obj !== 'function') {
		// 原始类型直接返回
		return obj
	}
	const o = test.array(obj) ? [] : {}
	for (const i in obj) {
		if (obj.hasOwnProperty(i)) {
			o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
		}
	}
	return o
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
function deepMerge(target = {}, source = {}) {
	target = deepClone(target)
	if (typeof target !== 'object' || typeof source !== 'object') return false
	for (const prop in source) {
		if (!source.hasOwnProperty(prop)) continue
		if (prop in target) {
			if (typeof target[prop] !== 'object') {
				target[prop] = source[prop]
			} else if (typeof source[prop] !== 'object') {
				target[prop] = source[prop]
			} else if (target[prop].concat && source[prop].concat) {
				target[prop] = target[prop].concat(source[prop])
			} else {
				target[prop] = deepMerge(target[prop], source[prop])
			}
		} else {
			target[prop] = source[prop]
		}
	}
	return target
}

/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
function $parent(name = undefined) {
	let parent = this.$parent
	// 通过while历遍，这里主要是为了H5需要多层解析的问题
	while (parent) {
		// 父组件
		if (parent.$options && parent.$options.name !== name) {
			// 如果组件的name不相等，继续上一级寻找
			parent = parent.$parent
		} else {
			return parent
		}
	}
	return false
}

module.exports =  {
    bem: bem,
    memoize: memoize,
    addUnit: addUnit,
	deepClone,
	deepMerge,
	$parent
};
