//
//  UIDevice+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef enum
{
    NOT_AVAILABLE,
    
    IPHONE_2G,
    IPHONE_3G,
    IPHONE_3GS,
    IPHONE_4,
    IPHONE_4_CDMA,
    IPHONE_4S,
    IPHONE_5,
    IPHONE_5_CDMA_GSM,
    IPHONE_5C,
    IPHONE_5C_CDMA_GSM,
    IPHONE_5S,
    IPHONE_5S_CDMA_GSM,
    IPHONE_6,
    IPHONE_6_PLUS,
    
    
    IPOD_TOUCH_1G,
    IPOD_TOUCH_2G,
    IPOD_TOUCH_3G,
    IPOD_TOUCH_4G,
    IPOD_TOUCH_5G,
    
    IPAD,
    IPAD_2,
    IPAD_2_WIFI,
    IPAD_2_CDMA,
    IPAD_3,
    IPAD_3G,
    IPAD_3_WIFI,
    IPAD_3_WIFI_CDMA,
    IPAD_4,
    IPAD_4_WIFI,
    IPAD_4_GSM_CDMA,
    
    IPAD_MINI,
    IPAD_MINI_WIFI,
    IPAD_MINI_WIFI_CDMA,
    IPAD_MINI_RETINA_WIFI,
    IPAD_MINI_RETINA_WIFI_CDMA,
    
    IPAD_AIR_WIFI,
    IPAD_AIR_WIFI_GSM,
    IPAD_AIR_WIFI_CDMA,
    
    SIMULATOR
} KMHardware;

@interface UIDevice (KMUtilities)


/** This method retruns the hardware type */

- (NSString*)hardwareString;

/** This method returns the Hardware enum depending upon harware string */
- (KMHardware)hardware;

/** This method returns the readable description of hardware string */
- (NSString*)hardwareDescription;

/** This method returs the readble description without identifier (GSM, CDMA, GLOBAL) */
- (NSString *)hardwareSimpleDescription;

/** This method returns YES if the current device is better than the hardware passed */
- (BOOL)isCurrentDeviceHardwareBetterThan:(KMHardware)hardware;

/** This method returns the resolution for still image that can be received
 from back camera of the current device. Resolution returned for image oriented landscape right. **/
- (CGSize)backCameraStillImageResolutionInPixels;

/** This method returns YES if the currend device is iPhone and has 4" display **/
- (BOOL)isIphoneWith4inchDisplay;

+ (NSString *)macAddress;

//Return the current device CPU frequency
+ (NSUInteger)cpuFrequency;
// Return the current device BUS frequency
+ (NSUInteger)busFrequency;
//current device RAM size
+ (NSUInteger)ramSize;
//Return the current device CPU number
+ (NSUInteger)cpuNumber;
//Return the current device total memory

/// 获取iOS系统的版本号
+ (NSString *)systemVersion;
/// 判断当前系统是否有摄像头
+ (BOOL)hasCamera;
/// 获取手机内存总量, 返回的是字节数
+ (NSUInteger)totalMemoryBytes;
/// 获取手机可用内存, 返回的是字节数
+ (NSUInteger)freeMemoryBytes;

/// 获取手机硬盘空闲空间, 返回的是字节数
+ (long long)freeDiskSpaceBytes;
/// 获取手机硬盘总空间, 返回的是字节数
+ (long long)totalDiskSpaceBytes;

@end
