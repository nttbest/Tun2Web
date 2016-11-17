//
//  KMWebService.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/21.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMWebService.h"
#import "TNBHTTPServer.h"
#import "KMFileManager.h"

@interface KMWebService ()
@property (nonatomic, readwrite, copy) NSString *demoPath;
@end

@implementation KMWebService
SINGLETON_FOR_CLASS(KMWebService);

#pragma mark - private methods

- (TNBHTTPServer *)httpServer{
    static TNBHTTPServer *httpServer;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        httpServer = TNBHTTPServer.new;
    });
    return httpServer;
}

- (NSDictionary *)nameSpaceDict{
    static NSDictionary *dict;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        dict = @{KEY_MWAP_SERVICE_DEMO_PATH:MWAP_SERVICE_DEMO_PATH};
    });
    return dict;
}

- (void)serviceStartWithUpdataFlag:(BOOL)isUpdate{
    UIViewController *vc = [UIWindow currentViewController];
    [KDProgressHUD showHUDAddedTo:vc.view animated:YES];
    
    [self.httpServer start];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0), ^{
        [self setUpPluginWithUpdateFlag:isUpdate];
        dispatch_async(dispatch_get_main_queue(), ^{
            self.demoPath = [DOMAIN_PATH stringByAppendingPathComponent:[self.nameSpaceDict objectForKey:KEY_MWAP_SERVICE_DEMO_PATH]];
            KDClassLog(@"Tun2Web资源加载完成");
            [KDProgressHUD hideHUDForView:vc.view animated:YES];
        });
    });
}

- (void)serviceTeardown
{
    [self.httpServer teardown];
}

- (void)setUpPluginWithUpdateFlag:(BOOL)flag{
    
    //1.创建systoon文件
    [KMFileManager createDirectoryAtPath:SYSTOON_PATH];
    if (flag) {
        //2.如果domain文件存在,先删除
        [KMFileManager removeItemAtPath:DOMAIN_PATH];
        
        //3.拷贝domain文件
        [KMFileManager copyDomainDirectory];
    }else{
        if (![[NSFileManager defaultManager] fileExistsAtPath:DOMAIN_PATH]){
            //4.如果文件夹不存在则进行拷贝
            [KMFileManager copyDomainDirectory];
        }
    }
}
@end
