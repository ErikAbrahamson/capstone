(function() {
  'use strict';

  angular.module('myApp').factory('TaskService',
    ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

      var Obj = {};
      
      Obj.getTasks = function(userID) {
        return $http.get('/user/' + userID + '/tasks');
      };

      return Obj;
  }]);
}());
