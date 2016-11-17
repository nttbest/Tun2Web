//
//  TNBJSEventNameDefine.h
//  ToonBrowser
//
//  Created by kevinma on 15/9/23.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#ifndef ToonBrowser_TNBJSEventNameDefine_h
#define ToonBrowser_TNBJSEventNameDefine_h


#pragma mark - JS交互native事件名

#define TAKEPHOTO                                   @"systoon:native::takePhoto"                               //相机     新版
#define CHOOSESINGLEPICTURE                         @"systoon:native::chooseSinglePicture"                     //相册单选  新版
#define CHOOSEMULTIPICTURES                         @"systoon:native::chooseMultiPictures"                     //相册多选  新版
#define GETSINGLEPICTURE                            @"systoon:native::getSinglePicture"                        //弹出ActionSheet选择框

#define ALBUMSINGLESELECT                           @"systoon:native::albumSingleSelect"                       //相册单选
#define UPLOADSTATE                                 @"systoon:native::uploadState"                             //数据上传状态
#define ALBUMMULTISELECT                            @"systoon:native::albumMultiSelect"                        //相册多选
#define AMAPGETLOCATION                             @"systoon:native::amapGetLocation"                         //toon地图获取位置
#define AMAP                                        @"systoon:native::amap"                                    //本地地图
#define AMAPPOI                                     @"systoon:native::amapPOI"                                 //本地地图POI
#define CAMERA                                      @"systoon:native::camera"                                  //相机
#define CREATEQRCODE                                @"systoon:native::createQrcode"                            //生成二维码
#define DATAPICKER                                  @"systoon:native::datePicker"                              //时间选择器
#define DOWNLOADFILE                                @"systoon:native::downloadFile"                            //下载文件
#define GETCONNECTEDSTATE                           @"systoon:native::getConnectedState"                       //获取网络连接状态
#define SCANQRCODE                                  @"systoon:native::scanQrcode"                              //扫描二维码
#define TICKETQRCODE                                @"systoon:native::ticketQrcode"                            //门票二维码
#define UPLOAD                                      @"systoon:native::upLoad"                                  //上传文件
#define WHEEL                                       @"systoon:native::wheel"                                   //数据选择器
#define ROUTERTOADDRESS                             @"systoon:native::routerToAddress"                         //H5路由转换
#define GETAUTHKEY                                  @"systoon:native::getAuthKey"                              //H5获取authKey
#define DNSRESOLVE                                  @"systoon:native::dnsResolve"                              //H5获取dns解析结果
#define STARTPLAYAUDIO                              @"systoon:native::startPlayAudio"                          //播放网络amr语音
#define PLAYAUDIOFINISHED                           @"systoon:native::playAudioFinished"                       //播放网络amr语音
#define DNSRESOLVEALL                               @"systoon:native::dnsResolveAll"                           //H5批量获取dns
#define TOONPAY                                     @"systoon:native::toonPay"                                 //支付接口

#define STANDARD_SHARE_COLLECT                                     @"systoon:native::shareCollect"                            //分享收藏

#pragma mark - JS交互business事件名
#define DATABASE                                    @"systoon:business::database"
#define FRIENDLIST                                  @"systoon:business::friendList"
#define TOON_MAP                                    @"systoon:business::toon_map"                           //打开地图定位
#define CONTENTPRAISENUMBER                         @"systoon:business::contentPraiseNumber"                //内容_朋友圈查询某一rss点赞数
#define CONTENTCOMMENTNUMBER                        @"systoon:business::contentCommentNumber"               //内容_朋友圈查询某一rss评论数
#define CONTENTPRAISESTATUS                         @"systoon:business::contentPraiseStatus"                //内容_朋友圈查询某一rss点赞状态
#define CONTENTCOMMENTLIST                          @"systoon:business::contentCommentList"                 //内容_朋友圈查询某一rss评论列表
#define CONTENTPRAISE                               @"systoon:business::contentPraise"                      //内容_朋友圈发起点赞
#define CONTENTCOMMENT                              @"systoon:business::contentComment"                     //内容_朋友圈发起评论
#define CONTENTGETFEED                              @"systoon:business::contentGetFeed"                     //内容_根据feedId返回feed详情
#define CONTENTREFER                                @"systoon:business::contentRefer"                       //内容_转发
#define CONTENTCOLLECT                              @"systoon:business::contentCollect"                     //内容_收藏
#define SHAREPLUGIN                                 @"systoon:business::sharePlugin"                        //内容_分享插件
#define CONTENTLIKELIST                             @"systoon:business::contentLikeList"                    //内容_获取点赞列表
#define FUNCTIONREGISTER                            @"systoon:business::functionRegister"                   //内容_注册方法
#define ENTERPRISE                                  @"systoon:business::enterprise"
#define INSTALL                                     @"systoon:business::install"
#define SPECIAL_BACK                                @"systoon:business::special_back"
#define IP_PORT                                     @"systoon:business::ip_port"                            //链路安全,告知H5,IP跟端口
#define ORGANIZCOMMUNICATION                        @"systoon:business::organizCommunication"               //地产通_跳组织通讯录
#define NOTIFICATIONCENTER                          @"systoon:business::notificationCenter"                 //地产通_跳通知中心
#define SINGLECHATLIST                              @"systoon:business::singleChatList"                     //地产通_跳通单聊列表
#define GROUPCHATLIST                               @"systoon:business::groupChatList"                      //地产通_跳通群聊列表
#define GETUSERALLCARDSINFO                         @"systoon:business::getUserAllCardsInfo"                //十点有约_获取用户的所有名片详细信息
#define LAUNCHMESSAGEANDHTMLPAGE                    @"systoon:business::launchMessageAndHtmlPage"           //十点有约_进入匿名聊天页面(默认添加浮层H5页面)
#define GETSOCIALINFO                               @"systoon:business::getSocialInfo"                      //十点有约_获取社交属性
#define TRANSFERMATCHEDFEEDID                       @"systoon:business::transferMatchedFeedId"              //十点有约_H5给原生传递匹配成功的用户的FeedId
#define TEARDOWNSOCKETTHENSTOPCHATTING              @"systoon:business::teardownSocketThenStopChatting"     //十点有约_断开游戏链接后结束聊天
#define PACKUPGAMINGVIEW                            @"systoon:business::packUpGamingView"                   //十点有约_收起游戏视图
#define ENDGAMINGVIEW                               @"systoon:business::endGamingView"                      //十点有约_结束游戏页面
#define SHARETOTHIRD                                @"systoon:business::shareToThird"                       //第三方分享
#define TORECORD                                    @"systoon:business::toRecord"                           //调用录音界面
#define JUMPTOCOMPLAINTPAGE                         @"systoon:business::jumpToComplaintPage"                //服务_跳转投诉界面
#define GETBATCHSOCIALPROPERTY                      @"systoon:business::getBatchSocialProperty"             //十点有约_批量获取社交信息的FeedId
#define GETALLGROUPINFO                             @"systoon:business::getAllGroupInfo"                    //十点有约_获取当前用户的所有群组信息
#define ISGROUPOWNER                                @"systoon:business::isGroupOwner"                       //十点有约_是否是群主
#define JUMPTOAPPLICATION                           @"systoon:business::jumpToApplication"                  //十点有约_跳转到应用
#define GETBATCHGROUPINFO                           @"systoon:business::getBatchGroupInfo"                  //十点有约_批量获取群组信息
#define CHATWITHSTRANGER                            @"systoon:business::chatWithStranger"                   //服务_跳转陌生人聊天





#endif









