(function() {
  'use strict';

  angular.module('myApp').controller('taskController',
    ['$scope', '$mdDialog', '$rootScope', '$location', 'TaskService',
    function ($scope, $mdDialog, $rootScope, $location, TaskService) {

      TaskService.getTasks($rootScope.currentUser._id)

          .then(function() {
            $scope.tasks =
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
  }]);
}());
