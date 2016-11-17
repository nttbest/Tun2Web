//
//  KMCommonUtility.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMCommonUtility.h"
#include <ifaddrs.h>
#include <arpa/inet.h>
#import <objc/runtime.h>

static NSInteger random_Port;
static NSInteger font_size;

@implementation KMCommonUtility

+ (NSInteger)getFontSize{
    if (!font_size) {
        font_size=20;
    }
    return font_size;
}

+ (void)setFontSize:(NSInteger )fonSize{
    font_size = fonSize;
}

+ (NSString *)handlePickedImage:(UIImage *)image packageParams:(NSDictionary *)params{
    NSString * imageName = [NSString stringWithFormat:@"%@.png",[self accurateTimeString]];
    NSString * imagePath = nil;
    if (params == nil || [params isEqual:[NSNull null]]) {
        
        imagePath = [NSHomeDirectory() stringByAppendingPathComponent:[NSString stringWithFormat:@"%@/nameSpace/Tmp/",NameSpaceDomainPath]];
    }else{
        
        imagePath = [NSHomeDirectory() stringByAppendingPathComponent:[NSString stringWithFormat:@"%@/%@/Tmp/",NameSpaceDomainPath, params[@"nameSpace"]]];
    }
    
    NSFileManager *manager = [[NSFileManager alloc]init];
    BOOL isCreated = [manager createDirectoryAtPath:imagePath withIntermediateDirectories:YES attributes:nil error:nil];
    if (!isCreated) {
        //创建文件失败
        return nil;
    }
    imagePath = [imagePath stringByAppendingPathComponent:imageName];
    KDClassLog(@"imagePath:%@",imagePath);
    
    
    CGFloat x  = [params[@"aspectX"] floatValue];
    CGFloat y = [params[@"aspectY"] floatValue];
    if (!(params[@"aspectY"]&&params[@"aspectX"])) {
        x = 1;
        y = 1;
    }
    BOOL success;
    
    // 修改图片压缩策略，保证图片清晰
    if (y/x == 1)
    {
        //image write to sandbox
        success = [UIImageJPEGRepresentation(image, 0.1) writeToFile:imagePath atomically:YES];
    }
    else
    {
        success = [UIImageJPEGRepresentation(image, 1) writeToFile:imagePath atomically:YES];
    }
    
    if(!success){
        KDClassLog(@"Could not write to the file");
    }
    
    return imagePath;
}

+ (NSString *)timeString{
    NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval a=[dat timeIntervalSince1970];
    NSString * nowTimeString = [NSString stringWithFormat:@"%.0f", a];
    return nowTimeString;
}

+ (NSString *)accurateTimeString{
    
    NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval a=[dat timeIntervalSince1970] * 1000;
    NSString * nowTimeString = [NSString stringWithFormat:@"%.0f", a];
    return nowTimeString;
}

+ (UIImage *)handleScreenShotWithView:(UIView *)view rect:(CGRect)rect{
    
    UIGraphicsBeginImageContext(view.frame.size); //currentView 当前的view
    [view.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *viewImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    UIImage *newImage = [self handleRectView:viewImage rect:rect];
    
    return newImage;
}

+ (UIImage *)handleRectView:(UIImage *)image rect:(CGRect)rect{
    
    // 创建一个bitmap的context
    // 并把它设置成为当前正在使用的context
    UIGraphicsBeginImageContext(CGSizeMake(rect.size.width, rect.size.height));
    [image drawInRect:rect];
    // 从当前context中创建一个改变大小后的图片，创建一个重绘图片的上下文。
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    // 使当前的context出堆栈
    UIGraphicsEndImageContext();
    
    return newImage;
    
}

+ (BOOL) getVariableWithClass:(Class) myClass varName:(NSString *)name{	unsigned int outCount, i;
    Ivar *ivars = class_copyIvarList(myClass, &outCount);
    for (i = 0; i < outCount; i++) {
        Ivar property = ivars[i];
        NSString *keyName = [NSString stringWithCString:ivar_getName(property) encoding:NSUTF8StringEncoding];
        NSString *keyType = [NSString stringWithCString:ivar_getTypeEncoding(property) encoding:NSUTF8StringEncoding];
        KDClassLog(@"keyType:%@",keyType);
        keyName = [keyName stringByReplacingOccurrencesOfString:@"_" withString:@""];
        
        KDClassLog(@"keyName:%@",keyName);
        if ([keyName isEqualToString:name]) {
            return YES;
        }
    }
    
    return NO;
}



+ (NSInteger)getIp_Port
{
    if (!random_Port)
    {
        //随机获取1024到9999之间的四位数
        int port = (arc4random() % 8976) + 1024;
        [KMCommonUtility setRandomPort:port];
    }
    KDClassLog(@"随机数 %ld", (long)random_Port);
    return random_Port;
}

+ (void)setRandomPort:(NSInteger)port
{
    if (!random_Port)
    {
        random_Port = 6780;
    }
}

+ (BOOL)isPortExsit
{
    if (!random_Port) {
        return NO;
    }else{
        return YES;
    }
}

+ (NSString *)handlePickedImage:(UIImage *)image withRatio:(NSString *)ratio
{
    NSString * imageName = [NSString stringWithFormat:@"%@.png",[self accurateTimeString]];
    NSString * imagePath = [NSHomeDirectory() stringByAppendingPathComponent:[NSString stringWithFormat:@"%@/nameSpace/Tmp/",NameSpaceDomainPath]];
    
    NSFileManager *manager = [[NSFileManager alloc]init];
    BOOL isCreated = [manager createDirectoryAtPath:imagePath withIntermediateDirectories:YES attributes:nil error:nil];
    if (!isCreated) {
        //创建文件失败
        return nil;
    }
    imagePath = [imagePath stringByAppendingPathComponent:imageName];
    KDClassLog(@"imagePath:%@",imagePath);
    
    //压缩比默认 0.1
    CGFloat rati = 0.1;
    CGFloat relRatio = [ratio floatValue];
    if (relRatio && relRatio >= 0 && relRatio <= 1) {
        rati = relRatio;
    }
    //image write to sandbox
    BOOL success = [UIImageJPEGRepresentation(image, rati) writeToFile:imagePath atomically:YES];
    
    if(!success){
        KDClassLog(@"Could not write to the file");
    }
    
    return imagePath;
}

+ (NSString *)jsonStringWithParams:(NSDictionary *)params{
    
    NSString *client_id = [UIDevice macAddress];
    NSString *platform = [[UIDevice currentDevice] hardwareSimpleDescription];
    NSString *version = [[UIDevice currentDevice] systemVersion];
    
    NSMutableDictionary *mdict = [NSMutableDictionary dictionaryWithCapacity:5];
    [mdict setValue:client_id forKey:@"client_id"];
    [mdict setValue:platform forKey:@"platform"];
    [mdict setValue:version forKey:@"ver"];
    
    if (params) {
        [mdict addEntriesFromDictionary:params];
    }
    return [mdict KD_JSONString];
}

@end
