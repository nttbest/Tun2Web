var beginX,defaultX,nowX,ele,data,imgW,imgH,platform;
//var param={"cardId": "32082","componentDataId": "32082","pluginInstance": {"auditState":"2","callbackUrl":"","companyName":"黑铁之堡垒","confPictures":"2e062c188d46068cfe16b2b33483e9311001,3a3360b9879a6f7d369eacbec8cf6bd41001,d22379df3fefee6f58873f3e5d6022601001,27c9759a49012ae9612edba2d118cc9b1001","createDate":"1433311486034","domainNamespace":"neirong.dev.systoon.com","funId":"354","icon":"3920ee74-abf1-41bd-b0b5-ba8c75ba7b1f.png","isFree":"0","maxUseTimes":"-1","msgId":"4414982645286750150","name":"内容型插件","needConfirm":"0","pluginCode":"3920ee74-abf1-41bd-b0b5-ba8c75ba7b1f","pluginType":"1","publishState":"2","remark":"这是一个内容插件","serviceId":"63","showPictures":"43c08b0205825123a84461e21d16ebd11001,bf78e1d6f34ee9ea98cb75f12cfc3ddb1001,84aeafb1a899fa11fc17c4ef49796c281001,eb503ec70fc554cf3c3e5fe1fcb673611001","showUrl":"neirong.dev.systoon.com/plugincode1/access.htm","specification":"","specificationPrice":"","storeId":"6fe5b2f8ebb0cecfb40bda0e14d326f81001","typeCode":",1,","updateDate":"1433311486034","usePictures":"fd17157dc979e20f7ce10802ff6ecf751001,ecbe426e7a21bc6b1a007885163220a31001,b24b3d678615e71677fcd4b6622c4b8a1001","useUrl":"neirong.dev.systoon.com/plugincode1/use.htm","userId":"1817","version":"1.0","versionExplain":"","visitType":"1"},"source": "2","authKey":{"platformVersion":"18","platform":"android","userToken":"541931be-ef82-4781-b425-6cc756335be5","ticket":"1F604BDF1D0F191AD18D6C3529612957","deviceId":"1","userId":"14709"}};
//var childstr="";
//var bigchildstr="";
var download=false;
var data,addApplictionUrl;

Mwap.events.on(Mwap.nativeTypes.loadParams,function(e){
    onlopa(e.value.data);
    //drags();
    //bigdrags();
});
/*$("body").bind("click",function(e){
    if(!$("#bigContainer").hasClass("hide")){
        $("#bigContainer").addClass("hide");
        $("#blackBg").addClass("hide");
    }
})*/
//onlopa(param);
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

	if(data.installFlag==1){
		$("#installFlag").removeClass("hide");
		$("#addbtn").addClass("hide");
	}else{
		$("#addbtn").removeClass("hide");
		$("#installFlag").addClass("hide");
	}

    $("#cjwrapper").removeClass("hide");
    $("#load").addClass("hide");

	Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:data.namespace,device:"iphone6",dns:"api.plugin.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
                     addApplictionUrl=e.value;
                     addApplictionUrl=JSON.parse(addApplictionUrl).data.IP;
                     addApplictionUrl=addApplictionUrl+"/addApp";
    });
}
$("#addbtn").bind("click",function(e){
    if(!download){
        
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
                        download=true;
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
        return;
    }
});

/*添加插件返回数据*/
Mwap.events.on(Mwap.businessResponse.install,function(e){
    $("#graybg").removeClass("hide");
    var rates=e.value.data.downloadsize/e.value.data.totalsize;
    $("#bluebg").css("width",rates*100+"%");
    if(e.value.data.state=="downloadfail"){
        alert("下载失败！");
        download=false;
    }else if(e.value.data.state=="installsuccess"){
        download=false;
        Mwap.events.trigger(Mwap.eventTypes.closeWebview,{"nameSpace":data.appInstance.domainNamespace,device:"iphone6",resultType:"1"});
        Mwap.events.on(Mwap.eventTypes.closeWebview);
    }
});