//
//  TNBResolveHeaderUtils.h
//  ToonBrowser
//
//  Created by kevinma on 15/3/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>
@class TNBHTTPConnection;

@interface TNBResolveHeaderUtils : NSObject
- (void)resolveWithHeader:(NSString *)headerString withConnection:(TNBHTTPConnection *)connection;
@end
