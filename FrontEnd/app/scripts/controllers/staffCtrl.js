'use strict';

angular.module('frontEndApp').controller('staffCtrl', function ($scope,$http,$location,$mdDialog,$route,storeSearch,sessionService,userIdSession) {
	
	var isStaff = sessionService.get('staff');

 	$.post("http://127.0.0.1:8010/getAllUsr.php",{isStaff:isStaff}).done(function(data) {
		$scope.users = data;
  	});
	$scope.user = userIdSession.get();
	$scope.goUserMain = function(){
		$location.path('/staffUserMain');
	}
	$scope.goCreateUser = function(){
		$location.path('/staffUserAdd');
	}
	$scope.goModifyUser = function(user){
		userIdSession.set(user);
		$location.path('/staffUserModify');
	}
	
	$scope.goOrdersMain = function(){
		
	}
	
	$scope.goProductsMain = function(){
		
	}
	
	$scope.deleteAccount = function(userIdPassed,ev){
		var currentUser = sessionService.get('uid')
		if(userIdPassed!=currentUser){
		var confirm = $mdDialog.confirm()
        .title('Would you like to delete this accont?')
        .textContent('')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Delete it!')
        .cancel('Cancel');
  $mdDialog.show(confirm).then(function() {
	$.post( "http://127.0.0.1:8010/updateAccount.php", {userId: userIdPassed,deleteAccount:'1'}).done(function(data) {
			$route.reload();		
	});
  }, function() {
    //Cancel function
  })
	  }
	  else{
  	    $mdDialog.show(
  	      $mdDialog.alert()
  	        .clickOutsideToClose(true)
  	        .title('You must delete your own account from the "My Account" page')
  	        .ariaLabel('Alert Dialog Demo')
  	        .ok('Got it!')
  	        .targetEvent(ev)
  	    );
	  };
	}
////////////////////////////////////////////////////////////
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
				$location.path('/staffUserMain')
			}
			else if(data==2){
				$scope.openToast();	
			}
			// sessionService.set('uid',data[0].userId);
// 			sessionService.set('name',data[0].name);
    });

};

//////////////////////////////////
$scope.openToast = function($event) {
   $mdToast.show($mdToast.simple().textContent('User already esists!').position('top left')
       .hideDelay(1000));
   // Could also do $mdToast.showSimple('Hello');
 };	
	
	
	
///////////////////////////////
 
$scope.updateAccount = function(){
	
	if($scope.user.password=="QAZWSXEDC"){
		$.post( "http://127.0.0.1:8010/updateAccount.php", {userId: $scope.user.userId,name:$scope.user.name,email:$scope.user.email,address:$scope.user.address}).done(function(data) {
			if(data==1){
				sessionService.set('name',$scope.user.name);
				$scope.openToastSuccess();
			}
			else{
				$scope.openToastSuccess();
			}
	  });
	  
	}
	else{
		$.post( "http://127.0.0.1:8010/updateAccount.php", {userId: $scope.user.userId,name:$scope.user.name,email:$scope.user.email,address:$scope.user.address,password:$scope.user.password}).done(function(data) {
			if(data==1){
				sessionService.set('name',$scope.user.name);
				$scope.openToastSuccess();
			}
			else{
				$scope.openToastSuccess();
			}
	  });
	}
};
	
	
	
  });
