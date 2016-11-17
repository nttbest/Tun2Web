//
//  TNBUrlDefines.h
//  ToonBrowser
//
//  Created by kevinma on 15/10/21.
//  Copyright © 2015年 kevinma. All rights reserved.
//

#ifndef TNBUrlDefines_h
#define TNBUrlDefines_h

#pragma mark - Request URL 

#define SCLOUND_BASEURL                             @"toon.scloud.systoon.com"
#define SYNMOBILE_BASEURL                           @"synmobile.systoon.com"
#define OPEN_BASEURL                                @"open.systoon.com"
#define WHITE_ROSTER_BASE_URL                       @"api.plugin.systoon.com"


//获取白名单列表接口 已废弃
#define WHITE_ROSTER_GET_URL                        @"/getBizServiceStatus"

//上传云存储 (图片，日志文件)
#define SCLOUND_UPLOAD_URL                          @"/requestUpload"

//获取插件下载的地址 已废弃
#define SCLOUND_DOWNLOAD_URL                        @"/requestDownload"

//告知服务器下载插件信息(订阅插件)
#define SYNMOBILE_SUBSCRIBETOSERVER                 @"/saveInstallServiceUserInfo"

//插件部署成功回执同步中心
#define SYNMOBILE_SAVESYNCITEMVERSIONUSERINFO       @"/saveSyncItemVersionUserInfo"

//上传日志接口（有可能）
#define OPEN_SYSTOON_UPDATELOG_URL                  @"/site/open/logupload/saveLogRecord"

//获取动态端口接口
#define SYNMOBILE_GETIPINFO                         @"/getIpInfo"

/*同步中心用到的接口 获取所有插件的版本信息，查看是否需要更新
 #define SYNMOBILE_BASEURL                      @"synmobile.systoon.com"
 #define SYNMOBILE_CHECKALLSYNCITEMVERSIONS     @"/checkAllSyncItemVersions"
 */

#endif
