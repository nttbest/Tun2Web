//
//  KMBaseViewController.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/17.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMBaseViewController.h"
#import "KMWebView.h"

@interface KMBaseViewController () <KMWebViewDelegate>
@property (nonatomic, strong) KMWebView  *webView;
@property (nonatomic, strong) NSArray    *htmlTitleArray;
@end

@implementation KMBaseViewController

#pragma mark - life cycle
- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    UIBarButtonItem *spaceBarButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
    spaceBarButtonItem.width = -6;
    
    UIBarButtonItem *backBarButtonItem =[UIBarButtonItem barButtonItemWithTarget:self action:@selector(backToPreviewViewcontroller) normalImage:nil highLightImage:nil title:@"返回" titleColor:[UIColor blackColor] frame:CGRectMake(0, 0, 42, 42)];
    
    UIBarButtonItem *closeBarButtonItem = [UIBarButtonItem barButtonItemWithTarget:self action:@selector(closeViewcontroller) normalImage:nil highLightImage:nil title:@"关闭" titleColor:[UIColor blackColor] frame:CGRectMake(0, 0, 42, 42)];
    
    self.navigationItem.leftBarButtonItems = @[spaceBarButtonItem,backBarButtonItem];
    self.navigationItem.rightBarButtonItem = closeBarButtonItem;
    
    _webView = [[KMWebView alloc] initWithFrame:self.view.bounds];
    _webView.webViewDelegate = self;
    [self.view addSubview:_webView];
}


#pragma mark - KMWebViewDelegate

- (BOOL)km_WebView:(KMWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    [self performSelector:@selector(getHtmlTitle:) withObject:webView afterDelay:.1 inModes:@[NSRunLoopCommonModes]];
    return YES;
}
- (void)km_WebViewDidStartLoad:(KMWebView *)webView {}
- (void)km_WebViewDidFinishLoad:(KMWebView *)webView {}
- (void)km_WebView:(KMWebView *)webView didFailLoadWithError:(NSError *)error {}


#pragma mark - event response

- (void)closeViewcontroller{
    if (self.presentingViewController) {
        [self dismissViewControllerAnimated:YES completion:nil];
    }else {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)backToPreviewViewcontroller{
    if (![_webView km_canGoBack]) {
        [self closeViewcontroller];
    }
    [_webView km_goBack];
    [self showNaviTitleFromCache];
}

- (void)showNaviTitleFromCache{
    NSMutableArray * tempArray = [NSMutableArray array];
    tempArray = [_htmlTitleArray mutableCopy];
    [tempArray removeLastObject];
    _htmlTitleArray = [tempArray copy];
    
    self.title = [_htmlTitleArray lastObject];
}

- (void)getHtmlTitle:(KMWebView *)webView{
    NSString *htmlTitle = [webView km_stringByEvaluatingJavaScriptFromString:@"document.title"];
    self.title = htmlTitle;
    
    dispatch_async(dispatch_get_main_queue (), ^{
        
        NSMutableArray * tempArray = [NSMutableArray array];
        if (!_htmlTitleArray) {
            [tempArray addObject:htmlTitle];
        }else{
            tempArray = [_htmlTitleArray mutableCopy];
            [tempArray addObject:htmlTitle];
        }
        _htmlTitleArray = [tempArray copy];
    });
}


#pragma mark - interface methods

- (void)startWithType:(KMWebViewURLType)kmWebViewURLType
            nameSpace:(NSString *)nameSpace
             filePath:(NSString *)filePath{
    if ([_webView respondsToSelector:@selector(km_startWithType:nameSpace:filePath:)]) {
        [_webView km_startWithType:kmWebViewURLType nameSpace:nameSpace filePath:filePath];
    }
}

- (void)setJsCommand:(NSString *)jsCommand{
    if ([_webView respondsToSelector:@selector(km_setJsCommand:)]) {
        [_webView km_setJsCommand:jsCommand];
    }
}


@end
