/*jslint browser: true, vars: true, nomen: true, indent: 4, maxlen: 200, plusplus: true, sloppy: true, newcap: true, sub: true, regexp: true, continue: true, forin: true*/
/*global mdev: true, console: true, require: true, module: true*/

var editor = function (conf, fn) {
    var $ = window.$;
    var currentBase = window.location.protocol + '//' + window.location.host;
    var LOCAL_KEY = 'sohu-mp-ueditor';
    // 2016.9.9
    var needSetLocalData = {'version': 3, 'code': ''};
    function initEditor() {
        var editor_opts = {
            UEDITOR_HOME_URL: currentBase + '/editor/'
        };
        var n;
        for (n in conf.opts) {
            editor_opts[n] = conf.opts[n];
        }
        var editorIns = window.UE.getEditor(conf.id, editor_opts);
        editorIns.addListener('ready', function (e) {
            fn(editorIns);
        });
    }

    function getJS(res, callback) {
        if (res.length === 0) {
            callback();
            return;
        }
        $.ajax({
            type: "GET",
            url: res[0],
            success: function (data) {
                needSetLocalData.code += data;
                window.localStorage.setItem(LOCAL_KEY, JSON.stringify(needSetLocalData));
                res.shift();
                getJS(res, callback);
            },
            dataType: "script",
            cache: false
        });
    }

    var clientLocalUEditor = window.localStorage.getItem(LOCAL_KEY);
    if (clientLocalUEditor) {
        var localUEditorObj = JSON.parse(clientLocalUEditor);
        if (localUEditorObj.version === needSetLocalData.version && localUEditorObj.code.indexOf("sohu-editor-complete-tag") !== -1) {
            // hack ie8 eval context
            (function () {
                [eval][0](localUEditorObj.code);
            }());
            initEditor();
        } else {
            getJS([ currentBase + '/editor/ueditor.config.js', currentBase + '/editor/ueditor.all.js' ], initEditor);
        }
    } else {
        getJS([ currentBase + '/editor/ueditor.config.js', currentBase + '/editor/ueditor.all.js' ], initEditor);
    }

};

module.exports = editor;
