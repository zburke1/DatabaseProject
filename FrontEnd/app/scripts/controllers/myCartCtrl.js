'use strict';

angular.module('frontEndApp').controller('myCartCtrl', function ($scope,$http,$route,$mdDialog,sessionService,productIdSession,$location,$window) {
	
	$scope.prices = {
		x:0
	}
	
	
	$scope.cart = JSON.parse(sessionService.get('cart'));;
	
	$scope.addTotalPrice = function(price,quantity){
		var tempPrice = parseFloat($scope.prices.x);
		tempPrice += price*quantity;
		$scope.prices.x = tempPrice.toFixed(2);
		
	}
	
	$scope.removeProduct = function(id){
		for (var i = 0; i < $scope.cart.length; i++) {
		    if(id === $scope.cart[i].id){
				$scope.cart.splice(i,1)
				if($scope.cart.length!=0){
				var cartJSON = JSON.stringify($scope.cart);
				sessionService.set('cart',cartJSON);}
				else{
					sessionService.destroy('cart');
				}
				$route.reload();
	}
}
}

	$scope.removeAll = function(){
		sessionService.destroy('cart');
		$route.reload();
}




$scope.alertPay = function(ev){
	var paid = $('.paidInput').val();
	 if(paid==$scope.prices.x){
		 var confirm = $mdDialog.confirm()
      .title('Are you sure you want to purchase these items')
      .textContent('')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Yes')
      .cancel('Cancel');
$mdDialog.show(confirm).then(function() {
	
}, function() {
  
});
}
else{
	    $mdDialog.show(
	      $mdDialog.alert()
	        .clickOutsideToClose(true)
	        .title('You must pay the proper ammount')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	        .targetEvent(ev)
	    );
	  }
}


$scope.placePurchase = function(){
	
	
	
	
}





  });






