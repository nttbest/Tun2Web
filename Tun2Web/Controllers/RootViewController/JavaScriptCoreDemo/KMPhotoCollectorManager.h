//
//  KMPhotoCollectorManager.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/24.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

extern NSString * const KMObtainImageNotification;

@protocol KMPhotoCollectorManagerProtocol <JSExport>
- (void)chooseSinglePicture;
@end

@interface KMPhotoCollectorManager : NSObject
@end
