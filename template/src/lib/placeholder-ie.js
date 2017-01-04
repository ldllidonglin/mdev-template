var $ = window.$;
var document = window.document;

(function () {
    // Array.prototype.indexOf
    (function (ap) {
        if (ap.indexOf) {
            return;
        }

        ap.indexOf = function (val) {
            var r = -1;
            var i, v;
            for (i = 0; i < this.length; i++) {
                v = this[i];
                if (v === val) {
                    r = i;
                }
            }
            return r;
        };
    }(Array.prototype));
    if (typeof $ === 'function') {
        var checkedInput = function () {
            $(document).find('input').each(function () {
                var _this = $(this),
                    thisTpye = _this.attr('type'),
                    $parent = _this.parent();
                
                var list = [ 'text', 'password', 'url', 'email' ];
                var placeholderValue = _this.attr("placeholder");
                //筛选input type值
                if (list.indexOf(thisTpye) >= 0 && placeholderValue) {
                    var offset = _this.offset(),
                        pOffset = $parent.offset();
                    var posLeft = parseFloat(offset.left - pOffset.left + parseFloat(_this.css('paddingLeft'))),  //假placeholder left值
                        posTop = parseFloat(offset.top - pOffset.top + parseFloat(_this.css('paddingTop')));  //假placeholder top值

                    //每次获取input位置
                    $parent.find('span[data-placeholder-mark="' + _this.attr('data-placeholder-mark') + '"]').css({top: posTop + 'px', left: posLeft + 'px'});

                    //判断是否绑定过事件
                    if (!_this.attr('data-placeholder-mark')) {
                        $parent.css('position', 'relative');
                        _this.attr('data-placeholder-mark', Math.random());
                        var markData = _this.attr('data-placeholder-mark');

                        //新增span
                        _this.after('<span data-placeholder-mark="' + markData + '"></span>');
                        var fontSize = _this.css("font-size");
                        var $newSpan = $parent.find('span[data-placeholder-mark="' + markData + '"]');
                        $newSpan.css({
                            color: '#999',
                            position: 'absolute',
                            zIndex: '3',
                            fontSize: fontSize,
                            top: posTop + 'px',
                            display: 'none',
                            lineHeight: _this.height() + 'px',
                            left: posLeft + 'px'
                        }).text(_this.attr('placeholder'));

                        //绑定点击span，input获得焦点
                        if (_this.val() === '') {
                            $newSpan.show();
                            $newSpan.on('click', function () {  //点击假placeholder文本框活得焦点
                                _this.focus();
                            });
                        }

                        //绑定keyup事件
                        _this.on('keyup', function () {
                            $newSpan.hide();
                            if (_this.val() === '') {
                                $newSpan.show();
                            }
                        });
                    }
                }
            });
        }

        //ie10以下触发
        if($.browser.msie && $.browser.version != 10.0) {
            setInterval(checkedInput, 1000);
        }
    }
}());
