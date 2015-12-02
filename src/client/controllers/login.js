(function() {
  'use strict';

  angular.module('myApp').controller('loginController',
    ['$scope', '$mdDialog', '$rootScope', '$location', 'AuthService',
    function ($scope, $mdDialog, $rootScope, $location, AuthService) {
      $scope.login = function () {


        $scope.error = false;
        $scope.disabled = true;
        $rootScope.currentUser = null;

        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)

          .then(function () {
            $mdDialog.hide();
            $rootScope.currentUser = $scope.loginForm.username;
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
          })

          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });
      };
  }]);
}());
