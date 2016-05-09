(function(){
	var app = angular.module('app');
	app.factory('cacheFactory', cacheFactory);

	cacheFactory.$inject = ['$cacheFactory', '$http'];

	function cacheFactory($cacheFactory, $http){
		var service = {
			getCache: getCache
		}

		return service;

		function getCache(url){
			console.log("check cache factory")
			if ($cacheFactory.get('$http')){
				console.log("http defined")
				var httpCache = $cacheFactory.get('$http');
				var cachedResponse = httpCache.get(url);
				if (cachedResponse){
					console.log(cachedResponse)
					var data = JSON.parse(cachedResponse[1])
					return data;
				}
			}
		}
	}
})();