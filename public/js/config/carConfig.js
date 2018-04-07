/**
 * Created by lx on 2017/6/22.
 */
var app=angular.module('myctrl',['ui.router']);
app.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('shopCar');
    $stateProvider.state('shopCar',{
        url:'/shopCar/:name',
        views:{
            'mainView':{
                templateUrl: function ($route) {
                    console.log($route);
                    if ($route.name == 'empty') {
                        return './tpl/shopCar.tpl.html'
                    } else {
                        return './tpl/shopCar1.tpl.html'
                    }
                },
                controller:'shop1.ctrl'
            }
        }
    })
}]);

app.run(['$rootScope','cart','$state',function($rootScope,cart,$state){
    $rootScope.addCart = function(pid){
        cart.addCart(pid).then(function(res){
            if(res.status){
                $state.go('shopCar',{name: 'noempty'});
            }
            console.log(res)
        },function(res){
            if(res.status){
                $state.go('shopCar',{name: 'noempty'});
            }
            console.log(res)
        })
    },
        $rootScope.deleteCart=function(pid){
            cart.deleteCart(pid).then(function(res){
                console.log(res);
            })
        }
}])
