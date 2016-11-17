//
//  KMWebView.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <UIKit/UIKit.h>
@class KMWebView;

typedef NS_ENUM(NSInteger, KMWebViewURLType) {
    KMWebViewURLTypeLocal         = 0,             //本地URL
    KMWebViewURLTypeRemote        = 1,             //远端URL
    KMWebViewURLTypeDemo          = 2,             //MWap测试环境
};

@protocol KMWebViewInstanceObtainDelegate <NSObject>
- (void)km_obtainWebViewInstance:(KMWebView *)webView;
@end

@protocol KMWebViewDelegate <NSObject>
- (BOOL)km_WebView:(KMWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
- (void)km_WebViewDidStartLoad:(KMWebView *)webView;
- (void)km_WebViewDidFinishLoad:(KMWebView *)webView;
- (void)km_WebView:(KMWebView *)webView didFailLoadWithError:(NSError *)error;
@end

@interface KMWebView : UIView
@property (nonatomic, weak) id<KMWebViewInstanceObtainDelegate> instanceObtainDelegate;
@property (nonatomic, weak) id<KMWebViewDelegate> webViewDelegate;

- (void)km_startWithType:(KMWebViewURLType)kmWebViewType nameSpace:(NSString *)nameSpace filePath:(NSString *)filePath;
- (void)km_setJsCommand:(NSString *)jsCommand;
- (NSString *)km_stringByEvaluatingJavaScriptFromString:(NSString *)script;
- (void)km_reload;
- (void)km_goBack;
- (void)km_goForward;
- (BOOL)km_canGoBack;
- (BOOL)km_canGoForward;


@end
