/**
 * Created by Leslie on 2017/6/14.
 */

app.factory('isLogins', ['$http', function ($http) {
    return {
        getList: function () {
            return $http.get('/api/cake/isLogin'); // Promise对象 后期通过then来获取success error
        },
        isSuccess: function (array) {
            return $http.post('/api/cake/myCenterLogin?data=',array);
        }
    }
}]);