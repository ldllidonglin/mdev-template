/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 80, plusplus: true, sloppy: true, continue: true*/
/*global console: true, require: true, true, module: true*/

/**
 * @author liangxiao
 * @version [v1.0]
 * @description 表单操作
 */

var q = {
    feilds: 'input, textarea'
};

function getFeilds($wrapper) {
    var $feilds, feildsMap;

    $feilds = $wrapper.find(q.feilds);
    feildsMap = {};

    var i, name, $feild;
    for (i = 0; i < $feilds.length; i++) {
        $feild = $feilds.eq(i);

        name = $feild.attr('name');
        if (name === '') {
            continue;
        }

        if (!feildsMap[name]) {
            feildsMap[name] = [];
        }
        feildsMap[name].push($feild);
    }

    return feildsMap;
}

var FormHelper = function () {
    this.init.apply(this, arguments);
};
FormHelper.prototype = {
    init: function ($wrapper) {
        this.feildsMap = getFeilds($wrapper);
    },
    get: function (isEncode) {
        var data = {};
        var k, v, $feild, type;
        for (k in this.feildsMap) {
            if (this.feildsMap.hasOwnProperty(k)) {
                v = this.feildsMap[k];
                if (v.length === 1) {
                    $feild = v[0];
                    type = $feild.attr('type');
                    switch (type) {
                    case 'radio':
                        console.warn('Exception: Only one radio button!');
                        break;
                    case 'checkbox':
                        data[k] = $feild.attr('checked') ? true : false;
                        break;
                    default:
                        data[k] = $feild.val();
                        if (isEncode) {
                            data[k] = encodeURIComponent(data[k]);
                        }
                        break;
                    }
                } else {
                    console.warn('Exception: Not Implemented!');
                }
            }
        }
        return data;
    },
    set: function (data) {
        /*
        $.each(this.feildsMap, function (k, v) {
            var $feild, type;

            if (v.length === 1) {
                $feild = v[0];
                type = $feild.attr('type');
                switch (type) {
                case 'radio':
                    throw 'Exception: Only one radio button!';
                case 'checkbox':
                    $feild.attr('checked', data[k]);
                    break;
                default:
                    $feild.val(data[k]);
                    break;
                }
            } else {
                throw 'Exception: Not Implemented!';
            }
        });
        */
    }
};

module.exports = FormHelper;
