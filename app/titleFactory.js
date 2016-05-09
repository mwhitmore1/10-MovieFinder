(function(){
	'use-strict';
	var app = angular.module('app')
	app.factory('titleFactory', titleFactory)

	titleFactory.$inject = ['$http', '$q', '$log'];

	function titleFactory ($http, $q, $log){
		var service = {
			getTitle: getTitle
		}

		return service;

		function getTitle(query){
			var defer = $q.defer();
			$http({
				method: 'GET',
				url: query,
				cache: true
			}).then(function(response){
				if(typeof response.data === 'object'){
					if (response.data.Response){
						defer.resolve(response);
						toastr.success("Title details obtained.");
					} else {
						defer.reject(response);
						toastr.warning(response.data.Error);
					}
				} else {
					defer.reject(response);
					toastr.warning("Title data could not be obtained")
				}
			}, function(error){
					defer.reject(error);
					$log.error(error);
					toastr.error("Error: " + error.data + "<br>Error Status: " + error.statusText);
				}

			);
			return defer.promise;
		}

	}
})()