//
//  TNBTakePhotoHandler.m
//  MWapSDK
//
//  Created by kevinma on 16/3/29.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "TNBTakePhotoHandler.h"
#import "TNBResponse.h"
#import "TNBResponseHeader.h"
#import <AVFoundation/AVCaptureDevice.h>
#import <AVFoundation/AVMediaFormat.h>
#import "TZImagePickerController.h"
#import "TZImageManager.h"

#define TNBCropRectAspectRatioDefault 1

@interface TNBTakePhotoHandler () <UIAlertViewDelegate>
@property (nonatomic, strong) UIImagePickerController *imagePickerVc;
@end

@implementation TNBTakePhotoHandler

- (void)dealloc
{
    KDClassLog(@"%s",__func__);
}

- (UIImagePickerController *)imagePickerVc {
    if (_imagePickerVc == nil) {
        _imagePickerVc = [[UIImagePickerController alloc] init];
        _imagePickerVc.delegate = self;
        // set appearance / 改变相册选择页的导航栏外观
        _imagePickerVc.navigationBar.barTintColor = [UIColor colorWithRed:(34/255.0) green:(34/255.0)  blue:(34/255.0) alpha:1.0];
        _imagePickerVc.navigationBar.tintColor = [UIColor whiteColor];
        
        UIBarButtonItem *tzBarItem, *BarItem;
        if (iOS9Later) {
            tzBarItem = [UIBarButtonItem appearanceWhenContainedInInstancesOfClasses:@[[TZImagePickerController class]]];
            BarItem = [UIBarButtonItem appearanceWhenContainedInInstancesOfClasses:@[[UIImagePickerController class]]];
        } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
            tzBarItem = [UIBarButtonItem appearanceWhenContainedIn:[TZImagePickerController class], nil];
            BarItem = [UIBarButtonItem appearanceWhenContainedIn:[UIImagePickerController class], nil];
#pragma clang diagnostic pop
        }
        NSDictionary *titleTextAttributes = [tzBarItem titleTextAttributesForState:UIControlStateNormal];
        [BarItem setTitleTextAttributes:titleTextAttributes forState:UIControlStateNormal];
    }
    return _imagePickerVc;
}

- (void)doTaskWithConnection:(TNBHTTPConnection *)client
{
    [super doTaskWithConnection:client];
    
    TNBResponse *response = [[TNBResponse alloc] init];
    TNBResponseHeader *header = [[TNBResponseHeader alloc] init];
    NSData * sendData = [response responseWithRsponseHeader:header withContent:[KMCommonUtility jsonStringWithParams:nil]];
    [self.delegate handleFinishedWithSyncResponseData:sendData];
    
    [self takePhoto];
}

- (void)takePhoto {
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if ((authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied) && iOS7Later) {
        // 无相机权限 做一个友好的提示
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"无法使用相机" message:@"请在iPhone的""设置-隐私-相机""中允许访问相机" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"设置", nil];
        [alert show];
#define push @#clang diagnostic pop
        // 拍照之前还需要检查相册权限
    } else if ([[TZImageManager manager] authorizationStatus] == 2) { // 已被拒绝，没有相册权限，将无法保存拍的照片
        UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"无法访问相册" message:@"请在iPhone的""设置-隐私-相册""中允许访问相册" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"设置", nil];
        alert.tag = 1;
        [alert show];
    } else if ([[TZImageManager manager] authorizationStatus] == 0) { // 正在弹框询问用户是否允许访问相册，监听权限状态
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            return [self takePhoto];
        });
    } else { // 调用相机
        UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeCamera;
        if ([UIImagePickerController isSourceTypeAvailable: UIImagePickerControllerSourceTypeCamera]) {
            self.imagePickerVc.sourceType = sourceType;
            if(iOS8Later) {
                _imagePickerVc.modalPresentationStyle = UIModalPresentationOverCurrentContext;
            }
            UIViewController *vc = [UIWindow currentViewController];
            [vc presentViewController:_imagePickerVc animated:YES completion:nil];
        } else {
            UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"无法使用相机" message:@"模拟器中无法打开照相机,请在真机中使用" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
            alert.tag = 2;
            [alert show];
        }
    }
}

#pragma mark - UIAlertViewDelegate

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
#pragma clang diagnostic pop
    if (buttonIndex == 1) { // 去设置界面，开启相机访问权限
        if (iOS8Later) {
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
        } else {
            NSURL *privacyUrl;
            if (alertView.tag == 1) {
                privacyUrl = [NSURL URLWithString:@"prefs:root=Privacy&path=PHOTOS"];
            } else {
                privacyUrl = [NSURL URLWithString:@"prefs:root=Privacy&path=CAMERA"];
            }
            if ([[UIApplication sharedApplication] canOpenURL:privacyUrl]) {
                [[UIApplication sharedApplication] openURL:privacyUrl];
            } else {
                UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"抱歉" message:@"无法跳转到隐私设置页面，请手动前往设置页面，谢谢" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles: nil];
                [alert show];
            }
        }
    }
}


#pragma mark - 系统相机选取图片后的回调
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    UIImage *image = [info objectForKey:@"UIImagePickerControllerOriginalImage"];
    image = [UIImage fixOrientation:image];
    
    [picker dismissViewControllerAnimated:YES completion:^{
        [self sendImageToHtml:image];
    }];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    if (UIImagePickerControllerSourceTypeCamera == picker.sourceType)
    {
        NSString *eventName = self.params[@"eventName"];
        NSString *javaString = [KMScriptManager generateJavaStringWithEventName:eventName?eventName:TAKEPHOTO eventData:@"{}"];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
            [self.delegate handleFinishedWithAsyncResponse];
        });
        [picker dismissViewControllerAnimated:YES completion:NULL];
    }
}

#pragma mark - 选中图片后返回给H5图片的本地路径
- (void)sendImageToHtml:(UIImage *)cropedImage
{
    NSString *imagePath = [KMCommonUtility handlePickedImage:cropedImage withRatio:[self.params objectForKey:@"ratio"]];
    
    KDClassLog(@"image path = %@",imagePath);
    
    NSString *eventName = self.params[@"eventName"];
    NSString *javaString = [KMScriptManager generateJavaStringWithEventName:eventName?eventName:TAKEPHOTO eventData:[NSString stringWithFormat:@"{'url':'%@'}",imagePath]];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.webView km_stringByEvaluatingJavaScriptFromString:javaString];
        [self.delegate handleFinishedWithAsyncResponse];
    });
}


@end



