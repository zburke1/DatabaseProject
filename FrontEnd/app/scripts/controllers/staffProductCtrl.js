'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('staffProductCtrl', function ($scope,$http,$location,$mdDialog,storeSearch,sessionService,productIdSession) {
 	var isStaff = sessionService.get('staff');
	$scope.productSelected = productIdSession.get();
	$scope.stock= {
		addAmount:1
	}
	$.get("http://127.0.0.1:8010/getSuppliers.php").done(function(data) {
		$scope.suppliers = data;
  	});
	$.post("http://127.0.0.1:8010/lowStockCheck.php",{isStaff:isStaff,searchAll:'1'}).done(function(data) {
		$scope.products = data;
  	});
	
	$scope.addStockButton = function(product){
		productIdSession.set(product);
		$location.path('/staffProductAdd');
	}
	$scope.createProductButton = function(product){
		$location.path('/newProduct');
	}
	
	$scope.addStock = function(amount){
		var selectedItem = $scope.productSelected.prodId;
		$.post("http://127.0.0.1:8010/modifyStock.php",{addStock:amount,prodId:selectedItem}).done(function(data) {
			$scope.products = data;
			$location.path('/staffProduct');
	  	});
		
	}
	
	$scope.createProduct = function(){
		try{
			var pSupplierId = $scope.productCreate.supplierId;
			var pName = $scope.productCreate.name;
			var pDescription = $scope.productCreate.description;
			var pQuantity = $scope.productCreate.quantity;
			var pPrice = $scope.productCreate.price;
		}
		catch(e){
			if(e){
				var pSupplierId = 0;
				var pName = 0;
				var pDescription = 0;
				var pQuantity = 0;
				var pPrice = 0;
				}
			}
			console.log(pDescription);
		if(pSupplierId!=0){
			$.post("http://127.0.0.1:8010/createProduct.php",{supplyId:pSupplierId,name:pName,descrip:pDescription,quantity:pQuantity,price:pPrice}).done(function(data) {
				console.log(data);
				//$location.path('/staffProduct');
		  	});
		}
		else{
			
		}
	}
	
  });
