'use strict';

angular.module('frontEndApp').controller('staffOrderCtrl', function ($scope,$http,$location,$route,$mdDialog,storeSearch,sessionService,productIdSession,orderSession) {
 	
	$scope.getAllOrders = function(){
	 	var staff = sessionService.get('uid');
		$.post("http://127.0.0.1:8010/getAllOrders.php",{isStaff:staff}).done(function(data) {
			$scope.orders = data;
 	});
}
	$scope.modifyOrderButton = function(order){
		orderSession.set(order);
		$location.path('/ModifyOrder');
	}
	
	$scope.getOrderInfo = function(){
		$scope.orderSelected = orderSession.get();
		console.log($scope.orderSelected);
		if($.isEmptyObject($scope.orderSelected)){
			$location.path('/OrderManagement');
		}
		else{
			if($scope.orderSelected.paid=="1"){
				$('.wasNotPaid').hide();
				$('.wasPaid').show();
				$scope.has_paid = true;
			}
			else{
				console.log("Didn't pay");
				$('.wasPaid').hide();
				$('.wasNotPaid').show();
				$scope.has_paid = false;
			}
		}
	}
	
	$scope.updatePaid = function(OrderId){
		var staff = sessionService.get('uid');
		var paid = 0;
		if($scope.has_paid==true){
			paid = 1;
		}
		else{
			paid = 0;
		}
		$.post("http://127.0.0.1:8010/updateOrder.php",{isStaff:staff,OrderId:OrderId,paid:paid}).always(function(data) {
			$location.path('/OrderManagement');
 	});
		
		
	}


	//SHOWS PROMPT BEFORE DELETING ORDER
	$scope.removeOrderPrompt = function(order,OrderId,ev){
		var confirm = $mdDialog.confirm()
        .title('Would you like to delete order ' + OrderId + " ?")
        .textContent('Deleting this order will not replenish stocks.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Delete it!')
        .cancel('Cancel');
  $mdDialog.show(confirm).then(function() {
	//Run Remove Order
	$scope.removeOrder(OrderId);
  }, function() {
    //Cancel function
  })
	
	}
	
	//RUNS IF DELETE PROMPT ACCEPTED. DELETES ORDER
	$scope.removeOrder = function(OrderId){
		var staff = sessionService.get('uid');
		$.post("http://127.0.0.1:8010/deleteOrder.php",{isStaff:staff,OrderId:OrderId}).done(function(data) {
			$scope.orders = data;
 	});
	
	}
	
  });
  
  
  
  
  
  
  
  
