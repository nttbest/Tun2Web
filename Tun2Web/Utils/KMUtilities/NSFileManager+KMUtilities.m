//
//  NSFileManager+KMUtilities.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "NSFileManager+KMUtilities.h"
#include <sys/xattr.h>
#import <CommonCrypto/CommonDigest.h>

@implementation NSFileManager (KMUtilities)

+ (long long) fileSizeAtPath:(NSString*) filePath{
    NSFileManager* manager = [NSFileManager defaultManager];
    if ([manager fileExistsAtPath:filePath]){
        return [[manager attributesOfItemAtPath:filePath error:nil] fileSize];
    }
    return 0;
}

+ (BOOL)removeItemAtPath:(NSString *)path{
    
    NSError *error;
    if ([[NSFileManager defaultManager] fileExistsAtPath:path]){
        
        if (![[NSFileManager defaultManager] removeItemAtPath:path
                                                        error:&error]) {
            KDClassLog(@"%@删除失败,error:%@",path,error);
            return NO;
        }
    }
    KDClassLog(@"%@删除成功",path);
    return YES;
}


+ (BOOL)createItemAtPath:(NSString *)path{
    //domain目录不存在,创建
    NSError *error;
    if (![[NSFileManager defaultManager] fileExistsAtPath:path]) {
        if (![[NSFileManager defaultManager] createDirectoryAtPath:path
                                       withIntermediateDirectories:YES
                                                        attributes:nil
                                                             error:&error]) {
            
            KDClassLog(@"创建%@失败,error:%@",path,error);
            return NO;
        }
    }
    KDClassLog(@"创建%@成功",path);
    return YES;
}



+ (NSString *)getMD5String:(NSString *)string
{
    if (string.length == 0)
        return nil;
    
    const char *value = string.UTF8String;
    unsigned char outputBuffer[CC_MD5_DIGEST_LENGTH];
    CC_MD5(value, (unsigned int)strlen(value), outputBuffer);
    
    NSMutableString *encodedString = [[NSMutableString alloc] initWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for (NSInteger count = 0; count < CC_MD5_DIGEST_LENGTH; count++){
        [encodedString appendFormat:@"%02X", outputBuffer[count]];
    }
    return encodedString;
}


+ (NSString *)documentsChatPath
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
    
    NSString *path = [[paths objectAtIndex:0] stringByAppendingFormat:@"/Caches/MWapCaches/"];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if (![fileManager fileExistsAtPath:path]) {
        [fileManager createDirectoryAtPath:path withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    return path;
}

+ (NSString *)getLocalPathByURL:(NSString*)url
{
    if (url.length == 0) {
        return nil;
    }
    
    NSString* md5 = [self getMD5String:url];
    NSString* path = [self documentsChatPath];
    
    NSString* localPath = [NSString stringWithFormat:@"%@%@", path, md5];
    
    return localPath;
}


+ (NSString *)getPathByFileName:(NSString *)fileName ofType:(NSString *)type
{
    NSString *fileDirectory = [fileName stringByAppendingPathExtension:type];
    return fileDirectory;
}

@end
