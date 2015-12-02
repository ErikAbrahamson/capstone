(function() {
  'use strict';

  angular.module('myApp').controller('logoutController',
    ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.logout = function () {

        AuthService.logout()

          .then(function () {
            $location.path('/login');
          });
      };
    }]);
}());
