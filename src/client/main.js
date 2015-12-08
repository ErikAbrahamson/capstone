var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAria', 'ngMdIcons']);

myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .warnPalette('red');

  $mdThemingProvider.definePalette('tile', {
    '50'  :'#F44336',
    '100' :'#EF5350',
    '200' :'#E040FB',
    '300' :'#009688',
    '400' :'#2E7D32',
    '500' :'#00796B',
    '600' :'#827717',
    '700' :'#A1887F',
    '800' :'#795548',
    '900' :'#607D8B',
    'A100':'#424242',
    'A200':'#78909C',
    'A400':'#424242',
    'A700':'#424242',
    'A800':'#78909C',
    'contrastDefaultColor': 'light'
  });

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
    .when('/task', {
      templateUrl: 'partials/newtask.html',
      controller: 'taskController',
      access: { restricted: true }
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
