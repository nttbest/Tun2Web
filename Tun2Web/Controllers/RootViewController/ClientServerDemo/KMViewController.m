//
//  KMViewController.m
//  Tun2Web
//
//  Created by kevinma on 2016/10/17.
//  Copyright © 2016年 kevinma. All rights reserved.
//

#import "KMViewController.h"

@interface KMViewController ()

@end

@implementation KMViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    [self startWithType:KMWebViewURLTypeDemo nameSpace:nil filePath:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
