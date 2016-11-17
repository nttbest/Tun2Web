//
//  TNBRouter.h
//  ToonBrowser
//
//  Created by kevinma on 15/3/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@class TNBHTTPConnection;

@interface TNBRouter : NSObject
/**
 *  通过webServer服务器截获标签和标签与路由表的value做下一步操作
 *
 *  @param tagSting     服务器截获标签
 *  @param params       参数列表
 */
- (void)doTaskwithTagString:(NSString *)tagString withConnection:(TNBHTTPConnection *)connection withParams:(NSDictionary *)params;

@end
