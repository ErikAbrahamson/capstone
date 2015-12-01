angular.module('myApp').controller('userController',
  ['$scope', 'AuthService', function ($scope, AuthService) {
      $scope.$watch(AuthService.isLoggedIn, function(isLoggedIn) {
        $scope.isLoggedIn = isLoggedIn;
        $scope.currentUser = AuthService.currentUser();
      });
  }]);
