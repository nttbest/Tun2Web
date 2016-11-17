//
//  TNBBaseHandler.h
//  ToonBrowser
//
//  Created by kevinma on 15/3/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "KMWebView.h"
#import "KMScriptManager.h"
@class TNBHTTPConnection;

@protocol TNBHandlerResponseDelegate <NSObject>
- (void)handleFinishedWithSyncResponseData:(NSData *)responseData;
- (void)handleFinishedWithAsyncResponse;
@end

@interface TNBBaseHandler : NSObject <KMWebViewInstanceObtainDelegate>
@property (nonatomic, strong) KMWebView *webView;
@property (nonatomic, strong) NSDictionary *params;
@property (nonatomic, weak) id <TNBHandlerResponseDelegate> delegate;

- (void)doTaskWithConnection:(TNBHTTPConnection *)client;
- (void)km_obtainWebViewInstance:(KMWebView *)webView;
@end








