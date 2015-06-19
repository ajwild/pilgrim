'use strict';

angular.module('pilgrimApp')
  .factory('Log', function ($http, $q) {
    return {
      remove: function (log, cb) {
        var deferred = $q.defer();

        $http.delete('/api/log/' + log.id)
          .success(function (data) {
            deferred.resolve(data);
            return cb();
          }).error(function (err) {
            deferred.reject(err);
            return cb(err);
          });

        return deferred.promise;
      },

      removeAll: function (cb) {
        var deferred = $q.defer();

        $http.delete('/api/log/all')
          .success(function (data) {
            deferred.resolve(data);
            return cb();
          }).error(function (err) {
            deferred.reject(err);
            return cb(err);
          });

        return deferred.promise;
      }
    };
  });
