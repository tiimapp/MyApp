angular.module('UserService', [])
.factory('account', function ($resource, $http, $q) {
    var images = [
        "amy_jones.jpg",
        "eugene_lee.jpg",
        "gary_donovan.jpg",
        "james_king.jpg",
        "john_williams.jpg",
        "julie_taylor.jpg",
        "kathleen_byrne.jpg",
        "lisa_wong.jpg",
        "paul_jones.jpg",
        "paula_gates.jpg",
        "ray_moore.jpg",
        "steven_wells.jpg",
    ];
    //var apiUrl = 'http://localhost:52974/api/login/';
    var apiUrl = 'scripts/data/';

    return {
        checkLogin: function (user) {
            var deferred = $q.defer();
            var flag = false;
            var result = null;

            $http.get(apiUrl + 'Users.json').success(function (data) {
                angular.forEach(data, function (value, key) {
                    if (value.userName == user.userName && value.password == user.password) {
                        flag = true;
                        result = value;
                        return;
                    }
                });
                deferred.resolve(result);

            }).error(function (msg) {
                deferred.reject(msg);
            });
            return deferred.promise;
        },
        GetAll: function (occupation, pageSize, pageIndex) {
            var deferred = $q.defer();
            var flag = false;
            var result = null;

            $http.get(apiUrl + 'consultants.json').success(function (data) {
                var users = [];
                angular.forEach(data, function (value, key) {
                    if (key >= pageSize * (pageIndex - 1) && key < pageSize * pageIndex) {
                        users.push(value);
                    }
                });
                deferred.resolve({ Data: users ,total:data.length});

            }).error(function (msg) {
                deferred.reject(msg);
            });
            return deferred.promise;
        }
    }
})