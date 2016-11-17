//
//  KMWebViewAnalyzeViewController.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/24.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMWebViewAnalyzeViewController.h"
#import "IMYWebView.h"
#import "TZImagePickerController.h"

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"


@interface KMWebViewAnalyzeHelper : NSObject
+ (NSBundle *)sourceBundle;
@end

@implementation KMWebViewAnalyzeHelper
+ (NSBundle *)sourceBundle {
    static NSBundle *bundle;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"KMResource" ofType:@"bundle"];
        bundle = [NSBundle bundleWithPath:bundlePath];
    });
    return bundle;
}
@end


@interface KMWebViewAnalyzeViewController () <IMYWebViewDelegate, TZImagePickerControllerDelegate>
{
    NSString *callback;
}
@property (nonatomic, strong) IMYWebView *webView;
@property (nonatomic, strong) TZImagePickerController *imagePickerVc;
@end

@implementation KMWebViewAnalyzeViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
        
    self.webView = [[IMYWebView alloc] initWithFrame:self.view.bounds];
    self.webView.delegate = self;
    [self.view addSubview:self.webView];
    
    NSString *filePath = [[KMWebViewAnalyzeHelper sourceBundle] pathForResource:@"camera" ofType:@"html"];
    NSURL *url = [NSURL fileURLWithPath:filePath];
    [self loadURL:url];
}

- (void)loadURL:(NSURL *)URL
{
    NSURL *baseURL = [[NSURL alloc] initFileURLWithPath:URL.path.stringByDeletingLastPathComponent isDirectory:YES];
    [self loadURL:URL baseURL:baseURL];
}

- (void)loadURL:(NSURL *)URL baseURL:(NSURL *)baseURL
{
    if ([URL isFileURL]) {
        NSData *data = [[NSData alloc] initWithContentsOfURL:URL];
        NSString *HTMLString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        [self.webView loadHTMLString:HTMLString baseURL:baseURL];
    } else {
        NSURLRequest *request = [[NSURLRequest alloc] initWithURL:URL];
        [self.webView loadRequest:request];
    }
}

- (BOOL)webView:(IMYWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSString *requestString = [[request URL] absoluteString];
    NSString *protocol = @"js-call://";
    if ([requestString hasPrefix:protocol]) {
        NSString *requestContent = [requestString substringFromIndex:[protocol length]];
        NSArray *vals = [requestContent componentsSeparatedByString:@"/"];
        if([[vals objectAtIndex:0] isEqualToString:@"photolibrary"]) {
            callback = [vals objectAtIndex:1];
            [self chooseSinglePicture];
        } else {
            [webView stringByEvaluatingJavaScriptFromString:@"alert('未定义/lwme.cnblogs.com');"];
        }
        return NO;
    }
    return YES;
}

- (void)chooseSinglePicture {
    
    self.imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:1
                                                                    columnNumber:4
                                                                        delegate:self
                                                               pushPhotoPickerVc:YES];
    
    self.imagePickerVc.allowTakePicture = NO;
    self.imagePickerVc.allowPickingVideo = NO;
    self.imagePickerVc.allowPickingImage = YES;
    self.imagePickerVc.allowPickingOriginalPhoto = YES;
    self.imagePickerVc.sortAscendingByModificationDate = YES;
    
    @weakify(self)
    [self.imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto){
        @strongify(self)
        UIImage *photo = [photos objectAtIndex:0];
        NSString *base64 = [UIImagePNGRepresentation(photo) base64Encoding];
        [self performSelectorOnMainThread:@selector(doCallback:) withObject:base64 waitUntilDone:NO];
    }];
    
    [self.imagePickerVc setImagePickerControllerDidCancelHandle:nil];
    
    UIViewController *vc = [UIWindow currentViewController];
    [vc.navigationController presentViewController:self.imagePickerVc animated:YES completion:NULL];
}

- (void)doCallback:(NSString *)data
{
    [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('%@');", callback, data]];
}

@end

#pragma clang diagnostic pop
