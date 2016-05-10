(function(){
	'use strict';
	var app = angular.module('app');
	app.controller('aboutController', aboutController)

	aboutController.$inject = ['movieService', '$state']

	function aboutController(movieService, $state){
		var aboutVm = this;
		console.log('aboutController loaded')
		aboutVm.title = movieService.title;

		// redirect if aboutVm.title is not defined.
		if (!aboutVm.title){
			$state.go('home');
		}

	}
})();