'use strict';

    var myApp=angular.module('myApp', [
        'ngTouch',
        'ngRoute',
        'ngAnimate',
        'myApp.controllers',
        'myApp.dataServices',
        'myApp.rcustomDirect',
        'myApp.rcustormFilter',
        'myApp.assessDirect'
    ]).
        config(['$routeProvider', function ($routeProvider) {
            var loadParams=JSON.parse(localStorage.getItem('loadParams'));
            var value=null;
            var status="create";
            try{
                value=loadParams.value.data.bizKey.joineSetting;
                status=loadParams.value.data.bizKey.currentStatus;
                console.log("loadParams-error11111:"+status+value);
            }catch (e){
                console.log("loadParams-error:",e)
            }

            if(value&&status=="Q&A"){
                $routeProvider.when('/bianjishanchuziduan/tijiaoshenqing',
                    {
                        templateUrl: 'html/tijiaoshenqing.html',
                        controller: 'tijiaoshenqingCtrl'
                    });
                $routeProvider.otherwise({redirectTo: '/bianjishanchuziduan/tijiaoshenqing'});//初始化默认页面
            }else{
                $routeProvider.when('/bianjishanchuziduan',
                    {
                        templateUrl: 'html/bianjishanchuziduan.html',
                        controller: 'bianjishanchuziduanCtrl'
                    });
                $routeProvider.when('/bianjishanchuziduan/bianjiziduan',
                    {
                        templateUrl: 'html/bianjiziduan.html',
                        controller: 'bianjiziduanCtrl'
                    });

                $routeProvider.when('/bianjishanchuziduan/danxuan',
                    {
                        templateUrl: 'html/danxuan.html',
                        controller: 'danxuanCtrl'
                    });
                $routeProvider.when('/bianjishanchuziduan/duoxuan',
                    {
                        templateUrl: 'html/duoxuan.html',
                        controller: 'duoxuanCtrl'
                    });
                $routeProvider.otherwise({redirectTo: '/bianjishanchuziduan'});//初始化默认页面
            }

}]);


Mwap.events.on(Mwap.nativeTypes.loadParams,function(e) {
     console.log("异步信息:" + JSON.stringify(e));
     localStorage.setItem('loadParams',JSON.stringify(e));
     //var loadParams = JSON.parse(JSON.stringify(e));
     
     angular.bootstrap(angular.element(document.body), ['myApp']);

});