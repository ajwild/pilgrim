'use strict';

angular.module('pilgrimApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Log, Modal, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.deleteUser = function (user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function (u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

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

    $scope.deleteLog = function (log) {
      Log.remove({ id: log.id }, function (err) {
        if (err) { return console.error(err); }

        angular.forEach($scope.logs, function (l, i) {
          if (l === log) {
            $scope.logs.splice(i, 1);
          }
        });
      });
    };

    $scope.deleteAllLogs = function () {
      var myModal = Modal.confirm.delete(function () {
        Log.removeAll(function (err) {
          if (err) { return console.error(err); }

          $scope.logs = [];
        });
      });
      myModal('all markers');
    };
  });
