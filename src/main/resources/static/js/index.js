angular.module('helpingHands', ['ngRoute','ngMessages','ui.bootstrap'])
    .config(function ($routeProvider, $httpProvider) {

        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'home'
        }).when('/login', {
            templateUrl: 'login.html',
            controller: 'navigation'
        }).when('/register', {
            templateUrl: 'register.html',
            controller: 'register'
        }).otherwise('/');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    })
    .controller('home', function ($rootScope, $scope) {

        $scope.greeting = $rootScope.user;

    })
    .controller('register', function ($rootScope, $scope, $http, $location, $timeout) {
        $scope.userDetails = {};
        $scope.formErrors = {};
        $scope.formErrors.hasEmail = false;
        $scope.resetEmailAvailableAlert = function(){
            //reset email already taken alert
            $scope.formErrors.hasEmail = false;
        };


        $scope.emailAvailable = function () {

            var emailAvailableURL = '/emailAvailable/?email=' + $scope.userDetails.email;


            $http.get(emailAvailableURL).success(function (data) {
                $scope.formErrors.hasEmail = false;
                if (data.hasEmail) {
                    $scope.formErrors.email = 'The Email ' + $scope.userDetails.email + ' is already taken';
                    $scope.formErrors.hasEmail = true;
                    $scope.userDetails.email = '';
                }
                $timeout(function () {
                    $scope.resetEmailAvailableAlert();
                }, 5000);

            }).error(function () {
                $scope.formErrors.email = 'Please try after some time';
            });




        };

        $scope.register = function () {
            var createURL = '/create/?email=' + $scope.userDetails.email
                + '&password=' + $scope.userDetails.password
                + '&firstName=' + $scope.userDetails.firstname
                + '&lastName=' + $scope.userDetails.lastname
                + '&type=' + $scope.userDetails.memberType;
            $http.get(createURL).success(function (data) {
                $rootScope.user = data;
                $rootScope.authenticated = true;
                $location.path("/");

            }).error(function () {
                console.log("server error");
            });

        };
    	    

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