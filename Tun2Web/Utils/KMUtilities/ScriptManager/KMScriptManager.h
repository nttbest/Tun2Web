//
//  KMScriptManager.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KMScriptManager : NSObject

/**
 *  @author 马行川, 15-09-23 10:09:55
 *
 *  生成MWap异步返回javaString字符串
 *
 *  @param eventName 事件名   NSString
 *  @param eventData 事件数据 json串
 *
 *  @return javaString字符串
 */
+ (NSString *)generateJavaStringWithEventName:(NSString *)eventName eventData:(NSString *)eventData;

@end
