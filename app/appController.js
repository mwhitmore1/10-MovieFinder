(function(){
	'use strict';

	angular.module('app').controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['queryFactory', 'movieService', 'cacheFactory', '$log', '$state']; 

	function mainCtrl(queryFactory, movieService, cacheFactory, $log, $state){
		var MOVIE_DATA_API = "http://www.omdbapi.com/?";

		var vm = this;
			
		vm.title="movie";

		vm.getData = function(search){
			if(search){
				var query = MOVIE_DATA_API + "s=" + search;
				var cache;
				if (cache = cacheFactory.getCache(query)){
					movieService.movies = cache.Search;
					$state.go('list');
					return;
				}
				$state.go('list');
				queryFactory.getData(query).then(function(response){
					movieService.movies = response.data.Search;
					$state.go('list');
				},
				function(error){
					$log.error("Error getting the requested data", error);
				})	
			}
		};
	}
})()