//
//  NSFileManager+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSFileManager (KMUtilities)

+ (long long) fileSizeAtPath:(NSString*) filePath;


+ (BOOL)createItemAtPath:(NSString *)path;

+ (BOOL)removeItemAtPath:(NSString *)path;

+ (NSString *)getLocalPathByURL:(NSString *)url;
+ (NSString *)getPathByFileName:(NSString *)fileName ofType:(NSString *)type;

@end
