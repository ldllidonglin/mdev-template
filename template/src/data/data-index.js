/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true, forin: true*/
/*global mdev: true, require: true, module: true, console: true*/


var $$combiner = require('script/util/combiner.js');
var $$api = require('script/api-config.js');

//$$combiner.push('pageContext', $$api.get('index'));
$$combiner.push('pageContext', '/v2/main/home/index.action');
$$combiner.request(function (cxt) {
    console.log('服务器变量:', window.JSON.parse(window.JSON.stringify(cxt.pageContext)));
    console.log('模版变量:', cxt.pageContext);
    var $$tmpl = require('data/tmpl-index.js');
    mdev.dom.prepend(mdev.tmpl($$tmpl, cxt.pageContext));
});
