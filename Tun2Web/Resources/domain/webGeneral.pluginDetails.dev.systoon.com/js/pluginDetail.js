var beginX,defaultX,nowX,ele,data,imgW,imgH,platform,addFunctionPluginUrl;
//var param={"cardId": "32082","componentDataId": "32082","pluginInstance": {"auditState":"2","callbackUrl":"","companyName":"黑铁之堡垒","confPictures":"2e062c188d46068cfe16b2b33483e9311001,3a3360b9879a6f7d369eacbec8cf6bd41001,d22379df3fefee6f58873f3e5d6022601001,27c9759a49012ae9612edba2d118cc9b1001","createDate":"1433311486034","domainNamespace":"neirong.dev.systoon.com","funId":"354","icon":"3920ee74-abf1-41bd-b0b5-ba8c75ba7b1f.png","isFree":"0","maxUseTimes":"-1","msgId":"4414982645286750150","name":"内容型插件","needConfirm":"0","pluginCode":"3920ee74-abf1-41bd-b0b5-ba8c75ba7b1f","pluginType":"1","publishState":"2","remark":"这是一个内容插件","serviceId":"63","showPictures":"43c08b0205825123a84461e21d16ebd11001,bf78e1d6f34ee9ea98cb75f12cfc3ddb1001,84aeafb1a899fa11fc17c4ef49796c281001,eb503ec70fc554cf3c3e5fe1fcb673611001","showUrl":"neirong.dev.systoon.com/plugincode1/access.htm","specification":"","specificationPrice":"","storeId":"6fe5b2f8ebb0cecfb40bda0e14d326f81001","typeCode":",1,","updateDate":"1433311486034","usePictures":"fd17157dc979e20f7ce10802ff6ecf751001,ecbe426e7a21bc6b1a007885163220a31001,b24b3d678615e71677fcd4b6622c4b8a1001","useUrl":"neirong.dev.systoon.com/plugincode1/use.htm","userId":"1817","version":"1.0","versionExplain":"","visitType":"1"},"source": "2","authKey":{"platformVersion":"18","platform":"android","userToken":"541931be-ef82-4781-b425-6cc756335be5","ticket":"1F604BDF1D0F191AD18D6C3529612957","deviceId":"1","userId":"14709"}};
var childstr="";
var bigchildstr="";
var download=false;
var mySwiper=null;
var drags = function(list){
    if(!mySwiper){
        mySwiper = new Swiper('.swiper-container', {
            scrollbarHide: true,
            slidesPerView: 'auto',
            /*centeredSlides: true,*/
            spaceBetween: 5,
            grabCursor: true,
            freeMode: true
        });
        $(".swiper-wrapper")[0].style['-webkit-transform']='translate3d(0px, 0px, 0px)';
        $(".swiper-wrapper")[0].style['transform']='translate3d(0px, 0px, 0px)';
    }else{

        $(".swiper-wrapper")[0].style['-webkit-transform']='translate3d(0px, 0px, 0px)';
        $(".swiper-wrapper")[0].style['transform']='translate3d(0px, 0px, 0px)';
        mySwiper.update();
    }
};
var bigSwiper=null;
var bigdrags = function(list){
    if(!bigSwiper){
        bigSwiper = new Swiper('.swiper-containerbig', {
            scrollbarHide: true,
            slidesPerView: 'auto',
            /*centeredSlides: true,*/
            spaceBetween: 5,
            grabCursor: true,
            freeMode: true
        });
        $(".swiper-wrapper")[0].style['-webkit-transform']='translate3d(0px, 0px, 0px)';
        $(".swiper-wrapper")[0].style['transform']='translate3d(0px, 0px, 0px)';
    }else{

        $(".swiper-wrapper")[0].style['-webkit-transform']='translate3d(0px, 0px, 0px)';
        $(".swiper-wrapper")[0].style['transform']='translate3d(0px, 0px, 0px)';
        bigSwiper.update();
    }
};
function showPop(event){
    $("#bigImgCon").html(bigchildstr);
    $("#bigContainer").removeClass("hide");
    $("#blackBg").removeClass("hide");
    bigdrags();
    var idStr=$(event.target.parentElement).attr("id");
    var num=idStr.substring(3,idStr.length);
    $("#bigimg"+num).addClass("swiper-slide-active");
    var next=parseInt(num)+1;
    var prev=parseInt(num)-1;
    if($("#bigimg"+prev).length==1){
        $("#bigimg"+prev).addClass("swiper-slide-prev");
    }
    if($("#bigimg"+next).length==1){
        $("#bigimg"+next).addClass("swiper-slide-next");
    } 
    var leftOff=0;
    for(var k=0;k<num;k++){
        leftOff=leftOff+$("#bigimg"+k).width();
    }
    $("#bigImgCon").css("-webkit-transform","translate3d(-"+leftOff+"px, 0px, 0px)").css("transform","translate3d(-"+leftOff+"px, 0px, 0px)");
}
Mwap.events.on(Mwap.nativeTypes.loadParams,function(e){
    onlopa(e.value.data);
    drags();
    bigdrags();    
});
$("#tabbedGroup").find("li").bind("click",function(){   
    $("#tabbedGroup").find("li").removeClass("selectedTab");
    $(this).addClass("selectedTab");
    var tag=$(this).attr("tag");
    childstr="";
    bigchildstr="";
    if(tag=="usePictures"){
        var imgStr=data.pluginInstance.usePictures.split(",");        
    }else if(tag=="showPictures"){
        var imgStr=data.pluginInstance.showPictures.split(",");        
    }else if(tag=="confPictures"){
        var imgStr=data.pluginInstance.confPictures.split(",");        
    }
    for (var j =0; j<imgStr.length; j++) {
        childstr=childstr+'<li class="swiper-slide" id="img'+j+'"><img src=\'http://toon.scloud.systoon.com/requestDownload?stoid='+imgStr[j]+'&clientIp=172.31.249.109&returnType=2&returnMimeType=image/png&thumbnail={"width":'+imgW+',"height":'+imgH+'}\' class="scrollimg">'+'</li>';
        bigchildstr=bigchildstr+'<li class="swiper-slide" id="bigimg'+j+'"><img src=\'http://toon.scloud.systoon.com/requestDownload?stoid='+imgStr[j]+'&clientIp=172.31.249.109&returnType=2&returnMimeType=image/png\' class="scrollimg">'+'</li>';
    }
    $("#imgCon").html(childstr);
    $("#imgCon").css("-webkit-transform","translate3d(-0px, 0px, 0px)").css("transform","translate3d(-0px, 0px, 0px)");
    $("#bigImgCon").html(bigchildstr);
    drags();
    bigdrags(); 
    $("#imgCon").find("img").bind("tap",function(e){
        e.stopPropagation();
        e.preventDefault();
        showPop(e);
    });
})
$("body").bind("click",function(e){
    if(!$("#bigContainer").hasClass("hide")){
        $("#bigContainer").addClass("hide");
        $("#blackBg").addClass("hide");
    }
})
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
    var times,versionExplain;
    if(param.pluginInstance.maxUseTimes=="-1"){
    	times="不限";
    }else{
    	times=param.pluginInstance.maxUseTimes;
    }
    if(param.pluginInstance.versionExplain.length>28){
        versionExplain=param.pluginInstance.versionExplain.substring(0,20)+"......";
        $("#moreBlue").removeClass("hide");
    }else{
        versionExplain=param.pluginInstance.versionExplain;
    }
    $("#headImg").prop("src","http://img.icon.systoon.com/icon/"+platform+"/plugin/b/"+param.pluginInstance.icon);
    $("#cjmcbbh").text(param.pluginInstance.name+"_"+param.pluginInstance.versionString);
    $("#director").text(param.pluginInstance.companyName);
    //$("#stars").text(param.pluginInstance.id);
    $("#size").text(param.pluginInstance.specification);
    $("#price").text(param.pluginInstance.specificationPrice);
    $("#cjmchbban").text("插件名称_版本号："+param.pluginInstance.name+"_"+param.pluginInstance.versionString);
    $("#maxnum").text("最多使用次数："+times+"次");
    $("#canrename").text(param.pluginInstance.nameStatus==true?"是否可以自命名：是":"是否可以自命名：否");
    $("#onlinetime").text("上线时间："+getLocalTime(parseInt(param.pluginInstance.createDate)));
    $("#updatetime").text("最近更新时间："+getLocalTime(parseInt(param.pluginInstance.updateDate)));
    $("#says").text(versionExplain); 
    $("#remark").text("("+param.pluginInstance.remark+")");
    $("#imgCon").html("");
    var imgStr=param.pluginInstance.confPictures.split(",");
    childstr="";
    bigchildstr="";
    for (var j =0; j<imgStr.length; j++) {
        childstr=childstr+'<li class="swiper-slide" id="img'+j+'"><img src=\'http://toon.scloud.systoon.com/requestDownload?stoid='+imgStr[j]+'&clientIp=172.31.249.109&returnType=2&returnMimeType=image/png&thumbnail={"width":'+imgW+',"height":'+imgH+'}\' class="scrollimg">'+'</li>';
        bigchildstr=bigchildstr+'<li class="swiper-slide" id="bigimg'+j+'"><img src=\'http://toon.scloud.systoon.com/requestDownload?stoid='+imgStr[j]+'&clientIp=172.31.249.109&returnType=2&returnMimeType=image/png\' class="scrollimg">'+'</li>';
    }
    $("verexpl").find("a").prop("href","");
    function getLocalTime(NS) { 
        var now=new Date(NS);    
        var year=now.getFullYear();     
        var month=now.getMonth()+1;     
        var date=now.getDate();     
        var hour=now.getHours();     
        var minute=now.getMinutes();     
        var second=now.getSeconds();     
        return year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;  
    }
    $("#imgCon").html(childstr);
    $("#imgCon").css("-webkit-transform","translate3d(-0px, 0px, 0px)").css("transform","translate3d(-0px, 0px, 0px)");
    $("#bigImgCon").html(bigchildstr);
    function innerHTML(ele){
        if(ele[0].innerHTML==""){
            ele.parent()[0].remove();
        }
    }
    if($("#imgCon").length!=0){
    	innerHTML($("#imgCon"));
    }
    $("#moreBlue").bind("click",function(){
        if($(this).attr("tag")=="more"){
            versionExplain=param.pluginInstance.versionExplain;
            $(this).attr("tag","less");
            $("#says").text(versionExplain);
            $("#moreBlue").text("收起"); 
        }else if($(this).attr("tag")=="less"){
            versionExplain=param.pluginInstance.versionExplain.substring(0,20)+"......";
            $(this).attr("tag","more");
            $("#says").text(versionExplain); 
            $("#moreBlue").text("更多");
        }
    })
    drags();
    bigdrags();
    $("#imgCon").find("img").bind("tap",function(e){
        e.stopPropagation();
        e.preventDefault();
        showPop(e);   
    });
    $("#cjwrapper").removeClass("hide");
    $("#load").addClass("hide");
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:data.pluginInstance.domainNamespace,device:"iphone6",dns:"api.plugin.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        addFunctionPluginUrl=e.value;
        addFunctionPluginUrl=JSON.parse(addFunctionPluginUrl).data.IP;
        addFunctionPluginUrl=addFunctionPluginUrl+"/addFunctionPlugin";
       
    });
}
$("#addbtn").bind("click",function(e){
    if(!download){
        download=true;
        if(data.useScope==""){
            var jsonStr={
                "authKey":data.authKey,
                "bizKey":
                {
                    "userId":data.authKey.userId,
                    "source":data.source,
                    "componentDataId":data.componentDataId,
                    "pluginId":data.pluginInstance.funId
                 }
            };
        }else{
                var jsonStr={
                    "authKey":data.authKey,
                    "bizKey":
                    {
                        "userId":data.authKey.userId,
                        "source":data.source,
                        "componentDataId":data.componentDataId,
                        "pluginId":data.pluginInstance.funId,
                        "useScope":data.useScope
                    }
                };
        }
        jsonStr.authKey=JSON.stringify(jsonStr.authKey);
        jsonStr.bizKey=JSON.stringify(jsonStr.bizKey);
        jsonStr=JSON.stringify(jsonStr);
                  
        $.ajax({
            type: 'POST',
            url:addFunctionPluginUrl,
            data:{toonKey:jsonStr},
            success:function(value){
                if(data.pluginInstance&&data.pluginInstance.domainNamespace&&data.pluginInstance.storeId){
    	            if(value.result=="success"){
                        download=true;
    	            	//Mwap.events.trigger(Mwap.businessRequest.install,{"nameSpace":data.pluginInstance.domainNamespace,"stoid":data.pluginInstance.storeId,"version":param.pluginInstance.version});
                        Mwap.events.trigger(Mwap.businessRequest.install,{"nameSpace":data.pluginInstance.domainNamespace,"stoid":data.pluginInstance.storeId});
    	            }else if(value.code=="10019"){
                        alert("该插件超出最大使用次数");
                    } 
                }else{
                    download=false;
                	alert("数据错误"+data.pluginInstance.domainNamespace+","+data.pluginInstance.storeId);
                }
            },
            error:function(error){
                download=false;
                alert("绑定失败");
            }
        });
    }else{
        return;
    }
});

/*添加插件返回数据*/
Mwap.events.on(Mwap.businessResponse.install,function(e){
    // $("#graybg").removeClass("hide");
    // var rates=e.value.data.downloadsize/e.value.data.totalsize;
    // $("#bluebg").css("width",rates*100+"%");
    if(e.value.data.state=="downloadfail"){
        alert("下载失败！");
        download=false;
    }else if(e.value.data.state=="installsuccess"){
        download=false;
        Mwap.events.trigger(Mwap.eventTypes.closeWebview,{"nameSpace":data.pluginInstance.domainNamespace,device:"iphone6",resultType:"1"});
        Mwap.events.on(Mwap.eventTypes.closeWebview);
    }
});
$("#discusslink").bind("click",function(){
    window.location.href="html/discuss.html";
})