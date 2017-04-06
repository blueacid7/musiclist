'use strict';

app.config(function($routeProvider) {
  $routeProvider
      .when("/", {
        templateUrl : "track-list/track-list.html",
        controller  : 'trackListController',
        controllerAs: 'vm'
      })
      .when("/genre", {
        templateUrl : "genre-list/genre-list.html",
      controller : 'genrelistController',
      controllerAs: 'vm'
      })
      .otherwise({
        templateUrl : "track-list/track-list.html",
        controller  : 'trackListController',
        controllerAs: 'vm'
      });
});