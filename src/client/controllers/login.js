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

        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)

          .then(function () {
            $mdDialog.hide();
            $scope.currentUser = AuthService.getUserStatus();
            $scope.tasks = TaskService.getTasks($scope.currentUser._id);
            console.log($scope.tasks);
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
