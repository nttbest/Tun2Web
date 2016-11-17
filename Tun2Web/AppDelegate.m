//
//  AppDelegate.m
//  ToonBrowser
//
//  Created by kevinma on 15/3/27.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "AppDelegate.h"
#import "KMRootViewController.h"
#import "KMWebService.h"

/// Fix the navigation bar height when hide status bar.
@interface KMExampleNavBar : UINavigationBar
@end
@implementation KMExampleNavBar {
    CGSize _previousSize;
}
- (CGSize)sizeThatFits:(CGSize)size {
    size = [super sizeThatFits:size];
    if ([UIApplication sharedApplication].statusBarHidden) {
        size.height = 64;
    }
    return size;
}
- (void)layoutSubviews {
    [super layoutSubviews];
    if (!CGSizeEqualToSize(self.bounds.size, _previousSize)) {
        _previousSize = self.bounds.size;
        [self.layer removeAllAnimations];
        [self.layer.sublayers makeObjectsPerformSelector:@selector(removeAllAnimations)];
    }
}
@end


@interface KMExampleNavController : UINavigationController
@end
@implementation KMExampleNavController
- (BOOL)shouldAutorotate {
    return YES;
}
- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait;
}
- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation {
    return UIInterfaceOrientationPortrait;
}
@end


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    KMRootViewController *root = [KMRootViewController new];
    KMExampleNavController *nav = [[KMExampleNavController alloc] initWithNavigationBarClass:[KMExampleNavBar class] toolbarClass:[UIToolbar class]];
    if ([nav respondsToSelector:@selector(setAutomaticallyAdjustsScrollViewInsets:)]) {
        nav.automaticallyAdjustsScrollViewInsets = NO;
    }
    [nav pushViewController:root animated:NO];
    
    self.rootViewController = nav;
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.rootViewController = self.rootViewController;
    self.window.backgroundColor = [UIColor grayColor];
    [self.window makeKeyAndVisible];
    
    [[KMWebService sharedInstance] serviceStartWithUpdataFlag:NO];
    
    NSString *cachePath = [KDStroageHelper cacheDirectoryPath];
    KDLoggerSetEnabled(YES);
    KDLoggerSetLogFilePath([cachePath stringByAppendingPathComponent:@"log.txt"]);
    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    [[KMWebService sharedInstance] serviceTeardown];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    [[KMWebService sharedInstance] serviceStartWithUpdataFlag:NO];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
