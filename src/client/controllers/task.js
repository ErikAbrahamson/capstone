(function() {
  'use strict';

  angular.module('myApp').controller('taskController',
    ['$scope', '$mdToast', '$mdDialog', '$rootScope', '$location', 'AuthService',
    function ($scope, $mdToast, $mdDialog, $rootScope, $location, AuthService) {

      $scope.addTask = function () {

        $scope.errorToast = function($event) {
          $mdToast.showSimple('Something went wrong');
        };

        $scope.error = false;
        $scope.disabled = true;
        $rootScope.currentUser = null;

        TaskService.addTask(
          $scope.taskForm.title,
          $scope.taskForm.description,
          $scope.taskForm.deadline,
          $scope.taskForm.priority,
          $scope.taskForm.complete,
          $scope.taskForm.severity,
          $scope.taskForm.punishment_type.donation,
          $scope.taskForm.punishment_type.text_message
        )

        .then(function () {
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
