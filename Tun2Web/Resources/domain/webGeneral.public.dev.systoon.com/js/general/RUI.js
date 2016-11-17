/**
 * Created by ryan on 15/4/22.
 */
(function(root, factory) {
    "use strict";//启用严格模式
    /**
     * @classdesc
     * 构造函数,可以支持amd,cmd
     */
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define('RUI', function(exports) {
            return factory(root, exports);
        });

    } else {
        root.RUI = factory(root, {});
    }
})(this, function(root, RUI) {
    /**
     * @description 版本号 '0.1.0'
     * @type {string}
     * @global
     */
    RUI.VERSION = '0.1.0';
    /**
     * @description 是否执行过初始化;
     * @type {boolean}
     */
    var hasInited = false;
    /**
     * @description 自动初始化
     */
    window.addEventListener("DOMContentLoaded", function() {
        if (hasInited == false) {
            RUI.init();
        }
    });
    /**
     * @description 全局配置
     * @type {Object}
     * @exports manages
     */
    RUI.config={
        deptchList:{'debugLog':'9999','dialog':'9998','progress':'9997','ajax':'9996','popover':'9995'}//z-index的深度
    };
    /**
     * @description 控件管理器
     * @type {Object}
     * @exports manages
     */
    RUI.manages={
        list:{}
    };
    /**
     * @description 初始化
     * @type {function}
     * @exports init
     */
    RUI.init = function() {
        console.log("RUI:init");
        if (hasInited == true) return 'Don\'t repeat initialization!';
        hasInited = true;

        window.alert = function (msg) {
            $('body').append(RUI.create("dialog", "", function (dom) {
            }, msg));//替换默认alert
        }
        setTimeout(function () {//必须做异步加载.
            $('body').append(RUI.create("ajax", "", function (dom) {
            }, {id: 8}));//替换ajax，以及增加loading
        }, 0)

    }
    /**
     * @description 创建控件(工厂方法)
     * @type {Function}
     * @param name {string} 事件名称
     * @param dom {＊} 要执行的dom对象,也可以是字符串
     * @param runFun {Function} dom渲染之后调用的函数
     * @returns {dom} dom对象
     * @exports create
     */
    RUI.create=function(name,dom,runFun,arg){
        var oldDom=RUI.manages.list[name];
        if(oldDom){
            delete RUI.manages.list[name];
            oldDom=null;
        }
        var RClass=RUI.ui[name];
        var _rclass=new RClass(dom,runFun,arg);
        if(typeof dom=='string'){
        }else if(RUI.untils.isDOM(dom)){
        }else if(!dom||dom==""){
        }
        _rclass.style['z-index']=RUI.config.deptchList[name];
        RUI.manages.list[name]=_rclass;
        return _rclass;
    };
    RUI.get=function(name,arg){
       var dom=RUI.manages.list[name];
       if(dom && dom.id) {
           var newDom = document.getElementById(dom.id);
           if (newDom) {
               return dom;
           } else if (dom) {
               delete RUI.manages.list[name];
               dom = null;
               console.log("dom对象已经不存在于场景上");
           } else {
               console.log("dom对象未添加");
           }
       }
        return dom;
    }
    window.RUI=RUI;
    return RUI
});


