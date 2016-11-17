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
//判断是否是必填题

//function isRequired(){
//    var formFileds = fileStr.fileds;
//    for(var i=0; i<formFileds.length; i++){
//        window.checkFlag = 0;
//        window.multipleCheck = 0;
//        window.isRequired = formFileds[i].isRequired;
//        if(isRequired == "true"){
//            if(formFileds[i].field_type == "input"){
//                if(formFileds[i].field_cont == ""){
//                    window.flag = "1";
//                }
//            }else if(formFileds[i].field_type == "radio_single"){
//                window.fieldChecked = formFileds[i].field_checked;
//                for(var i=0;i<fieldChecked.length;i++){
//                    if(fieldChecked[i] == true){
//                        checkFlag++;
//                    }
//                }
//            }else if(formFileds[i].field_type == "radio_multiple"){
//                window.fieldCheckeds = formFileds[i].field_checked;
//                alert(fieldCheckeds.length)
//                for(var a=0;i<fieldCheckeds.length;a++){
//                    if(fieldCheckeds[a] == true){
//                        multipleCheck++;
//                    }
//                }
//            }
//        }
//
//        console.log(multipleCheck)
//    }
//};

// 活动创建申请表
var activitySend=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;
    console.log("------>>原始数据"+fieldStr);
    console.log("------>>"+'执行了activitySend函数');

    var fileStr="";

	switch(fieldStr.bizKey.currentStatus){
        case "create":
            fileStr=window.assembles;
            break;
        case "update":
            fileStr=window.assembles;
            break;
        case "Q&A":
            fileStr=window.assembles;
            break;

        
    }
		var fieldStr = localStorage.getItem('loadParams');
        fieldStr = JSON.parse(fieldStr).value.data;
        //默认是等于1 //描述:判断是否自动审核 类型:Integer 取值范围:0否 1是  false:0 true:1
        var isAutoCheckStatus = fieldStr.bizKey.autoCheckStatus;
        console.log("是否自动审核数据传我的"+isAutoCheckStatus);
        //true 1 isAutoCheckStatus
        if(isAutoCheckStatus == ""){
            window.isAutoChackValue = 1;
        }else{
        	var assemnlesObj = window.assembles;
    		window.isAutoChackValue = assemnlesObj.isAutoCheck;
        }
    	console.log("是否为自动审核参数取用户点击的"+isAutoChackValue)
    var bizKeyStr = {
        "registrationItems":JSON.stringify({
            "result":fileStr
        }),
        "cardId":fieldStr.bizKey.cardId,
        "source":fieldStr.bizKey.source,
        "activityId":fieldStr.bizKey.generalId,
        "cardType":fieldStr.bizKey.cardType,
        "isAutoCheck":isAutoChackValue,
        "enrollType":1
    };
    console.log("上传的参数"+bizKeyStr.isAutoCheck)
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)
    };
    //console.log(JSON.stringify(toonKeyStr));
    var serverUrl = '';
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.activity.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        var poUrl = serverUrl + "/updateActivityMsg";
        console.log("获取ip"+serverUrl)
        console.log("获取poUrl"+poUrl)
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));

                console.log("------->>>"+data);

                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
            },
            error:function(data){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                console.log(data.code)
            }
        });
    });



}

// 群组创建申请表
var grounpSend=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;


    console.log("------>>"+'执行了grounpSend函数');

    var fileStr="";

	switch(fieldStr.bizKey.currentStatus){
	        case "create":
	            fileStr=window.assembles;
	            break;
	        case "update":
	            fileStr=window.assembles;
	            break;
            case "Q&A":
                fileStr=window.assembles;
                break;
	        
    }
   		var fieldStr = localStorage.getItem('loadParams');
        fieldStr = JSON.parse(fieldStr).value.data;
        //默认是等于1 //描述:判断是否自动审核 类型:Integer 取值范围:0否 1是  false:0 true:1
        var isAutoCheckStatus = fieldStr.bizKey.autoCheckStatus;
        console.log("是否自动审核数据传我的"+isAutoCheckStatus);
        //true 1 isAutoCheckStatus
        if(isAutoCheckStatus == ""){
            window.isAutoChackValue = 1;
        }else{
        	var assemnlesObj = window.assembles;
    		window.isAutoChackValue = assemnlesObj.isAutoCheck;
        }
    	console.log("是否为自动审核参数取用户点击的"+isAutoChackValue)
    var bizKeyStr = {
        "applyContent":JSON.stringify({
            "result":fileStr
        }),
        "currentStatus":fieldStr.bizKey.currentStatus,
        "groupId":fieldStr.bizKey.generalId,
        "source":fieldStr.bizKey.source,
        "isAutoCheck":isAutoChackValue,
        "enrollType":"1"
    };
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)
    };
    //console.log(JSON.stringify(toonKeyStr));

    var serverUrl = '';
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.group.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        console.log(serverUrl)
        var poUrl = serverUrl + "/updateGroup";
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));

                console.log("------->>>"+data);

                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
            },
            error:function(data){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                console.log(data.code)
            }
        });
    });


}

