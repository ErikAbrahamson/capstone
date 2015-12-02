(function() {
  'use strict';

  angular.module('myApp').controller('logoutController',
    ['$scope', '$rootScope','$mdToast', '$location', 'AuthService',
    function ($scope, $rootScope, $mdToast, $location, AuthService) {

      $scope.logout = function () {
        $scope.logoutToast = function($event) {
          $mdToast.showSimple('Goodbye, ' + $rootScope.currentUser + '!');
        };

        $scope.logoutToast();

        $rootScope.currentUser = null;
        AuthService.logout()

          .then(function () {
            $location.path('/');
          });
      };
    }]);
}());
