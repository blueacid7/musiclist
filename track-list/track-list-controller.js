'use strict';
app.controller('trackListController', ['$scope','$resource', function($scope,$resource) {
  $scope.searchKey = '';
  $scope.trackName = '';
  $scope.trackRating = '';
  $scope.editableTrack = {};

  var baseUrl = 'http://104.197.128.152:8000/v1/tracks';
  $resource(baseUrl).get().$promise.then(function(data) {
    $scope.trackList = data.results;
    $scope.next = data.next;
    $scope.previous = data.previous;
  });

  $scope.getNextPage = function() {
    $resource($scope.next).get().$promise.then(function(data) {
      $scope.trackList = data.results;
      $scope.next = data.next;
      $scope.previous = data.previous;
    });
  };

  $scope.getPrevPage = function() {
    $resource($scope.previous).get().$promise.then(function(data) {
      $scope.trackList = data.results;
      $scope.next = data.next;
      $scope.previous = data.previous;
    });
  };

  $scope.searchTrack = function() {
    var searchUrl;
    if ($scope.searchKey !== '') {
      searchUrl = baseUrl + '?title=' + $scope.searchKey;
    }
    else {
      searchUrl = baseUrl;
    }
    $resource(searchUrl).get().$promise.then(function(data) {
      $scope.trackList = data.results;
      $scope.next = data.next;
      $scope.previous = data.previous;
    });
  };

  $scope.addTrack = function() {
    var param = {
      title: $scope.trackName,
      rating: $scope.trackRating,
      genres: [1]
    };
    $resource(baseUrl).save(param, function() {
      alert("Track successfully added ...");
    });
  };

  $scope.finishEditing = function() {
    var editUrl = baseUrl + '/' + $scope.editableTrack.id;
    var param=$scope.editableTrack;
    $resource(editUrl).save(param, function() {
      alert("Track successfully Edited ...");
    });
  };

  $scope.initiateEditing = function(track) {
    $scope.editableTrack = track;
  };
}]);
