'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */
var app=angular
  .module('frontEndApp', [
    'ngAnimate',
	  'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
	'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SignInControl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpControl'
      })
      .when('/search', {
        templateUrl: 'views/searchResults.html',
        controller: 'SearchResultsCtrl'
      })
      .when('/myAccount', {
        templateUrl: 'views/myAccount.html',
        controller: 'myAccountCtrl'
      })
      .when('/productDetails', {
        templateUrl: 'views/productDetails.html',
        controller: 'productDetailsControl'
      })
      .when('/myCart', {
        templateUrl: 'views/myCart.html',
        controller: 'myCartCtrl'
      })
      .when('/staffTools', {
        templateUrl: 'views/staffTools/staffTools.html',
		  controller: 'staffCtrl'
      })
      .when('/staffUserMain', {
        templateUrl: 'views/staffTools/staffUserMain.html',
		  controller: 'staffCtrl'
      })
      .when('/staffUserAdd', {
        templateUrl: 'views/staffTools/createUser.html',
		  controller: 'staffCtrl'
      })
      .when('/staffUserModify', {
        templateUrl: 'views/staffTools/staffUserModify.html',
		  controller: 'staffCtrl'
      })
      .when('/staffProduct', {
        templateUrl: 'views/staffTools/staffProductMain.html',
		  controller: 'staffProductCtrl'
      })
      .when('/staffProductAdd', {
        templateUrl: 'views/staffTools/staffProductAdd.html',
		  controller: 'staffProductCtrl'
      })
      .when('/newProduct', {
        templateUrl: 'views/staffTools/staffProductCreate.html',
		  controller: 'staffProductCtrl'
      })
      .when('/OrderManagement', {
        templateUrl: 'views/staffTools/staffOrderMain.html',
		  controller: 'staffOrderCtrl'
      })
      .when('/ModifyOrder', {
        templateUrl: 'views/staffTools/staffOrderModify.html',
		  controller: 'staffOrderCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  app.run(function($rootScope, $location, sessionService){
  	var routespermission=['/home'];  //route that require login
  	$rootScope.$on('$routeChangeStart', function(){
  		if( routespermission.indexOf($location.path()) !=-1)
  		{
  			var connected=loginService.islogged();
  			connected.then(function(msg){
  				if(!msg.data) $location.path('/login');
  			});
  		}
  	});
  });