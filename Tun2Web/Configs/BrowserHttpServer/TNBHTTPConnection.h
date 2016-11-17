//
//  TNBHTTPConnection.h
//  ToonBrowser
//
//  Created by kevinma on 15/5/20.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TNBBaseHandler.h"

@class TNBHTTPConnection;
@class TNBResolveHeaderUtils;

@protocol TNBServerConnectionDelegate
- (void)socketServerConnectionDidFinished:(TNBHTTPConnection *)connection;
- (void)socketServerConnectionDidReceiveError:(TNBHTTPConnection *)connection;
@end

@interface TNBHTTPConnection : NSObject <NSStreamDelegate, TNBHandlerResponseDelegate>

@property (nonatomic, strong) TNBResolveHeaderUtils *resolveHeaderUtils;
@property (nonatomic, strong) NSInputStream *inputStream;
@property (nonatomic, strong) NSOutputStream *outputStream;
@property (nonatomic, strong) NSString *peerName;
@property (nonatomic, strong) NSData *sendData;
@property (nonatomic, assign) BOOL shouldKeepRunning;
@property (nonatomic, weak) NSObject <TNBServerConnectionDelegate, NSObject> *delegate;

- (instancetype)initWithInputStream:(NSInputStream *)readStream
                       outputStream:(NSOutputStream *) writeStream
                               peer:(NSString *)peerAddress
                           delegate:(NSObject <TNBServerConnectionDelegate, NSObject> *)anObject;

- (void)runProtocol;

@end
