//
//  UIImage+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (KMUtilities)

+ (UIImage *)bundleImageNamed:(NSString *)name;
+ (UIImage *)fixOrientation:(UIImage *)srcImg;
- (UIImage *)normalizedImage ;

@end
