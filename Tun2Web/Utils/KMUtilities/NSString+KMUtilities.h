//
//  NSString+KMUtilities.h
//  Tun2Web
//
//  Created by kevinma on 2016/10/20.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (KMUtilities)

- (NSString *)encodeToPercentEscapeString;

- (NSString *)decodeFromPercentEscapeString;

- (NSString *)generateMacroWithUserId:(NSString *)userId;

- (NSDictionary *)dictionaryValue;

@end
