/*global module: true*/
var tool = {
    /**
     * 
     * 格式化时间戳
     * @param {int} timestamp
     * @returns yyyy-mm-dd
     */
    timeFormat : function (timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    },
    validateLength: function (ele, maxLength, wordCount) {
        var $ele = ele;
        var str = $ele.val();
        var realLength = this.getRealLength(str);
        var len, newstr, i;
        if (realLength > maxLength) {
            len = 0;
            newstr = '';
            for (i = 0; i < str.length && len < maxLength; i++) {
                newstr += str.charAt(i);
                if (str.charCodeAt(i) < 127) {
                    len += 0.5;
                } else {
                    len++;
                }
            }
            $ele.val(newstr);
            realLength = maxLength;
        }
        wordCount.html(realLength + "/" + maxLength);
    },
    getRealLength: function (inputString) {
        var length = 0;
        var i;
        for (i = 0; i < inputString.length; i++) {
            if (inputString.charCodeAt(i) < 127) {
                length += 0.5;
            } else {
                length++;
            }
        }
        return Math.ceil(length);
    },
    // 2016-08-19 -> 8.19
    timeFormatToString: function (time) {
        var m = time.split("-")[1];
        var d = time.split("-")[2];
        return m + "." + d;
    }
};

module.exports = tool;