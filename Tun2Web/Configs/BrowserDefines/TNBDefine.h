//
//  TNBDefine.h
//  ToonBrowser
//
//  Created by kevinma on 15/4/11.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#ifndef ToonBrowser_LWDefine_h
#define ToonBrowser_LWDefine_h

#define TNBKEY_APPKEY            @"TNBKEY_APPKEY"
#define TNBAMAP_KEY              @"c3159e6d292b4fd9e6af65a3e0234883"


#pragma mark - Plugin UserDefault Key
#define PLUGINUSERDEFAULTKEY           @"PLUGINUSERDEFAULTKEY"
#define USER_DEFAULT [NSUserDefaults standardUserDefaults]
#define DATA_MANAGER [TNBDataCacheManager sharedInstance]
#define DATA_ENV     [TNBDataEnvironment sharedInstance]



#define BASE_LOGINUSERID        @"BASE_LOGINUSERID"
#define BASE_TOKENSTRING        @"BASE_TOKENSTRING"
#define BASE_NAMESPACEMODEL     @"BASE_NAMESPACEMODEL"



#pragma mark - color functions
#define RGBCOLOR(r,g,b) [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:1]
#define RGBACOLOR(r,g,b,a) [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:(a)]
#define RANDOMCOLOR() RGBCOLOR(rand()%256, rand()%256, rand()%256)

#define ScreenBoundWith [UIScreen mainScreen].bounds.size.width
#define ScreenBoundHeight [UIScreen mainScreen].bounds.size.height

#define H(f)            (ScreenBoundHeight == 480?568:ScreenBoundHeight)/568*(f)
#define W(f)            ScreenBoundWith/320*(f)


#define SHOULDOVERRIDE(basename, subclassname){ NSAssert([basename isEqualToString:subclassname], @"subclass should override the method!");}


#pragma mark - Deploy path
#define HomeDirectory         NSHomeDirectory()
#define NameSpaceDownloadPath @"Library/systoon/download"
#define NameSpaceDomainPath   @"Library/systoon/domain"

#define DOCUMENT_PATH [[UIApplication sharedApplication] libraryPath]
#define SYSTOON_PATH [DOCUMENT_PATH stringByAppendingPathComponent:@"systoon"]
#define DOMAIN_PATH [SYSTOON_PATH stringByAppendingPathComponent:@"domain"]

#pragma mark - Deploy params
#define K_nameSpace             @"nameSpace"
#define K_version               @"version"
#define K_stoid                 @"stoid"
#define K_clientIp              @"clientIp"
#define K_returnType            @"returnType"

#define DOWNLOAD_DONE_NOTIFICATION @"download_done_notification"
#define DOWNLOAD_FAILED_NOTIFICATION @"download_failed_notification"

#pragma mark - white roster list

#define WHITE_ROSTER_DEFAULT_KEY   @"whiteRosterDefaultKey"
#define WHITE_ROSTER_USERTOKEN_KEY    @"userTokenForWhiteTRoster"
#define WHITE_ROSTER_VERSION_KEY  @"whiteRosterVersionKey"

#pragma mark - share standard DataKey

#define SHARE_STANDARD_DATA_KEY    @"shareStandardDataKey"

#endif



























