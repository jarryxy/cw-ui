var object = require('./object.js');
var array = require('./array.js');

function style(styles) {
    if (array.isArray(styles)) {
        return styles
            .filter(function(item) {
                return item != null && item !== '';
            })
            .map(function(item) {
                return style(item);
            })
            .join(';');
    }
	
    if (Object.prototype.toString.call(styles) === '[object Object]') {
        return object
            .keys(styles)
            .filter(function(key) {
                return styles[key] != null && styles[key] !== '';
            })
            .map(function(key) {
                return [key, [styles[key]]].join(':');
            })
            .join(';');
    }

    return styles;
}

module.exports = style;
