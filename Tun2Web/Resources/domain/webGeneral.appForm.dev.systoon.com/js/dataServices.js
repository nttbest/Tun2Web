'use strict';

(function () {

    var data = {
            "status":0,//0为创建，1为编辑
            "isAutoCheck":true,
            "fileds": []
        },
        filedModes=[
            {
                "id":"none",
                "isRequired":"true",
                "field_type":"input",
                "field_name":"",
                "field_cont":""
            },
            {
                "id":"none",
                "isRequired":"true",
                "field_type":"radio_single",
                "field_name":"",
                "field_option":["选项1","选项2","选项3","选项4"]
            },
            {
                "id":"none",
                "isRequired":"true",
                "field_type":"radio_multiple",
                "field_name":"",
                "field_option":["选项1","选项2","选项3","选项4"]
            }
        ],
        filedModesClone=JSON.stringify(filedModes),
        layoutData={
            'bianjishanchuziduan':{
                buttonSelects:["文字输入","单选","多选"]
            }
        },
        findByName = function (field_name) {
            var employee = null,
                l = data.fileds.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (data[i].fileds.field_name === field_name) {
                    employee = data[i].fileds;
                    break;
                }
            }
            return employee;
        },
        findById=function(id){
            var l=data.fileds.length;
            for(var i=0;i<l;i++){
                var filed=data[i].fileds;
                if(filed.id===id){
                    return {filed:filed,index:i};
                }
            }
            return null;
        }
    //findByManager = function (managerId) {
    //    var results = employees.filter(function (element) {
    //        return managerId === element.managerId;
    //    });
    //    return results;
    //};
window.filedModesClone=filedModesClone;
        angular.module('myApp.dataServices', [])
        .factory('assembles', [
            function () {
                return {
                    query: function () {
                        return data;
                    },
                    create:function(type,clearAll){//是否清除引用对象
                        var index=-1;
                        var obj=null;
                        if(type==='input'){
                            index=0;
                        }else if(type==='radio_single'){
                            index=1;
                        }else if(type==='radio_multiple'){
                            index=2;
                        }
                        if(index>=0){
                            if(!clearAll){
                                obj=filedModes[index];
                            }else{
                                obj=JSON.parse(filedModesClone)[index];
                                filedModes[index]=obj;
                            }
                            obj.id=new Date().getTime();
                        }

                        return obj;
                    },
                    add:function(newData){
                        if(newData){
                            newData.id=new Date().getTime();
                            data.fileds.push(newData)
                        }
                        return newData;
                    },
                    update:function(newData,index){
                        if(newData){
                            var arr=data.fileds;
                            if(!isNaN(index)){
                                arr[index]=newData;
                                return;
                            }
                            for(var i=0;i<arr.length;i++){
                                if(arr[i].id==newData.id){
                                    arr[i]=newData;
                                    return;
                                }
                            }
                        }
                        return newData;
                    },
                    remove:function(index){
                        var currentData=null;
                        if(index<=data.fileds.length){
                            currentData=data.fileds.splice(index,1);
                        }
                        return currentData[0];
                    },
                    removeById:function(id){
                        var currentData=null;
                        var obj=findById(id);
                        if(obj){
                            currentData=obj.field;
                            var index=obj.index;
                            currentData=data.fileds.splice(index,1);
                        }
                        return currentData;
                    },
                    copy:function(sourceObj){
                        if(!angular.isObject(sourceObj)){
                            data=JSON.parse(sourceObj);
                        }else{
                            data=JSON.parse(JSON.stringify(sourceObj))
                        }
                        return data;
                    }

                }

            }])
        .factory('layoutData', [
            function () {
                return {
                    query: function () {
                        return layoutData;
                    }
                }
            }]);

}());