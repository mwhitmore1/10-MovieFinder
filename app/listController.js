(function(){
	'use strict';
	var app = angular.module('app');
	app.controller('listController', listController);

	listController.$inject = ['queryFactory', 'cacheFactory', 'movieService', '$log', '$state'];

	function listController(queryFactory, cacheFactory, movieService, $log, $state){
		var MOVIE_DATA_API = "http://www.omdbapi.com/?";

		if (!movieService.movies){
			$state.go('home');
		}

		var listVm = this;
		listVm.movies = movieService.movies;
		console.log(listVm.movies)

		listVm.getTitle = function(title){
			var url = MOVIE_DATA_API + "plot=full&t=" + title;
			var cache;
				if (cache = cacheFactory.getCache(url)){
					movieService.title = cache;
					$state.go('about');
					return;
				}
			queryFactory.getData(url).then(function(response){
				movieService.title = response.data;
				$state.go('about');
			},
			function(error){
				$log.error("Error getting data on this title.");
			})
		}
	}
})();