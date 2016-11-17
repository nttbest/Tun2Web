/**
 * Created by hcw on 2015/8/11.
 */
var routeApp=angular.module('routeApp',['ngRoute','ngAnimate']);
routeApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/main',{
        templateUrl: 'tpls/main.html',
        controller: 'mainCtrl'
    })
    .when('/phone',{
            templateUrl: 'tpls/phone.html',
            controller: 'phoneCtrl'
    })
    .when('/lickCar',{
        templateUrl: 'tpls/lickCar.html',
        controller: 'lickCarCtrl'
    })
    .when('/bank',{
        templateUrl: 'tpls/bank.html',
        controller: 'bankCtrl'
    })
    .when('/courier',{
        templateUrl: 'tpls/courier.html',
        controller: 'courierCtrl'
    })
    .when('/property',{
        templateUrl: 'tpls/property.html',
        controller: 'propertyCtrl'
    })
    .when('/lickedCarType',{
        templateUrl: 'tpls/lickedCarType.html',
        controller: 'lickedCarTypeCtrl'
    })
    .when('/addCar',{
        templateUrl: 'tpls/addCar.html',
        controller: 'addCarCtrl'
    })
    .otherwise({
        redirectTo: '/main'
    });
}]);
routeApp.animation('.route-body', function () {
    return {
        enter: function(element, done) {
            element.css({
                opacity: 0.5,
                position: "relative",
                top: "10px",
                left: "200px"
            })
                .animate({
                    top: 0,
                    left: 0,
                    opacity: 1
                }, 1000, done);
        }
    };
});