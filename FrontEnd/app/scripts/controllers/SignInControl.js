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
	
	$scope.SignUpRedirect = function(){
		$location.path('/signup');
	}

	/* Check whether the HTTP Request is successful or not. */
	$scope.signInPost = function(){
		this.userID = $(".userID").val();
		this.userPass = $(".userPassword").val();
		console.log(this.userID + "" + this.userPass);
		
	$.post( "http://127.0.0.1:8010/signInPost.php", {userId: this.userID, password: this.userPass}).done(function(data) {
		sessionService.set('uid',data[0].userId);
		sessionService.set('name',data[0].name);
		var landingUrl = "http://localhost:9000/"; //URL complete
		$window.location.href = landingUrl;
  });
}
  });
