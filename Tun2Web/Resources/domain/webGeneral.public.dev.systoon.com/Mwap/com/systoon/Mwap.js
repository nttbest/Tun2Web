(function ($) {
    'use strict';

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
     * Calculate the MD5 of a raw string
     */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
     * Encode a string as utf-8
     */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
     * Take string arguments and return either raw or hex encoded strings
     */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return md5;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = md5;
    } else {
        $.md5 = md5;
    }
}(this));

//var port=6780;
/**
 * @fileOverview Mwap.js端核心代码;
 * @author by ryan.zhu on 15/1/12;
 * @version 1.5;
 */
(function(root, factory) {
    ////"use strict";//启用严格模式
    /**
     * @classdesc
     * 构造函数,可以支持amd,cmd
     */
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define('Mwap', function(exports) {
            return factory(root, exports);
        });

    } else {
        root.Mwap = factory(root, {});
    }
})(this, function(root, Mwap) {
    /**
     * @原生ajax请求
     * @example
     ajax({
        url: "./TestXHR.aspx",              //请求地址
        type: "POST",                       //请求方式
        data: { name: "super", age: 20 },        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
     });
     */
    var RAjax=Mwap.ajax=function(options){
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = (options.dataType || "text").toUpperCase();
        options.cache=options.cache||"true ";
        options.timeout=parseInt(options.timeout)|| 10000;
        var params = formatParamsB(options.data);
        var protocol = /^([\w-]+:)\/\//.test(options.url) ? RegExp.$1 : window.location.protocol;
        var responseFields={
            "XML": "responseXML",
            "TEXT": "responseText",
            "JSON": "responseJSON"
        }
        var headers = {};
        var setHeader = function (name, value) {
            headers[name.toLowerCase()] = [name, value];
        };
        var getHeader=function(){
            xhr.setRequestHeader=setHeader;
            for (name in headers) {
                nativeSetHeader.apply(xhr, headers[name]);
            }
        }
        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        try{
            xhr.responseType=options.dataType;//'text'：返回类型为字符串，这是默认值。'arraybuffer'：返回类型为ArrayBuffer。'blob'：返回类型为Blob。'document'：返回类型为Document。'json'：返回类型为JSON object。
        }catch (e){
            console.log("ajax不支持responseType");
        }
        if(!options.cache){ //禁用缓存
            xhr.setRequestHeader("If-Modified-Since","0");
        }
        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {  //请求完成，响应就绪
                options.complete && options.complete.call(this,xhr);//响应就发送
                //alert("Mwap.xhr.status:"+xhr.status)
                // var result = xhr.responseType == "text" ? xhr.responseText : xhr.responseXML; //返回值类型
                //var result = xhr[responseFields[options.dataType]]; //返回值类型
                var result = xhr.responseText;
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && protocol === 'file:')&& typeof options.success == 'function') {//成功
                    var dataType = options.dataType ||xhr.getResponseHeader('content-type');
                    try {
                        if (dataType === 'SCRIPT') {
                            (1, eval)(result);
                        } else if (dataType === 'XML') {
                            result = xhr.responseXML;
                        } else if (dataType === 'JSON') {
                            result = JSON.parse(result);
                        }
                    } catch (e) {
                        console.log("Mwap解析格式错误!")
                    }
                    options.success && options.success(result, xhr.status);
                } else if (xhr.status >= 400 && xhr.status < 500) { //客户端出错，404啊神马的
                    options.error && options.error(xhr, xhr.status);
                } else if (xhr.status >= 500) { //服务器端出错
                    options.error && options.error(xhr, xhr.status);
                }else{
                    options.error && options.error(xhr, xhr.status);
                }
            }
        }
        var nativeSetHeader = xhr.setRequestHeader;
        //setHeader('X-Requested-With', 'XMLHttpRequest');
        setHeader('Accept','*/*');
        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            getHeader();
            options.beforeSend && options.beforeSend.call(this,options);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            //setHeader("Type", "ajax");
            //setHeader("From", "Mwap-ajax");
            setHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            getHeader();
            options.beforeSend && options.beforeSend.call(this,options);
            xhr.send(params);
        }

        //格式化参数
        function formatParamsA(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
            arr.push(("v=" + Math.random()).replace("."));
            return arr.join("&");
        }
        function formatParamsB(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for(name in obj) {
                value = obj[name];
                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null){
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
    };
    var utils=(function(){
        /**
         * @description 工具类集合
         * @namespace utils
         */
        var util= {
            /**
             * @description escape函数用于对除英文字母外的字符进行编码。如'Visit W3School!'->'Visit%20W3School%21'
             * @memberof utils
             * @method EncodeUtf8
             * */
            EncodeUtf8: function (s1) {
                var s = escape(s1);
                var sa = s.split("%");//sa[1]=u6211
                var retV = "";
                if (sa[0] != "") {
                    retV = sa[0];
                }
                for (var i = 1; i < sa.length; i++) {
                    if (sa[i].substring(0, 1) == "u") {
                        retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
                        if (sa[i].length >= 6) {
                            retV += sa[i].substring(5);
                        }
                    }
                    else retV += "%" + sa[i];
                }
                return retV;
            },
            /**
             * @description 获取请求处理参数,抽象请求路径。
             * @param  {string} type 事件类型
             * @param  {Object} data 事件参数
             * */
            getRequestFormEventTypes:function(type,data){
                var requeseType="";
                var str=type.split("::")[0];
                if(type==Mwap.eventTypes.record){//如果是录音
                    switch (data.state){
                        case "startrecord":
                            requeseType="/native/record/startrecord";
                            break;
                        case "stoprecord":
                            requeseType="/native/record/stoprecord";
                            break;
                        case "startplay":
                            requeseType="/native/record/startplay";
                            break;
                        case "stopplay":
                            requeseType="/native/record/stopplay";
                            break;
                    }
                }else if(type==Mwap.eventTypes.amap){
                    switch (data.state){
                        case "amapPOI":
                            requeseType="/native/amap/amapPOI";
                            break;
                        case "amapLocation":
                            requeseType="/native/amap/amapLocation";
                            break;
                        case "amapScreenShot":
                            requeseType="/native/amap/amapScreenShot";
                            break;
                        case "amapGetDistance":
                            requeseType="/native/amap/amapGetDistance";
                    }
                }else if(type==Mwap.eventTypes.album) {
                    switch (data.state) {
                        case "albumSingleSelect":
                            requeseType = "/native/album/albumSingleSelect";
                            break;
                        case "albumMultiSelect":
                            requeseType = "/native/album/albumMultiSelect";
                            break;
                    }
                }else if(type==Mwap.eventTypes.choosePicture) {
                    switch (data.state) {
                        case "pictureSingleSelect":
                            requeseType = "/native/chooseSinglePicture";
                            break;
                        case "pictureMultiSelect":
                            requeseType = "/native/chooseMultiPictures";
                            break;
                    }
                }else if(type==Mwap.eventTypes.dnsResolve) { //测试用
                    var timestamp=new Date().getTime();
                    console.log(timestamp);
                    requeseType=Mwap.eventRequest[type.split("::")[1]]||Mwap.businessURLRequest[type.split("::")[1]];
                }else{
                    requeseType=Mwap.eventRequest[type.split("::")[1]]||Mwap.businessURLRequest[type.split("::")[1]];
                    //requeseType=Mwap.eventRequest[type.split("::")[1]]||"/business";
                }

                return requeseType;
            },
            /**
             * @description 异步返回数据处理,抽象事件类型。
             * @param  {string} type 事件类型
             * @param  {Object} data 事件参数
             * */
            getRequestFormNativeTypes:function(type,event){
                var requeseData={};
                requeseData.type=event.type;
                requeseData.data=event.data;
                var str=type.split("::")[0];
                var action=type.split("::")[1];
                switch (action){
                    case "amapPOI":
                        requeseData.type=str+"::amap";
                        requeseData.state=action;
                        break;
                    case "amapLocation":
                        requeseData.type=str+"::amap" ;
                        requeseData.state=action;
                        break;
                    case "amapGetDistance":
                        requeseData.type=str+"::amap" ;
                        requeseData.state=action;
                        break;
                    case "albumSingleSelect":
                        requeseData.type=str+"::album";
                        requeseData.state=action;
                        break;
                    case "albumMultiSelect":
                        requeseData.type=str+"::album";
                        requeseData.state=action;
                        break;
                    case "chooseSinglePicture":
                        requeseData.type=str+"::choosePicture";
                        requeseData.state=action;
                        break;
                    case "chooseMultiPictures":
                        requeseData.type=str+"::choosePicture";
                        requeseData.state=action;
                        break;
                }
                return requeseData;

            },
            /**
             *	对象转字符串
             */
            objToStr:function ( obj ){
                var ary = new Array();
                for ( var p in obj ){
                    if ( typeof obj[p] == 'object' ){
                        if( obj[p] !== null ) {
                            var txt = arguments.callee( obj[p] );
                            ary.push(p+'='+txt);
                        }
                        else
                            ary.push(p+'=""');
                    }
                    else{
                        ary.push(p+'='+obj[p]);
                    }

                }
                return JSON.stringify( ary.sort() );
            }
        }
        function Str2Hex(s) {
            var c = "";
            var n;
            var ss = "0123456789ABCDEF";
            var digS = "";
            for(var i = 0; i < s.length; i ++){
                c = s.charAt(i);
                n = ss.indexOf(c);
                digS += Dec2Dig(eval(n));s
            }
            //return value;
            return digS;
        }
        function Dec2Dig(n1){
            var s = "";
            var n2 = 0;
            for(var i = 0; i < 4; i++) {
                n2 = Math.pow(2,3 - i);
                if(n1 >= n2){
                    s += '1';
                    n1 = n1 - n2;
                }
                else
                    s += '0';

            }
            return s;

        }
        function Dig2Dec(s){
            var retV = 0;
            if(s.length == 4){
                for(var i = 0; i < 4; i ++) {
                    retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
                }
                return retV;
            }
            return -1;
        }
        function Hex2Utf8(s){
            var retS = "";
            var tempS = "";
            var ss = "";
            if(s.length == 16) {
                tempS = "1110" + s.substring(0, 4);
                tempS += "10" +  s.substring(4, 10);
                tempS += "10" + s.substring(10,16);
                var sss = "0123456789ABCDEF";
                for(var i = 0; i < 3; i ++) {
                    retS += "%";
                    ss = tempS.substring(i * 8, (eval(i)+1)*8);
                    retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
                    retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
                }
                return retS;
            }
            return "";
        }
        Mwap.utils=util;
        return util;
    })();
    Mwap.events=(function() {
        /**
         * @description 事件类
         * @exports events
         *
         */
        function Events() {
            this._events = {};
            var isArrayR = Array.isArray;
            /**
             * @description 绑定事件
             * @example Mwap.events.addListener(type, listener)
             * @param  {string} type 事件类型
             * @param  {function} listener 事件名称
             */
            this.addListener = function (type, listener, scope, once) {
                if ('function' !== typeof listener) {
                    throw new Error('addListener only takes instances of Function');
                }
                this.dispatch('newListener', type, typeof listener.listener === 'function' ?
                    listener.listener : listener);

                if (!this._events[type]) {
                    this._events[type] = listener;
                } else if (isArrayR(this._events[type])) {

                    this._events[type].push(listener);
                } else {
                    this._events[type] = [this._events[type], listener];
                }

            };

            this.addListenerNew = function (type, listener, scope, once) {

                if ('function' !== typeof listener) {
                    throw new Error('addListener only takes instances of Function');
                }

                /*
                this.dispatch('newListener', type, typeof listener.listener === 'function' ?
                    listener.listener : listener);
                */
                console.log("{}{}{}{{}",this._events,type,this._events[type]);
                if (!this._events[type]) {
                    this._events[type] = listener;
                } else if (isArrayR(this._events[type])) {
                    this._events[type].push(listener);
                } else {
                    this._events[type] = [this._events[type], listener];
                }


                document.addEventListener(type,function(event){
                    console.log("addListenerNewaddListenerNewaddListenerNew",event,type);
                    Mwap.utils.getRequestFormNativeTypes(event.type,event);
                    Mwap.events.dispatch(event.type,{type:event.type,value:{state:event.state,data:event.data}});
                });

            };
            /**
             * @description 绑定事件，等同于addListener
             * @example Mwap.events.on(type, listener)
             * @param  {string} type 事件类型
             * @param  {function} listener 事件名称
             */
            this.on =function(type, listener, scope, once){this.addListener.apply(this,arguments)};
            this.onExtend =function(type, listener, scope, once){this.addListenerNew.apply(this,arguments)};
            /**
             * @description 只执行一次事件，就自动销毁;
             * @example Mwap.events.once(type, listener)
             * @param type {string} 事件类型
             * @param listener {function} 执行事件
             * @param scope
             * @returns {Events}
             */
            this.once = function (type, listener, scope) {
                if ('function' !== typeof listener) {
                    throw new Error('.once only takes instances of Function');
                }
                var self = this;
                function g() {
                    self.removeListener(type, g);
                    listener.apply(this, arguments);
                };
                g.listener = listener;
                self.on(type, g);
                return this;
            };
            /**
             * @description 删除事件
             * @example Mwap.events.removeListener(type, listener)
             * @param  {string} type 事件类型
             * @param  {function} listener 执行事件
             */
            this.removeListener = function (type, listener, scope) {
                if ('function' !== typeof listener) {
                    throw new Error('removeListener only takes instances of Function');
                }
                if (!this._events[type]) return this;
                var list = this._events[type];
                if (isArrayR(list)) {
                    var position = -1;
                    for (var i = 0, length = list.length; i < length; i++) {
                        if (list[i] === listener ||
                            (list[i].listener && list[i].listener === listener)) {
                            position = i;
                            break;
                        }
                    }
                    if (position < 0) return this;
                    list.splice(position, 1);
                    if (list.length == 0)
                        delete this._events[type];
                } else if (list === listener ||
                    (list.listener && list.listener === listener)) {
                    delete this._events[type];
                }

                return this;
            };
            /**
             * @description 删除事件,等同于removeListener
             * @example Mwap.events.off(type, listener)
             * @param  {string} type 事件类型
             * @param  {function} listener 执行事件
             */
            this.off =function(type, listener, scope, once){this.removeListener.apply(this,arguments)};
            /**
             * @description 删除和关闭所有事件
             * @example Mwap.events.removeAllListeners(type)
             * @param  {string} type 事件类型
             */
            this.removeAllListeners = function (type) {
                if (arguments.length === 0) {
                    this._events = {};
                    return this;
                }
                if (type && this._events && this._events[type]) this._events[type] = null;
                return this;
            };
            /**
             * @description 删除和关闭所有事件,等同于removeAllListeners
             * @example Mwap.events.offAll(type)
             * @param  {string} type 事件类型
             */
            this.offAll =function(type,scope, once){this.removeAllListeners.apply(this,arguments)};
            /**
             * @description 获取所有监听事件;
             * @example Mwap.events.listeners(type)
             * @param type {string} 事件类型
             * @returns {*} 所有监听事件
             */
            this.listeners = function (type) {
                if (!this._events[type]) this._events[type] = [];
                if (!isArrayR(this._events[type])) {
                    this._events[type] = [this._events[type]];
                }
                return this._events[type];
            };
            /**
             * @description 向设备发送调用请求,success或者error都发送dispatch事件
             * @example Mwap.events.trigger(type,data)
             * @param type {string} 请求类型
             * @param data {string} 发送数据
             */
            this.trigger=function(type,params,ResData){
                var data=params;
                data.businessType=type.split("::")[1];
                var resData = {//默认值
                    dataType:"text"
                };
                for(var i in ResData){
                    resData[i]=ResData[i];
                }
                ///console.log("999999:",resData)
                if(!hasInited){
                    console.log("Mwap需要init");
                    return;
                }
                console.log("Mwap.server????/////",Mwap.server);
                if(!Mwap.server){

                    //window.IPPort.getIpPort();
                    window.location.href ="callmwap://get_ip_port";

                    Mwap.events.on(Mwap.businessResponse.ip_port,function(e){

                        Mwap.server = "http://"+e.value.data.ip;
                        console.log("[][][][][][][][][][",Mwap.server);

                        var self=this;
                        var params_str = '';
                        params_str = utils.objToStr( data );
                        //params_str = JSON.stringify( params_ary );
                        data.tokenKey = md5(Mwap.server+params_str+data.nameSpace);
                        console.log("md5-str"+Mwap.server+params_str+data.nameSpace);
                        //$.ajax({
                        RAjax({
                            //Mwap.ajax({
                            //url:"http://h5.toon.com/test/testAjax.php",//测试
                            url:Mwap.server+utils.getRequestFormEventTypes(type,data),
                            type:"post",
                            //dataType:resType,
                            //contentType:"text/xml",
                            data:{params:JSON.stringify(data)},
                            success:function(value){
                                console.log("**success**:",value);
                                var sourceValue=value;
                                if(resData.dataType.toUpperCase()=="JSON"){
                                    try{sourceValue=JSON.parse(value);}catch(e){}//如果这里是多层转义json就，不用解析，直接返回字符串
                                }
                                var _value={value:sourceValue,type:type};
                                self.dispatch(type, _value);
                            },
                            error:function(value){
                                //self.dispatch(type,{data:"error"});
                                console.log("**error**:",value);
                                var _value={value:value.status,type:type};
                                self.dispatch(type,_value);
                            }
                        })

                    });
                }else{
                    //console.log("trigger--->",utils.getRequestFormEventTypes(type,data));
                    //alert("请求参数:"+JSON.stringify(data));
                    var self=this;
                    var params_str = '';
                    params_str = utils.objToStr( data );
                    //params_str = JSON.stringify( params_ary );
                    data.tokenKey = md5(Mwap.server+params_str+data.nameSpace);
                    console.log("md5-str"+Mwap.server+params_str+data.nameSpace);
                    //$.ajax({
                    RAjax({
                        //Mwap.ajax({
                        //url:"http://h5.toon.com/test/testAjax.php",//测试
                        url:Mwap.server+utils.getRequestFormEventTypes(type,data),
                        type:"post",
                        //dataType:resType,
                        //contentType:"text/xml",
                        data:{params:JSON.stringify(data)},
                        success:function(value){
                            console.log("**success**:",value);
                            var sourceValue=value;
                            if(resData.dataType.toUpperCase()=="JSON"){
                                try{sourceValue=JSON.parse(value);}catch(e){}//如果这里是多层转义json就，不用解析，直接返回字符串
                            }
                            var _value={value:sourceValue,type:type};
                            self.dispatch(type, _value);
                        },
                        error:function(value){
                            //self.dispatch(type,{data:"error"});
                            console.log("**error**:",value);
                            var _value={value:value.status,type:type};
                            self.dispatch(type,_value);
                        }
                    })
                }
            };
            /**  add by liyang 2016-3-11
             * @description 向设备发送调用请求,success或者error都发送dispatch事件
             * @example Mwap.events.trigger(type,data)
             * @param type {string} 请求类型
             * @param data {string} 发送数据
             */
            this.triggerExtend=function(type,params,ResData){
                var data=params;
                var typenew = 'systoon:js::'+type;
                data.businessType=typenew.split("::")[1];
                var resData = {//默认值
                    dataType:"text"
                };
                for(var i in ResData){
                    resData[i]=ResData[i];
                }
                ///console.log("999999:",resData)
                if(!hasInited){
                    console.log("Mwap需要init");
                    return;
                }
                console.log("Mwap.server????/////",Mwap.server);
                if(!Mwap.server){

                    //window.IPPort.getIpPort();
                    window.location.href ="callmwap://get_ip_port";

                    Mwap.events.on(Mwap.businessResponse.ip_port,function(e){

                        Mwap.server = "http://"+e.value.data.ip;
                        console.log("[][][][][][][][][][",Mwap.server);

                        var self=this;
                        var params_str = '';
                        params_str = utils.objToStr( data );
                        //params_str = JSON.stringify( params_ary );
                        data.tokenKey = md5(Mwap.server+params_str+data.nameSpace);
                        console.log("md5-str"+Mwap.server+params_str+data.nameSpace);
                        //$.ajax({
                        RAjax({
                            //Mwap.ajax({
                            //url:"http://h5.toon.com/test/testAjax.php",//测试
                            //url:Mwap.server+utils.getRequestFormEventTypes(typenew,data),
                            url:Mwap.server+"/business",
                            type:"post",
                            //dataType:resType,
                            //contentType:"text/xml",
                            data:{params:JSON.stringify(data)},
                            success:function(value){
                                console.log("**success**:",value);
                                var sourceValue=value;
                                if(resData.dataType.toUpperCase()=="JSON"){
                                    try{sourceValue=JSON.parse(value);}catch(e){}//如果这里是多层转义json就，不用解析，直接返回字符串
                                }
                                var _value={value:sourceValue,type:typenew};
                                self.dispatch(typenew, _value);
                            },
                            error:function(value){
                                //self.dispatch(type,{data:"error"});
                                console.log("**error**:",value);
                                var _value={value:value.status,type:typenew};
                                self.dispatch(typenew,_value);
                            }
                        })

                    });
                }else{
                    //console.log("trigger--->",utils.getRequestFormEventTypes(type,data));
                    //alert("请求参数:"+JSON.stringify(data));
                    var self=this;
                    var params_str = '';
                    params_str = utils.objToStr( data );
                    //params_str = JSON.stringify( params_ary );
                    data.tokenKey = md5(Mwap.server+params_str+data.nameSpace);
                    console.log("md5-str"+Mwap.server+params_str+data.nameSpace);
                    //$.ajax({
                    RAjax({
                        //Mwap.ajax({
                        //url:"http://h5.toon.com/test/testAjax.php",//测试
                        //url:Mwap.server+utils.getRequestFormEventTypes(typenew,data),
                        url:Mwap.server+"/business",
                        type:"post",
                        //dataType:resType,
                        //contentType:"text/xml",
                        data:{params:JSON.stringify(data)},
                        success:function(value){
                            console.log("**success**:",value);
                            var sourceValue=value;
                            if(resData.dataType.toUpperCase()=="JSON"){
                                try{sourceValue=JSON.parse(value);}catch(e){}//如果这里是多层转义json就，不用解析，直接返回字符串
                            }
                            var _value={value:sourceValue,type:typenew};
                            self.dispatch(typenew, _value);
                        },
                        error:function(value){
                            //self.dispatch(type,{data:"error"});
                            console.log("**error**:",value);
                            var _value={value:value.status,type:typenew};
                            self.dispatch(typenew,_value);
                        }
                    })
                }
            };
            /**
             * @description 派发事件;
             * @example Mwap.events.dispatch(type)
             * @param type {string} 请求类型
             * @returns {boolean}
             */
            this.dispatch= function (type) {

                var type = arguments[0];
                var handler = this._events[type];
                if (!handler) return false;
                if (typeof handler == 'function') {
                    console.log("dispatchfunction");
                    switch (arguments.length) {
                        // fast cases
                        case 1:
                            handler.call(this);
                            break;
                        case 2:
                            handler.call(this, arguments[1]);
                            break;
                        case 3:
                            handler.call(this, arguments[1], arguments[2]);
                            break;
                        // slower
                        default:
                            var l = arguments.length;
                            var args = new Array(l - 1);
                            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
                            handler.apply(this, args);
                            console.log("00");
                    }
                    return true;

                } else if (isArrayR(handler)) {

                    console.log("dispatchisArray");
                    var l = arguments.length;
                    var args = new Array(l - 1);
                    for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

                    var listeners = handler.slice();
                    for (var i = 0, l = listeners.length; i < l; i++) {
                        listeners[i].apply(this, args);
                        console.log("**-");
                    }

                    return true;
                } else {
                    return false;
                }
            };
        }
        return new Events();
    })();
    /**
     * @description 是否执行过初始化;
     * @type {boolean}
     */
    var hasInited = false;
    /**
     * @description 版本号 '0.1.2'
     * @type {string}
     * @global
     */
    Mwap.VERSION = '0.1.2';

    /**
     * @description 自动初始化
     */
    window.addEventListener("DOMContentLoaded", function() {
        if (hasInited == false) {
            Mwap.init();
        }
    });
    /**
     * @description 初始化
     * @type {function}
     * @exports init
     */
    Mwap.init = function() {
        console.log("Mwap:init");
        if (hasInited == true) return 'Don\'t repeat initialization!';
        hasInited = true;
    };
    /**
     * @description 打印在native控制台的console;
     * @type {function}
     * @exports console
     */
    Mwap.console={
        /**
         * @description 打印log
         * @example Mwap.console.log(...arg)
         * @param  arg {*} 匿名
         */
        log:function (){
            var str="[ ";
            for(var i=0;i<arguments.length;i++){
                if(i==arguments.length-1){
                    str+=arguments[i]+" ]";
                }else{
                    str+=arguments[i]+" , ";
                }
            }
            var s="";
            if(/(iPhone|iPad|ios)/.test(navigator.userAgent)){
                s=window.location.href="js-To-native://"+"console.log:/"+utils.EncodeUtf8(str);
            }
            //var s=window.location.href="objc://"+"getParam1:withParam2:"+":/"+utils.EncodeUtf8(str);
            //console.log(arguments);
            return s;
        }
    };
    return Mwap;
});
(function(doc,Mwap){

    Mwap.server="http://127.0.0.1:6780";
    /**
     * @description 来自webserver返回的Respons事件集合
     * @namespace eventTypes
     * @type {string}
     * @property {string} error error="systoon:js::error" (错误提示)
     * @property {string} deviceInfo deviceInfo="systoon:js::deviceInfo" (返回设备信息)
     * @property {string} album album="systoon:js::album" (返回图片信息)
     * @property {string} camera camera="systoon:js::camera" (返回图片信息)
     * @property {string} locationInfo locationInfo="systoon:js::locationInfo" (返回地理位置信息)
     * @property {string} closeWebview closeWebview="systoon:js::closeWebview" (请求关闭webview)
     * @property {string} createQrcode createQrcode="systoon:js::createQrcode" (创建二维码)
     * @property {string} scanQrcode scanQrcode="systoon:js::scanQrcode" (扫描二维码)
     * @property {string} redirect redirect="systoon:native::redirect" (重定向)
     * @property {string} upLoad upLoad="systoon:native::upLoad" (图片上传后的返回)
     * @property {string} shake shake="systoon:native::shake" (手机震动)
     * @property {string} amap amap="systoon:native::amap" (地图)
     * @property {string} screenShot screenShot="systoon:native::screenShot" (截屏)
     * @property {string} record record="systoon:native::record" (录音)
     * @property {string} contact contact="systoon:native::contact" (通讯录)
     * @property {string} phone phone="systoon:native::phone" (拨号)
     * @property {string} message message="systoon:native::message" (短信)
     * @property {string} upLoad upLoad="systoon:native::upLoad" (图片上传)
     * @property {string} alert alert="systoon:native::alert" (alert)
     * @property {string} pluginBridge pluginBridge="systoon:native::pluginBridge" (手机震动)
     * @property {string} wheel wheel="systoon:native::wheel" (选择控件)
     */
    Mwap.eventTypes={
        error:"systoon:js::error",
        deviceInfo:"systoon:js::deviceInfo",
        album:"systoon:js::album",
        camera:"systoon:js::camera",
        locationInfo:"systoon:js::locationInfo",
        closeWebview:"systoon:js::closeWebview",
        createQrcode:"systoon:js::createQrcode",
        scanQrcode:"systoon:js::scanQrcode",
        redirect:"systoon:js::redirect",
        shake:"systoon:js::shake",
        amap:"systoon:js::amap",
        screenShot:"systoon:js::screenShot",
        record:"systoon:js::record",
        contact:"systoon:js::contact",
        phone:"systoon:js::phone",
        message:"systoon:js::message",
        upLoad:"systoon:js::upLoad",
        alert:"systoon:js::alert",
        pluginBridge:"systoon:js::pluginBridge",
        datePicker:"systoon:js::datePicker",
        dnsResolve:"systoon:js::dnsResolve",
        getGPSState:"systoon:js::getGPSState",
        goToGPSSetting:"systoon:js::goToGPSSetting",
        downloadFile:"systoon:js::downloadFile",
        dataFromH5:"systoon:js::dataFromH5",
        wheel:"systoon:js::wheel",
        ticketQrcodeResult:"systoon:js::ticketQrcodeResult",
        clipBoard:"systoon:js::clipBoard",

        getConnectedState:      "systoon:js::getConnectedState",
        amapGetLocation:        "systoon:js::amapGetLocation",
        getNavigationItemTitle: "systoon:js::getNavigationItemTitle",
        dataEmbedding:          "systoon:js::dataEmbedding",
        // routerToAddress:        "systoon:js::routerToAddress",
        getAuthKey:             "systoon:js::getAuthKey",
        startPlay:              "systoon:js::startPlay",
        stopPlay:               "systoon:js::stopPlay",
        dnsResolveAll:          "systoon:js::dnsResolveAll",
        toonPay:                "systoon:js::toonPay",
        slidingBack:            "systoon:js::slidingBack",
        shareStandard:          "systoon:js::shareStandard",
        takePhoto:              "systoon:js::takePhoto",
        choosePicture:          "systoon:js::choosePicture",
        getSinglePicture:       "systoon:js::getSinglePicture",
        getLoadParams:          "systoon:js::getLoadParams"
    };
    /**
     * @description 来自native端事件类型集合
     * @namespace nativeTypes
     * @type {object}
     * @property {string} error error="systoon:native::error" (native端返回的错误事件类型)
     * @property {string} album album="systoon:native::album" (native端返回的获取相册事件)
     * @property {string} singleSelect singleSelect="systoon:native::singleSelect" (native端返回的获取单张相册事件)
     * @property {string} multiSelect multiSelect="systoon:native::multiSelect" (native端返回的获取多张相册事件)
     * @property {string} camera camera="systoon:native::camera" (native端返回的获取相机事件)
     * @property {string} locationInfo locationInfo="systoon:native::locationInfo" (native端返回的获取地址位置信息)
     * @property {string} scanQrcode scanQrcode="systoon:native::scanQrcode" (扫描二维码)
     * @property {string} amap amap="systoon:native::amap" (操作地图返回)
     * @property {string} amapPOI amapPOI="systoon:native::amapPOI" (操作地图POI返回)
     * @property {string} amapLocation amapPOI="systoon:native::amapLocation" (操作地图返回Location)
     * @property {string} amapGetDistance amapGetDistance="systoon:native::amapGetDistance" (获取地图两点间直线距离)
     * @property {string} upLoad upLoad="systoon:native::upLoad" (图片上传后的返回)
     * @property {string} loadParams loadParams="systoon:native::loadParams" (通过dispatch传递参数)
     */
    Mwap.nativeTypes={
        error:"systoon:native::error",

        album:"systoon:native::album",
        singleSelect:"systoon:native::albumSingleSelect",
        multiSelect:"systoon:native::albumMultiSelect",

        camera:"systoon:native::camera",
        locationInfo:"systoon:native::locationInfo",
        scanQrcode:"systoon:native::scanQrcode",
        createQrcode:"systoon:native::createQrcode",

        amap:"systoon:native::amap",
        amapPOI:"systoon:native::amapPOI",
        amapLocation:"systoon:native::amapLocation",
        amapGetDistance:"systoon:native::amapGetDistance",

        phone:"systoon:native::phone",
        message:"systoon:native::message",

        upLoad:"systoon:native::upLoad",
        loadParams:"systoon:native::loadParams",

        datePicker:"systoon:native::datePicker",
        goToGPSSetting:"systoon:native::goToGPSSetting",
        downloadFile:"systoon:native::downloadFile",
        wheel:"systoon:native::wheel",
        ticketQrcode:"systoon:native::ticketQrcode",

        getConnectedState:      "systoon:native::getConnectedState",
        amapGetLocation:        "systoon:native::amapGetLocation",
        getNavigationItemTitle: "systoon:native::getNavigationItemTitle",
        pluginService:          "systoon:native::pluginService",
        //routerToAddress:        "systoon:native::routerToAddress",
        getAuthKey:             "systoon:native::getAuthKey",
        //dataEmbedding:          "systoon:native::dataEmbedding"
        dnsResolve:             "systoon:native::dnsResolve",
        startPlayAudio:         "systoon:native::startPlayAudio",
        playAudioFinished:      "systoon:native::playAudioFinished",
        dnsResolveAll:          "systoon:native::dnsResolveAll",
        toonPay:                "systoon:native::toonPay",
        slidingBack:            "systoon:native::slidingBack",
        shareStandard:          "systoon:native::shareStandard",
        takePhoto:              "systoon:native::takePhoto",
        choosePicture:          "systoon:native::choosePicture",
        SinglePicture:          "systoon:native::chooseSinglePicture",
        multiPicture:           "systoon:native::chooseMultiPictures",

        getGPSState:           "systoon:native::getGPSState",
        getSinglePicture:      "systoon:native::getSinglePicture",
        getLoadParams:         "systoon:native::getLoadParams"
    }
    /**
     * @description  来自webserver的Request请求路径集合
     * @namespace eventRequest
     * @type {string}
     * @property {string} error error="error" (错误信息)
     * @property {string} deviceInfo deviceInfo="http://127.0.0.1:6780/deviceInfo" (设备信息路径)
     * @property {string} album album="http://127.0.0.1:6780/album" (相册路径)
     * @property {string} camera camera="http://127.0.0.1:6780/camera" (相机路径)
     * @property {string} locationInfo locationInfo="http://127.0.0.1:6780/locationInfo" (地理位置信息路径)
     * @property {string} closeWebview closeWebview="http://127.0.0.1:6780/close" (关闭当前webview窗口)
     * @property {string} createQrcode createQrcode="http://127.0.0.1:6780/createQrcode" (创建二维码)
     * @property {string} scanQrcode scanQrcode="http://127.0.0.1:6780/scanQrcode" (扫描二维码)
     * @property {string} redirect redirect="http://127.0.0.1:6780/redirect" (重定向)
     * @property {string} shake shake="http://127.0.0.1:6780/shake" (手机震动)
     * @property {string} amap amap="http://127.0.0.1:6780/amap" (调用地图)
     * @property {string} screenShot screenShot="http://127.0.0.1:6780/screenShot" (屏幕截图)
     * @property {string} startrecord startrecord="http://127.0.0.1:6780/record" (支持录音)
     * @property {string} contact contact="http://127.0.0.1:6780/contact" (通讯录访问)
     * @property {string} phone phone="http://127.0.0.1:6780/phone" (拨打电话)
     * @property {string} message message="http://127.0.0.1:6780/message" (发送短信)
     * @property {string} upLoad upLoad="http://127.0.0.1:6780/upLoad" (图片上传)
     * @property {string} alert alert="http://127.0.0.1:6780/alert" (原生alert支持)
     * @property {string} pluginBridge pluginBridge="http://127.0.0.1:6780/pluginBridge" (页面跳转)
     */
    Mwap.eventRequest={
        error:"error",
        deviceInfo:"/native/deviceInfo",
        album:"/native/album",
        camera:"/native/camera",
        locationInfo:"/native/locationInfo",
        closeWebview:"/native/close",
        createQrcode:"/native/createQrcode",
        scanQrcode:"/native/scanQrcode",
        redirect:"/native/redirect",
        shake:"/native/shake",
        amap:"/native/amap",
        screenShot:"/native/screenShot",
        record:"/native/record",
        contact:"/native/contact",
        phone:"/native/phone",
        message:"/native/message",
        upLoad:"/native/upLoad",
        alert:"/native/alert",
        pluginBridge:"/native/pluginBridge",
        datePicker:"/native/datePicker",
        dnsResolve:"/native/dnsResolve",
        getGPSState:"/native/getGPSState",
        goToGPSSetting:"/native/goToGPSSetting",
        downloadFile:"/native/downloadFile",
        dataFromH5:"/native/dataFromH5",
        wheel:"/native/wheel",
        ticketQrcodeResult:"/native/ticketQrcodeResult",
        clipBoard:"/native/clipBoard",

        getConnectedState:      "/native/getConnectedState",
        amapGetLocation:        "/native/amap/amapGetLocation",
        getNavigationItemTitle: "/native/getNavigationItemTitle",
        dataEmbedding:          "/native/dataEmbedding",
        //routerToAddress:        "/native/routerToAddress",
        getAuthKey:             "/native/getAuthKey",
        startPlay:              "/native/startPlay",
        stopPlay:               "/native/stopPlay",
        dnsResolveAll:          "/native/dnsResolveAll",
        toonPay:                "/native/toonPay",
        slidingBack:            "/native/slidingBack",
        shareStandard:          "/native/shareStandard",
        takePhoto:              "/native/takePhoto",
        getSinglePicture:       "/native/getSinglePicture",
        getLoadParams:          "/native/getLoadParams"
    }
})(document,Mwap);
/**
 * @description  来自webserver的Request请求路径集合
 * @namespace eventRequest
 * @type {string}
 * @property {string} createEnterprise createEnterprise="http://127.0.0.1:6780/createEnterprise" (createEnterprise)
 * @property {string} createOrganization createOrganization="http://127.0.0.1:6780/createOrganization" (createOrganization)
 * @property {string} popWindow popWindow="http://127.0.0.1:6780/popWindow" (popWindow)
 * @property {string} install install="http://127.0.0.1:6780/install" (install)
 * @property {string} createShowBlock createShowBlock="http://127.0.0.1:6780/createShowBlock" (createShowBlock)
 * @property {string} friendList friendList="http://127.0.0.1:6780/friendList" (friendList)
 * @property {string} database database="http://127.0.0.1:6780/database" (database)
 * @property {string} callFrame callFrame="http://127.0.0.1:6780/callFrame" (callFrame)
 */
