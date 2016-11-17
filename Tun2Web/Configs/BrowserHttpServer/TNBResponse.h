//
//  TNBResponse.h
//  ToonBrowser
//
//  Created by kevinma on 15/3/31.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@class TNBResponseHeader;
@class TNBBaseHandler;

@interface TNBResponse : NSObject

/**
 *  有数据返回的Response（返回response成功后，直接关闭读写流）
 *
 *  @param header 请求头基本信息
 *  @param client 客户端
 *  @param text   请求体
 */
- (NSData *)responseWithRsponseHeader:(TNBResponseHeader *)header withContent:(NSString *)text;

@end
