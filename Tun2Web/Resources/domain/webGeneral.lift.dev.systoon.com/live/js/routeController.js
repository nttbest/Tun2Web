/**
 * Created by hcw on 2015/8/11.
 */
//生活主界面
routeApp.controller('mainCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope ){
        $rootScope.indexTitle="生活";
        $scope.title="生活";
        var data=[{"id":"phoneId","title":"手机服务","icon":"./assets/phone.png","url":"/phone","className":"item-bottle-green"},
                  //{"id":"carId","title":"爱车服务","icon":"./assets/lickedCar.png","url":"/lickCar","className":"item-blue"},
                  {"id":"bankId","title":"银行卡服务","icon":"./assets/bank.png","url":"/bank","className":"item-orange-yellow"},
                  {"id":"CourierId","title":"快递服务","icon":"./assets/courier.png","url":"/courier","className":"item-light-green"}
                 // {"id":"propertyId","title":"物业服务","icon":"./assets/property.png","url":"/property","className":"item-pink"}
				  ];
        $scope.dataList=data;
        $scope.toServer=function(d){
            $rootScope.indexTitle= d.title;
            $location.path(d.url) ;
        }
    }]);
//手机服务
routeApp.controller('phoneCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="手机服务";
        $scope.parentTitle="生活";
        var data=[{"id":"phoneRechargeId","title":"话费充值","icon":"./assets/phone_recharge.png","url":"http://h5.m.taobao.com/app/cz/cost.html?denom=50&clientSource=ucbrowser","className":"item-blue"},
            {"id":"phoneMaintainId","title":"手机维修","icon":"./assets/phone_maintain.png","url":"http://3g.ganji.com/bj_shumashoujiweixiu/?url=shoujiweixiu&ca_source=other_m.sm.com_list_2","className":"item-pink"},
            {"id":"phoneRecycleId","title":"手机回收置换","icon":"./assets/phone_recycle.png","url":"http://3g.ganji.com/tj_shouji/?ifid=v3_secondmarket_categorylist_shoujim","className":"item-light-green"}];
        $scope.dataList=data;
        $scope.toServer=function(d){
            //alert(d.url);
            window.location= d.url;
        }
    }]);
/******爱车服务*****/
routeApp.controller('lickCarCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="爱车服务";
        $scope.parentTitle="生活";
        $scope.addCar=function(){
            $location.path('/addCar') ;
        }
    }]);
//添加爱车
routeApp.controller('addCar',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="添加爱车";
        $scope.parentTitle="爱车服务";
    }]);
routeApp.controller('lickCarCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="爱车服务";
        $scope.parentTitle="生活";
    }]);
//银行卡服务
routeApp.controller('bankCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="银行卡服务";
        $scope.parentTitle="生活";
        var data=[{"id":"","title":"中国银行","icon":"./assets/bank_china.png","url":"http://wap.boc.cn/","className":"item-blue"},
            {"id":"","title":"中国工商银行","icon":"./assets/bank_icbc.png","url":"http://m.icbc.com.cn/icbc/default1.htm","className":"item-pink"},
            {"id":"","title":"中国农业银行","icon":"./assets/bank_abc.png","url":"http://m.abchina.com/touch/","className":"item-light-green"},
            {"id":"","title":"中国建设银行","icon":"./assets/bank_ccb.png","url":"http://m.ccb.com/cn/mobile/index.html","className":"item-pink"},
            {"id":"","title":"交通银行","icon":"./assets/bank_bocom.png","url":"https://wap.95559.com.cn/mbankView/index.jsp","className":"item-light-green"}];
        $scope.dataList=data;
        $scope.toServer=function(d){
            //alert(d.url);
            window.location= d.url;

        }
    }]);
//快递服务
routeApp.controller('courierCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="快递服务";
        $scope.parentTitle="生活";
        var data=[{"id":"courierSearchId","title":"查询快递","icon":"./assets/courier_search.png","url":"http://m.kuaidi100.com","className":"item-pink"},
            {"id":"courierTimeId","title":"时效查询","icon":"./assets/courier_time.png","url":"http://m.kuaidi100.com/time/","className":"item-bottle-green"},
            {"id":"courierSenId","title":"网上寄件","icon":"./assets/courier_sen.png","url":"http://m.kuaidi100.com/ucdaohang/","className":"item-orange-yellow"}];
        $scope.dataList=data;
        $scope.toServer=function(d){
           // alert(d.title);
            window.location= d.url;
        }
    }]);
//物业服务
routeApp.controller('propertyCtrl',['$http', '$location', '$rootScope', '$scope',
    function($http, $location, $rootScope, $scope) {
        $scope.title="物业服务";
        $scope.parentTitle="生活";
    }]);