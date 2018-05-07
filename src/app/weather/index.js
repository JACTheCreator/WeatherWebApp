(function() {
    'use strict'
    angular.module('weather', []).config(config)

    function config($routeProvider) {
      $routeProvider.when('/',{
        templateUrl: 'templates/weather/weather.html',
        controller: 'weatherCtrl',
        controllerAs: 'vm',
        title: 'Weather Application'
      })
    }
})();
