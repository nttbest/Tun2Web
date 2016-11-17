'use strict';

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $scope.data={'currentPage':'main','currentSub':'input','editer':null,status:"编辑"};//currentPage:当前页面位置,currentSub:当前编辑项目,当前编辑数据

        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
        var that=this;
        window.assembles={};
        var loadParams=JSON.parse(localStorage.getItem('loadParams'));
        if(loadParams&&loadParams.value.data.bizKey.joineSetting&&loadParams.value.data.bizKey.currentStatus=="update"){
            var injector = angular.injector(["myApp.dataServices"]);
            window.assembles=injector.get("assembles").copy(JSON.parse(loadParams.value.data.bizKey.joineSetting).result);
            //window.assembles.isAutoCheck=3;
        }
        //window.testapp=function(){
        //    //var scope=angular.element(document.querySelectorAll("#ngContainer")[0]).scope();
        //    //$rootScope.go('/bianjishanchuziduan');
        //    $rootScope.$apply(function(){
        //        //scope.$parent.go('/bianjishanchuziduan');
        //        $rootScope.go('/bianjishanchuziduan');
        //    })
        //    $scope.$broadcast('goBackMain', {assembles:$rootScope.assembles});
        //    sendData();
        //}
        $scope.onClick=function(event){
            event.stopPropagation();
            event.preventDefault();
            if(event.target.text.indexOf("<")!=-1){
                switch ($scope.data.currentPage){
                    case '/bianjishanchuziduan':
                        alert("退回到主页bianjishanchuziduan");
                        break;

                    case '/bianjishanchuziduan/bianjiziduan':
                        $rootScope.go('/bianjishanchuziduan');
                        $scope.$broadcast('goBackMain', {assembles:$rootScope.assembles});
                        sendData();
                        break;
                    case '/bianjishanchuziduan/tijiaoshenqing':
                        //$rootScope.go('/bianjishanchuziduan');
                        alert("退回到主页/bianjishanchuziduan/tijiaoshenqing");
                        break;

                }
                return;
            }
            if(event.target.text.indexOf("完成")!=-1){
                $scope.data.status="编辑";

            }else if (event.target.text.indexOf("编辑")!=-1){
                $scope.data.status="完成";
            }
        }
        $scope.$watch('data.currentPage',function(newValue,oldValue){
            if(oldValue!=="main"){
                var temp=(newValue==="/bianjishanchuziduan")? $scope.data.status:"";
                changAppHeader(temp);
            }
        });
        changAppHeader("编辑");
        onHanderAppHeader();
        function sendData(callback){
            var fieldStr = localStorage.getItem('loadParams');
            var fieldStrs = JSON.parse(fieldStr).value.data;
            console.log(fieldStrs.bizKey.source)
            if(fieldStrs.bizKey.source =="1"){
                activitySend(callback);
            }else if(fieldStrs.bizKey.source =="2"){
                send(callback);
            }else if(fieldStrs.bizKey.source =="13"){
                grounpSend(callback);
            }else if(fieldStrs.bizKey.source =="15"){
                orgSend(callback);
            }
        }
        function closeWebview(){
            sendData(function(){
                var fieldStr = localStorage.getItem('loadParams');
                var fieldStrs = JSON.parse(fieldStr).value.data;
                Mwap.events.trigger(
                    Mwap.eventTypes.closeWebview,{
                        nameSpace:fieldStr.nameSpace,
                        device:"iphone6",
                        resultType:"1"
                    });//关闭页面是否刷新界面
            });
        }
        function changAppHeader(rightText){
            var fieldStr = localStorage.getItem('loadParams');
            var fieldStrs = JSON.parse(fieldStr).value.data;
            Mwap.events.trigger(
                Mwap.businessRequest.navigationItem,
                {
                    nameSpace:fieldStr.nameSpace,
                    device:"iphone6",
                    "leftText":" < ",
                    "titleText":"申请表设置",
                    "rightText":rightText,
                    "bgColor":"0x12345678",
                    "isNavigationShow":"1",
                    "isChangeCardShow":"0",
                    cardInfo:""
                });
        }
        function onHanderAppHeader(){
            Mwap.events.on(Mwap.businessResponse.navigationItem,function(e){
                var buttonType=e.value.data.buttonType;
                if(buttonType == 0){
                    switch ($scope.data.currentPage){
                        case '/bianjishanchuziduan':
                            closeWebview();
                            //alert("退回到主页bianjishanchuziduan");
                            break;

                        case '/bianjishanchuziduan/bianjiziduan':
                            $scope.$broadcast('goBackMain',{assembles:$rootScope.assembles});
                            $rootScope.$apply(function(){
                                $rootScope.go('/bianjishanchuziduan');
                            });
                            sendData();
                            break;
                        case '/bianjishanchuziduan/tijiaoshenqing':
                            //$rootScope.go('/bianjishanchuziduan');
                            alert("退回到主页/bianjishanchuziduan/tijiaoshenqing");
                            break;

                    }
                }else if(buttonType == 1){
                    if($scope.data.status==="完成"){
                        var scope = angular.element(document.querySelectorAll("#ngContainer")[0]).scope();
                        scope.$apply(function(){
                            scope.data.status="编辑"
                        })
                        changAppHeader("编辑");
                    }else if ($scope.data.status==="编辑"){
                        var scope = angular.element(document.querySelectorAll("#ngContainer")[0]).scope();
                        scope.$apply(function(){
                            scope.data.status="完成"
                        })
                        changAppHeader("完成");
                    }
                }
        });

    }

    }])

