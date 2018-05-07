(function() {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngMessages',
            'weather'
        ]).config(config).run(updateTitle)

      function config($routeProvider, $httpProvider){
        $routeProvider.otherwise({redirectTo: '/'})
      }

      function updateTitle($rootScope){
        $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
              $rootScope.title = currentRoute.title
        });
      }
})();
