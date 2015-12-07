(function() {
  'use strict';

  angular.module('myApp').controller('tileController',
    ['$scope', '$rootScope', '$location', 'TaskService', '$mdDialog',
    function ($scope, $mdToast, $mdDialog, $rootScope, TaskService) {

      $scope.convertDate = function(deadline) {
        return moment(deadline).format('MMMM Do YYYY, h:mm:ss');
      };

      // TaskService.bindTasks($rootScope.currentUser._id)

  }]);
}());