//  组织创建申请表
var orgSend=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;
    console.log("------>>"+'执行了orgSend函数');
    var fileStr="";
	switch(fieldStr.bizKey.currentStatus){
	        case "create":
	            fileStr=window.assembles;
	            break;
	        case "update":
	            fileStr=window.assembles;
	            break;
            case "Q&A":
                fileStr=window.assembles;
                break;
	       
    }
    	var fieldStr = localStorage.getItem('loadParams');
        fieldStr = JSON.parse(fieldStr).value.data;
        //默认是等于1 //描述:判断是否自动审核 类型:Integer 取值范围:0否 1是  false:0 true:1
        var isAutoCheckStatus = fieldStr.bizKey.autoCheckStatus;
        console.log("是否自动审核数据传我的"+isAutoCheckStatus);
        //true 1 isAutoCheckStatus
        if(isAutoCheckStatus == ""){
            window.isAutoChackValue = 1;
        }else{
        	var assemnlesObj = window.assembles;
    		window.isAutoChackValue = assemnlesObj.isAutoCheck;
        }
    	console.log("是否为自动审核参数取用户点击的"+isAutoChackValue)
    var bizKeyStr = {
        "joineSetting":JSON.stringify({
            "result":fileStr
        }),
        "ownByUserId":fieldStr.bizKey.ownByUserId,
        "cardId":fieldStr.bizKey.cardId,
        "source":fieldStr.bizKey.source,
        "joinMethod":2,
        "autoCheckStatus":isAutoChackValue,
        "enrollType":"1"
    };
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)
    };
    //console.log(JSON.stringify(toonKeyStr));
    var serverUrl = '';
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.org.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        console.log(serverUrl)
        var poUrl = serverUrl+"/updateOrg";
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));

                console.log("------->>>"+data);

                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
            },
            error:function(){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                console.log(data.code)
            }
        });
    });

}

//  名片创建申请表
var send=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;

    console.log("------>>"+'执行了send函数')

    //console.log(fieldStr,'11111111原始数据');

    //console.log(fieldStr,'11111122');
    //console.log("----->>>>>>51",JSON.parse(fieldStr.bizKey));
    var fileStr="";
    //var joineSettingObj = JSON.parse(fieldStr.bizKey.joineSetting);
    //console.log(joineSettingObj,"dddddddd")
	switch(fieldStr.bizKey.currentStatus){
        case "create":
            fileStr=window.assembles;
            break;
        case "update":
            fileStr=window.assembles;
            break;
        case "Q&A":
            fileStr=window.assembles;
            break;
    }
    	var fieldStr = localStorage.getItem('loadParams');
        fieldStr = JSON.parse(fieldStr).value.data;
        //默认是等于1 //描述:判断是否自动审核 类型:Integer 取值范围:0否 1是  false:0 true:1
        var isAutoCheckStatus = fieldStr.bizKey.autoCheckStatus;
        console.log("是否自动审核数据传我的"+isAutoCheckStatus);
        //true 1 isAutoCheckStatus
        if(isAutoCheckStatus == ""){
            window.isAutoChackValue = 1;
        }else{
        	var assemnlesObj = window.assembles;
    		window.isAutoChackValue = assemnlesObj.isAutoCheck;
        }
    	console.log("是否为自动审核参数取用户点击的"+isAutoChackValue)
    var bizKeyStr = {
        "joineSetting":JSON.stringify({
            "result":fileStr
        }),
        "autoCheckStatus":isAutoChackValue,
        "ownByUserId":fieldStr.authKey.userId,
        "cardId":fieldStr.bizKey.cardId,
        "source":fieldStr.bizKey.source,
        "joinMethod":2
    };
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)
    };
    //console.log(JSON.stringify(toonKeyStr));
    var serverUrl = '';
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.card.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        console.log(serverUrl)
        var poUrl = serverUrl+"/updateCard";
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));

                console.log("------->>>"+data);

                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
            },
            error:function(data){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                console.log(data.code)
            }
        
    	});
    });

}

