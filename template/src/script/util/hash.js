/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, forin: true*/
/*global module: true, mdev: true, console: true, require: true*/


var object = {};


var helper = (function () {
    var $$querystring = require('./querystring.js');
    var handlerList = {};


    var pushHandler = function (key, fn) {
        handlerList[key] = handlerList[key] || [];

        if (typeof fn === 'function') {
            handlerList[key].push(fn);
        }
    };


    // change handle
    var fn = (function () {
        var oObject = {};
        var _ = window._;
        return function () {
            var qs = window.location.hash;

            // to object
            if (qs.indexOf('#') === 0) {
                qs = qs.substring(1, qs.length);
            }
            var nObject = $$querystring.formatToJson(qs);

            // diff
            if (_.isEqual(oObject, nObject)) {
                return;
            }

            // 计算出变化的keys
            (function () {
                var keys = [];
                var key;
                for (key in handlerList) {
                    if (oObject[key] !== nObject[key]) {
                        keys.push(key);
                    }
                }

                keys.forEach(function (key) {
                    var i;
                    for (i = 0; i < handlerList[key].length; i++) {
                        handlerList[key][i]();
                    }
                });
            }());


            oObject = _.clone(nObject);
            object = _.clone(nObject);
        };
    }());


    // change
    (function () {
        // 判断是否支持hashchange事件
        if (typeof window.onhashchange === 'object' || typeof window.onhashchange === 'undefined') {
            (function () {
                var fnDelay = 100;
                var lastQs = window.location.hash;
                window.setInterval(function () {
                    var qs = window.location.hash;

                    if (lastQs === qs) {
                        return;
                    }

                    lastQs = qs;

                    fn();
                }, fnDelay);
            }());
        } else {
            window.onhashchange = fn;
        }
    }());


    // default
    fn();


    return {
        updateHashString: (function () {
            var updateHashStringhandle;
            return function () {
                window.clearTimeout(updateHashStringhandle);
                updateHashStringhandle = window.setTimeout(function () {
                    var nv = '#' + $$querystring.formatToString(object);
                    window.location.hash = nv;
                });
            };
        }()),
        pushHandler: pushHandler
    };
}());


var hash = {
    del: function (name) {
        delete object[name];
        helper.updateHashString();
    },
    get: function (name) {
        return object[name];
    },
    getAll: function () {
        return object;
    },
    set: function (name, value) {
        if (typeof name === 'string' && name !== '' && typeof value === 'string' && value !== '') {
            if (object[name] !== value) {
                object[name] = value;
                helper.updateHashString();
            }
        }
    },
    listen: function (keys, fn) {
        if (typeof keys !== 'string' || typeof fn !== 'function') {
            return;
        }

        var keyArr = keys.split(',');
        keyArr.forEach(function (key) {
            key = key.trim();
            if (key === '') {
                return;
            }
            helper.pushHandler(key, fn);
        });
    }
};


module.exports = hash;