.controller('bianjishanchuziduanCtrl', ['$scope','$rootScope','$routeParams','$filter','assembles', function ($scope,$rootScope,$routeParams,$filter,assembles) {
    $scope.data.currentPage='/bianjishanchuziduan';
    $rootScope.assembles = assembles.query();
        var fieldStr = localStorage.getItem('loadParams');
        fieldStr = JSON.parse(fieldStr).value.data;
        //默认是等于1 //描述:判断是否自动审核 类型:Integer 取值范围:0否 1是  false:0 true:1
        var isAutoCheckStatus = fieldStr.bizKey.autoCheckStatus;
        console.log(isAutoCheckStatus)
        console.log("是否自动审核数据传我的"+isAutoCheckStatus);
        //true 1 isAutoCheckStatus
        if(isAutoCheckStatus == "0"){
            window.assembles.isAutoCheck = 0;
        }else if(isAutoCheckStatus == "1"){
            window.assembles.isAutoCheck = 1;
        }
       // window.assembles.isAutoCheck = 0;
    $scope.fileds=$scope.assembles.fileds;
    $scope.isAutoCheck=Boolean(parseInt($scope.assembles.isAutoCheck));//转成boolean
    $scope.checkClick=function(){
        this.isAutoCheck=!this.isAutoCheck;
        $scope.assembles.isAutoCheck=this.isAutoCheck?1:0;
    }
    $scope.onClick=function(event,index){
        if(index<0){
            $scope.data.editer=null;
        }else{
            $scope.data.editer=JSON.parse(JSON.stringify(assembles.query())).fileds[index]
            $scope.data.editer.index=index;
        }
        $scope.go('/bianjishanchuziduan/bianjiziduan');
        event.stopPropagation();
        event.preventDefault();
    }
    $scope.removeSub=function(event,index){
        console.log("assembles:",index,assembles);
        // this.subData[this.data.currentSub].field_option.splice(index,1);
        assembles.remove(index);
        event.stopPropagation();
        event.preventDefault();
    }
}])
.controller('bianjiziduanCtrl', ['$scope','$rootScope', '$routeParams', 'assembles', function ($scope, $rootScope,$routeParams,assembles) {
    $scope.data.currentPage='/bianjishanchuziduan/bianjiziduan';
    $rootScope.assembles = assembles.query();
    $scope.removeSub=function(event,index){
        $rootScope.go('/bianjishanchuziduan');
        //console.log("assembles:",index,assembles);
        // this.subData[this.data.currentSub].field_option.splice(index,1);
        if($scope.data.editer)assembles.remove($scope.data.editer.index);
        event.stopPropagation();
        event.preventDefault();
    }
}])
.controller('tijiaoshenqingCtrl', ['$scope', '$rootScope','$routeParams', 'assembles', function ($scope, $rootScope,$routeParams, assembles) {
    var loadParams=JSON.parse(localStorage.getItem('loadParams'));
    if(loadParams&&loadParams.value.data.bizKey.joineSetting){
        window.assembles=assembles.copy(JSON.parse(loadParams.value.data.bizKey.joineSetting).result)
    }
    $scope.data.currentPage='/bianjishanchuziduan/tijiaoshenqing';
    $scope.acceptFn = function(event,index){
            var fieldStr = localStorage.getItem('loadParams');
            var fieldStrs = JSON.parse(fieldStr).value.data;
            console.log(fieldStrs.bizKey.source)
            if(fieldStrs.bizKey.source =="13"){
                groupAnswerFun(function(callback){
                    Mwap.events.trigger(
                        Mwap.eventTypes.closeWebview,{
                            nameSpace:fieldStr.nameSpace,
                            device:"iphone6",
                            resultType:"1"
                        });//关闭页面是否刷新界面
                });
            }else if(fieldStrs.bizKey.source =="1"){
                activeAnswerFun(function(callback){
                    Mwap.events.trigger(
                        Mwap.eventTypes.closeWebview,{
                            nameSpace:fieldStr.nameSpace,
                            device:"iphone6",
                            resultType:"1"
                        });//关闭页面是否刷新界面
                });
            }else{
                questionAnswerFun(function(callback){
                    Mwap.events.trigger(
                        Mwap.eventTypes.closeWebview,{
                            nameSpace:fieldStr.nameSpace,
                            device:"iphone6",
                            resultType:"1"
                        });//关闭页面是否刷新界面
                });
            };


        event.stopPropagation();
        event.preventDefault();
    }
    $rootScope.assembles = assembles.query();
}])