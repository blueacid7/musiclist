'use strict';

app.service('apiService',['$resource', function($resource) {
  this.$resource=$resource;
  this.getTrackListService = function (baseUrl) {
    var resource = this.$resource(baseUrl);
    return resource;
  }

  this.addTrackService = function (baseUrl,param) {
    var resource = this.$resource(baseUrl,param);
    return resource;
  }
}]);