(function(doc,RUI){
    var sheet = (function() {
        // 创建 <style> 标签
        var style = document.createElement("style");
        // 可以添加一个媒体(/媒体查询,media query)属性
        // style.setAttribute("media", "screen")
        // style.setAttribute("media", "only screen and (max-width : 1024px)")
        // 对WebKit hack :(
        style.appendChild(document.createTextNode(""));
        // 将 <style> 元素加到页面中
        document.head.appendChild(style);
        return style.sheet;
    })();
    RUI.untils={
        isDOM:function(obj){
            var _isDOM = ( typeof HTMLElement === 'object' ) ? obj instanceof HTMLElement:obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            return _isDOM;
        },
        includeClass:function(styleId,styles) {
            if (document.getElementById(styleId)) {
                return
            }
            var style = document.createElement("style");
            style.id = styleId;
            (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
            if (style.styleSheet) { //for ie
                style.styleSheet.cssText = styles;
            } else {//for w3c
                style.appendChild(document.createTextNode(styles));
            }
        },
        loadClass:function(url) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },
        ajaxExtend:function(soureObj){//ajax继承写法
            var _ajax=soureObj.ajax;//备份的ajax方法
            //重写jquery的ajax方法
            soureObj.ajax=function(opt){
                //备份opt中error和success方法
                var fn = {
                    error:function(XMLHttpRequest, textStatus, errorThrown){},
                    success:function(data, textStatus){},
                    beforeSend:function(){},
                    complete:function(){}
                }
                if(opt.error){
                    fn.error=opt.error;
                }
                if(opt.success){
                    fn.success=opt.success;
                }
                if(opt.beforeSend){
                    fn.beforeSend=opt.beforeSend;
                }
                if(opt.complete){
                    fn.complete=opt.complete;
                }
                //扩展增强处理
                var _opt = $.extend(opt,{
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        //错误方法增强处理
                        fn.error(XMLHttpRequest, textStatus, errorThrown);
                        //alert("数据请求失败!"+"状态码:"+textStatus);
                        alert("数据请求失败，请稍后再试!");
                    },
                    success:function(data, textStatus){
                        //成功回调方法增强处理
                        fn.success(data, textStatus);
                        //alert("数据请求成功!")
                    },
                    beforeSend:function(XHR){
                        //提交前回调方法
                        //alert("数据请求中...")
                        var $loading=$("#RUI_ajax_loading");
                            if($loading.length>0){
                                $loading.show();
                            }
                        fn.beforeSend.apply(this,arguments);
                    },
                    complete:function(XHR, TS){
                        //请求完成后回调函数 (请求成功或失败之后均调用)。
                        var $loading=$("#RUI_ajax_loading");
                        if($loading.length>0){
                            setTimeout(function(){
                                $loading.hide();
                            },1000);
                        }
                        fn.complete.apply(this,arguments);

                    }
                });
                _ajax(_opt);
            };
        }
    }
})(document,RUI);


