/**
 * Created by lx on 2017/6/16.
 */

//1.angular模块
var app = angular.module('project', ['ui.router']);
//2.angular config
app.config(['$stateProvider','$urlRouterProvider', '$locationProvider',function ($stateProvider,$urlRouterProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:'/index',
            views:{
                'mainView':{
                    templateUrl:'./tpl/index.tpl.html',
                    controller:'index.ctrl'
                }
            }
        })
        .state('login',{
            url:'/login',
            views:{
                'mainView':{
                    templateUrl:'./tpl/login.tpl.html',
                    controller:'main.ctrl'
                }
            }
        })
        .state('personal',{
            url:'/personal',
            views:{
                'mainView':{
                    templateUrl:'./tpl/personal.tpl.html',
                    controller:'main.ctrl'
                }
            }
        })
        .state('aboutBill',{
            url:'/aboutBill',
            views:{
                'mainView':{
                    templateUrl:'./tpl/aboutBill.tpl.html'
                }
            }
        })
        .state('logined',{
            url:'/logined/:flag',
            views:{
                'mainView':{
                    templateUrl:'./tpl/logined.tpl.html',
                    controller:'login.ctrl'
                }
            }
        })
        .state('aboutOur',{
            url:'/aboutOur',
            views:{
                'mainView':{
                    templateUrl:'./tpl/aboutOur.tpl.html'
                }
            }
        })

        .state('gift',{
            url:'/gift',
            views:{
                'mainView':{
                    templateUrl:'./tpl/gift.tpl.html'
                }
            }
        })
        .state('gift_detail1',{
            url:'/gift_detail',
            views:{
                'mainView':{
                    templateUrl:'./tpl/gift_detail1.tpl.html'
                }
            }
        })
        .state('gift_detail2',{
            url:'/gift_detail',
            views:{
                'mainView':{
                    templateUrl:'./tpl/gift_detail2.tpl.html'
                }
            }
        })
        .state('shopCar',{
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
