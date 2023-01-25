// prettier-ignore
function addUnit(value) {
    if (value == null) {
        return undefined;
    }

    return /^-?\d+(\.\d+)?$/.test('' + value) ? value + 'px' : value;
}

module.exports = addUnit;
