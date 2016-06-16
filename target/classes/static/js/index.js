angular.module('helpingHands', [])
  .controller('home', function($scope, $http) {
	$http.get('/resource/').success(function(data){
		$scope.greeting = data;
	})  
})