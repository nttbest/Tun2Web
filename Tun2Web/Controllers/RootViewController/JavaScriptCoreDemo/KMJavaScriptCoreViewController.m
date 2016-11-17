//
//  KMJavaScriptCoreViewController.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/24.
//  Copyright © 2016年 kevinma. All rights reserved.
//  JSContext *context = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
//

#import "KMJavaScriptCoreViewController.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "KMPhotoCollectorManager.h"

@interface KMJavaScriptCoreViewController ()
@property (nonatomic, strong) UIImageView *imageView;
@property (nonatomic, strong) UIButton *button;
@property (nonatomic, strong) KMPhotoCollectorManager *manager;
@property (nonatomic, strong) JSContext *context;
@end

@implementation KMJavaScriptCoreViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    //ImageView init
    self.imageView = [UIImageView new];
    self.imageView.frame = CGRectMake(0, 0, kScreenWidth - 40, kScreenHeight - 164);
    self.imageView.centerX = self.view.centerX;
    self.imageView.top = self.view.top + 84;
    self.imageView.backgroundColor = [UIColor lightGrayColor];
    [self.view addSubview:self.imageView];
    
    //button init
    self.button = [UIButton buttonWithType:UIButtonTypeSystem];
    self.button.frame = CGRectMake(0, 0, self.imageView.width, 30);
    self.button.centerX = self.view.centerX;
    self.button.bottom = self.view.bottom - 30;
    [self.button setTitle:@"相册单选" forState:UIControlStateNormal];
    [self.button addTarget:self action:@selector(clickAction:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.button];
    
    //manager,context init
    self.manager = [KMPhotoCollectorManager new];
    self.context = [JSContext new];
    
    //add notification 
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(refreshImageAction:) name:KMObtainImageNotification object:nil];
}

- (void)clickAction:(UIButton *)button {
    self.context[@"photoCollectorManager"] = self.manager;
    NSString *jsStr = @"photoCollectorManager.chooseSinglePicture()";
    [self.context evaluateScript:jsStr];
}

- (void)refreshImageAction:(NSNotification *)notification
{
    UIImage *image = (UIImage *)notification.object;
    self.imageView.image = image;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}


@end











