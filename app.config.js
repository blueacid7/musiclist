'use strict';

app.config(function($routeProvider) {
  $routeProvider
      .when("/", {
        templateUrl : "track-list/track-list.html",
        controller  : 'trackListController',
        controllerAs: 'vm'
      })
      .when("/genre", {
        templateUrl : "red.html"
      })
      .otherwise({
        templateUrl : "track-list/track-list.html",
        controller  : 'trackListController',
        controllerAs: 'vm'
      });
});