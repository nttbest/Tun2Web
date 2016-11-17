//
//  TNBChooseSinglePictureHandler.m
//  MWapSDK
//
//  Created by kevinma on 16/3/29.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "TNBChooseSinglePictureHandler.h"
#import "TNBResponse.h"
#import "TNBResponseHeader.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import "TZImagePickerController.h"

@interface TNBChooseSinglePictureHandler () <TZImagePickerControllerDelegate>
@property (nonatomic, strong) TZImagePickerController *imagePickerVc;
@end

@implementation TNBChooseSinglePictureHandler

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

/**
 *  select photo
 *
 *  @param client client
 */
- (void)doTaskWithConnection:(TNBHTTPConnection *)client{
    
    [super doTaskWithConnection:client];
    
    TNBResponse *response = [[TNBResponse alloc] init];
    TNBResponseHeader *header = [[TNBResponseHeader alloc] init];
    NSData * sendData = [response responseWithRsponseHeader:header withContent:[KMCommonUtility jsonStringWithParams:nil]];
    [self.delegate handleFinishedWithSyncResponseData:sendData];
    
    [self pushImagePickerController];
}

- (void)pushImagePickerController {
    
    self.imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:1
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
 
    
    @weakify(self)
    [self.imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto){
        @strongify(self)
        UIImage *photo = [photos objectAtIndex:0];
        NSData *imageData = UIImageJPEGRepresentation(photo, 0.5);
        UIImage *finalCroppedImage = [UIImage imageWithData:imageData];
        [self sendImageToHtml:finalCroppedImage];
    }];
    
    [self.imagePickerVc setImagePickerControllerDidCancelHandle:^{
        @strongify(self)
        NSString *eventName = self.params[@"eventName"];
        NSString *javaString = [KMScriptManager generateJavaStringWithEventName:eventName?eventName:CHOOSESINGLEPICTURE eventData:@"{}"];
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
            [self.delegate handleFinishedWithAsyncResponse];
        });
    }];
    
    UIViewController * vc = [UIWindow currentViewController];
    [vc.navigationController presentViewController:self.imagePickerVc animated:YES completion:NULL];
}


#pragma mark - 图片处理完成，压缩保存本地（之前是上传云存储）
- (void)sendImageToHtml:(UIImage *)image
{
    NSString * imagePath = [KMCommonUtility handlePickedImage:image withRatio:[self.params objectForKey:@"ratio"]];
    
    KDClassLog(@"image path = %@",imagePath);
    
    NSString *eventName = self.params[@"eventName"];
    NSString *javaString = [KMScriptManager generateJavaStringWithEventName:eventName?eventName:CHOOSESINGLEPICTURE eventData:[NSString stringWithFormat:@"{'url':'%@'}",imagePath]];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
        [self.delegate handleFinishedWithAsyncResponse];
    });
}

@end

