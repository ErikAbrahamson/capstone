(function() {
  'use strict';

  angular.module('myApp').controller('loginController',
    ['$scope', '$mdToast', '$mdDialog', '$rootScope', '$location', 'AuthService', 'TaskService',
    function ($scope, $mdToast, $mdDialog, $rootScope, $location, AuthService, TaskService) {

      $scope.login = function () {

        $scope.errorToast = function($event) {
          $mdToast.showSimple('Incorrect username or password');
        };

        $scope.error = false;
        $scope.disabled = true;
        $rootScope.currentUser = null;

        AuthService.login(
          $scope.loginForm.username,
          $scope.loginForm.password
        )

        .then(function () {
          $scope.tempUser = AuthService.getUserStatus();
          TaskService.getTasks($scope.tempUser._id)
            .then(function() {
              $rootScope.currentUser = AuthService.getUserStatus();
              console.log($rootScope.currentUser);
            })
            .catch(function() { $scope.error = true; });
          $mdDialog.hide();
          $location.path('/');
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
