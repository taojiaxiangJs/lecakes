/**
 * Created by lx on 2017/6/22.
 */
app.controller('shop1.ctrl',['$scope',function($scope){
    $scope.a="请填写祝福语";
    $scope.add=function(w){
        $scope.a=w;}
}])