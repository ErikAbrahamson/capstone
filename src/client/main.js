var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAria', 'ngMdIcons']);

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: { restricted: false }
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: { restricted: false }
    })
    .when('/logout', {
      controller: 'logoutController',
      access: { restricted: true }
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: { restricted: false }
    })
    .when('/home', {
      template: 'partials/home.html',
      access: { restricted: true }
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: { restricted: false }
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});

myApp.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !AuthService.getUserStatus()) {
      $location.path('/');
      $route.reload();
    }
  });
});
