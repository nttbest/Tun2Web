//
//  KMBaseViewController.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/17.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface KMBaseViewController : UIViewController

@property (nonatomic, copy) NSString *localUrl;
@property (nonatomic, copy) NSString *remoteUrl;

- (void)startWithType:(KMWebViewURLType)kmWebViewType
            nameSpace:(NSString *)nameSpace
             filePath:(NSString *)filePath;
- (void)setJsCommand:(NSString *)jsCommand;


@end
