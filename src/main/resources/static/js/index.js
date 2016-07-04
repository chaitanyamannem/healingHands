angular.module('helpingHands', ['ui.router','ngMessages','ui.bootstrap'])
    .config(function ($stateProvider, $httpProvider,$compileProvider) {
    
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);

        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'home'
        }).state('login', {
            templateUrl: 'login.html',
            controller: 'navigation'
        }).state('register', {
            templateUrl: 'register.html',
            controller: 'register'
        }).state('healingRequest', {
            templateUrl: 'healRequest.html',
            controller: 'healingRequest'
        });

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    })
    .controller('home', function ($rootScope, $scope) {

        $scope.greeting = $rootScope.user;
         
    })
    .controller('healingRequest', function ($rootScope, $scope, $http) {
    console.log("healingRequest controller");
    var healingRequestURL = '/healingRequest/?authToken=' + $rootScope.user.authToken;
    console.log("healingRequest = " + healingRequestURL );       
    $http.get(healingRequestURL).success(function (data) {
                $scope.user = data;
                

            }).error(function () {
                console.log("server error");
            });

        $scope.user = $rootScope.user;
         
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
        function ($rootScope, $scope, $http, $state) {

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
                        $scope.error = false;
                        $state.go('index');
                    } else {                     
                        $scope.error = true;
                        $state.go('login');
                    }
                });
            };
            $scope.logout = function () {
                $rootScope.authenticated = false;
                $state.go('login');
                //TODO: Server implementation
//                $http.post('logout', {}).success(function () {
//                    $rootScope.authenticated = false;
//                    $state.go('login');
//                }).error(function (data) {
//                    $rootScope.authenticated = false;
//                    $rootScope.user = {};
//                });
            }
        });