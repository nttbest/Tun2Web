//
//  TNBHTTPServer.m
//  ToonBrowser
//
//  Created by kevinma on 15/5/20.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBHTTPServer.h"
#import <Foundation/Foundation.h>
#include <sys/socket.h>
#include <netinet/in.h>
#import <arpa/inet.h>
#import "TNBHTTPConnection.h"
#import "KMCommonUtility.h"

static NSString * const TNBServerErrorDomain = @"TNBServerErrorDomain";

typedef NS_ENUM(NSInteger, TNBServerErrorCode) {
    TNBServerCouldNotBindToIPv4Address         = 1001,      //不能监听IPv4
    TNBServerCouldNotBindToIPv6Address         = 1002,      //不能监听IPv6
    TNBServerNoSocketsAvailable                = 1003,      //没有可用的socket
    TNBServerCouldNotBindOrEstablishNetService = 1004       //不能监听和发布netService
};

@interface TNBHTTPServer() <TNBServerConnectionDelegate>

@property (assign) CFSocketRef  listeningSocket;
@property (nonatomic, strong) NSMutableSet *connectionBag;

@end

@implementation TNBHTTPServer

#pragma mark - life cycle

- (instancetype)init{
    if (self = [super init]) {
        _connectionBag = [NSMutableSet set];
    }
    return self;
}

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

#pragma mark - private methods

- (void)start{
    
    if ([KMCommonUtility isPortExsit]){
        [self setupServer];
    } else {
        [KMCommonUtility setRandomPort:0];
        [self setupServer];
    }
}

- (void)teardown {
    
    if (_listeningSocket) {
        CFSocketInvalidate(_listeningSocket);
        CFRelease(_listeningSocket);
        _listeningSocket = NULL;
    }
}

- (void)setupServer
{
    NSError * error = nil;
    
    struct sockaddr_in serverAddress;
    socklen_t nameLen = 0;
    nameLen = sizeof(serverAddress);
    
    if (_listeningSocket) {
        return;
    } else {
        
        if (!_listeningSocket) {
            
            CFSocketContext socketCtxt = {0,(__bridge void *)(self),NULL,NULL,NULL};
            
            _listeningSocket = CFSocketCreate(kCFAllocatorDefault, PF_INET, SOCK_STREAM, IPPROTO_TCP, kCFSocketAcceptCallBack, (CFSocketCallBack)AcceptCallBack, &socketCtxt);
            
            if (!_listeningSocket) {
                if (error) error = [[NSError alloc] initWithDomain:TNBServerErrorDomain code:TNBServerNoSocketsAvailable userInfo:nil];
                [self teardown];
                return;
            }
            
            int yes = 1;
            setsockopt(CFSocketGetNative(_listeningSocket), SOL_SOCKET, SO_REUSEADDR, (void *)&yes, sizeof(yes));
            
            memset(&serverAddress, 0, sizeof(serverAddress));
            serverAddress.sin_len = nameLen;
            serverAddress.sin_family = AF_INET;
            serverAddress.sin_port = htons([KMCommonUtility getIp_Port]);
            serverAddress.sin_addr.s_addr = htonl(INADDR_ANY);
            NSData * address4 = [NSData dataWithBytes:&serverAddress length:nameLen];
            
            if (kCFSocketSuccess != CFSocketSetAddress(_listeningSocket, (CFDataRef)address4)) {
                if (error) error = [[NSError alloc] initWithDomain:TNBServerErrorDomain code:TNBServerCouldNotBindToIPv4Address userInfo:nil];
                if (_listeningSocket)
                    CFRelease(_listeningSocket);
                _listeningSocket = NULL;
                return;
            }
            
            NSData * addr = (NSData *)CFBridgingRelease(CFSocketCopyAddress(_listeningSocket));
            memcpy(&serverAddress, [addr bytes], [addr length]);
            
            CFRunLoopRef cfrl = CFRunLoopGetCurrent();
            CFRunLoopSourceRef source = CFSocketCreateRunLoopSource(kCFAllocatorDefault, _listeningSocket, 0);
            CFRunLoopAddSource(cfrl, source, kCFRunLoopCommonModes);
            CFRelease(source);
        }
        
        
        if (!_listeningSocket) {
            if (error) error = [[NSError alloc] initWithDomain:TNBServerErrorDomain code:TNBServerCouldNotBindOrEstablishNetService userInfo:nil];
            [self teardown];
            return;
        }
    }
}

void AcceptCallBack(CFSocketRef socket, CFSocketCallBackType type, CFDataRef address, const void *data, void *info){
    
    TNBHTTPServer * server = (__bridge TNBHTTPServer *)info;
    
    if (kCFSocketAcceptCallBack == type) {
        
        CFSocketNativeHandle nativeSocketHandle = *(CFSocketNativeHandle *)data;
        
        struct sockaddr_in peerAddress;
        socklen_t peerLen = sizeof(peerAddress);
        NSString * peer = nil;
        
        if (getpeername(nativeSocketHandle, (struct sockaddr *)&peerAddress, (socklen_t *)&peerLen) == 0) {
            peer = [NSString stringWithUTF8String:inet_ntoa(peerAddress.sin_addr)];
        } else {
            peer = @"Generic Peer";
        }
        
        CFReadStreamRef readStream = NULL;
        CFWriteStreamRef writeStream = NULL;
        CFStreamCreatePairWithSocket(kCFAllocatorDefault, nativeSocketHandle, &readStream, &writeStream);
        
        if (readStream && writeStream) {
            CFReadStreamSetProperty(readStream, kCFStreamPropertyShouldCloseNativeSocket, kCFBooleanTrue);
            CFWriteStreamSetProperty(writeStream, kCFStreamPropertyShouldCloseNativeSocket, kCFBooleanTrue);
            
            [server handleConnection:peer inputStream:(__bridge NSInputStream *)readStream outputStream:(__bridge NSOutputStream *)writeStream];
            
        } else {
            // on any failure, need to destroy the CFSocketNativeHandle
            // since we are not going to use it any more
            close(nativeSocketHandle);
        }
        
        if (readStream)
            CFRelease(readStream);
        if (writeStream)
            CFRelease(writeStream);
    }
    
}

- (void)handleConnection:(NSString *)peerName inputStream:(NSInputStream *)readStream outputStream:(NSOutputStream *)writeStream {
    
    __weak TNBHTTPServer *weakServer = self;
    
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_LOW, 0), ^{
        
        if (peerName != nil && readStream != nil && writeStream != nil) {
            TNBHTTPConnection * connection = [[TNBHTTPConnection alloc] initWithInputStream:readStream
                                                                               outputStream:writeStream
                                                                                       peer:peerName
                                                                                   delegate:weakServer];
            
            if (connection) {
                [weakServer addConnection:connection];
                [connection runProtocol];
            }
        }
    });
    
    KDClassLog(@"%s",__func__);
}

- (void)addConnection:(TNBHTTPConnection *)connection
{
    @synchronized(_connectionBag){
        if([_connectionBag containsObject: connection]){
            return;
        }
        [_connectionBag addObject: connection];
    }
}

- (void)removeConnection:(TNBHTTPConnection*)connection
{
    @synchronized(_connectionBag){
        if(![_connectionBag containsObject:connection]){
            return;
        }
        [_connectionBag removeObject: connection];
    }
}

- (void)socketServerConnectionDidFinished:(TNBHTTPConnection *)connection{
    if (connection) {
        [self removeConnection:connection];
    }
}

- (void)socketServerConnectionDidReceiveError:(TNBHTTPConnection *)connection{
    if (connection) {
        [self removeConnection:connection];
    }
}

@end
