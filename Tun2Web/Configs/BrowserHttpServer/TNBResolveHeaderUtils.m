//
//  TNBResolveHeaderUtils.m
//  ToonBrowser
//
//  Created by kevinma on 15/3/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBResolveHeaderUtils.h"
#import "TNBResponse.h"
#import "TNBResponseHeader.h"
#import "TNBHTTPConnection.h"
#import "TNBRouter.h"
#import "TNBBaseHandler.h"

@interface TNBResolveHeaderUtils()
@property (nonatomic, strong) TNBRouter *router;
@property (nonatomic, weak) id <TNBHandlerResponseDelegate> delegate;
@end
@implementation TNBResolveHeaderUtils

#pragma mark - life cycle
- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

#pragma mark - private methods

/**
 *  @Author 马行川, 15-05-20 17:05:35
 *
 *  从请求头获取请求链接
 *
 *  @param headerString 请求头
 *
 *  @return 请求链接
 */
- (NSString *)getHttpRequestWithHeaderString:(NSString *)headerString{
    //POST http://127.0.0.1:6780/album HTTP/1.1
    NSString * firstHeaderLine = [[headerString componentsSeparatedByString:@"\n"] objectAtIndex:0];
    //http://127.0.0.1:6780/album
    NSString * httpString = [[firstHeaderLine componentsSeparatedByString:@" "] objectAtIndex:1];
    return httpString;
}

/**
 *  @Author 马行川, 15-05-20 17:05:13
 *
 *  获取代理请求handler关键字
 *
 *  @param headerString 请求头
 *
 *  @return handler关键字
 */
- (NSString *)getProxyMethodStringWithHeaderString:(NSString *)headerString{
    
    NSURL * url = [NSURL URLWithString:[self getHttpRequestWithHeaderString:headerString]];
    NSString * path = [[url absoluteURL] path];
    path = [path substringFromIndex:1];
    return path;
}

/**
 *  @Author 马行川, 15-05-20 17:05:55
 *
 *  获取handler参数列表
 *
 *  @param params 参数字符串
 *
 *  @return handler参数列表
 */
- (NSDictionary *)getParametersDictionaryWithParams:(NSString *)params {
    NSString * urlEncodedJsonString = [[params componentsSeparatedByString:@"="] lastObject];
    NSString *jsonString = [urlEncodedJsonString stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    NSData * jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    
    NSError * thisError = nil;
    NSDictionary * paramsDic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&thisError];
    
    return paramsDic;
}

/**
 *  @author 马行川, 15-10-23 18:10:23
 *
 *  @brief  解析接口
 *
 *  @param headerString 请求头
 *  @param connection   当前socket链接
 */
- (void)resolveWithHeader:(NSString *)headerString withConnection:(TNBHTTPConnection *)connection{
    
    //解析出代理请求handler关键字
    NSString *methodString = [self getProxyMethodStringWithHeaderString:headerString];
    
    NSArray *headerStringArray = [headerString componentsSeparatedByString:@"\r\n"];
    NSString *params = [headerStringArray lastObject];
    
    //解析出的参数列表
    NSDictionary *parametersDic = [self getParametersDictionaryWithParams:params];
    KDClassLog(@"参数列表----%@",parametersDic);
    
    if ([methodString isNotBlank]) {
        KDClassLog(@"Router received data.");
        [self.router doTaskwithTagString:methodString withConnection:connection withParams:parametersDic];
    }
}


#pragma mark - setter & getter
- (TNBRouter *)router{
    if (!_router) {
        TNBRouter *router = [[TNBRouter alloc] init];
        _router = router;
    }
    return _router;
}


@end
