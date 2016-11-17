//
//  TNBRouter.m
//  ToonBrowser
//
//  Created by kevinma on 15/3/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBRouter.h"
#import "TNBBaseHandler.h"
#import "TNBHTTPConnection.h"

@interface TNBRouter ()
@property (nonatomic, strong) TNBBaseHandler *handler;
@end

@implementation TNBRouter

+ (NSDictionary *)methodMap {
    static NSDictionary *map;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSString *sourcePath = [[NSBundle mainBundle] pathForResource:@"MethodMap" ofType:@"plist"];
        map = [NSDictionary dictionaryWithContentsOfFile:sourcePath];
    });
    return map;
}

/**
 *  doTask with tagString
 *
 *  @param tagString tagString
 *  @param params    参数列表
 */
- (void)doTaskwithTagString:(NSString *)tagString withConnection:(TNBHTTPConnection *)connection withParams:(NSDictionary *)params{
    
    //根据策略表分发响应方法 max
    NSString *sourcePath = [[NSBundle mainBundle] pathForResource:@"MethodMap" ofType:@"plist"];
    NSDictionary *methodMap = [NSDictionary dictionaryWithContentsOfFile:sourcePath];
    
    NSString *handlerMethod = methodMap[tagString];
    if (handlerMethod) {
        [self dispatchEventwithActionString:handlerMethod withConnection:connection withParams:params];
    }
    
}

/**
 *  dispatchEvent 分发事件
 *
 *  @param actionString actionString
 *  @param params       参数列表
 */
- (void)dispatchEventwithActionString:(NSString *)actionString withConnection:(TNBHTTPConnection *)connection withParams:(NSDictionary *)params{
    
    Class class = NSClassFromString(actionString);
    if (class) {
        self.handler = class.new;
        self.handler.params = params;
    }

    KDClassLog(@"%@ received data:\n%@",actionString,params);
    
    if (self.handler && ![self.handler isKindOfClass:NSClassFromString(@"LWErrorHandler")]) {
        [self.handler doTaskWithConnection:connection];
    }
}


- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

@end
