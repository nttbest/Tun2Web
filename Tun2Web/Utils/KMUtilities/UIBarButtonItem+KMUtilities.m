//
//  UIBarButtonItem+KMUtilities.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "UIBarButtonItem+KMUtilities.h"

@implementation UIBarButtonItem (KMUtilities)

+ (UIBarButtonItem *)barButtonItemWithTarget:(id)target
                                      action:(SEL)selector
                                 normalImage:(NSString *)normalImgName
                              highLightImage:(NSString *)highLightImageName
                                       title:(NSString *)title
                                  titleColor:(UIColor *)titleColor
                                       frame:(CGRect)frame
{
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    [button setFrame:frame];
    if (normalImgName) {
        UIImage * nolmalImage = [UIImage bundleImageNamed:normalImgName];
        [button setImage:nolmalImage forState:UIControlStateNormal];
    }
    if (highLightImageName) {
        UIImage * highLightImage = [UIImage bundleImageNamed:highLightImageName];
        [button setImage:highLightImage forState:UIControlStateHighlighted];
    }
    
    [button setTitle:title forState:UIControlStateNormal];
    [button setTitleColor:[titleColor colorWithAlphaComponent:0.6] forState:UIControlStateHighlighted];
    [button setTitleColor:titleColor forState:UIControlStateNormal];
    [button addTarget:target action:selector forControlEvents:UIControlEventTouchUpInside];
    button.titleLabel.font = [UIFont systemFontOfSize:16];
    return [[UIBarButtonItem alloc] initWithCustomView:button];
}


@end
