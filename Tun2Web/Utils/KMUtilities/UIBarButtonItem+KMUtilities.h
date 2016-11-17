//
//  UIBarButtonItem+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIBarButtonItem (KMUtilities)

+ (UIBarButtonItem *)barButtonItemWithTarget:(id)target
                                      action:(SEL)selector
                                 normalImage:(NSString *)normalImgName
                              highLightImage:(NSString *) highLightImageName
                                       title:(NSString *)title
                                  titleColor:(UIColor *)titleColor
                                       frame:(CGRect)frame;

@end
