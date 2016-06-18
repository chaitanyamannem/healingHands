angular.module('helpingHands', ['ngRoute'])
    .config(function ($routeProvider, $httpProvider) {

        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'home'
        }).when('/login', {
            templateUrl: 'login.html',
            controller: 'navigation'
        }).otherwise('/');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    })
    .controller('home', function ($rootScope, $scope, $http) {

        $scope.greeting = $rootScope.user;

        // $http.get('/create/?email=d2@gmail.com&password=123456').success(function (data) {
        //   console.log("user created with id " + data.id);
        // });

    })
    .controller('navigation',
        function ($rootScope, $scope, $http, $location) {

            var authenticate = function (credentials, callback) {


                if (credentials) {
                    var getByEmailURL = '/getByEmail/?email=' + credentials.username + '&password=' + credentials.password;
                    console.log("getByEmailURL" + getByEmailURL);
                    $http.get(getByEmailURL).success(function (data) {
                        if (data.id) {
                            $rootScope.authenticated = true;
                            $rootScope.user = data;
                        } else {
                            $rootScope.authenticated = false;
                        }
                        callback && callback();
                    }).error(function () {
                        $rootScope.authenticated = false;
                        callback && callback();
                    });
                }

            }
            authenticate();
            $scope.credentials = {};
            $scope.login = function () {
                authenticate($scope.credentials, function () {
                    if ($rootScope.authenticated) {
                        $location.path("/");
                        $scope.error = false;
                    } else {
                        $location.path("/login");
                        $scope.error = true;
                    }
                });
            };
            $scope.logout = function () {
                $http.post('logout', {}).success(function () {
                    $rootScope.authenticated = false;
                    $location.path("/");
                }).error(function (data) {
                    $rootScope.authenticated = false;
                });
            }
        });