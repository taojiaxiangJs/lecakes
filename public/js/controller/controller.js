/**
 * Created by lx on 2017/6/16.
 */
app.controller('main.ctrl', ['$scope','$state','isLogins', function ($scope,$state,isLogins) {
    //$scope.isSuccess= function () {
    //    var Promise=isLogins.isSuccess;
    //    Promise.then(function (res) {
    //        var data=res.data;
    //        if(data.status){
    //            console.log(222222222222222222)
    //            $state.go('personal',{flag:data.status})
    //        }else{
    //            //console.log(1)
    //            $state.go('login')
    //        }
    //    })
    //}
    $scope.isLogin1= function (a) {
        var Promise = isLogins.getList();
        Promise.then(function (res) {
            var data=res.data;
            if(data.status){
                $state.go('logined',{flag:a})
            }else{
                $state.go('login')
            }
        })
    }
    $scope.ddd=true;
    $scope.isSuccess= function () {
        var array={'tel':$scope.tel,'password':$scope.password};
        var Promise=isLogins.isSuccess(array);
        Promise.then(function (res) {
            $scope.data=res.data;
            if($scope.data.status){
                $scope.ddd=false;
                $scope.username=$scope.data.msg;
                alert('登录成功！');
                $state.go('personal')
            }else{
                alert('用户名或密码错误！');
                $state.go('login')
            }
        })
    }
    //$scope.method1 = function() {
    //    $scope.url = "http://localhost:8081/Learning5/T1.action";
    //    $http({method:"POST",url:$scope.url,params:{msg:'abc'}}).success(function (data) {
    //        $scope.content = data;
    //    });
    //};
}]).controller('index.ctrl',['$scope','$stateParams',function($scope,$stateParams){
    $scope.city='上海';
}]).controller('shop1.ctrl',['$scope',function($scope){
    $scope.a="请填写祝福语";
    $scope.add=function(w){
        $scope.a=w;}
}]).controller('login.ctrl',['$scope','$stateParams',function ($scope,$stateParams) {
    $scope.flag=$stateParams.flag;
}])
//    .controller('isSuccess.ctrl',['$scope','$state','$stateParams','isLogins',function ($scope,$state,$stateParams,isLogins) {
//   $scope.isSuccess= function () {
//       var array={'tel':$scope.tel,'password':$scope.password};
//       var Promise=isLogins.isSuccess(array);
//       Promise.then(function (res) {
//          $scope.data=res.data;
//           $scope.flag=res.data.status;
//           $scope.username=res.data.msg;
//           console.log($scope.flag)
//           console.log($scope.username)
//           if($scope.data.status){
//               alert('登录成功！');
//               $state.go('personal')
//           }else{
//               alert('用户名或密码错误！');
//               $state.go('login')
//           }
//       })
//   }
//}]);