/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true, forin: true*/
/*global mdev: true, console: true, require: true, module: true*/

var loading = false;
var queueList = [];


var datepicker = function (args) {
    args.srcEl = args.el;

    if (window.WdatePicker) {
        window.WdatePicker(args);
    } else {
        queueList.push(args);

        if (loading) {
            return;
        }

        loading = true;
        window.jQuery.getScript('http://changyan.sohu.com/mdevp/extensions/datepicker/003/WdatePicker-plus.js', function () {
            loading = false;

            queueList.forEach(function (item) {
                window.WdatePicker(item);
            });
            queueList = [];
        });
    }
};


module.exports = datepicker;
