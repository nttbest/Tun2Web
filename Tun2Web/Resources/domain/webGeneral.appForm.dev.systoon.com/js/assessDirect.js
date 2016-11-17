/**
 * Created by ryan on 15/6/4.
 */
angular.module('myApp.assessDirect', [])
    .directive('assessInput',function() {
        return {
            restrict: 'ECAM',
            replace: true,
            controller: ['$scope', '$rootScope', function ($scope, $rootScope){
                var arr=$rootScope.assembles.fileds;
                $scope.inputs=arr.filter(function(item){
                    if(item.field_option)item.field_checked=new Array(item.field_option.length);
                    return (item.field_type=="input");
                })
                //$scope.inputs.forEach(function(item){
                //    item.field_checked=[];
                //})
                window.scope=$scope;

            }],
            link:function(scope,element,attrs,controller){

            }
        }

    })
    .directive('assessSingleSelect',function() {
        return {
            restrict: 'ECAM',
            replace: true,
            controller: ['$scope', '$rootScope', function ($scope, $rootScope){
                var arr=$rootScope.assembles.fileds;
                $scope.singleSelects=arr.filter(function(item){
                    if(item.field_option)item.field_checked=new Array(item.field_option.length);
                    return (item.field_type=="radio_single");
                })
                //$scope.singleSelects.forEach(function(item){
                //    item.field_checked=[];
                //})
                $scope.ngChange=function(item,index){
                    console.log("oooppp:",index)
                    //this.singleSelects.forEach(function(item){
                    //item.field_checked[index]='true';
                        if(item.field_option){
                            item.field_checked.forEach(function (sub, i) {
                                item.field_checked[i] = (i == index);
                            })
                        }
                    //})
                }
            }],
            link:function(scope,element,attrs,controller){

            }
        }

    })
    .directive('assessMultipleSelect',function() {
        return {
            restrict: 'ECAM',
            replace: true,
            controller: ['$scope', '$rootScope', function ($scope, $rootScope){
                var arr=$rootScope.assembles.fileds;
                $scope.multiSelects=arr.filter(function(item){
                    if(item.field_option)item.field_checked=new Array(item.field_option.length);
                    return (item.field_type=="radio_multiple");
                })
                //$scope.multiSelects.forEach(function(item){
                //    item.field_checked=[];
                //})
            }],
            link:function(scope,element,attrs,controller){

            }
        }

    })