(function(doc,Mwap){
    //Mwap.server="http://127.0.0.1:6780";
    Mwap.oldInterFace=['createEnterprise','popWindow','install','createShowBlock'];
    Mwap.businessRequest={
        createEnterprise:"systoon:js::createEnterprise",
        popWindow:"systoon:js::popWindow",
        install:"systoon:js::install",
        createShowBlock:"systoon:js::createShowBlock",
        friendList:"systoon:js::friendList",
        //database:"systoon:js::database",
        callFrame:"systoon:js::callFrame",
        createGroup:"systoon:js::createGroup",
        createCard:"systoon:js::createCard",
        createEvent:"systoon:js::createEvent",
        createOrganization:"systoon:js::createOrganization",
        validate:"systoon:js::validate",
        navigationItem:"systoon:js::navigationItem",
        changeCard:"systoon:js::changeCard",
        checkout:"systoon:js::checkout",
        groupChat:"systoon:js::groupChat",
        singleChat:"systoon:js::singleChat",
        openUrl:"systoon:js::openUrl",
        feedDescription:"systoon:js::feedDescription",
        getPraiseCommentNum:"systoon:js::getPraiseCommentNum",
        getPraiseCommentList:"systoon:js::getPraiseCommentList",
        getDefaultCard:"systoon:js::getDefaultCard",
        getToonPayBalance:"systoon:js::getToonPayBalance",

        webPageJumpToNative:            "systoon:js::webPageJumpToNative",
        toon_map:                       "systoon:js::toon_map",
        contentPraiseNumber:            "systoon:js::contentPraiseNumber",
        contentCommentNumber:           "systoon:js::contentCommentNumber",
        contentPraiseStatus:            "systoon:js::contentPraiseStatus",
        contentCommentList:             "systoon:js::contentCommentList",
        contentPraise:                  "systoon:js::contentPraise",
        contentComment:                 "systoon:js::contentComment",
        contentGetFeed:                 "systoon:js::contentGetFeed",
        contentRefer:                   "systoon:js::contentRefer",
        contentCollect:                 "systoon:js::contentCollect",
        sharePlugin:                    "systoon:js::sharePlugin",
        contentLikeList:                "systoon:js::contentLikeList",
        functionRegister:               "systoon:js::functionRegister",
        organizCommunication:           "systoon:js::organizCommunication",
        notificationCenter:             "systoon:js::notificationCenter",
        singleChatList:                 "systoon:js::singleChatList",
        groupChatList:                  "systoon:js::groupChatList",
        getUserAllCardsInfo:            "systoon:js::getUserAllCardsInfo",
        launchMessageAndHtmlPage:       "systoon:js::launchMessageAndHtmlPage",
        getSocialInfo:                  "systoon:js::getSocialInfo",
        transferMatchedFeedId:          "systoon:js::transferMatchedFeedId",
        teardownSocketThenStopChatting: "systoon:js::teardownSocketThenStopChatting",
        packUpGamingView:               "systoon:js::packUpGamingView",
        endGamingView:                  "systoon:js::endGamingView",
        shareToThird:                   "systoon:js::shareToThird",
        toRecord:                       "systoon:js::toRecord",
        softpanHeight:                  "systoon:js::softpanHeight",
        clickRightButton:               "systoon:js::clickRightButton",
        recordCancel:                   "systoon:js::recordCancel",
        jumpToComplaintPage:            "systoon:js::jumpToComplaintPage",
        getBatchSocialProperty:         "systoon:js::getBatchSocialProperty",
        getAllGroupInfo:                "systoon:js::getAllGroupInfo",
        isGroupOwner:                   "systoon:js::isGroupOwner",
        jumpToApplication:              "systoon:js::jumpToApplication",
        getBatchGroupInfo:              "systoon:js::getBatchGroupInfo",
        clickLeftButton:                "systoon:js::clickLeftButton",
        chatWithStranger:               "systoon:js::chatWithStranger",
        openCardHeadSetting:            "systoon:js::openCardHeadSetting",
        supplementSocialProperty:       "systoon:js::supplementSocialProperty",
        chooseCard:                     "systoon:js::chooseCard",
        interactiveFrame:               "systoon:js::interactiveFrame",
        playSoundEffect:                "systoon:js::playSoundEffect",
        wordsFromH5ToChat:              "systoon:js::wordsFromH5ToChat",
        notifyRefresh:                  "systoon:js::notifyRefresh",
        openMapWithDesignatedAddress:   "systoon:js::openMapWithDesignatedAddress",
        // createCard:                      "systoon:js::createCard"
        openDownloadOrigin:             "systoon:js::openDownloadOrigin",
        personInfoPage:                 "systoon:js::personInfoPage",
        disturbGame:                    "systoon:js::disturbGame",
        countdownEnd:                   "systoon:js::countdownEnd",
        getCardInfoOfServiceParty:      "systoon:js::getCardInfoOfServiceParty",
        ChooseServiceClassification:    "systoon:js::ChooseServiceClassification",
        createGroupChat:                "systoon:js::createGroupChat",
        thoroughlyEndGame:              "systoon:js::thoroughlyEndGame",
        releaseGame:                    "systoon:js::releaseGame",
        getRecommendServiceList:        "systoon:js::getRecommendServiceList",
        otherServicePeople:             "systoon:js::otherServicePeople",
        toOriginPicture:                "systoon:js::toOriginPicture",
        updateLocalPluginDb:            "systoon:js::updateLocalPluginDb",
        checkoutPayCash:                "systoon:js::checkoutPayCash",
        areFriendOfTwoCards:            "systoon:js::areFriendOfTwoCards",
        selectContacts:                 "systoon:js::selectContacts",
        goBack:                         "systoon:js::goBack",
        addServiceItem:                 "systoon:js::addServiceItem",
        locationPolicy:                 "systoon:js::locationPolicy",
        recruitAction:                  "systoon:js::recruitAction",
        scanningBluetooth:              "systoon:js::scanningBluetooth",
        checkBluetoothState:            "systoon:js::checkBluetoothState",
        openBluetooth:                  "systoon:js::openBluetooth",
        atuoDoorBaseInfo:               "systoon:js::atuoDoorBaseInfo",
        openDoor:                       "systoon:js::openDoor",
        connectBluetooth:               "systoon:js::connectBluetooth",
        openWebUrl:                     "systoon:js::openWebUrl",
        nearbyFindOne:                  "systoon:js::nearbyFindOne",
        addressBook:                    "systoon:js::addressBook",
        serviceIndex:                   "systoon:js::serviceIndex",
        hotspot:                        "systoon:js::hotspot",
        interestGroup:                  "systoon:js::interestGroup",
        socialIndex:                    "systoon:js::socialIndex",
        ServiceDisclaimer:              "systoon:js::ServiceDisclaimer",
        getResultOfCreatingActivity:    "systoon:js::getResultOfCreatingActivity",
        getResultOfRegistApplication:   "systoon:js::getResultOfRegistApplication",
        showDateWheel:                  "systoon:js::showDateWheel"
        
    };

    Mwap.businessURLRequest={
        //朋友圈
        feedDescription:"/business/circle/feedDescription",
        getPraiseCommentNum:"/business/circle/getPraiseCommentNum",
        getPraiseCommentList:"/business/circle/getPraiseCommentList",

        createEnterprise:"/business/createEnterprise",
        popWindow:"/business/popWindow",
        install:"/business/install",
        createShowBlock:"/business/createShowBlock",
        validate:"/business/validate",
        openUrl:"/business/openUrl",
        getDefaultCard:"/business/getDefaultCard",

        friendList:"/business",//2015.5.28以后的请求定义全部变成business
        //database:Mwap.server+"/business",
        callFrame:"/business",
        createGroup:"/business",
        createCard:"/business",
        createEvent:"/business",
        createOrganization:"/business",
        navigationItem:"/business",
        changeCard:"/business",
        checkout:"/business",
        groupChat:"/business",
        singleChat:"/business",
        getToonPayBalance:"/business",

        webPageJumpToNative:            "/business",
        databases_createGroup:          "/business",
        toon_map:                       "/business",
        contentPraiseNumber:            "/business",
        contentCommentNumber:           "/business",
        contentPraiseStatus:            "/business",
        contentCommentList:             "/business",
        contentPraise:                  "/business",
        contentComment:                 "/business",
        contentGetFeed:                 "/business",
        contentRefer:                   "/business",
        contentCollect:                 "/business",
        sharePlugin:                    "/business",
        contentLikeList:                "/business",
        functionRegister:               "/business",
        organizCommunication:           "/business",
        notificationCenter:             "/business",
        groupChatList:                  "/business",
        singleChatList:                 "/business",
        getUserAllCardsInfo:            "/business",
        launchMessageAndHtmlPage:       "/business",
        getSocialInfo:                  "/business",
        transferMatchedFeedId:          "/business",
        teardownSocketThenStopChatting: "/business",
        packUpGamingView:               "/business",
        endGamingView:                  "/business",
        shareToThird:                   "/business",
        toRecord:                       "/business",
        softpanHeight:                  "/business",
        clickRightButton:               "/business",
        recordCancel:                   "/business",
        jumpToComplaintPage:            "/business",
        getBatchSocialProperty:         "/business",
        getAllGroupInfo:                "/business",
        isGroupOwner:                   "/business",
        jumpToApplication:              "/business",
        getBatchGroupInfo:              "/business",
        clickLeftButton:                "/business",
        chatWithStranger:               "/business",
        openCardHeadSetting:            "/business",
        supplementSocialProperty:       "/business",
        chooseCard:                     "/business",
        interactiveFrame:               "/business",
        playSoundEffect:                "/business",
        wordsFromH5ToChat:              "/business",
        notifyRefresh:                  "/business",
        openMapWithDesignatedAddress:   "/business",
        // createCard:                     "/business"
        openDownloadOrigin:             "/business",
        personInfoPage:                 "/business",
        disturbGame:                    "/business",
        countdownEnd:                   "/business",
        getCardInfoOfServiceParty:      "/business",
        ChooseServiceClassification:    "/business",
        createGroupChat:                "/business",
        thoroughlyEndGame:              "/business",
        releaseGame:                    "/business",
        getRecommendServiceList:        "/business",
        otherServicePeople:             "/business",
        toOriginPicture:                "/business",
        updateLocalPluginDb:            "/business",
        checkoutPayCash:                "/business",
        areFriendOfTwoCards:            "/business",
        selectContacts:                 "/business",
        goBack:                         "/business",
        addServiceItem:                 "/business",
        locationPolicy:                 "/business",
        recruitAction:                  "/business",
        scanningBluetooth:              "/business",
        checkBluetoothState:            "/business",
        openBluetooth:                  "/business",
        atuoDoorBaseInfo:               "/business",
        openDoor:                       "/business",
        connectBluetooth:               "/business",
        openWebUrl:                     "/business",
        nearbyFindOne:                  "/business",
        addressBook:                    "/business",
        serviceIndex:                   "/business",
        hotspot:                        "/business",
        interestGroup:                  "/business",
        socialIndex:                    "/business",
        ServiceDisclaimer:              "/business",
        getResultOfCreatingActivity:    "/business",
        getResultOfRegistApplication:   "/business",
        showDateWheel:                  "/business"
    };

    Mwap.businessResponse={
        createEnterprise:"systoon:business::createEnterprise",
        popWindow:"systoon:business::popWindow",
        install:"systoon:business::install",
        friendList:"systoon:business::friendList",
        //database:"systoon:business::database",
        createGroup:"systoon:business::createGroup",
        createCard:"systoon:business::createCard",
        createEvent:"systoon:business::createEvent",
        createOrganization:"systoon:business::createOrganization",
        validate:"systoon:business::validate",
        navigationItem:"systoon:business::navigationItem",
        changeCard:"systoon:business::changeCard",
        feedDescription:"systoon:business::feedDescription",
        getToonPayBalance:"systoon:business::getToonPayBalance",
        special_back:"systoon:business::special_back",

        toon_map:                       "systoon:business::toon_map",
        contentPraiseNumber:            "systoon:business::contentPraiseNumber",
        contentCommentNumber:           "systoon:business::contentCommentNumber",
        contentPraiseStatus:            "systoon:business::contentPraiseStatus",
        contentCommentList:             "systoon:business::contentCommentList",
        contentPraise:                  "systoon:business::contentPraise",
        contentComment:                 "systoon:business::contentComment",
        contentGetFeed:                 "systoon:business::contentGetFeed",
        contentRefer:                   "systoon:business::contentRefer",
        contentCollect:                 "systoon:business::contentCollect",
        key_back:                       "systoon:business::key_back",
        ip_port:                        "systoon:business::ip_port",
        sharePlugin:                    "systoon:business::sharePlugin",
        contentLikeList:                "systoon:business::contentLikeList",
        functionRegister:               "systoon:business::functionRegister",
        organizCommunication:           "systoon:business::organizCommunication",
        notificationCenter:             "systoon:business::notificationCenter",
        singleChatList:                 "systoon:business::singleChatList",
        groupChatList:                  "systoon:business::groupChatList",
        getUserAllCardsInfo:            "systoon:business::getUserAllCardsInfo",
        launchMessageAndHtmlPage:       "systoon:business::launchMessageAndHtmlPage",
        getSocialInfo:                  "systoon:business::getSocialInfo",
        transferMatchedFeedId:          "systoon:business::transferMatchedFeedId",
        teardownSocketThenStopChatting: "systoon:business::teardownSocketThenStopChatting",
        packUpGamingView:               "systoon:business::packUpGamingView",
        endGamingView:                  "systoon:business::endGamingView",
        shareToThird:                   "systoon:business::shareToThird",
        toRecord:                       "systoon:business::toRecord",
        softpanHeight:                  "systoon:business::softpanHeight",
        clickRightButton:               "systoon:business::clickRightButton",
        recordCancel:                   "systoon:business::recordCancel",
        getBatchSocialProperty:         "systoon:business::getBatchSocialProperty",
        getAllGroupInfo:                "systoon:business::getAllGroupInfo",
        isGroupOwner:                   "systoon:business::isGroupOwner",
        jumpToApplication:              "systoon:business::jumpToApplication",
        getBatchGroupInfo:              "systoon:business::getBatchGroupInfo",
        clickLeftButton:                "systoon:business::clickLeftButton",
        chatWithStranger:               "systoon:business::chatWithStranger",
        openCardHeadSetting:            "systoon:business::openCardHeadSetting",
        supplementSocialProperty:       "systoon:business::supplementSocialProperty",
        chooseCard:                     "systoon:business::chooseCard",
        interactiveFrame:               "systoon:business::interactiveFrame",
        playSoundEffect:                "systoon:business::playSoundEffect",
        wordsFromH5ToChat:              "systoon:business::wordsFromH5ToChat",
        notifyRefresh:                  "systoon:business::notifyRefresh",
        openMapWithDesignatedAddress:   "systoon:business::openMapWithDesignatedAddress",
        // createCard:                     "systoon:business::createCard"
        openDownloadOrigin:             "systoon:business::openDownloadOrigin",
        personInfoPage:                 "systoon:business::personInfoPage",
        disturbGame:                    "systoon:business::disturbGame",
        countdownEnd:                   "systoon:business::countdownEnd",
        getCardInfoOfServiceParty:      "systoon:business::getCardInfoOfServiceParty",
        ChooseServiceClassification:    "systoon:business::ChooseServiceClassification",
        createGroupChat:                "systoon:business::createGroupChat",
        thoroughlyEndGame:              "systoon:business::thoroughlyEndGame",
        releaseGame:                    "systoon:business::releaseGame",
        getRecommendServiceList:        "systoon:business::getRecommendServiceList",
        otherServicePeople:             "systoon:business::otherServicePeople",
        toOriginPicture:                "systoon:business::toOriginPicture",
        updateLocalPluginDb:            "systoon:business::updateLocalPluginDb",
        checkoutPayCash:                "systoon:business::checkoutPayCash",
        areFriendOfTwoCards:            "systoon:business::areFriendOfTwoCards",
        selectContacts:                 "systoon:business::selectContacts",
        goBack:                         "systoon:business::goBack",
        addServiceItem:                 "systoon:business::addServiceItem",
        locationPolicy:                 "systoon:business::locationPolicy",
        recruitAction:                  "systoon:business::recruitAction",
        scanningBluetooth:              "systoon:business::scanningBluetooth",
        checkBluetoothState:            "systoon:business::checkBluetoothState",
        openBluetooth:                  "systoon:business::openBluetooth",
        atuoDoorBaseInfo:               "systoon:business::atuoDoorBaseInfo",
        openDoor:                       "systoon:business::openDoor",
        connectBluetooth:               "systoon:business::connectBluetooth",
        openWebUrl:                     "systoon:business::openWebUrl",
        nearbyFindOne:                  "systoon:business::nearbyFindOne",
        addressBook:                    "systoon:business::addressBook",
        serviceIndex:                   "systoon:business::serviceIndex",
        hotspot:                        "systoon:business::hotspot",
        interestGroup:                  "systoon:business::interestGroup",
        socialIndex:                    "systoon:business::socialIndex",
        ServiceDisclaimer:              "systoon:business::ServiceDisclaimer",
        getResultOfCreatingActivity:    "systoon:business::getResultOfCreatingActivity",
        getResultOfRegistApplication:   "systoon:business::getResultOfRegistApplication",
        showDateWheel:                  "systoon:business::showDateWheel"
    }
})(document,Mwap);
(function(doc,Mwap){
    function paras(data){

        console.log("||||||",data);
        var flag=data.type.split("::")[0];
        var type=data.type.split("::")[1];
        if(Mwap&&flag==="systoon:native"){
            Mwap.events.dispatch(data.type,{type:data.type,value:{state:data.state,data:data.data}});
        }else if(Mwap&&flag==="systoon:business") {
            Mwap.events.dispatch(data.type,{type:data.type,value:{state:data.state,data:data.data}});
        }else{

            Mwap.utils.getRequestFormNativeTypes(event.type,event);
            Mwap.events.dispatch(data.type,{type:data.type,value:{state:data.state,data:data.data}});
            console.log("Mwap或者不是systoon:native|systoon:business");
        }

    }
    for(var key in Mwap.nativeTypes) {
        var type=Mwap.nativeTypes[key];
        doc.addEventListener(type,function(event){
            var data=Mwap.utils.getRequestFormNativeTypes(event.type,event);
            paras(data);
        });
    }

    for(var key in Mwap.businessResponse) {
        var type=Mwap.businessResponse[key];
        doc.addEventListener(type,function(event){
            var data=Mwap.utils.getRequestFormNativeTypes(event.type,event);
            paras(data);
        });
    }

})(document,Mwap);
(function(doc,Mwap){
    Mwap.toon={
        formatDataForSave:function(objs){//格式化数据成服务器需要的map,JSON
            var label={};
            function paras(key,chlidObj){
                var temp=chlidObj;
                for(var i in temp){
                    var obj=temp[i];
                    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
                    if(isjson){
                        arguments.callee(i,obj);
                        temp[i]=JSON.stringify(obj);
                    }else{
                        temp[i]=obj;
                    }
                }
            }
            var sendData=JSON.parse(JSON.stringify(objs));
            paras(null,sendData);
            return JSON.stringify(sendData);
        }
    }

})(document,Mwap);


