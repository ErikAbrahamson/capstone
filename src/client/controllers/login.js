(function() {
  'use strict';

  angular.module('myApp').controller('loginController',
    ['$scope', '$mdToast', '$mdDialog', '$rootScope', '$location', 'AuthService',
    function ($scope, $mdToast, $mdDialog, $rootScope, $location, AuthService) {

      $scope.login = function () {

        $scope.errorToast = function($event) {
          $mdToast.showSimple('Incorrect username or password');
        };

        $scope.error = false;
        $scope.disabled = true;
        $rootScope.currentUser = null;

        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)

          .then(function () {
            $mdDialog.hide();
            $rootScope.currentUser = AuthService.getUserStatus();
            console.log($rootScope.currentUser);
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
          })

          .catch(function () {
            $scope.errorToast();
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });
      };
  }]);
}());
