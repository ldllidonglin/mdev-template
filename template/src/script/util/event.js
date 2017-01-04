/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 80, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true*/
/*global console: true, changyan: true, _: true, module: true*/

var events = {};
var Events = {
    on: function (key, fn) {
        if (typeof fn !== 'function') {
            return;
        }
        events[key] = events[key] || [];
        events[key].push(fn);
    },
    once: function (key, fn) {
        if (typeof fn !== 'function' || (fn.once && fn.hasExeced)) {
            return;
        }
        fn.once = true;
        fn.hasExeced = false;
        events[key] = events[key] || [];
        events[key].push(fn);
    },
    trigger: function (key) {
        var args = [].slice.call(arguments, 1);
        var fnList = events[key] || [];
        fnList.forEach(function (item) {
            if (typeof item === 'function') {
                if (item.once && item.hasExeced) {
                    return;
                } else if (item.once && !item.hasExeced) {
                    item.hasExeced = true;
                    item.apply(window, args);
                } else {
                    item.apply(window, args);
                }
            }
        });
    }
};

module.exports = Events;