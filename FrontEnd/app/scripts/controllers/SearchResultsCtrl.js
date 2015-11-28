'use strict';


angular.module('frontEndApp').controller('SearchResultsCtrl', function ($scope,$http,$location,storeSearch,productIdSession) {
	//console.log(storeSearch.get());
	$scope.search = storeSearch.get();
	$scope.sortValue = 1;
	
	$scope.sortValues = function(){
		if($scope.sortValue==1){
		$scope.search.sort(function(a, b) {
		    return parseFloat(b.price) - parseFloat(a.price);
		});
		$scope.sortValue=2;
	}
		else{
			$scope.search.sort(function(a, b) {
		    return parseFloat(a.price) - parseFloat(b.price);
			});
			$scope.sortValue=1;
		}
	}
	$scope.viewProduct = function(productId){
		
		productIdSession.set(productId);
		console.log(productIdSession.get());
		$location.path('/productDetails');
	};

  });
