/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true, forin: true*/
/*global mdev: true, console: true, require: true, module: true*/

var config = {
    dataType: 'json'
};

var apiList = [];

var combiner = {
    config: function (dataType) {
        config.dataType = dataType;
    },
    clear: function () {
        apiList = [];
    },
    push: function (name, uri, params) {
        apiList.push({ name: name, uri: uri, params: params || {} });
    },
    request: function (fn) {
        var response = {};

        var check = function () {
            var i;
            for (i = 0; i < apiList.length; i++) {
                if (apiList[i].load === false) {
                    return;
                }
            }
            fn(response);
        };

        var ajax = function (api) {
            api.load = false;
            mdev.ajax({
                cache: false,
                dataType: config.dataType,
                timeout: 30000,
                type: 'GET',
                url: api.uri,
                data: api.params,
                success: function (data) {
                    api.load = true;
                    response[api.name] = data || {};
                    check();
                },
                error: function () {
                    api.load = true;
                    response[api.name] = {};
                    check();
                }
            });
        };

        var i, api;
        for (i = 0; i < apiList.length; i++) {
            api = apiList[i];
            ajax(api);
        }

        if (apiList.length === 0) {
            check();
        }
    }
};


module.exports = combiner;
