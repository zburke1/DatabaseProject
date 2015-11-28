'use strict';

angular.module('frontEndApp').controller('productDetailsControl', function ($scope,$http,$mdToast,$location,productIdSession,sessionService) {
	$scope.productInfo = productIdSession.get();
	console.log($scope.productInfo.name);
	$scope.quantity = {
		item:1
	}
	if(sessionService.get('uid')==null){
		$scope.isDisabled = true;
	}
	else{
		$scope.isDisabled = false;
	}
	$scope.checkData = function(){
		if($scope.productInfo.name!=undefined){
			return true;
		}
		else{
			$location.path('#/')
			return false;
		}
	}
	
	$scope.redirectCart = function(){
		$location.path('/myCart');
	}
    $scope.openToast = function($event) {
       $mdToast.show($mdToast.simple().textContent('More items requested then in stock!').position('top left')
           .hideDelay(1000));
       // Could also do $mdToast.showSimple('Hello');
     };
	
	$scope.addToCart = function(){
		if(sessionService.get('cart')==null){
			var cartArray = [];
			var product = {
				id: $scope.productInfo.prodId,
				name: $scope.productInfo.name,
				quantity:$scope.quantity.item,
				price:$scope.productInfo.price
			}
			if($scope.quantity.item!=null && $scope.quantity.item!=undefined){
				cartArray.push(product);
				sessionService.set('cart',JSON.stringify(cartArray));
				$location.path('/myCart');
			}
			else{
				$scope.openToast();
			}
		}
		else{
			var cartArray = JSON.parse(sessionService.get('cart'));
			var result = $.grep(cartArray, function(e){ return e.id === $scope.productInfo.prodId });
			console.log(result);
			if(result.length==0){
			var product = {
				id: $scope.productInfo.prodId,
				name: $scope.productInfo.name,
				quantity:$scope.quantity.item,
				price:$scope.productInfo.price
			}
			if($scope.quantity.item!=null && $scope.quantity.item!=undefined){
				cartArray.push(product);
				sessionService.set('cart',JSON.stringify(cartArray));
				$location.path('/myCart');
			}
			else{
				
				$scope.openToast();
			}
		}
		else{
			for (var i = 0; i < cartArray.length; i++) {
				
			    if($scope.productInfo.prodId === cartArray[i].id){
				cartArray[i].quantity += $scope.quantity.item;
				if(cartArray[i].quantity<=$scope.productInfo.stockQuantity){
					sessionService.set('cart',JSON.stringify(cartArray));
				$location.path('/myCart');
				}
				else{
					$scope.openToast();
				}
			    }
			  }
		}
		}
	}
	
  });
