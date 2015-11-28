'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('SignInControl', function ($scope,$http) {
	

	/* Check whether the HTTP Request is successful or not. */
	$scope.signInPost = function(){
		var userID = $(".userID").val();
		var userPass = $(".userPassword").val();
		console.log(userID + "" + userPass);
		
	$.post( "http://127.0.0.1:8010/signInPost.php", {userId: userID, password: userPass}).done(function( data ) {
		
  });
};
  });
