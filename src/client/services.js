angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    // create user variable
    var user = false;

    function isLoggedIn() {
      if (user) return true;
      else return false;
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {
      // console.log(username);
      var deferred = $q.defer();

      $http.post('/user/login', { username: username, password: password  })

        .success(function (data, status) {
          if (status === 200) {
            user = data;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })

        .error(function (data) {
          user = false;
          deferred.reject();
        });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })

        .error(function (data) {
          user = false;
          deferred.reject();
        });

      return deferred.promise;

    }
    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // $scope.$watch(AuthService.isLoggedIn, function(isLoggedIn) {
    //   $scope.isLoggedIn = isLoggedIn;
    //   $scope.currentUser = AuthService.currentUser();
    // });

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
}]);
