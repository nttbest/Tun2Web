/**
 * Created by ryan on 15/5/18.
 */
angular.module('myApp.rcustomDirect', [])
.directive('rcustomDirectEdit',function() {
        return {
            restrict: 'ECAM',
            replace: true,
            controller: ['$scope', '$rootScope', function ($scope, $rootScope){
                //console.log($scope,this);
                $scope.onAdd=function(event){
                    this.subData[this.data.currentSub].field_option.push("12345");
                    event.preventDefault();
                    event.stopPropagation();
                }
                $scope.onRemove=function(event,index){
                    //console.log(index,angular.element(event.target));
                    this.subData[this.data.currentSub].field_option.splice(index,1);
                    event.preventDefault();
                    event.stopPropagation();
                }
            }],
            link:function(scope,element,attrs,controller){

            }
        }

})
.directive('rcustomDirectInput',function() {
        return {
            restrict: 'ECAM',
            replace: true,
            templateUrl:'html/wenzishuru.html',
            controller: ['$scope', '$rootScope', function ($scope, $rootScope){
                //console.log("dfsdfsdfsdfsdf===>1:",$scope);
                $scope.isRequired=(String($scope.subData[$scope.data.currentSub].isRequired)==="true")?true:false;
                //$scope.$watch("isRequired",function(newValue,oldValue){
                //    console.log(typeof(newValue),typeof(oldValue))
                //    if(newValue!=oldValue){
                //        $scope.subData[$scope.data.currentSub].isRequired=$scope.isRequired;
                //    }
                //});
            }]

        }
})
.directive('rcustomDirectRadiosingle',function() {
    return {
        restrict: 'ECAM',
        replace: true,
        templateUrl:'html/danxuan.html',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope){
            $scope.isRequired=(String($scope.subData[$scope.data.currentSub].isRequired)==="true")?true:false;
        }]
    }
})
.directive('rcustomDirectRadiomultiple',function() {
    return {
        restrict: 'ECAM',
        replace: true,
        templateUrl:'html/duoxuan.html',
        controller: ['$scope', '$rootScope', function ($scope, $rootScope){
            $scope.isRequired=(String($scope.subData[$scope.data.currentSub].isRequired)==="true")?true:false;
        }]
    }
})
.directive('rcustomDirectAll',function() {//bianjiziduan整个页面的指令
        return {
            restrict: 'ECAM',
            replace: true,
            //require:"^bianjishanchuziduanCtrl",
            controllerAs: 'rcustomDirectAllContrller',
            controller: ['$scope', '$rootScope', 'layoutData','assembles',function ($scope, $rootScope,layoutData,assembles){
                $scope.data.currentSub="input";//设置单页面状态
                $scope.buttonSelects=layoutData.query()['bianjishanchuziduan'].buttonSelects;//设置选择项目(打勾)


                $scope.subData={};
                $scope.subData['input']=assembles.create('input',true);//要创建的页面当前元素对象
                $scope.subData['radio_single']=assembles.create('radio_single',true);
                $scope.subData['radio_multiple']=assembles.create('radio_multiple',true);
                if($scope.data.editer) {
                    var type=$scope.data.editer.field_type;
                    $scope.data.currentSub=type;
                    $scope.subData[type] =$scope.data.editer;
                }
                this.groups = [];

                window.assembles=$scope.assembles;
                //console.log("--rcustomDirectAll--0",$scope.subData)
                //window.scope=$scope;

                this.initState=function(nowScope,type){
                    if($scope.data.editer){
                        //console.log("oookkk0:",nowScope,$scope.data.editer.field_type,type);
                        $scope.$apply(function(){
                            if($scope.data.editer.field_type==type){
                                nowScope.buttonStatus.select = true;
                            }else{
                                nowScope.buttonStatus.select = false;
                            }
                        });
                    }
                }
                this.changeStatus = function (nowScope,type) {
                    $scope.data.currentSub=type;
                    nowScope.buttonStatus.select = true;
                    $scope.subData[type]=assembles.create(type);
                    angular.forEach(this.groups,function(scope){
                        if(scope !== nowScope){
                            scope.buttonStatus.select = false;
                        }
                    })
                }
                $scope.$on('goBackMain', function(event, obj) {
                    if(!$scope.data.editer){
                        console.log("yyyy:",$scope.subData[$scope.data.currentSub])
                        assembles.add($scope.subData[$scope.data.currentSub]);//ng-Repeat不允许collection中存在两个相同Id的对象,// 业务上自己生成唯一的iditem in items track by item.id//或者直接拿循环的索引变量$index来用item in items track by $index
                        $scope.data.editer=null;
                    }else{
                        assembles.update($scope.subData[$scope.data.currentSub],$scope.data.editer.index);
                    }

                });
            }],
            link:function(scope,element,attrs,controller){

            }
        }
})
.directive('rcustomDirect',function(){
    return {
        restrict : 'ECAM',
        require:'^rcustomDirectAll',
        //scope:{},
        replace : true,
        controller:['$scope', '$rootScope', function ($scope, $rootScope){
            $scope.buttonStatus={};
        }],
        link:function(scope,element,attrs,controller){
                //console.log("rcustomDirectAll:",controller);

            element.on('click',function(){
                var txt=angular.element(this).find("span").text();
                controller.changeStatus(scope,getType(txt));
                scope.$apply(function(){});
            })
            setTimeout(function(){
                var txt=angular.element(element).find("span").text();
                controller.initState(scope,getType(txt));
            },100);
            controller.groups.push(scope);

            function getType(txt){
                var type="input";
                switch (txt){
                    case '文字输入':
                        type="input";
                        break;
                    case '单选':
                        type="radio_single";
                        break;
                    case '多选':
                        type="radio_multiple";
                        break;
                }
                return type;
            }
        }
    }})