var data,addApplictionUrl;
Mwap.events.on(Mwap.nativeTypes.loadParams,function(e){
    onlopa(e.value.data);
    data=e.value.data;
});

function onlopa(param){
    data=param;    
    if(data.authKey.platform=="android"){
        imgW=465;
        imgH=828;
        platform="android";
    }else{
        imgW=320;
        imgH=570;
        platform="ios";
    }
    
    $("#headImg").prop("src","http://img.icon.systoon.com/icon/"+platform+"/app/b/"+param.appInstance.icon);
    $("#appName").text(param.appInstance.name);
    $("#cjwrapper").removeClass("hide");
    $("#load").addClass("hide");
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:data.namespace,device:"iphone6",dns:"api.plugin.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
                     addApplictionUrl=e.value;
                     addApplictionUrl=JSON.parse(addApplictionUrl).data.IP;
                     addApplictionUrl=addApplictionUrl+"/addApp";
                     //alert(addApplictionUrl);
    });

}

$("#regbtn").bind("click",function(e){

	if(data.installFlag==0){
        
		var jsonStr={
			"authKey":data.authKey,
			"bizKey":
			{
				"userId":data.authKey.userId,
				"source":data.source,
				"appId":data.appInstance.appId
			}
		};
		jsonStr.authKey=JSON.stringify(jsonStr.authKey);
		jsonStr.bizKey=JSON.stringify(jsonStr.bizKey);
		jsonStr=JSON.stringify(jsonStr);
				  
		$.ajax({
			type: 'POST',
			url:addApplictionUrl,
			data:{toonKey:jsonStr},
			success:function(value){
				if(data.appInstance&&data.appInstance.domainNamespace&&data.appInstance.storeId){
					if(value.result=="success"){
						//download=true;
						Mwap.events.trigger(Mwap.businessRequest.install,{"nameSpace":data.appInstance.domainNamespace,"stoid":data.appInstance.storeId});
					}
				}else{
					alert("数据错误"+data.appInstance.domainNamespace+","+data.appInstance.storeId);
				}
			},
			error:function(error){
				alert("绑定失败");
			}
		});
	}else{
		window.location.href=data.appInstance.regUrl;
	}
});

/*添加插件返回数据*/
Mwap.events.on(Mwap.businessResponse.install,function(e){
    $("#graybg").removeClass("hide");
    var rates=e.value.data.downloadsize/e.value.data.totalsize;
    $("#bluebg").css("width",rates*100+"%");
    if(e.value.data.state=="downloadfail"){
        alert("下载失败！");
    }else if(e.value.data.state=="installsuccess"){
        window.location.href=data.appInstance.regUrl;
    }
});
