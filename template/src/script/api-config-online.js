/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true, forin: true*/
/*global mdev: true, exports: true, require: true, module: true, console: true*/


var conf = {
    'index': '/index'
};


exports.get = function (name) {
    if (typeof name !== 'string' || name === '' || !conf[name]) {
        return '/api?error-key';
    }

    return conf[name];
};
