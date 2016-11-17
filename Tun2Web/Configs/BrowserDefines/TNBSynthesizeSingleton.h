//
//  TNBSynthesizeSingleton.h
//  ToonBrowser
//
//  Created by kevinma on 15/4/28.
//  Copyright (c) 2015年 kevinma. All rights reserved.
//

#ifndef ToonBrowser_TNBSynthesizeSingleton_h
#define ToonBrowser_TNBSynthesizeSingleton_h

#define SINGLETON_FOR_CLASS(classname) \
\
+ (classname *)sharedInstance \
{\
    static classname *sharedInstance = nil; \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{ \
        sharedInstance = [[self alloc] init]; \
    }); \
    return sharedInstance; \
} \
\

#endif
