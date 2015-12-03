(function() {
  'use strict';

  angular.module('myApp').factory('TaskService',
    ['$q', '$http', function ($q, $http) {

      var Obj = {}, tasks = null;

      Obj.getSingleTask = function(userID, taskID) {
        return $http.get('/user/' + userID + '/task/' + taskID);
      };

      Obj.getTasks = function(userID) {
        var deferred = $q.defer();

        $http.get('/user/' + userID + '/tasks')

          .success(function(data) {
            tasks = data;
            deferred.resolve();
          })

          .error(function(data) {
            tasks = false;
            deferred.reject();
          });

        return deferred.promise;
      };

      return Obj;
  }]);
}());