// 名片编辑申请表
var questionAnswerFun=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;
    console.log("------>>"+'执行了questionAnswerFun函数');



    window.fileStr="";

	switch(fieldStr.bizKey.currentStatus){
        case "create":
            fileStr=window.assembles;
            break;
        case "update":
            fileStr=window.assembles;
            break;
        case "Q&A":
            fileStr=window.assembles;
            break;
    }


    var formFileds = fileStr.fileds;
    //console.log(formFileds,'0000000000000000')
    window.flag = 1;
    window.checkFlag = 1;
    window.multipleCheck = 1;
    for(var i=0; i<formFileds.length; i++){
        (function(i){

            window.isRequired = formFileds[i].isRequired;
            if(String(isRequired) == "true"){
                if(formFileds[i].field_type == "input"){
                    console.log('8888888888',formFileds[i].field_cont)
                    if(formFileds[i].field_cont == ""){
                        window.flag = 0;
                    }
                }
                if(formFileds[i].field_type == "radio_single"){
                    window.fieldChecked = formFileds[i].field_checked;
                    for(var j=0;j<fieldChecked.length;j++){
                        if(fieldChecked[j] != true){
                            window.checkFlag=0;

                        }else{
                            window.checkFlag=1;
                            return false;
                        }
                    }
                }
                if(formFileds[i].field_type == "radio_multiple"){
                    window.fieldCheckeds = formFileds[i].field_checked;
                    for(var a=0;a<fieldCheckeds.length;a++){
                        if(fieldCheckeds[a] != true){
                            window.checkFlag=0;
                        }else{
                            window.checkFlag=1;
                            return false;
                        }
                    }
                }
            }
        })(i);

    }
    console.log("flag>>>>>>>>"+flag)
    console.log("checkFlag>>>>>>>>"+checkFlag)
    console.log("multipleCheck>>>>>>>>"+multipleCheck)
    if(flag == 0 || checkFlag == 0 ){
        Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"请填写完整"});
    }else{
    	var bizKeyStr = {
        "addComment": JSON.stringify({
            "result": fileStr
        }),
        "cardId":fieldStr.bizKey.cardId,
        "source":fieldStr.bizKey.source,
        "cardType":fieldStr.bizKey.cardType,
        "friendCardId":fieldStr.bizKey.friendCardId,
        "friendCardType":fieldStr.bizKey.friendCardType,
        "fromWhere":fieldStr.bizKey.fromWhere
    };
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)
    };
    console.log(JSON.stringify(toonKeyStr));
    var serverUrl = '';
    if(fieldStr.bizKey.source == "2"||fieldStr.bizKey.source == "15"){
    	fieldStr.bizKey.source = "-1"
    }
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.gt.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        console.log("获取ip"+serverUrl)
        var poUrl = serverUrl+"/addFriend";
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));
                console.log("------->>>提交审核数据"+data);

                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
            },
            error:function(data){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                console.log("错误码显示"+JSON.stringify(data))
            }
        });
    });
    }
    


}

// 活动编辑申请表
var activeAnswerFun=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;

    console.log("------>>"+'执行了activeAnswerFun函数')
    //console.log(fieldStr,'11111111原始数据');

    //console.log(fieldStr,'11111122');
    //console.log("----->>>>>>51",JSON.parse(fieldStr.bizKey));
    var fileStr="";
    //console.log(JSON.parse(fileStr))
    //var joineSettingObj = JSON.parse(fieldStr.bizKey.joineSetting);
    //console.log(joineSettingObj,"dddddddd")
	switch(fieldStr.bizKey.currentStatus){
        case "create":
            fileStr=window.assembles;
            break;
        case "update":
            fileStr=window.assembles;
            break;
        case "Q&A":
        	fileStr=window.assembles;
        	break;
    }
    var formFileds = fileStr.fileds;
    //console.log(formFileds,'0000000000000000')
    //alert(JSON.stringify(formFileds))
    window.flag = 1;
    window.checkFlag = 1;
    window.multipleCheck = 1;
    for(var i=0; i<formFileds.length; i++){
        (function(i){
            window.isRequired = formFileds[i].isRequired;
            if(String(isRequired) == "true"){
                if(formFileds[i].field_type == "input"){
                    console.log('8888888888'+formFileds[i].field_cont)
                    if(formFileds[i].field_cont == ""){
                        window.flag = 0;
                    }
                }
                if(formFileds[i].field_type == "radio_single"){
                    window.fieldChecked = formFileds[i].field_checked;
                    for(var j=0;j<fieldChecked.length;j++){
                        if(fieldChecked[j] != true){
                            window.checkFlag=0;

                        }else{
                            window.checkFlag=1;
                            return false;
                        }
                    }
                }
                if(formFileds[i].field_type == "radio_multiple"){
                    window.fieldCheckeds = formFileds[i].field_checked;
                    for(var a=0;a<fieldCheckeds.length;a++){
                        if(fieldCheckeds[a] != true){
                            window.checkFlag=0;
                        }else{
                            window.checkFlag=1;
                            return false;
                        }
                    }
                }
            }
        })(i);

    }
    console.log("flag>>>>>>>>"+flag)
    console.log("checkFlag>>>>>>>>"+checkFlag)
    console.log("multipleCheck>>>>>>>>"+multipleCheck)
    if(flag == 0 || checkFlag == 0 ){
        Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"请填写完整"});
    }else{
    	var bizKeyStr = {
        "registrationItems":JSON.stringify({
            "result":fileStr
        }),
        "cardId":fieldStr.bizKey.cardId,
        "source":fieldStr.bizKey.source,
        "activityId":fieldStr.bizKey.generalId,
        "cardType":fieldStr.bizKey.source,
        "isAudit":"0",
        "enrollType":"1"
    };
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)

    };
    console.log(JSON.stringify(toonKeyStr));

    var serverUrl = '';
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.activity.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        console.log(serverUrl)
        var poUrl = serverUrl + "/activityUserRegist";
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));

                console.log("------->>>提交审核数据"+data);

                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
            },
            error:function(data){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                console.log(data.code)
            }
        });
    });
    }
    

}

