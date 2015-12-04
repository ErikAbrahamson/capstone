(function() {
  'use strict';

  angular.module('myApp').controller('taskController',
    ['$scope', '$mdToast', '$mdDialog', '$rootScope', '$location', 'AuthService', 'TaskService',
    function ($scope, $mdToast, $mdDialog, $rootScope, $location, AuthService, TaskService) {

      $scope.addTask = function () {
        $scope.successToast = function($event) {
          $mdToast.showSimple('Task added!');
        };

        $scope.errorToast = function($event) {
          $mdToast.showSimple('Sorry, something went wrong. Please try again');
        };

        $scope.error = false;

        TaskService.addTask(
          $rootScope.currentUser._id,
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
          $scope.successToast();
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
