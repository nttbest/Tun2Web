//
//  TNBResponseHeader.h
//  ToonBrowser
//
//  Created by kevinma on 15/3/31.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TNBResponseHeader : NSObject
//连接字符串
@property (nonatomic,copy)NSString *connection;
//连接对应值
@property (nonatomic,copy)NSString *contentTypeValue;
//内容类型
@property (nonatomic,copy)NSString *contentType;
//状态码
@property (nonatomic,copy)NSString *httpCodeValue;
//服务器值
@property (nonatomic,copy)NSString *serverValue;
//服务器
@property (nonatomic,copy)NSString *server;
//内容长度值
@property (nonatomic,copy)NSString *contentLengthValue;
//内容长度字符串
@property (nonatomic,copy)NSString *contentLength;
//连接值
@property (nonatomic,copy)NSString *connectionValue;
@property (nonatomic,copy)NSString *allow;
@property (nonatomic,copy)NSString *http;
@end
