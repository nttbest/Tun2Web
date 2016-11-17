//
//  TNBResponse.m
//  ToonBrowser
//
//  Created by kevinma on 15/3/31.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBResponse.h"

@implementation TNBResponse

- (NSData *)responseWithRsponseHeader:(TNBResponseHeader *)header withContent:(NSString *)text{
    //生成response文件
     NSString * responseString = [NSString stringWithFormat:@"%@%@\n%@%@\n%@%@%lu\n%@%@\n%@%@\n\n%@",header.http,header.httpCodeValue,header.server,header.serverValue,header.allow,header.contentLength,(unsigned long)[text lengthOfBytesUsingEncoding:NSUTF8StringEncoding],header.connection,header.connectionValue,header.contentType,header.contentTypeValue,text];
    NSData * sendData = [responseString dataUsingEncoding:NSUTF8StringEncoding];
    return sendData;
}

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

@end
