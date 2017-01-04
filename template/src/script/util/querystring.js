/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 80, plusplus: true, sloppy: true, forin: true*/
/*global module: true, mdev: true, console: true, require: true,unescape: true*/


var queryString = {
    formatToJson: function (str) {
        var arry = str.split('&');
        var i;
        for (i = 0; i < arry.length; i++) {
            var index = arry[i].search('=');
            arry[i] = arry[i].substring(0, index) + '":"'
                + decodeURIComponent(arry[i].substring(index + 1));
        }
        var formatStr = '{"' + arry.join('","') + '"}';
        var formatjson = window.JSON.parse(formatStr);
        return formatjson;
    },
    formatToString: function (json) {
        if (typeof json === 'object') {
            var str = '';
            var i;
            for (i in json) {
                str += i + '=' + json[i] + '&';
            }
            var formatString = str.substring(0, str.length - 1);
            return formatString;
        }
    }
};


module.exports = queryString;
