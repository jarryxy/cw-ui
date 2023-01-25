import {
	canIUseGroupSetData,
	canIUseNextTick
} from './version';
import {
	isPlainObject,
	isPromise
} from './validator.js'
import Vue from 'vue'

export function range(num, min, max) {
	return Math.min(Math.max(num, min), max);
}

export function nextTick(cb) {
	// #ifdef MP-WEIXIN
	if (wx.canIUse('nextTick')) {
		wx.nextTick(cb);
	} else {
		setTimeout(() => {
			cb();
		}, 1000 / 30);
	}
	// #endif
	// #ifdef H5
	Vue.nextTick(cb);
	// #endif

}

let systemInfo;
export function getSystemInfoSync() {
	if (systemInfo == null) {
		systemInfo = uni.getSystemInfoSync();
	}

	return systemInfo;
}

export function getRect(context, selector) {
	return new Promise(resolve => {
		uni.createSelectorQuery().in(context).select(selector).boundingClientRect().exec((rect = []) => resolve(
			rect[0]));
	});
}

export function getAllRect(context, selector) {
	return new Promise(resolve => {
		uni.createSelectorQuery().in(context).selectAll(selector).boundingClientRect().exec((rect = []) =>
			resolve(rect[0]));
	});
}

export function requestAnimationFrame(cb) {
	const systemInfo = getSystemInfoSync();

	if (systemInfo.platform === 'devtools') {
		return setTimeout(() => {
			cb();
		}, 1000 / 30);
	}

	return uni.createSelectorQuery().selectViewport().boundingClientRect().exec(() => {
		cb();
	});
}

export function pickExclude(obj, keys) {
	if (!isPlainObject(obj)) {
		return {};
	}

	return Object.keys(obj).reduce((prev, key) => {
		if (!keys.includes(key)) {
			prev[key] = obj[key];
		}

		return prev;
	}, {});
}

export function toPromise(promiseLike) {
	if (isPromise(promiseLike)) {
		return promiseLike;
	}
}

export function groupSetData(context, cb) {
  if (canIUseGroupSetData()) {
    context.groupSetData(cb);
  } else {
    cb();
  }
}
export function getCurrentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}