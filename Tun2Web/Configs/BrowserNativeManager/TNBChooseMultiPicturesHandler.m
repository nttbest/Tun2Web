//
//  TNBChooseMultiPicturesHandler.m
//  MWapSDK
//
//  Created by kevinma on 16/3/29.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "TNBChooseMultiPicturesHandler.h"
#import "TZImagePickerController.h"
#import "TNBResponseHeader.h"
#import "TNBResponse.h"
#import "KMCommonUtility.h"

#define KMK_ImageCountMax 9

@interface TNBChooseMultiPicturesHandler () <TZImagePickerControllerDelegate>

@property (nonatomic, strong) TZImagePickerController *imagePickerVc;
@property (nonatomic, strong) NSOperationQueue *operationQueue;
@property (nonatomic, strong) NSMutableArray *photoPathArray;
@property (nonatomic, assign) NSInteger maxCount;
@property (nonatomic, assign) NSInteger photoCount;
@end

@implementation TNBChooseMultiPicturesHandler

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

- (void)doTaskWithConnection:(TNBHTTPConnection *)client{
    [super doTaskWithConnection:client];
    
    TNBResponse *response = [[TNBResponse alloc] init];
    TNBResponseHeader *header = [[TNBResponseHeader alloc] init];
    NSData *sendData = [response responseWithRsponseHeader:header withContent:[KMCommonUtility jsonStringWithParams:nil]];
    [self.delegate handleFinishedWithSyncResponseData:sendData];
    
    [self pushImagePickerController];
}


- (void)pushImagePickerController {
    
    self.maxCount = KMK_ImageCountMax;
    NSString *_cmd_maxCount = self.params[@"maxCount"];
    if ([_cmd_maxCount isNotBlank] && [_cmd_maxCount integerValue] > 0 && [_cmd_maxCount integerValue] <= KMK_ImageCountMax) {
        _maxCount = [_cmd_maxCount integerValue];
    }
    self.imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:_maxCount
                                                                                        columnNumber:4
                                                                                            delegate:self
                                                                                   pushPhotoPickerVc:YES];
    
    self.imagePickerVc.allowTakePicture = NO;
    self.imagePickerVc.allowPickingVideo = NO;
    self.imagePickerVc.allowPickingImage = YES;
    self.imagePickerVc.allowPickingOriginalPhoto = YES;
    self.imagePickerVc.sortAscendingByModificationDate = YES;
    
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString *javaString = [KMScriptManager generateJavaStringWithEventName:UPLOADSTATE eventData:@"{'uploading':1}"];
        [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
    });
    
    self.photoPathArray = @[].mutableCopy;
    self.operationQueue = NSOperationQueue.new;
    [self.operationQueue setMaxConcurrentOperationCount:1];
    
    @weakify(self)
    [self.imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto){
        @strongify(self)
        self.photoCount = photos.count;
        for (UIImage *photo in photos) {
            NSBlockOperation *operation = [NSBlockOperation blockOperationWithBlock:^{
                [self handleSaveImage:photo];
            }];
            [self.operationQueue addOperation:operation];
        }
    }];
    
    [self.imagePickerVc setImagePickerControllerDidCancelHandle:^{
        @strongify(self)
        NSString *eventName = self.params[@"eventName"];
        NSString *javaString = [KMScriptManager generateJavaStringWithEventName:eventName?eventName:CHOOSEMULTIPICTURES eventData:@"{}"];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
            [self.delegate handleFinishedWithAsyncResponse];
        });
    }];
    
    UIViewController * vc = [UIWindow currentViewController];
    [vc.navigationController presentViewController:self.imagePickerVc animated:YES completion:NULL];
}



#pragma mark - 图片处理完成，压缩保存本地（之前是上传云存储）
- (void)handleSaveImage:(UIImage *)image
{
    NSString *imagePath = [KMCommonUtility handlePickedImage:image withRatio:[self.params objectForKey:@"ratio"]];
    if (!imagePath) {
        KDClassLog(@"处理图片失败");
        return;
    }
    [self.photoPathArray addObject:imagePath];
    
    if (self.photoPathArray.count == self.photoCount)
    {
        NSString *eventName = self.params[@"eventName"];
        NSString *javaString = [KMScriptManager generateJavaStringWithEventName:eventName?eventName:CHOOSEMULTIPICTURES eventData:[NSString stringWithFormat:@"{'urls':%@}",[self.photoPathArray KD_JSONString]]];
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
            [self.delegate handleFinishedWithAsyncResponse];
        });
    }
}

@end

