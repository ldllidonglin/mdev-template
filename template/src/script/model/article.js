/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true, forin: true*/
/*global mdev: true, console: true, require: true, module: true*/


var $$api = require('script/api-config.js');
var $$model = require('script/util/model.js');

var _ = window._;

var articleModel = new $$model({});

_.extend(articleModel, {
    defaults: {
    },
    // 删除
    del: function (id, token) {
        var _this = this;
        mdev.ajax({
            type: 'POST',
            url: '/api/delete.action',
            cache: false,
            data: {
                id: id,
                _token: token
            },
            success: function (data) {
                _this.trigger('article_del', data);
            },
            fail: {
            }
        });
    }
});

module.exports = articleModel;
