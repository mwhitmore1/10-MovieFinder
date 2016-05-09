(function(){
	'use strict';

	angular.module('app').factory('queryFactory', queryFactory);
	queryFactory.$inject = ['$http', '$q', '$log'];

	function queryFactory($http, $q, $log){

		var service = {
			getData: getData
		};

		return service;

		function getData(search){
			var defer = $q.defer();
			$http({
				url: search,
				method: "GET",
				cache: true
			}).then(
				function(response){
					if (typeof response.data === 'object'){
						if (response.data.Response){
							defer.resolve(response);
							toastr.success("You got movie data.")
						} else {
							defer.reject(response);
							toastr.warning(response.data.Error)	
						}
					} else {
						defer.reject(response);
						toastr.warning("No data recieved")
					}
				},
					function(response){
						defer.reject(error);
						$log.error(error);
						toastr.error("Error: " + errror.data + "<br>Status: " + error.statusText);
					}
				);

			return defer.promise
		}
	}
})()