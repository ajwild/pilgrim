'use strict';

angular.module('pilgrimApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function () {
      if ($scope.newThing === '') { return; }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function (thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.logs = [];

    $http.get('/api/log/all').success(function (logs) {
      $scope.logs = logs;
      socket.syncUpdates('log', $scope.logs, function (event, log, logs) {
        if (event === 'created') { $scope.logs = logs; }
      });
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('log');
    });
  });
