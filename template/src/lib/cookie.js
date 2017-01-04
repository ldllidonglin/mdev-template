/**
 * @copyright 2010 sohu.com Inc. All rights reserved.
 * @path: xiaoq/util/cookie.js
 * @author: sundy
 * @email: sdy126@gmail.com
 * @version: 1.1.0
 * @date: 2011/3/24
 * Update Log:
 */

var document = window.document;

module.exports = {
    get: function (name, encode) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        var j = 0;
        while (i < clen) {
            j = i + alen;
            if (document.cookie.substring(i, j) == arg)
                return this.getCookieVal(j, encode);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0)
                break;
        }
        return null;
    },
    set: function (name, value, expires, path, domain, secure) {
        var argv = arguments;
        var argc = arguments.length;
        //        var expires = (argc > 2) ? argv[2] : null;
        var now = new Date();
        var expires = (argc > 2) ? argv[2] : new Date(now.getFullYear(), now.getMonth() + 1, now.getUTCDate());
        var path = (argc > 3) ? argv[3] : '/';
        var domain = (argc > 4) ? argv[4] : '';
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    },
    remove: function (name) {
        //if (this.get(name))
        //    document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        if (this.get(name)) this.set(name, "", new Date(1970, 1, 1));
    },

    getCookieVal: function (offset, encode) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        if (encode == false) return document.cookie.substring(offset, endstr);
        else return unescape(document.cookie.substring(offset, endstr));
    },
    cookie: function (key, value, options) {
        try {
            //������
            //------
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                //options = $.extend({}, options);
                if (value === null || value === undefined) {
                    options.expires = -1;
                }
                if (typeof options.expires === "number") {//��������
                    var days = options.expires, t = options.expires = new Date;
                    t.setDate(t.getDate() + days);
                }
                /*
                 name = value
                 expires =
                 path =
                 domain =
                 secure =
                 */
                value = String(value);
                return document.cookie = [encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("");
            }
            options = value || {};
            var result, decode = options.raw ? function (s) {
                return s;
            } : decodeURIComponent;
            return (result = (new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)")).exec(document.cookie)) ? decode(result[1]) : null;
            //------
        } catch (e) {
        }
    }
};