// 群组编辑申请表
var  groupAnswerFun=function(callback){
    var fieldStr = localStorage.getItem('loadParams');
    fieldStr = JSON.parse(fieldStr).value.data;
    console.log("------>>"+'执行了groupAnswerFun函数')
    var fileStr="";
	switch(fieldStr.bizKey.currentStatus){
        case "create":
            fileStr=window.assembles;
            break;
        case "update":
            fileStr=window.assembles;
            break;
        case "Q&A":
            fileStr=window.assembles;
            break;
        
    }
    var formFileds = fileStr.fileds;
    //console.log(formFileds,'0000000000000000')
    window.flag = 1;
    window.checkFlag = 1;
    window.multipleCheck = 1;
    for(var i=0; i<formFileds.length; i++){
        (function(i){

            window.isRequired = formFileds[i].isRequired;
            if(String(isRequired) == "true"){
                if(formFileds[i].field_type == "input"){
                    console.log('8888888888',formFileds[i].field_cont)
                    if(formFileds[i].field_cont == ""){
                        window.flag = 0;
                    }
                }
                if(formFileds[i].field_type == "radio_single"){
                    window.fieldChecked = formFileds[i].field_checked;
                    for(var j=0;j<fieldChecked.length;j++){
                        if(fieldChecked[j] != true){
                            window.checkFlag=0;

                        }else{
                            window.checkFlag=1;
                            return false;
                        }
                    }
                }
                if(formFileds[i].field_type == "radio_multiple"){
                    window.fieldCheckeds = formFileds[i].field_checked;
                    for(var a=0;a<fieldCheckeds.length;a++){
                        if(fieldCheckeds[a] != true){
                            window.checkFlag=0;
                        }else{
                            window.checkFlag=1;
                            return false;
                        }
                    }
                }
            }
        })(i);

    }
    console.log("flag>>>>>>>>"+flag)
    console.log("checkFlag>>>>>>>>"+checkFlag)
    console.log("multipleCheck>>>>>>>>"+multipleCheck)
    if(flag == 0 || checkFlag == 0 ){
        Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"请填写完整"});
    }else{
    	var bizKeyStr = {
        "applyContent":JSON.stringify({
            "result":fileStr
        }),
        "userId":fieldStr.authKey.userId,
        "cardId":fieldStr.bizKey.cardId,
        "cardType":fieldStr.bizKey.cardType,
        "joinMethod":2,
        "groupId":fieldStr.bizKey.generalId,
        "source":fieldStr.bizKey.source

    };
    var toonKeyStr = '';
    toonKeyStr = {
        "authKey":JSON.stringify(fieldStr.authKey),
        "bizKey":JSON.stringify(bizKeyStr)
    };
    console.log(JSON.stringify(toonKeyStr));
    var serverUrl = '';
    console.log("source"+fieldStr.bizKey.source);
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:fieldStr.nameSpace,source:fieldStr.bizKey.source,device:"iphone6",dns:"api.group.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        serverUrl=e.value;
        serverUrl=JSON.parse(serverUrl).data.IP;
        console.log(serverUrl)
        var poUrl = serverUrl + "/groupUserRegist";
        RAjax({
            type:"POST",
            url:poUrl,
            data:{"toonKey":JSON.stringify(toonKeyStr)},
            dataType:"text",
            success:function(data){
                console.log(JSON.stringify(toonKeyStr));

                console.log("------->>>提交审核数据"+data);
                //alert(1);
                if(callback){
                    callback();
                }
                if(JSON.parse(data).code!=0){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
                };
               
            },
            error:function(data){
                Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:fieldStr.nameSpace,device:"iphone6",content:"服务器繁忙！"});
            }
        });
    });
    }
    

}

