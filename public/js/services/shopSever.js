/**
 * Created by lx on 2017/6/26.
 */
app.factory('cart',['$http',function($http){
    return{
        addCart:function(pid){
            return $http.get('/api/shopcar/addCart?pid='+pid);
        },
        deleteCart:function(pid){
            return $http.get('/api/shopcar/deleteCart?pid='+pid);
        }

    }
}]);