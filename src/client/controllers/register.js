(function() {
  'use strict';

  angular.module('myApp').controller('registerController',
    ['$scope', '$mdDialog', '$mdToast', '$location', 'AuthService',
    function ($scope, $mdDialog, $mdToast, $location, AuthService) {

      $scope.register = function () {
        $scope.registerToast = function($event) {
          $mdToast.showSimple('Thanks for registering!');
        };

        $scope.registerToast();
        $scope.error = false;
        $scope.disabled = true;

        AuthService.register($scope.registerForm.username, $scope.registerForm.password)

          .then(function () {
            $mdDialog.hide();
            $location.path('/login');
            $scope.disabled = false;
            $scope.registerForm = {};
          })

          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Something went wrong!";
            $scope.disabled = false;
            $scope.registerForm = {};
          });
      };
  }]);
}());
