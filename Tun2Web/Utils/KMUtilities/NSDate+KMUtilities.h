//
//  NSDate+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSDate (KMUtilities)

+ (NSString *)dateToString:(NSDate *)date;

+ (NSDate *)dateFromString:(NSString *)string withFormat:(NSString *)format;

+(NSDate *)dateWithYea:(NSInteger)yeaNum;

+ (NSInteger)daysfromYear:(NSInteger)year andMonth:(NSInteger)month;

+ (NSDateComponents*)dateComponentsFromDate:(NSDate*)date;

@end
