//
//  KMWebView.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMWebView.h"
#import "TNBBaseHandler.h"
#import "KMWebService.h"
#import "KMFileManager.h"
#import "KMScriptManager.h"
#import "IMYWebView.h"

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

@interface KMWebView ()<IMYWebViewDelegate,
                        NSURLSessionDelegate,
                        UIScrollViewDelegate>

@property (nonatomic, strong) TNBBaseHandler *baseHandler;
@property (nonatomic, strong) IMYWebView     *innerWebView;
@property (nonatomic, copy  ) NSString       *jsCommand;
@end

@implementation KMWebView

#pragma mark - life cycle

- (id)init{
    if (self = [super init]) {
        [self setup];
    }
    return self;
}

- (id)initWithFrame:(CGRect)frame{
    if (self = [super initWithFrame:frame]) {
        [self setup];
    }
    return self;
}

- (void)awakeFromNib {
    [super awakeFromNib];
    [self setup];
}

- (void)setup{
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(transferWebViewInstance:)
                                                 name:TNBNOTIFICATION_GETWEBVIEW
                                               object:nil];
    
    _innerWebView = [[IMYWebView alloc] initWithFrame:self.bounds];
    _innerWebView.delegate = self;
    [self addSubview:_innerWebView];
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    KDClassLog(@"%s",__func__);
}


#pragma mark - interface methods

- (void)km_startWithType:(KMWebViewURLType)kmWebViewType
               nameSpace:(NSString *)nameSpace
                filePath:(NSString *)filePath
{
    NSURL *url;
    switch (kmWebViewType) {
        case KMWebViewURLTypeLocal: {
            url = [KMFileManager fileUrlWithNameSpace:nameSpace filePath:filePath];
        }
            break;
        case KMWebViewURLTypeRemote: {
            url = [NSURL URLWithString:filePath];
        }
            break;
        case KMWebViewURLTypeDemo:{
            url = [KMFileManager verifyFileUrlWithFilePath:[KMWebService sharedInstance].demoPath];
        }
            break;
        default:
            break;
    }
    
    if (!url) {
        KDClassLog(@"filePath error");
    }
    
//    YYBenchmark(^{
//        [self km_loadURL:url];
//    }, ^(double ms) {
//        KDClassLog(@"WebView Load时间：%f",ms);
//    });
    
    [self km_loadURL:url];
}

- (void)km_setJsCommand:(NSString *)jsCommand{
    self.jsCommand = jsCommand;
}

- (NSString *)km_stringByEvaluatingJavaScriptFromString:(NSString *)script {
    return [self.innerWebView stringByEvaluatingJavaScriptFromString:script];
}

- (void)km_reload{
    [self.innerWebView reload];
}

- (void)km_goBack{
    
    [self.innerWebView goBack];
}

- (void)km_goForward{
    [self.innerWebView goForward];
}

- (BOOL)km_canGoBack{
    return [self.innerWebView canGoBack];
}

- (BOOL)km_canGoForward{
    return [self.innerWebView canGoForward];
}


#pragma mark - IMYWebViewDelegate
- (BOOL)webView:(IMYWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    if ([self.webViewDelegate respondsToSelector:@selector(km_WebView:shouldStartLoadWithRequest:navigationType:)]){
        [self.webViewDelegate km_WebView:self shouldStartLoadWithRequest:request navigationType:navigationType];
    }
    
    NSString *requestString = [[request URL] absoluteString];
    NSString *protocol = @"callmwap://";
    if ([requestString hasPrefix:protocol]) {
        
        NSString *requestContent = [requestString substringFromIndex:[protocol length]];
        NSArray *vals = nil;
        
        KDClassLog(@"requestContent:%@",requestContent);
        if ([requestContent containsString:@"/"]) {
            vals = [requestContent componentsSeparatedByString:@"/"];
        }else{
            vals = @[requestContent];
        }
        
        if ([[vals objectAtIndex:0] isEqualToString:@"log"]) {
            //JS日志
            NSString *logString = [vals objectAtIndex:1];
            logString = [logString stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            KDClassLog(@"来自JS打印:%@",logString);
        }
    }
    return YES;
}

- (void)webViewDidStartLoad:(IMYWebView *)webView{
    if ([self.webViewDelegate respondsToSelector:@selector(km_WebViewDidStartLoad:)]) {
        [self.webViewDelegate km_WebViewDidStartLoad:self];
    }
}

- (void)webViewDidFinishLoad:(IMYWebView *)webView{
    if ([self.webViewDelegate respondsToSelector:@selector(km_WebViewDidFinishLoad:)]){
        [self.webViewDelegate km_WebViewDidFinishLoad:self];
    }
    if (self.jsCommand){
        [self km_stringByEvaluatingJavaScriptFromString:self.jsCommand];
    }
}

- (void)webView:(IMYWebView *)webView didFailLoadWithError:(NSError *)error{
    if ([self.webViewDelegate respondsToSelector:@selector(km_WebView:didFailLoadWithError:)]){
        [self.webViewDelegate km_WebView:self didFailLoadWithError:error];
    }
}

#pragma mark - event methods

- (void)transferWebViewInstance:(NSNotification *)notification{
    
    TNBBaseHandler *baseHandler = (TNBBaseHandler *)notification.object;
    _baseHandler = baseHandler;
    
    self.instanceObtainDelegate = baseHandler;
    if ([self.instanceObtainDelegate respondsToSelector:@selector(km_obtainWebViewInstance:)]) {
        [self.instanceObtainDelegate km_obtainWebViewInstance:self];
    }
}


#pragma mark - private methods

- (void)km_loadURL:(NSURL *)URL
{
    NSURL *baseURL = [[NSURL alloc] initFileURLWithPath:URL.path.stringByDeletingLastPathComponent isDirectory:YES];
    [self km_loadURL:URL baseURL:baseURL];
}

- (void)km_loadURL:(NSURL *)URL baseURL:(NSURL *)baseURL
{
    if ([URL isFileURL]) {
        NSData *data = [[NSData alloc] initWithContentsOfURL:URL];
        NSString *HTMLString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        [self.innerWebView loadHTMLString:HTMLString baseURL:baseURL];
    } else {
        NSURLRequest *request = [[NSURLRequest alloc] initWithURL:URL];
        [self.innerWebView loadRequest:request];
    }
}

@end
#pragma clang diagnostic pop



