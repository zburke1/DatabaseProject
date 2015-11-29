'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('HeaderCtrl', function ($scope,$http,sessionService,$location,$window) {
	if(sessionService.get('uid')!=null){
		$('.signinButton').hide();
		$('.signupButton').hide();
	}
	else{
		// $('.userPageButton').style.display = "inline";
	}
	
	$scope.checkLoggedIn = function(){
		if(sessionService.get('uid')!=null){
			return true;
		}
		else{
			return false;
		}
	}
	$scope.checkStaff = function(){
		if(sessionService.get('staff')!=null){
			return true;
		}
		else{
			return false;
		}
		
	}
	$scope.signUserOut = function(){
		sessionService.destroy('uid');
		sessionService.destroy('name');
		sessionService.destroy('staff');
		$location.path('/');
		$window.location.reload();
	}
  });
