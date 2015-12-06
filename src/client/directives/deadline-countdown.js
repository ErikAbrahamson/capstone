// myApp.directive('countdown', function($timeout) {
//   return {
//     restrict: 'EA',
//     scope: {
//       deadline: '='
//     },
//     link: function($scope, $rootScope, element, attrs) {
//           element.text($timeout(countdown($scope.deadline).toString());
//         }, 1000);
//       }
//   };
// });

// pp.directive('user', function() {
//
//   return {
//
//     restrict: 'EA',
//     template: "<p>*name:{{user.name}}</p>",
//     scope: {
//       user: '='
//     },
//     link: function(scope, element, attr) {
//
//       console.log(scope.user);
//     }
//   };
//
// });
