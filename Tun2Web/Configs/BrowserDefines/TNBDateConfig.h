//
//  YUDateConfig.h
//  YUDatePicker
//
//  Created by kevinma on 15/4/26.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#ifndef YUDatePicker_YUDateConfig_h
#define YUDatePicker_YUDateConfig_h

#import <UIKit/UIKit.h>

#ifndef isIOS7
#define isIOS7  ([[[UIDevice currentDevice]systemVersion]floatValue] >= 7.0)
#endif

#ifndef isIOS8
#define isIOS8   ([[[UIDevice currentDevice]systemVersion]integerValue] >= 8.0)
#endif

#define NOT_DEFINED         -1
#define L2S(x) ((x)==NOT_DEFINED?@"":[NSString stringWithFormat:@"%ld",((long)x)])
#define I2S(x) ((x)==NOT_DEFINED?@"":[NSString stringWithFormat:@"%d",((int)x)])

//config
#define XYPICKER_MAXDATE 3000

#define XYPICKER_MINDATE 1000

#define XYPICKER_MONTH 12

#define XYPICKER_DAY 31

#define XYPICKER_HOUR 24

#define XYPICKER_MINUTE 60

#define XY_LIGHTGRAY [UIColor lightGrayColor]//不可选颜色( date < min || date > max)

#define XY_BLACK [UIColor blackColor]//可选颜色< min < date < max >

#define XY_FORMAT @"yyyyMMddHHmm"

#define XY_FORMATSTR @"%@%@%@%@%@"

#define XY_DATESTR @"%@-%@-%@ %@:%@:00"

#define XY_DATE @"%@-%@-%@"
#endif
