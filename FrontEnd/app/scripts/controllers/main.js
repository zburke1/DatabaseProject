'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp').controller('MainCtrl', function ($scope,$http,$location,storeSearch) {
	

	/* Check whether the HTTP Request is successful or not. */
	$scope.productSearch = function(){
		var product = $('.productSearch').val();
		//console.log(product);
		$.get( "http://127.0.0.1:8010/searchProducts.php", {ProductName: product}).done(function(data) {
			//console.log(data);
			//Sets data to be used on searchPage.html
			storeSearch.set(data);
			console.log(storeSearch.get());
			$location.path('/search');
			// var landingUrl = "http://localhost:9000/"; //URL complete
// 			$window.location.href = landingUrl;
	});
};
	
	
	
  });
