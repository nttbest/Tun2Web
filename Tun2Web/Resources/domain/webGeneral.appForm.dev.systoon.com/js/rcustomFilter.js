/**
 * Created by ryan on 15/5/29.
 */
angular.module('myApp.rcustormFilter', [],function($filterProvider, $provide, $controllerProvider){
    //$filterProvider.register('confirmOrEdit', function () {
    //    return function(){
    //        var temp="  ";
    //        console.log("sdfsdfsdfs:::",data.currentPage)
    //        temp=(data.currentPage=="/bianjishanchuziduan")?"编辑":"  ";
    //        return temp;
    //    }
    //});
    //
    //$controllerProvider.register('MainCtrl', function ($scope, Data) {
    //    //$scope.data = Data;
    //})

})
.filter('confirmOrEdit',function(){
    return function(arg,data){
            //var temp="  ";
            //temp=(data.currentPage=="/bianjishanchuziduan")?"编辑":"  ";
            //return temp;
        var temp=(data.currentPage=="/bianjishanchuziduan")?{'visibility': 'visible'}:{'visibility':'hidden'};

        return temp;
        }
})

.filter('endOrEdit',function(){
    return function(arg,a){
        var bol=((a.data.status).replace(/(^\s*)|(\s*$)/g,'')=='完成');
        return bol;
    }
})