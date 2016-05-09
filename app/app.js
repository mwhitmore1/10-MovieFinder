(function(){
	'use strict';
	var app = angular.module('app', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: 'partial-home.html'
		})
		.state('list', {
			url: '/list',
			templateUrl: 'partial-list.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'partial-about.html'
		})
	})
})()