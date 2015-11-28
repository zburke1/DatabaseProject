'use strict';


angular.module('frontEndApp').controller('SearchResultsCtrl', function ($scope,$http,storeSearch) {
	//console.log(storeSearch.get());
	$scope.search = storeSearch.get();
	console.log($scope.search);
  });
