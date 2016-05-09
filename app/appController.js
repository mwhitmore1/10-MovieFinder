(function(){
	'use strict';

	angular.module('app').controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['queryFactory', 'cacheFactory', '$log', '$state']; 

	function mainCtrl(queryFactory, cacheFactory, $log, $state){
		var vm = this;
		var MOVIE_DATA_API = "http://www.omdbapi.com/?";
			
		vm.title="movie"

		// redirct if data needed for view has not been loaded

		if (angular.isUndefined(vm.movies)){
		console.log(angular.isUndefined(vm.movies))
			$state.go('home');
		}

		vm.getData = function(search){
			if(search){
				var query = MOVIE_DATA_API + "s=" + search;
				var cache;
				if (cache = cacheFactory.getCache(query)){
					vm.movies = cache.Search;
					return;
				}
				$state.go('list');
				queryFactory.getData(query).then(function(response){
					vm.movies = response.data.Search;
				},
				function(error){
					$log.error("Error getting the requested data", error);
				})	
			}
		};

		vm.getTitle = function(title){
			var url = MOVIE_DATA_API + "plot=full&t=" + title;
			var cache;
				if (cache = cacheFactory.getCache(url)){
					vm.title = cache;
					$state.go('about');
					return;
				}
			queryFactory.getData(url).then(function(response){
				vm.title = response.data;
				$state.go('about');
			},
			function(error){
				$log.error("Error getting data on this title.")
			})
		}
	}
})()