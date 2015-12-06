(function() {
  'use strict';

  angular.module('myApp').directive('timer', [function () {
      return {
        scope: {
          countdown: '=?'
        },
        link: function($scope, element, attributes) {
          console.log($scope.countdown);

          $scope.$watch('timer', function(value) {
            if (value) console.log(value);
          });
        }
      };
    }]);
  })();
