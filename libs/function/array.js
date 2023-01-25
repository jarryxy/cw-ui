function isArray(array) {
	// https://segmentfault.com/q/1010000022451372 不建议使用array.constructor === 'Array'
    // return array && array.constructor === 'Array';
    return array && Array.isArray(array);
}

module.exports.isArray = isArray;
