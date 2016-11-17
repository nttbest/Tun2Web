//
//  TNBBaseHandler.m
//  ToonBrowser
//
//  Created by kevinma on 15/3/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBBaseHandler.h"
#import "TNBHTTPConnection.h"

@implementation TNBBaseHandler

- (void)doTaskWithConnection:(TNBHTTPConnection *)client{
    if (!client) return;
    self.delegate = client;
    [[NSNotificationCenter defaultCenter] postNotificationName:TNBNOTIFICATION_GETWEBVIEW object:self];
}

- (void)km_obtainWebViewInstance:(KMWebView *)webView {
    if (webView) {
        _webView = webView;
    }
    KDClassLog(@"%s",__func__);
}

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

@end
