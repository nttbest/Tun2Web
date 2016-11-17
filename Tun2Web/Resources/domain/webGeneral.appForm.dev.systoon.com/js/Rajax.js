/**
 * Created by 134018 on 2015/6/10.
 */

var RAjax=function(options){
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = (options.dataType || "text").toUpperCase();
    options.cache=options.cache||"true ";
    var params = formatParamsB(options.data);
    var responseFields={
        "XML": "responseXML",
        "TEXT": "responseText",
        "JSON": "responseJSON"
    }
    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //xhr.responseType=options.dataType;//'text'：返回类型为字符串，这是默认值。'arraybuffer'：返回类型为ArrayBuffer。'blob'：返回类型为Blob。'document'：返回类型为Document。'json'：返回类型为JSON object。
    if(!options.cache){ //禁用缓存
        xhr.setRequestHeader("If-Modified-Since","0");
    }
    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {  //请求完成，响应就绪
            //alert("Mwap.xhr.status:"+xhr.status)
            // var result = xhr.responseType == "text" ? xhr.responseText : xhr.responseXML; //返回值类型
            var result = xhr[responseFields[options.dataType]]; //返回值类型
            if (((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) && typeof options.success == 'function') { //成功
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
    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
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
