//
//  KMCommonUtility.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>


@interface KMCommonUtility : NSObject

/**
 *  处理选中图片,存入沙盒
 *
 *  @param image 选中的图片
 *
 *  @return 沙盒路径
 */
+ (NSString *)handlePickedImage:(UIImage *)image packageParams:(NSDictionary *)params;


/**
 *  @author kevinma, 15-04-27 17:04:46
 *
 *  获取时间戳
 *
 *  @return 时间戳字符串
 */
+ (NSString *)timeString;

+ (NSString *)accurateTimeString;

/**
 *  @author kevinma, 15-05-20 09:05:31
 *
 *  动态检查类是否含有属性
 *
 *  @param myClass 类名
 *  @param name    属性名
 *
 *  @return YES or NO
 */
+ (BOOL) getVariableWithClass:(Class) myClass varName:(NSString *)name;
/**
 *  @author liushuangquan, 16-03-29 14:03:11
 *
 *  处理图片，存入沙盒
 *
 *  @param image 图片
 *  @param ratio 压缩比
 *
 *  @return 图片的本地路径
 */
+ (NSString *)handlePickedImage:(UIImage *)image withRatio:(NSString *)ratio;

//获取端口号
+ (NSInteger)getIp_Port;

//通过接口获得并设置 port
+ (void)setRandomPort:(NSInteger)port;


//判断端口号是否已经设置过
+ (BOOL)isPortExsit;

+ (NSInteger)getFontSize;
+ (void)setFontSize:(NSInteger )fonSize;

+ (NSString *)jsonStringWithParams:(NSDictionary *)params;

@end
