(function() {
  'use strict';

  angular.module('myApp').controller('dialogRegisterController',
    ['$scope', '$mdDialog', '$mdMedia',
    function ($scope, $mdDialog, $mdMedia) {

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('sm');

    $scope.showForm = function(event) {
      $mdDialog.show({
        scope: $scope,
        preserveScope: true,
        controller: DialogController,
        templateUrl: '../partials/register.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true,
        fullscreen: $mdMedia('sm') && $scope.customFullscreen
      })

      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });

      $scope.$watch(function() {
        return $mdMedia('sm');
      }, function(sm) {
        $scope.customFullscreen = (sm === true);
      });

    };
  }]);

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

}());
