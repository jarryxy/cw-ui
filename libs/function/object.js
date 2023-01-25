function keys(obj) {
    return JSON.stringify(obj)
        .replace(/{|}|"/g, '')
        .split(',')
        .map(function(item) {
            return item.split(':')[0];
        });
}

module.exports.keys = keys;
