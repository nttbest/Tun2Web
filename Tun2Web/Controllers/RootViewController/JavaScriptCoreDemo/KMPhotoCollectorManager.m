//
//  KMPhotoCollectorManager.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/24.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMPhotoCollectorManager.h"
#import "TZImagePickerController.h"

NSString * const KMObtainImageNotification = @"KMObtainImageNotification";

@interface KMPhotoCollectorManager () <KMPhotoCollectorManagerProtocol,TZImagePickerControllerDelegate>
@property (nonatomic, strong) TZImagePickerController *imagePickerVc;
@end

@implementation KMPhotoCollectorManager

- (void)chooseSinglePicture {
    
    self.imagePickerVc = [[TZImagePickerController alloc] initWithMaxImagesCount:1
                                                                    columnNumber:4
                                                                        delegate:self
                                                               pushPhotoPickerVc:YES];
    
    self.imagePickerVc.allowTakePicture = NO;
    self.imagePickerVc.allowPickingVideo = NO;
    self.imagePickerVc.allowPickingImage = YES;
    self.imagePickerVc.allowPickingOriginalPhoto = YES;
    self.imagePickerVc.sortAscendingByModificationDate = YES;
    
    @weakify(self)
    [self.imagePickerVc setDidFinishPickingPhotosHandle:^(NSArray<UIImage *> *photos, NSArray *assets, BOOL isSelectOriginalPhoto){
        @strongify(self)
        UIImage *photo = [photos objectAtIndex:0];
        [self refresh:photo];
    }];
    
    [self.imagePickerVc setImagePickerControllerDidCancelHandle:nil];
    
    UIViewController *vc = [UIWindow currentViewController];
    [vc.navigationController presentViewController:self.imagePickerVc animated:YES completion:NULL];
}

- (void)refresh:(UIImage *)image
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:KMObtainImageNotification object:image];
    });
}

@end
