(function() {
  'use strict';

  angular.module('myApp').factory('TaskService',
    ['$q', '$http', function ($q, $http) {

      var Obj = {};

      Obj.getTasks = function(userID) {
        return $http.get('/user/' + userID + '/tasks');
      };

      Obj.getSingleTask = function(userID, taskID) {
        return $http.get('/user/' + userID + '/task/' + taskID);
      };

      return Obj;
  }]);
}());
