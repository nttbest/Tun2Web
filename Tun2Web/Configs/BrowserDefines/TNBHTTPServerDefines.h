//
//  TNBHTTPServerDefines.h
//  ToonBrowser
//
//  Created by kevinma on 15/10/21.
//  Copyright © 2015年 kevinma. All rights reserved.
//

#ifndef TNBHTTPServerDefines_h
#define TNBHTTPServerDefines_h

#pragma mark - server
#define HTTP_SERVER_PORT 6780
#define HTTPS_SERVER_PORT 8443
#define kBonjourServiceType @"_http._tcp."
#define HTTP_LOCALHOST @"127.0.0.1"
#define URL_SCHEME_HTTP @"http"
#define URL_SCHEME_HTTPS @"https"
#define READ_INPUT_BUFFER_SIZE 4096
#define MAX_OUTPUT_BUFFER_SIZE 1024000

#define MIMETYPE_PNG    @"image/png"
#define MIMETYPE_JPG    @"image/jpg"
#define MIMETYPE_JPEG   @"image/jpg"
#define MIMETYPE_WOFF   @"font/woff"
#define MIMETYPE_TTF    @"font/opentype"
#define MIMETYPE_M4A    @"audio/mp4a-latm"
#define MIMETYPE_JS     @"application/javascript; charset=utf-8"
#define MIMETYPE_HTML   @"text/html; charset=utf-8"

#endif /* TNBHTTPServerDefines_h */
