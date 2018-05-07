(function() {
    'use strict';

    angular
        .module('weather')
        .service('weatherSrv', weatherSrv);

    weatherSrv.$inject = ['$http', '$routeParams']

    let BASEURL = 'https://api.openweathermap.org/data/2.5/forecast?'
    let APPID = 'ce3598aa79952d90c894fe652c1eb7bb'
    let REGION = 'JM'

    function weatherSrv($http) {
    	let services = {
            getForcast : getForcast
    	}

        function getForcast(location){
            let url = BASEURL + 'APPID=' + APPID + '&q=' + location + ',' + REGION
            return $http.get(url)
                .then(handleSuccess)
                .catch(handleError)
        }

        function handleSuccess(res){
            return res.data
        }

        function handleError(res){
            return res
        }
    
    	return services;
    }
})();