(function(doc,RUI){
    var index=-1;
    var loca="";
    if(index==-1){
        index=location.href.indexOf("webGeneral.public.dev.systoon.com");
        loca=location.href.substr(0,index+("webGeneral.public.dev.systoon.com").length);
    }
    if(index==-1){
        if(location.href.indexOf("webGeneral")!=-1||location.href.indexOf("toonPlugins")!=-1){
            index=(location.href.indexOf("webGeneral")+1)||(location.href.indexOf("toonPlugins")+1);
            loca=location.href.substr(0,(index-1))+"webGeneral.public.dev.systoon.com";
        }
    }
    if(index<=0){
        console.log("RUI.css文件未导入!");
        return;
    }

    RUI.untils.loadClass(loca+"/css/general/RUI.css");
    RUI.ui={
        /**
         * @description 调用相机,相册,云相册控件
         * @example RUI.create("popover","",function(dom){},msg)
         * @param  arg {*} 匿名
         */
        popover:function(dom,runFun,arg){
            var _dom=dom;
            if(!dom||dom==""){
                //RUI.untils.includeClass("RUI_STYLE",'.RUI_popover {width: 100%;height: 100%;background: #ccc;position: absolute;top: 0;left: 0;bottom: 0;z-index: 1000;display: none;overflow: hidden;}');
                _dom=document.getElementById("RUI_popover");
                $(_dom).remove();//强制删除保证唯一性
                if(!_dom){
                    _dom='<section id="RUI_popover" class="RUI_popover">'+
                    '<section class="mask"></section>'+
                    '<ul>'+
                    '<li>拍照</li>'+
                    '<li>从相册选择</li>'+
                    '<li>使用云相册</li>'+
                    '<li class="select_off">取消</li>'+
                    '</ul>'+
                    '</section>';
                }
            }
            var $content=$(_dom);
            if(!dom||dom==""){
                $content.on("tap","li",function(e){
                    var li=$(this);
                    var index=li.index();
                    if(window.Mwap||document.Mwap) {
                        var defultObject={
                            "aspectX":"null",
                            "aspectY":"null",
                            "xLength":"null",
                            "yLength":"null",
                               "type":"0",
                            "nameSpace":arg.domainNamespace,
                            "device": "ios",
                            "callFrom":'null'
                        };
                        defultObject.aspectX=arg.aspectX?arg.aspectX:defultObject.aspectX;
                        defultObject.aspectY=arg.aspectY?arg.aspectY:defultObject.aspectY;
                        defultObject.xLength=arg.xLength?arg.xLength:defultObject.xLength;
                        defultObject.yLength=arg.yLength?arg.yLength:defultObject.yLength;
                        defultObject.callFrom=arg.callFrom?arg.callFrom:defultObject.callFrom;
                        defultObject.type=arg.type?arg.type:defultObject.type;
                        switch (index) {
                            case 0:
                                console.log("defultObject:",defultObject);
                                Mwap.events.trigger(Mwap.eventTypes.camera,defultObject);
                                break;
                            case 1:
                                defultObject.state="albumSingleSelect";
                                Mwap.events.trigger(Mwap.eventTypes.album, defultObject);
                                break;
                            case 2:
                                break;
                        }
                    }
                    $content.css('display','none');
                })
            }

            if(runFun){
                runFun($content[0]);
            }
            return $content[0];
        },
        /**
         * @description 自定义alert事件
         * @example RUI.create("alert","",function(dom){},msg)
         * @param  arg {*} 匿名
         */

        dialog:function(dom,runFun,arg){
            var _dom=dom;
            if(!dom||dom==""){
                var _dom=document.getElementById("RUI_dialog");
                $(_dom).remove();//强制删除保证唯一性
                if(!_dom){
                    _dom='<div id="RUI_dialog" class="RUI_dialog">'+
                    '<div></div>'+
                    '</div>';
                }
            }
            var $content=$(_dom);
            var cont=$content.children("div")[0];
                $(cont).addClass("dialog-blur");
                $(cont).text(arg);
                $content.show();
            clearTimeout($content.data("timer"));
            var timer=setTimeout(function(){
                $content.removeClass("dialog-fadeout");
                $content.hide();
            },2000);
            $content.addClass("dialog-fadeout");
            $content.data("timer",timer);
            if(runFun){
                runFun($content[0]);
            }
            return $content[0];
        },
        /**
         * @description 自定义deBugLog事件
         * @example RUI.create("debugLog","",function(dom){},msg)
         * @param  arg {*} 匿名
         */

        debugLog:function(dom,runFun,arg){
            var _dom=dom;
            if(!dom||dom==""){
                var _dom=document.getElementById("RUI_debugLog");
                $(_dom).remove();//强制删除保证唯一性
                if(!_dom){
                    _dom='<div id="RUI_debugLog" class="RUI_debugLog">'+
                    '<div>测试数据</div>'+
                    '</div>';
                }
            }
            var $content=$(_dom);
            var cont=$content.children("div")[0];
            $(cont).addClass("dialog-blur");
            $(cont).text(arg);
            $content.show();
            if(runFun){
                runFun($content[0]);
            }
            return $content[0];
        },
        /**
         * @description 进度条加载控件，分真实加载和模拟加载
         * @example RUI.create("alert","",function(dom){},msg)
         * $('body').append(RUI.create("progress", "", function () {}, {isReal:true}));
           var per=0
           setInterval(function(){
                per+=5;
                $("#RUI_progress").trigger("change",[per])
           },1000)
         * @param  arg {isReal:是否按真实数据加载} 默认是false;
         */

        progress:function(dom,runFun,arg){
            function getyunxing(content,arg){
                content.show();
                content.attr("data-percent",-1);
                if(arg&&!arg.isReal){
                    var $target=$({property: 0});
                    $target.animate({property: 100}, {
                        duration:3000,
                        step: function() {
                            var percentage = Math.round(this.property);
                            content.css('width',  percentage+"%");
                            if(percentage >= 100) {
                                $target.stop(true);
                                content.hide();//完成，隐藏进度条
                                if(runFun){
                                    runFun(content[0]);
                                }
                            }
                        }
                    });
                }else{
                    content.on('change', function(event,percentage) {
                        content.css('width',  percentage+"%");
                        if(percentage >=100) {
                            content.off('change');
                            content.hide()//完成，隐藏进度条
                            if(runFun){
                                runFun(content[0]);
                            }
                        }
                    });
                }


            }
            var _dom=dom;
            if(!dom||dom==""){
                var _dom=document.getElementById("RUI_progress");
                $(_dom).remove();//强制删除保证唯一性
                if(!_dom){
                    _dom='<div id="RUI_progress" class="RUI_progress">'+
                    '<span></span>'+
                    '</div>';
                }

            }
            var $content=$(_dom);
            var cont=$content.children("div")[0];
            //$(cont).text(arg);
            //$content.show();
            getyunxing($content,arg);
            return $content[0];
        },
        /**
         * @description 搜索框控件
         * @example RUI.create("","",function(dom){},msg)
         * @param  arg 匿名
         */
        search:function(dom,runFun,arg){
            var _dom=dom;
            if(!dom||dom==""){
                //RUI.untils.includeClass("RUI_STYLE",'.RUI_popover {width: 100%;height: 100%;background: #ccc;position: absolute;top: 0;left: 0;bottom: 0;z-index: 1000;display: none;overflow: hidden;}');
                _dom=document.getElementById("RUI_search");
                $(_dom).remove();//强制删除保证唯一性
                if(!_dom){
                    _dom='<div id="RUI_search" class="RUI_search">'+
                        '<div class="searchBox">'+
                            '<input id="inp" type="text" value="请输入小区进行搜索">'+
                        '</div>'+
                    '</div>';
                }
            }
            var $content=$(_dom);
            if(runFun){
                runFun($content[0]);
            }
            return $content[0];
        },
        /**
         * @description 扩展jquery的ajax请求
         * @example RUI.create("ajax","",function(dom){},msg)
         * @param  arg {*} 匿名
         */
        ajax:function(dom,runFun,arg){
            var _dom=dom;
            var _default={//loading样式，目前有8种可选
                id:(arg&&arg.id)||1,
                text:(arg&&arg.text)||"加载中..."
            }
            if(!dom||dom==""){
                var _dom=document.getElementById("RUI_ajax_loading");
                $(_dom).remove();_dom=null;//强制删除保证唯一性
                if(!_dom){
                    _dom='<div id="RUI_ajax_loading">'+
                    '<div class="RUI_ajax_loading load'+_default.id+' loader">'+
                    '<div></div>'+
                    '</div>'+
                    '</div>'
                    ;
                }
            }
            var $content=$(_dom);
            var cont=$content.children("div")[0];
            //$(cont).addClass("dialog-blur");
            $(cont).text(_default.text);
            $content.hide();
            $content[0].addEventListener('touchstart',function(e){
                e.stopPropagation();
                e.preventDefault();
            })
            if(runFun){
                runFun($content[0]);
            }
            if($content.data("ajax-extend")){
                return;
            }else{
                $content.data("ajax-extend","true");
                if(jQuery)RUI.untils.ajaxExtend(jQuery);
                if(Mwap)RUI.untils.ajaxExtend(Mwap);
            }
            return $content[0];
        }
    }
})(document,RUI);

