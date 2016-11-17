//
//  TNBHTTPConnection.m
//  ToonBrowser
//
//  Created by kevinma on 15/5/20.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#import "TNBHTTPConnection.h"
#import "TNBHTTPServer.h"
#import "TNBResponse.h"
#import "TNBResolveHeaderUtils.h"
#include <CFNetwork/CFSocketStream.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <arpa/inet.h>
#import "TNBRouter.h"

#define HEADER_BODY_BREAK_FLAG      @"\r\n\r\n"
#define HEADER_LINE_BREAK_FLAG      @"\r\n"
#define BUFFER_SIZE                 1024

@interface TNBHTTPConnection ()
@end
@implementation TNBHTTPConnection

#pragma mark - life cycle

- (instancetype)initWithInputStream:(NSInputStream *)readStream
                       outputStream:(NSOutputStream *)writeStream
                               peer:(NSString *)peerAddress
                           delegate:(NSObject <TNBServerConnectionDelegate, NSObject> *)anObject {
    
    if (self = [super init]) {
        self.inputStream = readStream;
        self.outputStream = writeStream;
        self.peerName = peerAddress;
        self.delegate = anObject;
    }
    return self;
}

- (void)dealloc {
    KDClassLog(@"%s",__func__);
    
    _shouldKeepRunning = NO;
    
    KDClassLog(@"InputStream closed");
    [_inputStream removeFromRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
    _inputStream = nil;
    
    KDClassLog(@"OutputStream closed");
    [_outputStream removeFromRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
    _outputStream = nil;
}

#pragma mark - NSStreamDelegate Methods

- (void)stream:(NSStream *)stream handleEvent:(NSStreamEvent)eventCode
{
    switch(eventCode) {
        case NSStreamEventOpenCompleted:
        {
            KDClassLog(@"%@ opened",[stream class]);
            break;
        }
        case NSStreamEventHasSpaceAvailable:
        {
            KDClassLog(@"%@ has space available",[stream class]);
            if (stream == self.outputStream){
                if ([self.outputStream hasSpaceAvailable] && self.sendData) {
                    [self sendResponseData];
                }
            }
            break;
        }
        case NSStreamEventHasBytesAvailable:
        {
            KDClassLog(@"%@ has bytes available",[stream class]);
            if (stream == self.inputStream) {
                
                NSData *data = [self receiveData];
                [self.inputStream close];
                
                if (data) {
                    [self handleHttpRequestWithData:data];
                }
            }
            break;
        }
            //NSInputStream读取到流的结尾时，会发送一个NSStreamEventEndEncountered事件给代理，代理对象应该销毁流对象
        case NSStreamEventEndEncountered:
        {
            KDClassLog(@"%@ end encountered",[stream class]);
            [self.delegate socketServerConnectionDidReceiveError:self];
            break;
        }
        case NSStreamEventErrorOccurred:
        {
            KDClassLog(@"Can not connect to the host!");
            [self.delegate socketServerConnectionDidReceiveError:self];
            break;
        }
        default:
            break;
    }
}


#pragma mark - TNBHandlerResponseDelegate Methods

- (void)handleFinishedWithAsyncResponse{
    [self.delegate socketServerConnectionDidFinished:self];
}

- (void)handleFinishedWithSyncResponseData:(NSData *)responseData{
    
    if (responseData) {
        self.sendData = responseData;
        [self sendResponseData];
    }
}

#pragma mark - private methods

- (void)runProtocol{
    
    KDClassLog(@"%s",__func__);
    if (self.inputStream && self.outputStream) {
        
        NSRunLoop *currentRunLoop = [NSRunLoop currentRunLoop];
        self.inputStream.delegate = self;
        self.outputStream.delegate = self;
        [self.inputStream scheduleInRunLoop:currentRunLoop forMode:NSRunLoopCommonModes];
        [self.outputStream scheduleInRunLoop:currentRunLoop forMode:NSRunLoopCommonModes];
        [self.inputStream open];
        [self.outputStream open];
        
        // run the current run loop every 0.2 seconds, self is responsible for flipping the shouldKeeprunning switch
        // when connection is closed
        self.shouldKeepRunning = YES;
        while(self.shouldKeepRunning && [currentRunLoop runMode:NSDefaultRunLoopMode beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.2]]){
        }
    }
}

- (NSData *)receiveData{
    
    //读请求头
    uint8_t				theChar = 0;
    NSMutableString    *str = [NSMutableString string];
    NSUInteger          contentLength = 0;
    
    while([self.inputStream read:&theChar maxLength:1] == 1)
    {
        [str appendFormat:@"%c",theChar];
        if ([str containsString:HEADER_BODY_BREAK_FLAG]) {
            KDClassLog(@"server reads header success");
            break;
        }
    }
    
    if (str && str.length > 0) {
        NSArray * allLinesArray = [str componentsSeparatedByString:HEADER_LINE_BREAK_FLAG];
        for (NSString *oneLine in allLinesArray) {
            
            if([oneLine rangeOfString:@"Content-Length:"].location != NSNotFound){
                NSString *length = [[oneLine componentsSeparatedByString:@" "] lastObject];
                contentLength = [length integerValue];
            }
        }
    }
    
    //读请求体
    NSMutableData *contentData = [[NSMutableData alloc] initWithCapacity:contentLength];
    uint8_t buffer[BUFFER_SIZE] = {0};
    NSUInteger bytesRead = 0;
    NSUInteger bytesReadBeyondLength = 0;
    
    if (contentLength > 0) {
        while(true)
        {
            bytesRead = [self.inputStream read:buffer maxLength:BUFFER_SIZE];
            if (bytesRead == -1) {
                KDClassLog(@"server reads body failure");
                break;
            }
            
            [contentData appendBytes:buffer length:bytesRead];
            
            if (contentData.length >= contentLength) {
                KDClassLog(@"server reads body success");
                break;
            }
        }
        
        if (contentData.length > contentLength) {
            
            bytesReadBeyondLength = contentData.length - contentLength;
            NSRange range = NSMakeRange(contentLength, bytesReadBeyondLength);
            [contentData resetBytesInRange:range];
            [contentData setLength:contentLength];
            
        }
    }
    
    NSData *headerData = [str dataUsingEncoding:NSUTF8StringEncoding];
    NSMutableData *data = [[NSMutableData alloc] initWithData:headerData];
    [data appendData:contentData];
    
    if(!data){
        KDClassLog(@"no buffer!");
        return nil;
    }else{
        return data;
    }
    
}


- (NSUInteger)writeData:(NSData *)outData{
    
    NSUInteger offset = 0;
    NSUInteger bytesWritten = 0;
    NSUInteger remainingLength = [outData length];
    NSUInteger bufferSize = MIN(MAX_OUTPUT_BUFFER_SIZE, remainingLength);
    
    // write in burst of MAX_OUTPUT_BUFFER_SIZE
    void *bytes = malloc(bufferSize * sizeof(void*));
    while (remainingLength > 0) {
        NSRange range = NSMakeRange(offset, bufferSize);
        [outData getBytes:bytes range: range];
        
        bytesWritten = [self.outputStream write:bytes maxLength:bufferSize];
        if(bytesWritten == -1){
            break;
        }
        remainingLength -= bytesWritten;
        offset += bytesWritten;
        // update buffer size, required when remainingLength becomes smaller than max output size
        bufferSize = MIN(MAX_OUTPUT_BUFFER_SIZE, remainingLength);
    }
    
    free(bytes);
    
    return bytesWritten;
}

- (void)handleHttpRequestWithData:(NSData *)receiveData{
    
    if (receiveData) {
        NSString * messRec = [[NSString alloc] initWithData:receiveData encoding:NSUTF8StringEncoding];
        
        if (messRec && messRec.length > 0) {
            KDClassLog(@"ResolveHeaderUtils received data:\n%@",messRec);
            [self.resolveHeaderUtils resolveWithHeader:messRec withConnection:self];
        }
    }
}

- (void)sendResponseData{
    if (![self.outputStream hasSpaceAvailable]) {
        return;
    }
    size_t sentBytes = 0;
    
    if (self.sendData) {
        sentBytes = [self writeData:self.sendData];
    } else {
        KDClassLog(@"Something wrong with the building of the response.");
    }
    
    if (sentBytes == [self.sendData length]) {
        KDClassLog(@"OutputStream sent %ld bytes.", sentBytes);
    }
    
    [self.outputStream close];
}

#pragma mark - setter & getter

- (TNBResolveHeaderUtils *)resolveHeaderUtils{
    if (!_resolveHeaderUtils) {
        TNBResolveHeaderUtils * resolveHeaderUtils = [[TNBResolveHeaderUtils alloc] init];
        _resolveHeaderUtils = resolveHeaderUtils;
    }
    return _resolveHeaderUtils;
}


@end
