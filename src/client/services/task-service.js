(function() {
  'use strict';

  angular.module('myApp').factory('TaskService',
    ['$q', '$http', function ($q, $http) {

      var Obj = {}, tasks = null;

      Obj.addTask = function(userID, title, description, deadline, priority, severity, donation, text) {
        var deferred = $q.defer();

        $http.post('/user/' + userID + '/task/', {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          severity: severity,
          punishment_type: {
            donation: donation,
            text_message: text
          }
        })

          .success(function(data, status) {
            if (status === 200) deferred.resolve();
            else deferred.reject();
          })

          .error(function(data) { deferred.reject(); });

        return deferred.promise;
      };

      Obj.getSingleTask = function(userID, taskID) {
        return $http.get('/user/' + userID + '/task/' + taskID);
      };

      return Obj;
  }]);
}());
