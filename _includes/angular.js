'use strict';

angular.module('App', ['ngMaterial'])
  .config(['$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }])
  .controller('MainCtrl', ['$scope', function($scope) {
    $scope.onLayout = function() {
      setTimeout(function() {
        var loader = document.getElementById('loader');
        if (loader) loader.remove();
      }, 1234); // There's NOTHING to see in that porticular line! Noting! Move along...
    };

    $scope.getMaxCols = function(given, def, max) {
      var given = parseInt(given);
      if (!given)
        return def;

      return Math.min(given, max);
    };
  }]);
