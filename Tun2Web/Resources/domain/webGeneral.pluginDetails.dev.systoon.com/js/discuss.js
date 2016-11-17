var data,addCommentUrl,obtainCommentListUrl;
Mwap.events.on(Mwap.nativeTypes.loadParams,function(e){
    getlist(e.value.data);
    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:data.pluginInstance.domainNamespace,device:"iphone6",dns:"api.plugin.systoon.com"});
    Mwap.events.once(Mwap.eventTypes.dnsResolve,function(e){
        addCommentUrl=e.value;
        addCommentUrl=JSON.parse(addCommentUrl).data.IP;
        addCommentUrl=addCommentUrl+"/addFunctionPlugin";
        obtainCommentListUrl=addCommentUrl+"/addFunctionPlugin";
       
    });
});
var starnum;
$("#submitBtn").bind("click",function(){
    var pubStr=$("#txtPublisher").val();
    var dataStr={
            "authKey":data.authKey,
            "bizKey":{
                "userId":data.authKey.userId,
                "commentContent":pubStr,
                "source":data.source,
                "componentDataId":data.componentDataId,
                "pluginId":data.pluginInstance.funId,
                "userCardId":data.cardId
            }
        };
    dataStr.authKey=JSON.stringify(dataStr.authKey);
    dataStr.bizKey=JSON.stringify(dataStr.bizKey);
    var jsonStr=JSON.stringify(dataStr);
    if(pubStr.length>200){
        alert("最多可输入200字！");
    }else{
        $.ajax({
            type: 'POST',
            url:addCommentUrl,
            data:{toonKey:jsonStr},
            success:function(e){
                if(e.result=="success"){
                    $("#txtPublisher").val("");
                    getlist(data);
                }else{
                    alert("提交失败");
                }
            },
            error:function(error){
                alert("提交失败");
            }
        });
    }
})
$("#selectstar").find("a").bind("click",function(){
    starnum=$(this).attr("tag");
    $("#selectstar").find("img").prop("src","../assets/pluginDetails/starde.png");
    for (var i =0; i<starnum; i++) {
       $($("#selectstar").find("a")[i]).find("img").prop("src","../assets/pluginDetails/star.png");
    }
})
function getlist(e){
	data=e;
    var dataStr={"authKey":data.authKey,
            "bizKey":{
                "userId":data.authKey.userId,
                "source":data.source,
                "pluginId":data.pluginInstance.funId
            }
        };
    dataStr.authKey=JSON.stringify(dataStr.authKey);
    dataStr.bizKey=JSON.stringify(dataStr.bizKey);
    var jsonStr=JSON.stringify(dataStr);
    var htmlStr="";
    $("#listCon").empty();
    $.ajax({
        type: 'GET',
        url:obtainCommentListUrl,
        data:{toonKey:jsonStr},
        async:false,
        success:function(event){
            for (var i = 0; i < event.data.length; i++) {
                var imgStr="";
                // for (var j = 0; j < 5; j++){
                //     imgStr=imgStr+'<img src="../assets/pluginDetails/star.png">';
                // }
                htmlStr=htmlStr+'<div class="cardList"><header><a href="#"><img class="pic" src="'+event.data[i].commentUserCardAvatar+'" /></a><div class="itemList"><div class="det"><p class="name" href="#">'+event.data[i].commentUserCardNickname+'</p><p class="time">'+event.data[i].createTime+'</p></div><div class="star">'+imgStr+'</div></div></header><section class="detail"><p>'+event.data[i].commentContent+'</p></section></div>';
            }
            $("#listCon").append(htmlStr);
        },
        error:function(error){
            alert("获取数据失败");
        }
    });
}