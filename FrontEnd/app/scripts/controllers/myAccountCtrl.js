'use strict';


angular.module('frontEndApp').controller('myAccountCtrl', function ($scope,$http,$location,$window,$mdToast,$mdDialog,storeSearch,sessionService) {
	//console.log(storeSearch.get());
	
	
	
	
	$scope.viewMyOrders = false;
	$scope.viewUpdate = false;
	this.userId = sessionService.get('uid');
	if(this.userId!=null){
	$.get( "http://127.0.0.1:8010/getUsr.php", {userName: this.userId}).done(function(data) {
		$scope.user = data[0];
		$scope.user.password = "QAZWSXEDC";
  });
	$.get( "http://127.0.0.1:8010/getUserOrders.php", {userId: this.userId}).done(function(data) {
		$scope.userOrders = data;
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
	  
	  $scope.viewMyOrdersPressed = function(){
		  $scope.viewMyOrders = !$scope.viewMyOrders;
		  $scope.viewUpdate = false;
	  }
	  
	  $scope.viewUpdateAccount = function(){
		  $scope.viewUpdate = !$scope.viewUpdate;
		  $scope.viewMyOrders = false;
	  }
	
	$scope.updateAccount = function(){
		
		if($scope.user.password=="QAZWSXEDC"){
			$.post( "http://127.0.0.1:8010/updateAccount.php", {userId: $scope.user.userId,name:$scope.user.name,email:$scope.user.email,address:$scope.user.address}).done(function(data) {
				if(data==1){
					sessionService.set('name',$scope.user.name);
					$scope.openToastSuccess();
					$scope.viewUpdate = false;
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
					$scope.viewUpdate = false;
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
