/**
 * Created by ryan on 15/5/1.
 */
/**
 * Mwap实际用例
 * Created by com on 15/4/22.
 */

(function(){
    Mwap.init();
    /*
     *监听同步返回
     **/
    Mwap.events.on(Mwap.eventTypes.deviceInfo,function(e){
        var type= e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+ e.value);
    });

    Mwap.events.on(Mwap.eventTypes.album,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value)
    });

    Mwap.events.on(Mwap.eventTypes.camera,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });

    Mwap.events.on(Mwap.eventTypes.locationInfo,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });

    Mwap.events.on(Mwap.eventTypes.closeWebview,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });

    Mwap.events.on(Mwap.eventTypes.createQrcode,function(e){
        var type= e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value)
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",JSON.parse(e.value).data.url);//同步的会被封装在 data中
    });

    Mwap.events.on(Mwap.eventTypes.scanQrcode,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });

    Mwap.events.on(Mwap.eventTypes.redirect,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.record,function(e){
        //Mwap.console.log("record－e-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
        if(JSON.parse(e.value).data.state=="stoprecord"){
            window.recordURL=JSON.parse(e.value).data.url;//同步的会被封装在 data中
        }
    });
    Mwap.events.on(Mwap.eventTypes.amap,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.shake,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.screenShot,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",JSON.parse(e.value).data.url);//同步的会被封装在 data中
    });
    Mwap.events.on(Mwap.eventTypes.contact,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.phone,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.message,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.upLoad,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.alert,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.pluginBridge,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.popWindow,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.install,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.createShowBlock,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.friendList,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    /*
     Mwap.events.on(Mwap.businessRequest.database,function(e){

     var type=e.type.split("::")[1];
     $("#info_sync","#page-"+type).text("同步信息:"+e.value);
     });*/
    Mwap.events.on(Mwap.businessRequest.callFrame,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.createGroup,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.createCard,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.createEvent,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.createOrganization,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.validate,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.datePicker,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.dnsResolve,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.changeCard,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.getGPSState,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+JSON.parse(e.value).data.state);
    });
    Mwap.events.on(Mwap.eventTypes.goToGPSSetting,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.downloadFile,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.checkout,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.groupChat,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.singleChat,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.dataFromH5,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.wheel,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.openUrl,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.feedDescription,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.getPraiseCommentNum,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.getPraiseCommentList,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.getDefaultCard,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.getToonPayBalance,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.ticketQrcodeResult,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.eventTypes.dataEmbedding,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.eventTypes.getConnectedState,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.amapGetLocation,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.getNavigationItemTitle,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.databases_createGroup,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.toon_map,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.webPageJumpToNative,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentPraiseNumber,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentCommentNumber,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentPraiseStatus,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentCommentList,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentPraise,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentComment,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentGetFeed,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentRefer,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.contentCollect,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.sharePlugin,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.contentLikeList,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.functionRegister,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.organizCommunication,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.notificationCenter,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.getSocialInfo,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.singleChatList,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.groupChatList,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.getUserAllCardsInfo,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.launchMessageAndHtmlPage,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.transferMatchedFeedId,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.teardownSocketThenStopChatting,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.packUpGamingView,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.endGamingView,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    //Mwap.events.on(Mwap.eventTypes.routerToAddress,function(e){
    //    var type=e.type.split("::")[1];
    //    $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    //});

    Mwap.events.on(Mwap.eventTypes.getAuthKey,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.shareToThird,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.toRecord,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.softpanHeight,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.clickRightButton,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.recordCancel,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.jumpToComplaintPage,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.getBatchSocialProperty,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.getAllGroupInfo,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.isGroupOwner,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.jumpToApplication,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.eventTypes.startPlay,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.eventTypes.stopPlay,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.eventTypes.dnsResolveAll,function(e){

        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.businessRequest.getBatchGroupInfo,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.clickLeftButton,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.chatWithStranger,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.openCardHeadSetting,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.supplementSocialProperty,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.chooseCard,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.interactiveFrame,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.playSoundEffect,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.wordsFromH5ToChat,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.notifyRefresh,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.openMapWithDesignatedAddress,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    /*Mwap.events.on(Mwap.businessRequest.createCard,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });*/

    Mwap.events.on(Mwap.businessRequest.openDownloadOrigin,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 跳转到名片对应的个人信息页面
    Mwap.events.on(Mwap.businessRequest.personInfoPage,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.disturbGame,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.countdownEnd,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.getCardInfoOfServiceParty,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.ChooseServiceClassification,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 创建群聊接口
    Mwap.events.on(Mwap.businessRequest.createGroupChat,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // H5释放资源后，告诉原生关闭游戏
    Mwap.events.on(Mwap.businessRequest.thoroughlyEndGame,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 原生点击导航条上的关闭按钮时，给h5发送消息，h5负责监听消息
    Mwap.events.on(Mwap.businessRequest.releaseGame,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 获取推荐服务方列表
    Mwap.events.on(Mwap.businessRequest.getRecommendServiceList,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 其他服务者
    Mwap.events.on(Mwap.businessRequest.otherServicePeople,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // H5调用原生显示大图
    Mwap.events.on(Mwap.businessRequest.toOriginPicture,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 调用支付 (固定端口、非白名单的方式)
    Mwap.events.on(Mwap.eventTypes.toonPay,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 用于H5应用或插件更新内容时同步本地数据操作 (固定端口、非白名单的方式)
    Mwap.events.on(Mwap.businessRequest.updateLocalPluginDb,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 调用现金收银台 (动态端口  非白名单验证)
    Mwap.events.on(Mwap.businessRequest.checkoutPayCash,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 判断两个名片是否好友    (动态端口  白名单验证)
    Mwap.events.on(Mwap.businessRequest.areFriendOfTwoCards,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    // 选择联系人    (动态端口  白名单验证)
    Mwap.events.on(Mwap.businessRequest.selectContacts,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.goBack,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.addServiceItem,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.eventTypes.slidingBack,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.locationPolicy,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.eventTypes.shareStandard,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.recruitAction,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.scanningBluetooth,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.checkBluetoothState,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.openBluetooth,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.atuoDoorBaseInfo,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.openDoor,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.connectBluetooth,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.openWebUrl,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.nearbyFindOne,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.addressBook,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.serviceIndex,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.socialIndex,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.hotspot,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.interestGroup,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });

    Mwap.events.on(Mwap.businessRequest.ServiceDisclaimer,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.getResultOfRegistApplication,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.getResultOfCreatingActivity,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.businessRequest.showDateWheel,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.eventTypes.takePhoto,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.choosePicture,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.getSinglePicture,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });
    Mwap.events.on(Mwap.eventTypes.getLoadParams,function(e){

        //state：  true开启false关闭
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);
    });

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /*
     *监听异步返回
     **/
    // H5调用原生显示大图
    Mwap.events.on(Mwap.businessRequest.toOriginPicture,function(e){
        var type=e.type.split("::")[1];
        $("#info_sync","#page-"+type).text("同步信息:"+e.value);//result
    });
    Mwap.events.on(Mwap.nativeTypes.album,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("album－n-ok:",e);
        console.log("album－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));

        if(e.value.state=="albumSingleSelect"){
            $("#img","#page-"+type).css("width","100%");
            $("#img","#page-"+type).attr("src",e.value.data.url);
        }else if(e.value.state=="albumMultiSelect"){
            var str="";
            var picstr="";
            for(var i=0;i< e.value.data.urls.length;i++){
                picstr +='<li class="gallery-item">';
                picstr +=    '<img src="'+e.value.data.urls[i]+'"/>';
                picstr +='</li>';
            }
            str +='<div data-role="content" data-theme="b">';
            str +=      '<ul class="gallery-entries clearfix">';
            str += picstr;
            str +=      '</ul>';
            str +='</div>';
            $("#page-album").find(".ui-content").append(str);
        }
    });

    Mwap.events.on(Mwap.nativeTypes.camera,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("camera－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",e.value.data.url);
    });
    Mwap.events.on(Mwap.nativeTypes.createQrcode,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        $("#img","#page-"+type).attr("src",e.value.data.url);
    });
    Mwap.events.on(Mwap.nativeTypes.scanQrcode,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    //扫描后在当前页显示结果
    Mwap.events.on(Mwap.nativeTypes.ticketQrcode,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //var type=e.type.split("::")[1];
        //$("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        Mwap.events.trigger(Mwap.eventTypes.ticketQrcodeResult,{nameSpace:"demo.systoon.com",hint:"结果标题（第一行显示显示的内容）",hintContent: e.value.data.result,type:"1"});//1通过2未通过3已使用

    });
    /*
     Mwap.events.on(Mwap.nativeTypes.record,function(e){

     console.log("异步返回信息:",JSON.stringify(e));

     var type=e.type.split("::")[1];
     $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
     });
     */
    Mwap.events.on(Mwap.nativeTypes.amap,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",e.value.data.url);

        //type=="amapGetDistance"返回 distance:[距离1，距离2，距离3]
    });
    /*
     Mwap.events.on(Mwap.nativeTypes.phone,function(e){
     var type=e.type.split("::")[1];
     $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
     });
     */
    Mwap.events.on(Mwap.nativeTypes.upLoad,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",e.value.data.url);
    });
    /*
     Mwap.events.on(Mwap.nativeTypes.message,function(e){

     console.log("异步返回信息:",JSON.stringify(e));

     var type=e.type.split("::")[1];
     $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
     });
     */
    Mwap.events.on(Mwap.nativeTypes.loadParams,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        localStorage.setItem('loadParams',JSON.stringify(e))
    });
    Mwap.events.on(Mwap.nativeTypes.datePicker,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        localStorage.setItem('datePicker',JSON.stringify(e))
    });
    Mwap.events.on(Mwap.nativeTypes.wheel,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        //返回 字段address=="北京__朝阳区__望京"
    });

    Mwap.events.on(Mwap.businessResponse.createEnterprise,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.popWindow,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.install,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.friendList,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    /*
     Mwap.events.on(Mwap.businessResponse.database,function(e){

     console.log("异步返回信息:",JSON.stringify(e));

     var type=e.type.split("::")[1];
     $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
     });*/
    Mwap.events.on(Mwap.businessResponse.createGroup,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.createCard,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.createEvent,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.createOrganization,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.validate,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.navigationItem,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.changeCard,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    /*
     Mwap.events.on(Mwap.nativeTypes.goToGPSSetting,function(e){

     console.log("异步返回信息:",JSON.stringify(e));

     //Mwap.console.log("scanQrcode－n-ok:",e);
     var type=e.type.split("::")[1];
     $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
     });
     */
    Mwap.events.on(Mwap.businessResponse.checkout,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.feedDescription,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getToonPayBalance,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.getConnectedState,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.nativeTypes.amapGetLocation,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.nativeTypes.getNavigationItemTitle,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.databases_createGroup,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.toon_map,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentPraiseNumber,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentCommentNumber,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentPraiseStatus,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentCommentList,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentPraise,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentComment,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentGetFeed,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentRefer,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentCollect,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.key_back,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.sharePlugin,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.contentLikeList,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.functionRegister,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.pluginService,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.organizCommunication,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.notificationCenter,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getSocialInfo,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.singleChatList,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.groupChatList,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getUserAllCardsInfo,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.launchMessageAndHtmlPage,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.transferMatchedFeedId,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.teardownSocketThenStopChatting,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.packUpGamingView,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.endGamingView,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    //Mwap.events.on(Mwap.nativeTypes.routerToAddress,function(e){

    //    console.log("异步返回信息:",JSON.stringify(e));

    //    var type= e.type.split("::")[1];
    //    $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    //});
    Mwap.events.on(Mwap.nativeTypes.getAuthKey,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.nativeTypes.dnsResolve,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.shareToThird,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.toRecord,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.softpanHeight,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.clickRightButton,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.recordCancel,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getBatchSocialProperty,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getAllGroupInfo,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.isGroupOwner,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.jumpToApplication,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.startPlayAudio,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.playAudioFinished,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.nativeTypes.dnsResolveAll,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.getBatchGroupInfo,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.clickLeftButton,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.chatWithStranger,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.openCardHeadSetting,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.supplementSocialProperty,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.chooseCard,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.interactiveFrame,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.playSoundEffect,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.wordsFromH5ToChat,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.notifyRefresh,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.openMapWithDesignatedAddress,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    /*Mwap.events.on(Mwap.businessResponse.createCard,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });*/

    Mwap.events.on(Mwap.businessResponse.openDownloadOrigin,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 跳转到名片对应的个人信息页面
    Mwap.events.on(Mwap.businessResponse.personInfoPage,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.disturbGame,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.countdownEnd,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getCardInfoOfServiceParty,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.ChooseServiceClassification,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 创建群聊接口
    Mwap.events.on(Mwap.businessResponse.createGroupChat,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // H5释放资源后，告诉原生关闭游戏
    Mwap.events.on(Mwap.businessResponse.thoroughlyEndGame,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 原生点击导航条上的关闭按钮时，给h5发送消息，h5负责监听消息
    Mwap.events.on(Mwap.businessResponse.releaseGame,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 获取推荐服务方列表
    Mwap.events.on(Mwap.businessResponse.getRecommendServiceList,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 其他服务者
    Mwap.events.on(Mwap.businessResponse.otherServicePeople,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // H5调用原生显示大图
    Mwap.events.on(Mwap.businessResponse.toOriginPicture,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 调用支付 (固定端口、非白名单的方式)
    Mwap.events.on(Mwap.nativeTypes.toonPay,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",e.value.data.url);
    });

    // 用于H5应用或插件更新内容时同步本地数据操作 (固定端口、非白名单的方式)
    Mwap.events.on(Mwap.businessResponse.updateLocalPluginDb,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 调用现金收银台 (动态端口  非白名单验证)
    Mwap.events.on(Mwap.businessResponse.checkoutPayCash,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 判断两个名片是否好友    (动态端口  白名单验证)
    Mwap.events.on(Mwap.businessResponse.areFriendOfTwoCards,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 选择联系人    (动态端口  白名单验证)
    Mwap.events.on(Mwap.businessResponse.selectContacts,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    // 选择联系人    (动态端口  白名单验证)
    Mwap.events.on(Mwap.businessResponse.goBack,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.addServiceItem,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.slidingBack,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.locationPolicy,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.shareStandard,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.recruitAction,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.scanningBluetooth,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.checkBluetoothState,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.openBluetooth,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.atuoDoorBaseInfo,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.openDoor,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.connectBluetooth,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.openWebUrl,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.nearbyFindOne,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.addressBook,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.serviceIndex,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.interestGroup,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.hotspot,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.socialIndex,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.ServiceDisclaimer,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.businessResponse.getResultOfRegistApplication,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.getResultOfCreatingActivity,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.businessResponse.showDateWheel,function(e){
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.onExtend("test",function(e){
        alert("test:::"+JSON.stringify(e));
        console.log("异步返回信息:",JSON.stringify(e));
        //Mwap.console.log("scanQrcode－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.nativeTypes.choosePicture,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("album－n-ok:",e);
        console.log("album－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));

        if(e.value.state=="chooseSinglePicture"){
            $("#img","#page-"+type).css("width","100%");
            $("#img","#page-"+type).attr("src",e.value.data.url);
        }else if(e.value.state=="chooseMultiPictures"){
            var str="";
            var picstr="";
            for(var i=0;i< e.value.data.urls.length;i++){
                picstr +='<li class="gallery-item">';
                picstr +=    '<img src="'+e.value.data.urls[i]+'"/>';
                picstr +='</li>';
            }
            str +='<div data-role="content" data-theme="b">';
            str +=      '<ul class="gallery-entries clearfix">';
            str += picstr;
            str +=      '</ul>';
            str +='</div>';
            $("#page-choosePicture").find(".ui-content").append(str);
        }
    });
    Mwap.events.on(Mwap.nativeTypes.takePhoto,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        //Mwap.console.log("camera－n-ok:",e);
        var type=e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
        $("#img","#page-"+type).css("width","100%");
        $("#img","#page-"+type).attr("src",e.value.data.url);
    });

    Mwap.events.on(Mwap.nativeTypes.getGPSState,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });

    Mwap.events.on(Mwap.nativeTypes.getSinglePicture,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    Mwap.events.on(Mwap.nativeTypes.getLoadParams,function(e){

        console.log("异步返回信息:",JSON.stringify(e));

        var type= e.type.split("::")[1];
        $("#info_async","#page-"+type).text("异步信息:"+JSON.stringify(e));
    });
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    function bindEvents(id){
        console.log("jk:",id);
        switch (id){
            case "page-camera":

             $("#btnCamera0").one("click",function(e){
                 Mwap.events.trigger(Mwap.eventTypes.camera,{nameSpace:"demo.systoon.com",size:"60x60",aspectX:"3",aspectY:"4",xLength:"300",yLength:"400",type:"0"}); //打开相机

             });

//             $("#btnCamera1").one("click",function(e){
//                Mwap.events.trigger(Mwap.eventTypes.camera,{nameSpace:"demo.systoon.com",size:"60x60",aspectX:"3",aspectY:"4",xLength:"300",yLength:"400",type:"1"}); //照相后不裁剪图片  上传原图
//             });

                break;
            case "page-deviceInfo":
                //设备信息
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.deviceInfo,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-location":
                //位置信息
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.locationInfo,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-album":
                //调用系统相册
                $("#btnAlbum0").one("click",function(e){
                    $("[id^='btnAmap']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnbtnAmap0").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.album,{nameSpace:"demo.systoon.com",state:"albumSingleSelect",aspectX:"3",aspectY:"4",xLength:"300",yLength:"400",type:"1"});
                });
                $("#btnAlbum1").one("click",function(e){
                    $("[id^='btnAmap']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnbtnAmap1").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.album,{nameSpace:"demo.systoon.com",state:"albumMultiSelect",dataType:"JSON"});
                });
                break;
            case "page-closeWebview":
                //关闭webview
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.closeWebview,{nameSpace:"demo.systoon.com",resultType:"0"});//关闭页面是否刷新界面
                });
                break;
            case "page-createQrcode":
                //创建二维码
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.createQrcode,{nameSpace:"demo.systoon.com",url:"http://www.syswin.com",QrcodeParam:JSON.stringify({"componentId":"123","componentName":"活动名称","startTime":"123546","endTime":"456465"})});
                });
                break;
            case "page-scanQrcode":
                /*显示二维码*/
                 $("#btnScanQrcode0").one("click",function(e){
                     $("[id^='btnAmap']").each(function(a,b,c){
                         $(this).css("background-color","#f6f6f6");
                     })
                     $("#btnbtnAmap0").css("background-color","rgba(204, 0, 0,0.7)");
                     Mwap.events.trigger(Mwap.eventTypes.scanQrcode,{nameSpace:"demo.systoon.com",isShowLayer:"1",type:0})//是否显示浮层消息//type ="0"  扫描完成后关闭 type ="1"  扫描后在当前页显示结果
                 });

                 $("#btnScanQrcode1").one("click",function(e){
                     Mwap.events.trigger(Mwap.eventTypes.scanQrcode,{nameSpace:"demo.systoon.com",isShowLayer:"1",type:1})//是否显示浮层消息//type ="0"  扫描完成后关闭 type ="1"  扫描后在当前页显示结果 异步返回事件ticketQrcode
                 });
                break;
            case "page-redirect":
                //重定向
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.redirect,{nameSpace:"demo.systoon.com",url:"http://www.syswin.com"});
                });
                break;
            case "page-record":
                $("#btnRecord0").one("click",function(e){
                    $("[id^='btnRecord']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnRecord0").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.record,{nameSpace:"demo.systoon.com",state:"startrecord"});

                });
                //停止录音
                $("#btnRecord1").one("click",function(e){
                    $("[id^='btnRecord']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnRecord1").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.record,{nameSpace:"demo.systoon.com",state:"stoprecord"});
                });
                //播放录音
                $("#btnRecord2").one("click",function(e){
                    $("[id^='btnRecord']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnRecord2").css("background-color","rgba(29, 179, 13, 0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.record,{nameSpace:"demo.systoon.com",state:"startplay",url:window.recordURL||""});
                });
                //停止播放录音
                $("#btnRecord3").one("click",function(e){
                    $("[id^='btnRecord']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnRecord3").css("background-color","rgba(29, 179, 13, 0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.record,{nameSpace:"demo.systoon.com",state:"stopplay"});
                });
                break;
            case "page-amap":
                //地图
                $("#btnAmap0").one("click",function(e){
                    $("[id^='btnAmap']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnbtnAmap0").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.amap,{nameSpace:"demo.systoon.com",state:"amapPOI"});
                });
                $("#btnAmap1").one("click",function(e){
                    $("[id^='btnAmap']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnbtnAmap1").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.amap,{nameSpace:"demo.systoon.com",state:"amapLocation"});
                });
                $("#btnAmap2").one("click",function(e){
                    $("[id^='btnAmap']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnbtnAmap2").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.amap,{nameSpace:"demo.systoon.com",state:"amapScreenShot"});
                });
                $("#btnAmap3").one("click",function(e){
                    $("[id^='btnAmap']").each(function(a,b,c){
                        $(this).css("background-color","#f6f6f6");
                    })
                    $("#btnbtnAmap3").css("background-color","rgba(204, 0, 0,0.7)");
                    Mwap.events.trigger(Mwap.eventTypes.amap,{nameSpace:"demo.systoon.com",state:"amapGetDistance",
                        data: {
                            "positionList": [
                                {
                                    "startLatitude": "1.1",
                                    "startLongitude": "1.1",
                                    "endLatitude": "1.1",
                                    "endLongitude": "1.1"
                                },
                                {
                                    "startLatitude": "1.1",
                                    "startLongitude": "1.1",
                                    "endLatitude": "1.1",
                                    "endLongitude": "1.1"
                                },
                                {
                                    "startLatitude": "1.1",
                                    "startLongitude": "1.1",
                                    "endLatitude": "1.1",
                                    "endLongitude": "1.1"
                                },
                                {
                                    "startLatitude": "1.1",
                                    "startLongitude": "1.1",
                                    "endLatitude": "1.1",
                                    "endLongitude": "1.1"
                                }
                            ]
                        }
                    });
                });
                break;
            case "page-shake":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.shake,{nameSpace:"demo.systoon.com"});
                });

                break;
            case "page-screenShot":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.screenShot,{nameSpace:"demo.systoon.com",startX:"10",startY:"10",width:"200",height:"200"});
                });
                break;
            case "page-contact":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.contact,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-phone":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.phone,{nameSpace:"demo.systoon.com",phoneNumber:"95533"});
                });
                break;
            case "page-message":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.message,{nameSpace:"demo.systoon.com",phoneNumber:"95533"});
                });
                break;
            case "page-upLoad":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.upLoad,{nameSpace:"demo.systoon.com",url:"http://www.syswin.com"});
                });
                break;
            case "page-alert":
                //地图
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.alert,{nameSpace:"demo.systoon.com",content:new Date().toString()});
                });
                break;
            case "page-createEnterprise":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createEnterprise,{nameSpace:"demo.systoon.com",content:new Date().toString()});
                });
                break;
            case "page-PopWindow":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.popWindow,{nameSpace:"demo.systoon.com",isShowAll:"1"});
                });
                break;
            case "page-install":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.install,{nameSpace:"demo.systoon.com",stoid:"123"});//stoid:插件id
                });
                break;
            case "page-createShowBlock":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createShowBlock,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-friendList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.friendList,{nameSpace:"demo.systoon.com"});
                });
                break;
            /*
             case "page-database":
             $("#btn","#"+id).one("click",function(e){
             Mwap.events.trigger(Mwap.businessRequest.database,{nameSpace:"demo.systoon.com"});
             });
             break;*/
            case "page-pluginBridge":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.pluginBridge,{nameSpace:"webGeneral.showBlock.dev.systoon.com","url":"RframeWorkTestActive.html","params":{"key1":"value1","key2":"value2"},"goBack":false});
                });
                break;
            case "page-callFrame":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.callFrame,{myFeedId:'39131',toonId:"39131",showType:'4'});//mycardId--自己的名片id toonid--要跳转的名片id showtype-跳转类型
                });
                break;
            case "page-createGroup":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createGroup,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-createCard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createCard,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-createEvent":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createEvent,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-createOrganization":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createOrganization ,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-validate":
                $("#btn","#"+id).one("click",function(e){
                    var appId="";
                    var secret="";
                    var vparams = JSON.parse(localStorage.getItem('loadParams'));
                    if(!vparams.value.data.pluginInstance && !vparams.value.data.appInstance){
                        alert("出错了!");
                        return false;
                    }else if(vparams.value.data.pluginInstance && vparams.value.data.appInstance){
                        alert("插件和应用只能从属一个");
                        return false;
                    }else{
                        var instance = vparams.value.data.pluginInstance || vparams.value.data.appInstance;
                        if(instance.framePluginId){
                            appId = instance.framePluginId;
                            secret = instance.pluginCode;
                        }else if(instance.pluginCode){
                            appId = instance.appId;
                            secret = instance.pluginCode;
                        }else{
                            appId = instance.appId;
                            secret = instance.appCode;
                        }
                    }
                    Mwap.events.trigger(Mwap.businessRequest.validate,{nameSpace:"demo.systoon.com",appId:appId,secret:secret});//pluginInstance中appId与framePluginId必须填一个，其余必填
                });
                break;
            case "page-navigationItem":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.navigationItem,{nameSpace:"demo.systoon.com","leftText":" < ","titleText":"图文编辑","rightText":"确定","bgColor":"0x12345678","isNavigationShow":"1","isChangeCardShow":"1",cardInfo:"cardInfo",backTitle:"我",statusBarColor:"0xe14748"});//isNavigationShow导航栏是否显示  1显示  0隐藏,isChangeCardShow切换名片是否展示  1显示  0隐藏
                });
                break;
            case "page-datePicker":

                $("#btnDatePicker0").one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.datePicker,{nameSpace:"demo.systoon.com",times:1,type:'0'});//times 次数 开始时间 0结束时间  0只调用日期控件  1调用日期控件和时间控件
                });

                $("#btnDatePicker1").one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.datePicker,{nameSpace:"demo.systoon.com",times:1,type:'1'});//times 次数 开始时间 0结束时间  0只调用日期控件  1调用日期控件和时间控件
                });
                break;
            case "page-dnsResolve":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.dnsResolve,{nameSpace:"demo.systoon.com",dns:"api.plugin.systoon.com"});
                });
                break;
            case "page-changeCard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.changeCard,{nameSpace:"demo.systoon.com",position:'44'});
                });
                break;
            case "page-getGPSState":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.getGPSState,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-goToGPSSetting":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.goToGPSSetting,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-downloadFile":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.downloadFile,{nameSpace:"demo.systoon.com",stoid:"cb9df94d1c0ebb12a679070b8c030bd71001"});// state表示状态 有三种状态：0：已存在  1：下载中 2：下载完成 3.下载失败。
                });
                break;
            case "page-checkout":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.checkout,{nameSpace:"demo.systoon.com","companyCode":"10001","sign":"5b8596c4a5c891c86b5357c97e558cb9","orderId":"20150609100800018","busiCode":"companySelfBusiCode","cUserId":"C0000050","payChannel":"1002","orderValue":"10.0","payValue":"9.0","coinType":"2","exchangeType":"1","goodsName":"\u6d4b\u8bd5\u6d88\u8d39\u901a\u5b9d","goodsDes":"\u6d4b\u8bd5\u6d88\u8d39\u901a\u5b9d","icon":"","notifyUrl":"http:\/\/www.baidu.com"});
                });
                break;
            case "page-groupChat":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.groupChat,{nameSpace:"demo.systoon.com",groupId:1,feedId:1,backToPrev:true});//true为返回上一个页面，也就是你们的插件
                });
                break;
            case "page-singleChat":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.singleChat,{nameSpace:"demo.systoon.com",friendFeedId:1,selfFeedId:1,backToPrev:true});//true为返回上一个页面，也就是你们的插件
                });
                break;
            case "page-dataFromH5":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.dataFromH5,{nameSpace:"demo.systoon.com",resultType:"0",h5ItemName:"accept"});
                });
                break;
            case "page-wheel":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.wheel,{nameSpace:"demo.systoon.com",
                        data: {
                            level:"3",//有多少节点数据
                            list:[
                                {
                                    "content": "北京",
                                    "list": [
                                        { "content": "朝阳区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "海淀区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "东城区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "西城区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]}]
                                },
                                {
                                    "content": "北京",
                                    "list": [{
                                        "content": "朝阳区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "海淀区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "东城区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "西城区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]}]
                                },
                                {
                                    "content": "北京",
                                    "list": [{
                                        "content": "朝阳区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "海淀区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "东城区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]},
                                        { "content": "西城区", "list": ["望京", "南磨房地区", "高碑店地区", "将台地区", "太阳宫地区", "小红门地区", "十八里店地区"]}]
                                }
                            ]
                        }
                    });
                });
                break;
            case "page-openUrl":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openUrl,{nameSpace:"demo.systoon.com",url:"http://www.baidu.com"});
                });
                break;
            case "page-feedDescription":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.feedDescription,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getPraiseCommentNum":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getPraiseCommentNum,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getPraiseCommentList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getPraiseCommentList,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getDefaultCard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getDefaultCard,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getToonPayBalance":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getToonPayBalance,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-ticketQrcodeResult":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.ticketQrcodeResult,{nameSpace:"demo.systoon.com",hint:"结果标题（第一行显示显示的内容）",hintContent:"结果详情（第二行显示的内容）",type:"1"});//1通过2未通过3已使用
                });
                break;
            case "page-clipBoard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.clipBoard,{nameSpace:"demo.systoon.com",content:"需要复制的内容"});
                });
                break;

            case "page-getConnectedState":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.getConnectedState,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-amapGetLocation":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.amapGetLocation,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-webPageJumpToNative":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.webPageJumpToNative,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getNavigationItemTitle":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.getNavigationItemTitle,{nameSpace:"demo.systoon.com",title:"测试标题"});
                });
                break;
            case "page-databases_createGroup":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.databases_createGroup,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-toon_map":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.toon_map,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentPraiseNumber":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentPraiseNumber,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentCommentNumber":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentCommentNumber,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentPraiseStatus":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentPraiseStatus,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentCommentList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentCommentList,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentPraise":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentPraise,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentComment":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentComment,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentGetFeed":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentGetFeed,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentRefer":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentRefer,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentCollect":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentCollect,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-dataEmbedding":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.dataEmbedding,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-key_back":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessResponse.key_back,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-sharePlugin":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.sharePlugin,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-contentLikeList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.contentLikeList,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-functionRegister":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.functionRegister,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-organizCommunication":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.organizCommunication,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-notificationCenter":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.notificationCenter,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getSocialInfo":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getSocialInfo,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-singleChatList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.singleChatList,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-groupChatList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.groupChatList,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-teardownSocketThenStopChatting":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.teardownSocketThenStopChatting,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-getUserAllCardsInfo":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getUserAllCardsInfo,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-launchMessageAndHtmlPage":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.launchMessageAndHtmlPage,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-transferMatchedFeedId":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.transferMatchedFeedId,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-packUpGamingView":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.packUpGamingView,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-endGamingView":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.endGamingView,{nameSpace:"demo.systoon.com"});
                });
                break;
            //case "page-routerToAddress":
            //    $("#btn","#"+id).one("click",function(e){
            //        Mwap.events.trigger(Mwap.eventTypes.routerToAddress,{nameSpace:"demo.systoon.com"});
            //    });
            //    break;
            case "page-getAuthKey":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.getAuthKey,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-shareToThird":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.shareToThird,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-toRecord":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.toRecord,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-softpanHeight":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.softpanHeight,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-clickRightButton":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.clickRightButton,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-recordCancel":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.recordCancel,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-jumpToComplaintPage":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.jumpToComplaintPage,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-getBatchSocialProperty":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getBatchSocialProperty,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-getAllGroupInfo":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getAllGroupInfo,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-isGroupOwner":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.isGroupOwner,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-jumpToApplication":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.jumpToApplication,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-startPlay":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.startPlay,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-stopPlay":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.stopPlay,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-dnsResolveAll":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.dnsResolveAll,{nameSpace:"demo.systoon.com",dns:"api.plugin.systoon.com"});
                });
                break
            case "page-getBatchGroupInfo":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getBatchGroupInfo,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-clickLeftButton":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.clickLeftButton,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-chatWithStranger":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.chatWithStranger,{nameSpace:"demo.systoon.com"});
                });
                break

            case "page-openCardHeadSetting":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openCardHeadSetting,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-supplementSocialProperty":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.supplementSocialProperty,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-chooseCard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.chooseCard,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-interactiveFrame":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.interactiveFrame,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-playSoundEffect":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.playSoundEffect,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-wordsFromH5ToChat":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.wordsFromH5ToChat,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-notifyRefresh":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.notifyRefresh,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-openMapWithDesignatedAddress":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openMapWithDesignatedAddress,{nameSpace:"demo.systoon.com"});
                });
                break
            /*case "page-createCard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createCard,{nameSpace:"demo.systoon.com"});
                });
                break*/
            case "page-openDownloadOrigin":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openDownloadOrigin,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-personInfoPage":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.personInfoPage,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-disturbGame":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.disturbGame,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-countdownEnd":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.countdownEnd,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-getCardInfoOfServiceParty":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getCardInfoOfServiceParty,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-ChooseServiceClassification":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.ChooseServiceClassification,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-createGroupChat":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.createGroupChat,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-thoroughlyEndGame":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.thoroughlyEndGame,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-releaseGame":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.releaseGame,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-getRecommendServiceList":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getRecommendServiceList,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-otherServicePeople":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.otherServicePeople,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-toOriginPicture":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.toOriginPicture,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-toonPay":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.toonPay,{nameSpace:"demo.systoon.com"});
                });
                break;
            case "page-updateLocalPluginDb":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.updateLocalPluginDb,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-checkoutPayCash":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.checkoutPayCash,{
                        nameSpace:"demo.systoon.com",
                        data:{"merName":"merName","subject":"subject","body":"body"}
                    });
                });
                break
            case "page-areFriendOfTwoCards":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.areFriendOfTwoCards,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-selectContacts":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.selectContacts,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-goBack":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.goBack,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-addServiceItem":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.addServiceItem,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-slidingBack":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.slidingBack,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-locationPolicy":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.locationPolicy,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-shareStandard":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.shareStandard,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-recruitAction":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.recruitAction,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-connectBluetooth":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.connectBluetooth,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-openDoor":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openDoor,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-atuoDoorBaseInfo":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.atuoDoorBaseInfo,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-openBluetooth":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openBluetooth,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-checkBluetoothState":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.checkBluetoothState,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-scanningBluetooth":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.scanningBluetooth,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-openWebUrl":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.openWebUrl,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-nearbyFindOne":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.nearbyFindOne,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-addressBook":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.addressBook,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-serviceIndex":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.serviceIndex,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-socialIndex":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.socialIndex,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-interestGroup":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.interestGroup,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-hotspot":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.hotspot,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-ServiceDisclaimer":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.ServiceDisclaimer,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-getResultOfRegistApplication":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getResultOfRegistApplication,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-getResultOfCreatingActivity":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.getResultOfCreatingActivity,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-showDateWheel":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.businessRequest.showDateWheel,{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-test":
                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.triggerExtend("test",{nameSpace:"demo.systoon.com"});
                });
                break
            case "page-takePhoto":

                $("#btnTakePhoto0").one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.takePhoto,{nameSpace:"demo.systoon.com",type:'0',ratio:"0.2"});
                });

                $("#btnTakePhoto1").one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.takePhoto,{nameSpace:"demo.systoon.com",type:'1',ratio:"0.2"});
                });
                break;
            case "page-choosePicture":

                $("#btnChoosePicture0").one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.choosePicture,{nameSpace:"demo.systoon.com",state:"pictureSingleSelect",type:'0',ratio:"0.2"});
                });

                $("#btnChoosePicture1").one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.choosePicture,{nameSpace:"demo.systoon.com",state:"pictureMultiSelect",type:'1',ratio:"0.2"});
                });
                break;
            case "page-getSinglePicture":

                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.getSinglePicture,{nameSpace:"demo.systoon.com",size:"60x60",aspectX:"3",aspectY:"4",xLength:"300",yLength:"400",type:"0"});
                });

                break;
            case "page-getLoadParams":

                $("#btn","#"+id).one("click",function(e){
                    Mwap.events.trigger(Mwap.eventTypes.getLoadParams,{nameSpace:"demo.systoon.com",type:'1',ratio:"0.2"});
                });

                break;
        }
    }

    function showPage(id){
        //console.log("-----:",id)
        var $page=$("#"+id);
        var $content=$(".ui-content","#"+id);

        if($page.data("oldpage")&&$page.data("oldpage")[0]){
            ///console.log("ok1:",$page.data("oldpage")[0]);
            $content.remove();
            $page.append($page.data("oldpage").clone()[0]);
        }else{
            ///console.log("ok2:",$page,id);
            $page.data("oldpage",$content.clone());

        }
        $("#"+id).find("[data-role=button]").each(function(i,v){

            if(i > 0&& v.id.indexOf("Record")==-1&&v.id.indexOf("Amap")==-1&&v.id.indexOf("Album")==-1&&v.id.indexOf("ScanQrcode")==-1&&v.id.indexOf("DatePicker")==-1&&v.id.indexOf("Camera")==-1 && v.id.indexOf("TakePhoto")==-1 && v.id.indexOf("ChoosePicture")==-1){
                bindEvents(id);
            }
        });
        // bindEvents("#"+$(id).find("[data-role=button]")[1].id);
    }
    $(function(){
        $("li","#main").each(function(index,item){
            //console.log("okk:",item,index);
            var $page=$($("#pageMode").html());
            var a=item.getElementsByTagName("a")[0];
            $page[0].id=a.href.split("#")[1];
            $page.find("#title").text($(a).text());

            if($page[0].id=="page-album"){
                var btn=''+
                    '<a data-role="button" id="btnAlbum0" href="#">相册单选</a>'+
                    '<a data-role="button" id="btnAlbum1" href="#">相册多选</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }
            if($page[0].id=="page-record"){
                var btn='<a data-role="button" id="btnRecord0" href="#">录音</a>'+
                    '<a data-role="button" id="btnRecord1" href="#">停止录音</a>'+
                    '<a data-role="button" id="btnRecord2" href="#">播放</a>'+
                    '<a data-role="button" id="btnRecord3" href="#">停止播放</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }
            if($page[0].id=="page-amap"){
                var btn=''+
                    '<a data-role="button" id="btnAmap0" href="#">地图POI</a>'+
                    '<a data-role="button" id="btnAmap1" href="#">地图位置</a>'+
                    '<a data-role="button" id="btnAmap2" href="#">地图截屏</a>'+
                    '<a data-role="button" id="btnAmap3" href="#">地图两点间距离</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }
            if($page[0].id=="page-scanQrcode"){
                var btn='<a data-role="button" id="btnScanQrcode0" href="#">扫描完成后关闭</a>'+
                    '<a data-role="button" id="btnScanQrcode1" href="#">扫描后在当前页显示结果</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }
            if($page[0].id=="page-datePicker"){
                var btn='<a data-role="button" id="btnDatePicker0" href="#">只调用日期控件</a>'+
                    '<a data-role="button" id="btnDatePicker1" href="#">调用日期控件和时间控件</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }
//            if($page[0].id=="page-camera"){
//                var btn='<a data-role="button" id="btnCamera0" href="#">照相后裁剪图片</a>'+
//                    '<a data-role="button" id="btnCamera1" href="#">上传原图</a>'
//
//                $page.find(".ui-content").append(btn);
//                $("#btn",$page).hide();
//            }
            if($page[0].id=="page-takePhoto"){
//                var btn='<a data-role="button" id="btnTakePhoto0" href="#">照相后裁剪图片</a>'+
//                    '<a data-role="button" id="btnTakePhoto1" href="#">上传原图</a>'
                var btn='<a data-role="button" id="btnTakePhoto0" href="#">打开相机</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }
            if($page[0].id=="page-choosePicture"){
                var btn=''+
                    '<a data-role="button" id="btnChoosePicture0" href="#">相册单选</a>'+
                    '<a data-role="button" id="btnChoosePicture1" href="#">相册多选</a>'

                $page.find(".ui-content").append(btn);
                $("#btn",$page).hide();
            }

            $("body").append($page);
        });


        $(document).on("pageinit","#main",function () {
            $("li","#main").each(function(index,item) {
                var id=item.getElementsByTagName("a")[0].href.split("#")[1];

                $("#"+id).on("pageshow", function (event, ui) {
                    showPage($(this)[0].id);
                });
            });
        })



    })

})();
//var e = document.createEvent('Event');
//e.data={ 'data': {url:'http://www.baidu.com'}};
//e.initEvent('systoon:native::upLoad',false,true);
//document.dispatchEvent(e)

//(function(){
//
//    alert("通过url地址传参:"+location.href);
//    var e = document.createEvent('Event');
//
//
//    e.initEvent('systoon:native::loadParams',false,true);
//    document.dispatchEvent(e);
//
//    /*setTimeout(function(){
//
//    },2000);*/
//
//
//})();



