//
//  TNBResponseHeader.m
//  ToonBrowser
//
//  Created by kevinma on 15/3/31.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBResponseHeader.h"

@implementation TNBResponseHeader

- (instancetype)init{
    self = [super init];
    if (self) {
        //赋初值
        _http = @"HTTP/1.1 ";
        _server = @"Server: ";
        _connection = @"Connection: ";
        _contentType = @"Content-Type: ";
        _contentLength = @"Content-Length: ";
        _allow = @"Access-Control-Allow-Origin:*\n";
        
        _serverValue = @"MWAP2.0";
        _contentTypeValue = @"text/html; charset=utf-8";
        _connectionValue = @"close";
        _httpCodeValue = @"200 OK";
    }
    return self;
}

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

@end
