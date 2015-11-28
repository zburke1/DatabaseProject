'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('SignInControl', function ($scope,$http,$location,$route,$window,sessionService) {
	if(sessionService.get('uid')!=null){
		$location.path('/');
	}

	/* Check whether the HTTP Request is successful or not. */
	$scope.signInPost = function(){
		var userID = $(".userID").val();
		var userPass = $(".userPassword").val();
		console.log(userID + "" + userPass);
		
	$.post( "http://127.0.0.1:8010/signInPost.php", {userId: userID, password: userPass}).done(function(data) {
		sessionService.set('uid',data[0].userId);
		sessionService.set('name',data[0].name);
		var landingUrl = "http://localhost:9000/"; //URL complete
		$window.location.href = landingUrl;
  });
};
  });
