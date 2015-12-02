(function() {
  'use strict';

  angular.module('myApp').controller('taskController',
    ['$scope', '$mdDialog', '$rootScope', '$location', 'TaskService', 'AuthService',
    function ($scope, $mdDialog, $rootScope, $location, TaskService, AuthService) {

      $scope.populateTasks = function () {

        // TaskService.getTasks($scope.)

          .then(function() {
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
