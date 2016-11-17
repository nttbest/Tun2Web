//
//  KMScriptManager.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMScriptManager.h"

@implementation KMScriptManager

+ (NSString *)generateJavaStringWithEventName:(NSString *)eventName eventData:(NSString *)eventData{
    
    return [NSString stringWithFormat:@"javascript:{ var event=new Event('%@');event.data=%@;document.dispatchEvent(event);}",eventName,eventData];
    
}

@end
