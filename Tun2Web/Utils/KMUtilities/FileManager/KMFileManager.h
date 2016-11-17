//
//  KMFileManager.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KMFileManager : NSObject

+ (NSURL *)fileUrlWithNameSpace:(NSString *)nameSpace filePath:(NSString *)filePath;
+ (NSURL *)verifyFileUrlWithFilePath:(NSString *)filePath;

+ (void)createDirectoryAtPath:(NSString *)path;
+ (void)removeItemAtPath:(NSString *)path;
+ (void)copyDomainDirectory;

@end
