//
//  XMPP.h
//  RNXMPP
//
//  Created by Pavlo Aksonov on 23.09.15.
//  Copyright © 2015 Pavlo Aksonov. All rights reserved.
//
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTConvert.h>
#import "RNXMPPService.h"

@interface RNXMPP : NSObject<RCTBridgeModule, RNXMPPServiceDelegate>

@end
