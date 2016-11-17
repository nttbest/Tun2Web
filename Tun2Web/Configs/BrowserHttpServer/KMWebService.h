//
//  KMWebService.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/21.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KMWebService : NSObject
@property (nonatomic, readonly, copy) NSString *demoPath;

+ (KMWebService *)sharedInstance;
- (void)serviceStartWithUpdataFlag:(BOOL)isUpdate;
- (void)serviceTeardown;
@end
