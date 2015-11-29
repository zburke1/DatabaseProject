'use strict';


angular.module('frontEndApp').controller('myAccountCtrl', function ($scope,$http,$location,$window,$mdToast,$mdDialog,storeSearch,sessionService) {
	//console.log(storeSearch.get());
	this.userId = sessionService.get('uid');
	if(this.userId!=null){
	$.get( "http://127.0.0.1:8010/getUsr.php", {userName: this.userId}).done(function(data) {
		$scope.user = data[0];
		$scope.user.password = "QAZWSXEDC";
  });
	}
	
    $scope.openToastSuccess = function($event) {
       $mdToast.show($mdToast.simple().textContent('User updated successfully!').position('top left')
           .hideDelay(4000));
       // Could also do $mdToast.showSimple('Hello');
     };
     $scope.openToastFail = function($event) {
        $mdToast.show($mdToast.simple().textContent('User updated failed!').position('top left')
            .hideDelay(4000));
        // Could also do $mdToast.showSimple('Hello');
      };
	
	$scope.updateAccount = function(){
		
		if($scope.user.password=="QAZWSXEDC"){
			$.post( "http://127.0.0.1:8010/updateAccount.php", {userId: $scope.user.userId,name:$scope.user.name,email:$scope.user.email,address:$scope.user.address}).done(function(data) {
				if(data==1){
					sessionService.set('name',$scope.user.name);
					$scope.openToastSuccess();
				}
				else{
					$scope.openToastFail();
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
					$scope.openToastFail();
				}
		  });
		}
	};
	
	$scope.showConfirm = function(ev) {
	    // Appending dialog to document.body to cover sidenav in docs app
	   
			var confirm = $mdDialog.confirm()
	          .title('Would you like to delete your accont?')
	          .textContent('')
	          .ariaLabel('Lucky day')
	          .targetEvent(ev)
	          .ok('Delete it!')
	          .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
			$scope.deleteAccount();
	    }, function() {
	      
	    });
	
	  };
	
	$scope.deleteAccount = function(){
		sessionService.destroy('name');
		sessionService.destroy('uid');
		$.post( "http://127.0.0.1:8010/updateAccount.php", {userId: $scope.user.userId,deleteAccount:'1'}).done(function(data) {
		
	  });
	var landingUrl = "http://localhost:9000/"; //URL complete
	$window.location.href = landingUrl;
	};
	
	
  });
