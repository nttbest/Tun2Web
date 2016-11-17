//
//  KMFileManager.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMFileManager.h"

@implementation KMFileManager

+ (NSURL *)fileUrlWithNameSpace:(NSString *)nameSpace filePath:(NSString *)filePath
{
    NSString *path = [NSHomeDirectory() stringByAppendingPathComponent:[NSString stringWithFormat:@"%@/%@/%@",NameSpaceDomainPath, nameSpace,filePath]];
    
    if (nameSpace != nil && filePath != nil && nameSpace.length > 0 && filePath.length > 0) {
        
        NSArray *seperatArray = [path componentsSeparatedByString:@"?"];
        
        NSString *preString = [seperatArray firstObject];
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:preString]) {
            
            NSString *endcodeUrl = [path stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            return [NSURL fileURLWithPath:endcodeUrl];
        }
    }
    return nil;
}

+ (NSURL *)verifyFileUrlWithFilePath:(NSString *)filePath
{
    //若fullPath为空或者文件找不到，全返回nil，并抛出error
    if(filePath && filePath.length > 0){
        NSArray *seperatArray = [filePath componentsSeparatedByString:@"?"];
        NSString *preString = [seperatArray firstObject];
        if ([[NSFileManager defaultManager] fileExistsAtPath:preString]) {
            NSString *endcodeUrl = [filePath stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            return [NSURL fileURLWithPath:endcodeUrl];
        }
    }
    return nil;
}

+ (void)createDirectoryAtPath:(NSString *)path{
    
    NSError *error;
    if (![[NSFileManager defaultManager] fileExistsAtPath:path])
    {
        if (![[NSFileManager defaultManager] createDirectoryAtPath:path
                                       withIntermediateDirectories:NO
                                                        attributes:nil
                                                             error:&error])
        {
            KDClassLog(@"Create %@ error:%@",path,error);
        }
    }
}

+ (void)removeItemAtPath:(NSString *)path{
    
    NSError *error;
    if ([[NSFileManager defaultManager] fileExistsAtPath:path]){
        
        if (![[NSFileManager defaultManager] removeItemAtPath:path
                                                        error:&error]) {
            KDClassLog(@"remove %@ error:%@",path,error);
        }
    }
}

+ (void)copyDomainDirectory{
    
    NSString *fromPath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"domain"];
    
    NSError *error;
    if (![[NSFileManager defaultManager] copyItemAtPath:fromPath
                                                 toPath:DOMAIN_PATH
                                                  error:&error]) {
        KDClassLog(@"copy %@ error:%@",DOMAIN_PATH,error);
    }
}

@end
