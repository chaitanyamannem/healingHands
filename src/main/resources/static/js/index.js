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
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .controller('home', function ($rootScope, $scope) {

        $scope.greeting = $rootScope.user;
         
    })
    .controller('healingRequest', function ($rootScope, $scope, $http) {
        
        $scope.healRequest = {};
        $scope.showDisclaimer = false;
        $scope.showMedicationDetails = false;
        $scope.setShowMedicationDetails = function(){
            $scope.showMedicationDetails = true;
        }
        $scope.openDisclaimer = function(){
            $scope.showDisclaimer = true;
            $scope.showMedicationDetails = false;
        };    
        $scope.closeDisclaimerAlert = function(){
            $scope.showDisclaimer = false;
        }    
        $scope.msg = "Pranic Healing is not intended to replace orthodox medicine but rather to complement it. \n If an ailment is severe or symptoms persist, please consult immediately a medical doctor.";
    
        $scope.healRequest = function(){
            
            if(typeof $scope.healRequest.emergency == "undefined"){
               $scope.healRequest.emergency = false; 
            }
            if(typeof $scope.healRequest.medicationDetails == "undefined"){
               $scope.healRequest.medicationDetails = null; 
            }
            
            var formData = new FormData();
            formData.append('title',$scope.healRequest.title);
            formData.append('description',$scope.healRequest.description);
            formData.append('patientPhoto', $scope.patientPhoto);
            formData.append('emergency',$scope.healRequest.emergency);
            formData.append('underMedication',$scope.healRequest.underMedication);
            formData.append('medicationDetails',$scope.healRequest.medicationDetails);
            
    
            var request = {
                    method: 'POST',
                    url: '/healingRequest',
                    data: formData,
                    headers: {
                        'Content-Type': undefined,
                        'X-Auth-Token': $rootScope.user.authToken
                    }
                };

    
        
            $http(request)
            .success(function(){
            })
            .error(function(){
            });

        };
    
         
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