'use strict';
app.controller('genrelistController', ['$scope', '$resource', function($scope, $resource) {
  $scope.genreName = '';
  var baseUrl = 'http://104.197.128.152:8000/v1/genres';
  $resource(baseUrl).get().$promise.then(function(data) {
    $scope.genreList = data.results;
    $scope.next = data.next;
    $scope.previous = data.previous;
  });
  $scope.getNextPage = function() {
    $resource($scope.next).get().$promise.then(function(data) {
      $scope.genreList = data.results;
      $scope.next = data.next;
      $scope.previous = data.previous;
    });
  };
  $scope.getPrevPage = function() {
    $resource($scope.previous).get().$promise.then(function(data) {
      $scope.genreList = data.results;
      $scope.next = data.next;
      $scope.previous = data.previous;
    });
  };
  $scope.addGenre = function() {
    var param = {name: $scope.genreName};
    $resource(baseUrl).save(param, function() {
      alert("Genre successfully added ...");
    });
  };

  $scope.finishEditing = function() {
    var editUrl = baseUrl + '/' + $scope.editableGenre.id;
    var param = $scope.editableGenre;
    $resource(editUrl).save(param, function() {
      alert("Genre successfully Edited ...");
    });
  };

  $scope.initiateEditing = function(genre) {
    $scope.editableGenre = genre;
  };
}]);