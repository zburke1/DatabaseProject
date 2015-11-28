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