/**
 * 类目侧滑组件模块
 * @author zym
 * @version 1.0
 * @since 2016-03-02
 */
define(function(require, exports, module) {
    var Mustache = require('mustache');

    var $window = $(window);

    var tpl = {
        sideSlipTpl: [
            '<div id="J_MedicalPreview" class="medical-preview">',
            '<div id="wrapper">',
            '<div id="scroller">',
            '<ul id="thelist">',
            '{{#urlInfoArr}}',
            '<li data-index="{{dataIndex}}"><a href="{{url}}"><div>{{title}}</div></a></li>',
            '{{/urlInfoArr}}',
            '</ul>',
            '</div>',
            '</div>',
            '</div>'
        ]
    };

    var SideSlip = function(options) {
        this.settings = $.extend({}, SideSlip.defaults, options);
        this.init();
    };

    SideSlip.prototype = {
            /**
             * 初始化
             */
            init : function() {
                this.create();
            },

            /**
             * 创建
             */
            create : function() {
                var _this = this;

                var sideSlipContent = Mustache.render(tpl.sideSlipTpl.join(''),this.settings.content);

                // 浮层模板
                var templates = '<div class="rDialog-wrap"><div class="rDialog-content">'+ sideSlipContent +'</div></div>';

                // 追回到body
                _this.sideSlip = $('<div>').addClass('rDialog').css('zIndex',this.settings.zIndex + 1).html(templates);
                _this.sideSlip.prependTo('body');

                //显示高亮项
                _this.sideSlip.find('li').removeClass('current');
                _this.sideSlip.find('li').eq(_this.settings.currentIndex).addClass('current');

                if(_this.settings.lock){
                    _this.lock = $('<div>').css('zIndex',this.settings.zIndex).addClass('rDialog-mask');
                    _this.lock.appendTo('body');

                    _this.settings.actionBtnParent.css('zIndex',this.settings.zIndex + 1);
                }

                // 设置浮层大小
                _this.size();

                // 设置浮层位置
                _this.position();

                // 事件绑定
                _this.bindEvent();
            },

            /**
             * 设置浮层大小
             */
            size : function() {
                var _this = this;

                var content = _this.sideSlip.find('.rDialog-content');

                content.css({
                    width  : _this.settings.width,
                    height : _this.settings.height
                });

                _this.sideSlip.find('#wrapper').css('height',_this.settings.height);
            },

            /**
             * 设置浮层位置
             */
            position : function() {
                var _this = this;

                _this.sideSlip.css('top',_this.settings.actionBtnParent.height());

                if(_this.settings.categorySide === 'left'){
                    if(parseInt(_this.sideSlip.css('left')) === 0){
                        _this.sideSlip.css('left',0);
                    }else{
                        _this.sideSlip.css('left',-(this.settings.width));
                    }
                }else{
                    if(parseInt(_this.sideSlip.css('right')) === 0){
                        _this.sideSlip.css('right',0);
                    }else{
                        _this.sideSlip.css('right',-(this.settings.width));
                    }
                }

                if(_this.settings.lock) {
                    if(_this.lock.css('opacity') === '0'){
                        _this.lock.css('opacity', 0);
                    }else{
                        _this.lock.css('opacity', 0.7);
                    }
                }
            },

            /**
             * 内容区下拉操作的iScroll函数
             */
            pullDown : function(){
                var myScroll;

                var loaded = function(){
                    myScroll = new iScroll('wrapper', {vScrollbar:true,hideScrollbar:false});
                };

                document.getElementById('wrapper').addEventListener('touchmove', function (e) {e.preventDefault()}, false);

                loaded();
            },

            /**
             * 事件绑定
             */
            bindEvent : function() {
                var _this = this;

                //作用点btn点击交互
                _this.settings.actionBtn.on('click',function(){
                    if(_this.settings.categorySide === 'left'){
                        if(parseInt(_this.sideSlip.css('left')) === 0){
                            _this.sideSlip.removeClass('slideContent1');
                            _this.sideSlip.addClass('slideContent2');
                            _this.sideSlip.css('left',-(_this.settings.width));

                            if(_this.settings.lock){
                                _this.lock.removeClass('slidePreview2');
                                _this.lock.addClass('slidePreview1');
                                _this.lock.css('opacity',0);
                            }

                            setTimeout(function(){
                                _this.sideSlip.hide();

                                if(_this.settings.lock){
                                    _this.lock.hide();
                                }
                            },800);
                        }else{
                            _this.sideSlip.show();
                            _this.sideSlip.removeClass('slideContent2');
                            _this.sideSlip.addClass('slideContent1');
                            _this.sideSlip.css('left',0);

                            if(_this.settings.lock){
                                _this.lock.show();
                                _this.lock.removeClass('slidePreview1');
                                _this.lock.addClass('slidePreview2');
                                _this.lock.css('opacity',0.7);
                            }
                        }
                    }else{
                        if(parseInt(_this.sideSlip.css('right')) === 0){
                            _this.sideSlip.removeClass('slideContent3');
                            _this.sideSlip.addClass('slideContent4');
                            _this.sideSlip.css('right',-(_this.settings.width));

                            if(_this.settings.lock){
                                _this.lock.removeClass('slidePreview2');
                                _this.lock.addClass('slidePreview1');
                                _this.lock.css('opacity',0);
                            }

                            setTimeout(function(){
                                _this.sideSlip.hide();

                                if(_this.settings.lock){
                                    _this.lock.hide();
                                }
                            },800);
                        }else{
                            _this.sideSlip.show();
                            _this.sideSlip.removeClass('slideContent4');
                            _this.sideSlip.addClass('slideContent3');
                            _this.sideSlip.css('right',0);

                            if(_this.settings.lock){
                                _this.lock.show();
                                _this.lock.removeClass('slidePreview1');
                                _this.lock.addClass('slidePreview2');
                                _this.lock.css('opacity',0.7);
                            }
                        }
                    }
                });

                //浮层内容点击交互
                _this.sideSlip.delegate('li','click',function(){
                    var $that = $(this);

                    if(!($that.hasClass('current'))){
                        _this.sideSlip.find('li').removeClass('current');
                        $that.addClass('current');

                        _this.settings.currentIndex = parseInt($that.attr('data-index'));
                    }
                });

                // resize
                $window.on('resize', function() {
                    _this.position();
                });

                if(_this.settings.pullDownFlag){
                    _this.pullDown();
                }
            }
        };

    /**
     * 默认配置
     */
    SideSlip.defaults = {
        // 作用点btn元素
        actionBtn: null,

        // 作用点btn父元素
        actionBtnParent: null,

        // 浮层内容区数据对象
        content: {},

        //作用点btn位置(left,right),决定动画是从左或从右开始
        categorySide: 'left',

        // 浮层内容区宽度
        width: 0,

        // 浮层内容区高度
        height: 0,

        // 是否需要蒙版标示符
        lock: false,

        // 浮层内容区是否需要下拉操作标示符
        pullDownFlag: false,

        // 高亮项的下标值
        currentIndex: 0,

        // 层级值
        zIndex: 9
    };

    var rSideSlip = function(options) {
        new SideSlip(options);
    };

    window.rSideSlip = $.rSideSlip = $.sideSlip = rSideSlip;
});