'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('MainCtrl', function ($scope,$http) {
	

	/* Check whether the HTTP Request is successful or not. */
	
	$scope.primary1Clicked = function(){
		console.log('Starting http call');
		$http.get('http://localhost:8010/post_es.php').success(function(data){
			console.log(data);
		});
		
			
	};
	$scope.primary2Clicked = function(){
		console.log('Starting http call');
		$http.get("http://localhost:8010/post_es.php?userid=123456").success(function(data){
			console.log(data);
		});
		
			
	};
  });
