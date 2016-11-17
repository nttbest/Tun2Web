//
//  UIWindow+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIWindow (KMUtilities)

/*!
 @method topMostController
 
 @return Returns the current Top Most ViewController in hierarchy.
 */
- (UIViewController*) topMostController;

/*!
 @method currentViewController
 
 @return Returns the topViewController in stack of topMostController.
 */
- (UIViewController*)currentViewController;

/**
 *  @author 马行川, 15-09-23 12:09:19
 *
 *  获取栈顶控制器
 *
 *  @return 栈顶控制器
 */
+ (UIViewController *)currentViewController;

/**
 *  @author 马行川, 15-08-28 15:08:54
 *
 *  获取根视图
 *
 *  @return window
 */
+ (UIWindow *)delegateWindow;

@end
