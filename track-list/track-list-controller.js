'use strict';
app.controller('trackListController', ['$scope', 'apiService', function($scope, apiService) {
  //this.trackList = [];
  $scope.searchKey = '';
  $scope.trackName = '';
  $scope.trackRating = '';
  $scope.editableTrack = {};
  var baseUrl = 'https://104.197.128.152:8000/v1/tracks';
  apiService.getTrackListService(baseUrl).get().$promise.then(function(data) {
    $scope.trackList = data.results;
    $scope.next = data.next;
    $scope.previous = data.previous;
  });

  $scope.getNextPage = function() {
    apiService.getTrackListService($scope.next).get().$promise.then(function(data) {
      $scope.trackList = data.results;
      $scope.next = data.next;
      $scope.previous = data.previous;
    });
  };

  $scope.getPrevPage = function() {
    apiService.getTrackListService($scope.previous).get().$promise.then(function(data) {
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
    apiService.getTrackListService(searchUrl).get().$promise.then(function(data) {
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
    apiService.getTrackListService(baseUrl).save(param, function() {
      alert("Track successfully added ...");
    });
  };

  $scope.finishEditing = function() {
    var editUrl = baseUrl + '/' + $scope.editableTrack.id;
    var param=$scope.editableTrack;
    apiService.getTrackListService(editUrl).save(param, function() {
      alert("Track successfully Edited ...");
    });
  };

  $scope.initiateEditing = function(track) {
    $scope.editableTrack = track;
  };
}]);
