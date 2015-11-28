'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('SignUpControl', function ($scope,$http,$location,$route,$window,$mdToast, $document,sessionService) {
    
 $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().textContent('User already esists!').position('top left')
        .hideDelay(1000));
    // Could also do $mdToast.showSimple('Hello');
  };
	
    $scope.createAccount = function(){
    	var userID = $(".userID").val();
		var userName = $(".userName").val();
		var userPassword = $(".userPassword").val();
		var userAddress = $(".userAddress").val();
		var userEmail = $(".userEmail").val();
		//console.log(userID);
		
		$.post( "http://127.0.0.1:8010/signUpPost.php", {userId: userID, password: userPassword,email:userEmail,name:userName,address:userAddress}).done(function(data) {
			console.log(data);
			if(data==1){
				sessionService.set('uid',userID);
				sessionService.set('name',userName);
				var landingUrl = "http://localhost:9000/"; //URL complete
				$window.location.href = landingUrl;
			}
			else if(data==2){
				$scope.openToast();	
			}
			// sessionService.set('uid',data[0].userId);
// 			sessionService.set('name',data[0].name);
    });

};
	
	
	
  });
