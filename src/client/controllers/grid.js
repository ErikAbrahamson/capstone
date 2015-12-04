(function() {
  'use strict';

  angular.module('myApp').controller('gridController',
    ['$scope', '$rootScope','$mdToast', '$location', 'AuthService',
    function ($scope, $rootScope, $mdToast, $location, AuthService) {

      $scope.tileColors = [];

      $scope.colorTiles = function() {
        var tiles = [];
        for (var i = 0; i < $rootScope.currentUser.tasks; i++) {
          tiles.push({
            // color: randomColor(),
            colspan: randomSpan(),
            rowspan: randomSpan()
          });
        }
        return tiles;
      };

    }]);
}());
